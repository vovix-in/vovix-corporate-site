// One-off: mint the Gmail refresh token the contact form uses to send mail.
//
//   node --env-file=.env.local scripts/google-refresh-token.mjs url
//   node --env-file=.env.local scripts/google-refresh-token.mjs exchange "<address you landed on>"
//
// Step 1 prints a sign-in link. Sign in as the mailbox that should send and
// receive enquiries (admin@vovix.in). Google then redirects to REDIRECT, which
// is already registered on the OAuth client; the site has no page there, so you
// land on a "not found" page whose address carries the one-time code.
// Step 2 swaps that code for the refresh token and saves it to .env.local.
import { appendFileSync } from "node:fs";

const REDIRECT = "https://vovix.in/auth/google/callback";
const { GOOGLE_CLIENT_ID: id, GOOGLE_CLIENT_SECRET: secret } = process.env;
if (!id || !secret) {
  console.error("GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET missing. Run with --env-file=.env.local");
  process.exit(1);
}

const [mode, landed] = process.argv.slice(2);

if (mode === "url") {
  console.log("https://accounts.google.com/o/oauth2/v2/auth?" + new URLSearchParams({
    client_id: id,
    redirect_uri: REDIRECT,
    response_type: "code",
    scope: "https://www.googleapis.com/auth/gmail.send",
    access_type: "offline",
    prompt: "consent",
    login_hint: "admin@vovix.in",
  }));
} else if (mode === "exchange" && landed) {
  const code = landed.includes("code=") ? new URL(landed).searchParams.get("code") : landed;
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code, client_id: id, client_secret: secret, redirect_uri: REDIRECT, grant_type: "authorization_code" }),
  });
  const json = await res.json();
  if (!json.refresh_token) {
    console.error("No refresh token returned:", json.error ?? res.status, json.error_description ?? "");
    process.exit(1);
  }
  appendFileSync(".env.local", `GOOGLE_REFRESH_TOKEN="${json.refresh_token}"\n`);
  console.log(`Saved GOOGLE_REFRESH_TOKEN to .env.local (scope: ${json.scope}).`);
} else {
  console.error('Usage: google-refresh-token.mjs url | exchange "<address you landed on>"');
  process.exit(1);
}
