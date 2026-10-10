"use client";

import { useEffect, useState } from "react";
import { usePausable } from "./ui";

/* ── Hero automation canvas ────────────────────────────────────
   A live pipeline drawn in SVG + CSS, in place of stock video:
   business documents are scanned, fields are read, extracted and
   validated, then routed to accounting, APIs and a review queue.
   Every motion maps to a real engineering step. Pure SVG/CSS —
   paints on first frame, pauses off-screen, and freezes to a
   complete still under prefers-reduced-motion.

   Packets: a 3-unit dash on a pathLength=100 path, offset-animated
   from 3 → -100 so exactly one pill travels the route per cycle.   */

const G = "var(--vx-green)";
const C = "var(--vx-cyan)";
const W = "rgba(255,255,255,";

type Route = { d: string; dur: number; delay: number; color?: string };

const ROUTES: Route[] = [
  // documents → read
  { d: "M318 214 C 372 214, 386 300, 446 300", dur: 2.6, delay: 0 },
  { d: "M318 300 C 372 300, 392 300, 446 300", dur: 2.6, delay: .7 },
  { d: "M318 386 C 372 386, 386 300, 446 300", dur: 2.6, delay: 1.4 },
  // read → extract → validate
  { d: "M494 300 L 590 300", dur: 1.6, delay: .3, color: C },
  { d: "M638 300 L 734 300", dur: 1.6, delay: .9, color: C },
  // validate → destinations
  { d: "M782 300 C 830 300, 836 176, 890 176", dur: 2.2, delay: .4 },
  { d: "M782 300 C 830 300, 840 300, 890 300", dur: 2.2, delay: 1.1 },
  { d: "M782 300 C 830 300, 836 424, 890 424", dur: 3.4, delay: 1.8, color: "#F2A541" },
];

const NODES = [
  { x: 470, label: "READ", sub: "OCR · 40+ langs" },
  { x: 614, label: "EXTRACT", sub: "fields · tables" },
  { x: 758, label: "VALIDATE", sub: "rules · GSTIN" },
];

export function HeroCanvas({ className = "" }: { className?: string }) {
  const [ref] = usePausable<HTMLDivElement>();
  // Narrow screens: frame the processing core + outputs so labels stay legible.
  const [narrow, setNarrow] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const on = () => setNarrow(mq.matches);
    on();
    mq.addEventListener?.("change", on);
    return () => mq.removeEventListener?.("change", on);
  }, []);
  return (
    <div ref={ref} className={className} aria-hidden>
      <style>{`
        @keyframes vxPacket { from { stroke-dashoffset: 3; } to { stroke-dashoffset: -100; } }
        @keyframes vxScan { 0% { transform: translateY(0); opacity: 0; } 8% { opacity: 1; } 92% { opacity: 1; } 100% { transform: translateY(176px); opacity: 0; } }
        @keyframes vxBlink { 0%, 100% { opacity: .0; } 30%, 60% { opacity: 1; } }
        @keyframes vxRing { 0% { transform: scale(1); opacity: .55; } 100% { transform: scale(1.85); opacity: 0; } }
        @keyframes vxRow { 0%, 12% { opacity: 0; transform: translateX(-6px); } 22%, 88% { opacity: 1; transform: none; } 100% { opacity: 0; } }
        @keyframes vxSpark { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
        .vx-packet { stroke-dasharray: 3 200; animation: vxPacket linear infinite; }
        .vx-scan { animation: vxScan 3.2s cubic-bezier(.45,0,.55,1) infinite; }
        .vx-blink { animation: vxBlink 3.2s ease-in-out infinite; }
        .vx-ring { animation: vxRing 2.4s ease-out infinite; transform-box: fill-box; transform-origin: center; }
        .vx-row { animation: vxRow 4.8s ease-in-out infinite; transform-box: fill-box; }
        @media (prefers-reduced-motion: reduce) {
          .vx-packet { stroke-dasharray: none; opacity: .35; }
          .vx-scan, .vx-ring { display: none; }
          .vx-blink, .vx-row { opacity: 1 !important; }
        }
      `}</style>
      <svg viewBox={narrow ? "420 140 676 350" : "192 116 904 382"} preserveAspectRatio="xMidYMid meet" className="h-full w-full" role="presentation">
        <defs>
          <linearGradient id="vxCard" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#0E3B4E" />
            <stop offset="1" stopColor="#0A3141" />
          </linearGradient>
          <linearGradient id="vxScanG" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={C} stopOpacity="0" />
            <stop offset=".5" stopColor={C} stopOpacity=".55" />
            <stop offset="1" stopColor={C} stopOpacity="0" />
          </linearGradient>
          <radialGradient id="vxGlow" cx=".5" cy=".5" r=".5">
            <stop offset="0" stopColor={G} stopOpacity=".22" />
            <stop offset="1" stopColor={G} stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx="640" cy="300" r="300" fill="url(#vxGlow)" />

        {/* ── document stack ── */}
        <g>
          {[
            { y: 152, t: "PURCHASE INVOICE", k: "INV-2041" },
            { y: 238, t: "BANK STATEMENT", k: "APR · 214 rows" },
            { y: 324, t: "KYC · PAN / GSTIN", k: "verified" },
          ].map((doc, i) => (
            <g key={doc.t} transform={`translate(${210 + i * 4} ${doc.y})`}>
              <rect width="104" height="124" rx="8" fill="url(#vxCard)" stroke={`${W}0.14)`} />
              <text x="10" y="20" fill={`${W}0.55)`} fontSize="7.5" fontFamily="var(--font-mono)" letterSpacing=".08em">{doc.t}</text>
              {[34, 46, 58, 70, 82, 94].map((ly, j) => (
                <rect key={ly} x="10" y={ly} width={j % 3 === 0 ? 62 : j % 3 === 1 ? 80 : 46} height="4" rx="2" fill={`${W}0.12)`} />
              ))}
              <rect className="vx-blink" style={{ animationDelay: `${i * .9}s` }} x="7" y="43" width="86" height="10" rx="3" fill="none" stroke={G} strokeWidth="1.3" />
              <text x="10" y="114" fill={G} fontSize="7.5" fontFamily="var(--font-mono)">{doc.k}</text>
            </g>
          ))}
          {/* scan bar over the stack */}
          <rect className="vx-scan" x="206" y="150" width="124" height="22" fill="url(#vxScanG)" />
          <text x="210" y="138" fill={`${W}0.5)`} fontSize="9" fontFamily="var(--font-mono)" letterSpacing=".14em">CAPTURE</text>
        </g>

        {/* ── routes ── */}
        {ROUTES.map((r, i) => (
          <g key={i}>
            <path d={r.d} fill="none" stroke={`${W}0.13)`} strokeWidth="1.2" strokeDasharray="3 5" />
            <path d={r.d} pathLength={100} fill="none" stroke={r.color ?? G} strokeWidth="3.4" strokeLinecap="round"
                  className="vx-packet" style={{ animationDuration: `${r.dur}s`, animationDelay: `${r.delay}s` }} />
          </g>
        ))}

        {/* ── processing nodes ── */}
        {NODES.map((n, i) => (
          <g key={n.label}>
            <circle className="vx-ring" style={{ animationDelay: `${i * .6}s` }} cx={n.x} cy="300" r="24" fill="none" stroke={G} strokeWidth="1" />
            <circle cx={n.x} cy="300" r="24" fill="#0B3344" stroke={G} strokeWidth="1.5" />
            <circle cx={n.x} cy="300" r="5" fill={i === 1 ? C : G} />
            <text x={n.x} y="248" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="700" fontFamily="var(--font-mono)" letterSpacing=".14em">{n.label}</text>
            <text x={n.x} y="352" textAnchor="middle" fill={`${W}0.5)`} fontSize="8.5" fontFamily="var(--font-mono)">{n.sub}</text>
          </g>
        ))}

        {/* ── destinations ── */}
        {[
          { y: 148, h: "TallyPrime XML", s: "voucher balanced", c: G, ok: true },
          { y: 272, h: "ERP · REST API", s: "200 OK · idempotent", c: G, ok: true },
          { y: 396, h: "Review queue", s: "1 field < threshold", c: "#F2A541", ok: false },
        ].map((d, i) => (
          <g key={d.h} transform={`translate(890 ${d.y})`}>
            <rect width="196" height="56" rx="10" fill="url(#vxCard)" stroke={`${W}0.14)`} />
            <rect x="0" y="0" width="3" height="56" rx="1.5" fill={d.c} />
            <text x="16" y="23" fill="#FFFFFF" fontSize="11.5" fontWeight="700" fontFamily="var(--font-sans)">{d.h}</text>
            <g className="vx-row" style={{ animationDelay: `${.6 + i * .7}s` }}>
              <circle cx="20" cy="39" r="3.5" fill={d.c} />
              <text x="30" y="42" fill={`${W}0.62)`} fontSize="9" fontFamily="var(--font-mono)">{d.s}</text>
            </g>
          </g>
        ))}

        {/* ── run monitor strip ── */}
        <g transform="translate(446 420)">
          <rect width="340" height="62" rx="10" fill="rgba(4,27,37,0.7)" stroke={`${W}0.10)`} />
          <text x="14" y="21" fill={`${W}0.5)`} fontSize="8.5" fontFamily="var(--font-mono)" letterSpacing=".12em">MONITOR · RUN THROUGHPUT</text>
          <circle cx="322" cy="18" r="3.5" fill={G}><title>healthy</title></circle>
          <polyline pathLength={1} className="spark-draw" fill="none" stroke={C} strokeWidth="1.6" strokeLinejoin="round"
                    points="14,50 40,46 66,48 92,40 118,43 144,34 170,37 196,29 222,32 248,24 274,27 300,20 326,22" />
        </g>
      </svg>
    </div>
  );
}
