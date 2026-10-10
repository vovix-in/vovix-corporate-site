import type { ReactNode } from "react";
import { Navbar } from "./nav";
import { Footer } from "./footer";

export function PageShell({ eyebrow, title, lead, children, actions }: { eyebrow: string; title: string; lead?: string; children: ReactNode; actions?: ReactNode }) {
  return (
    <>
      <Navbar />
      <main id="main">
        <section className="on-dark relative overflow-hidden bg-navy text-white">
          <div aria-hidden className="gridfield-dark absolute inset-0 [mask-image:radial-gradient(ellipse_at_80%_0%,black,transparent_70%)]" />
          <div aria-hidden className="pointer-events-none absolute -right-32 -top-48 h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(9,165,76,0.18),transparent_68%)]" />
          <div className="shell relative py-16 md:py-24">
            <p className="rise flex items-center gap-3 font-mono text-label uppercase text-ink-onspec"><span className="brand-rule" aria-hidden />{eyebrow}</p>
            <h1 className="rise mt-5 max-w-[22ch] text-balance text-[clamp(34px,5vw,56px)] font-extrabold leading-[1.05] tracking-[-0.035em] [animation-delay:.08s]">{title}</h1>
            {lead && <p className="rise mt-6 max-w-[62ch] text-pretty text-lead text-ink-onspec [animation-delay:.16s]">{lead}</p>}
            {actions && <div className="rise mt-8 flex flex-wrap gap-3 [animation-delay:.24s]">{actions}</div>}
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
