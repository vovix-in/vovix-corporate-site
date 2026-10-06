import type { ReactNode } from "react";
import { Navbar } from "./nav";
import { Footer } from "./footer";

export function PageShell({ eyebrow, title, lead, children }: { eyebrow: string; title: string; lead?: string; children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main id="main">
        <section className="dotfield relative overflow-hidden border-b border-line bg-gradient-to-b from-ground-sub to-ground-paper">
          <div aria-hidden className="pointer-events-none absolute -right-32 -top-48 h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(0,200,83,0.10),transparent_68%)]" />
          <div className="shell relative py-14 text-center md:py-20">
            <p className="eyebrow mb-4">{eyebrow}</p>
            <h1 className="mx-auto max-w-[20ch] text-balance text-[clamp(30px,4.6vw,46px)] font-extrabold leading-[1.08] tracking-[-0.028em] text-ink">{title}</h1>
            {lead && <p className="mx-auto mt-5 max-w-[62ch] text-lead text-ink-secondary">{lead}</p>}
          </div>
        </section>
        {children}
      </main>
      <Footer />
    </>
  );
}

export function Prose({ children }: { children: ReactNode }) {
  return <div className="mx-auto max-w-[70ch] [&_h2]:mb-3 [&_h2]:mt-10 [&_h2]:text-[19px] [&_h2]:font-bold [&_h2]:tracking-[-0.012em] [&_h2]:text-ink [&_li]:mb-2 [&_li]:text-small [&_li]:text-ink-secondary [&_p]:mb-4 [&_p]:text-small [&_p]:leading-relaxed [&_p]:text-ink-secondary [&_ul]:mb-5 [&_ul]:list-disc [&_ul]:pl-5">{children}</div>;
}
