import { NextResponse } from "next/server";

/* Contact form backend: sends the enquiry to our own inbox through the
   Gmail API, authenticated as the mailbox owner with a long-lived OAuth
   refresh token. Reply-To is the visitor, so replying in Gmail reaches them.
   Any non-200 here makes the form fall back to the visitor's own mail app. */

const TO = process.env.CONTACT_TO ?? "admin@vovix.in";
const EMAIL_RE = /^[^\s@<>,;:"]+@[^\s@<>,;:"]+\.[^\s@<>,;:"]+$/;

// Best-effort per-instance throttle; enough to blunt a script hammering the form.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function throttled(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

let cached: { token: string; expires: number } | null = null;

async function accessToken() {
  if (cached && cached.expires > Date.now() + 60_000) return cached.token;
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN!,
      grant_type: "refresh_token",
    }),
    cache: "no-store",
  });
  const json = await res.json();
  if (!res.ok || !json.access_token) throw new Error(`token exchange failed: ${json.error ?? res.status}`);
  cached = { token: json.access_token, expires: Date.now() + (json.expires_in ?? 3000) * 1000 };
  return cached.token;
}

// Single-line header value: no CR/LF, so a field can never inject a header.
const oneLine = (s: unknown, max: number) => String(s ?? "").replace(/[\r\n\t]+/g, " ").trim().slice(0, max);

// RFC 2047 encoded-words, folded so each stays under the 75-character limit.
function encodeHeader(text: string) {
  const chars = Array.from(text);
  const words: string[] = [];
  for (let i = 0; i < chars.length; i += 10) {
    words.push(`=?UTF-8?B?${Buffer.from(chars.slice(i, i + 10).join(""), "utf8").toString("base64")}?=`);
  }
  return words.join("\r\n ");
}

export async function POST(req: Request) {
  if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET || !process.env.GOOGLE_REFRESH_TOKEN) {
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (throttled(ip)) return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });

  let data: Record<string, unknown>;
  try { data = await req.json(); } catch { return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 }); }

  // Honeypot: real visitors never see or fill this field. Pretend success.
  if (oneLine(data.website, 200)) return NextResponse.json({ ok: true });

  const name = oneLine(data.name, 120);
  const email = oneLine(data.email, 200);
  const company = oneLine(data.company, 160);
  const topic = oneLine(data.topic, 80) || "General";
  const message = String(data.message ?? "").trim().slice(0, 5000);
  if (!name || !EMAIL_RE.test(email) || message.length < 20) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const subject = `Project enquiry — ${topic}${company ? ` — ${company}` : ""}`;
  const lines = [`Name: ${name}`, `Email: ${email}`];
  if (company) lines.push(`Company: ${company}`);
  lines.push(`Topic: ${topic}`, "", message, "", "—", "Sent from the contact form on www.vovix.in");

  const mime = [
    `From: VOVIX Website <${TO}>`,
    `To: ${TO}`,
    `Reply-To: ${email}`,
    `Subject: ${encodeHeader(subject)}`,
    "MIME-Version: 1.0",
    "Content-Type: text/plain; charset=UTF-8",
    "Content-Transfer-Encoding: base64",
    "",
    Buffer.from(lines.join("\r\n"), "utf8").toString("base64").replace(/(.{76})/g, "$1\r\n"),
  ].join("\r\n");

  try {
    const res = await fetch("https://gmail.googleapis.com/gmail/v1/users/me/messages/send", {
      method: "POST",
      headers: { Authorization: `Bearer ${await accessToken()}`, "Content-Type": "application/json" },
      body: JSON.stringify({ raw: Buffer.from(mime, "utf8").toString("base64url") }),
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`gmail send failed: ${res.status} ${(await res.text()).slice(0, 300)}`);
  } catch (e) {
    console.error("[contact]", e instanceof Error ? e.message : e);
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
