/* Vovix site.js — 2026-05-19 */

(() => {
  // Mobile sticky CTA body padding
  if (document.querySelector(".mobile-sticky-cta")) {
    document.body.classList.add("has-mobile-sticky-cta");
  }

  // Copyright year
  const yearEl = document.getElementById("y");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ── Scroll progress + navbar elevation
  const progressEl = document.getElementById("scrollProgress");
  const navEl      = document.querySelector(".navbar");
  let scrollTick   = false;

  const updateScroll = () => {
    const top = window.scrollY || document.documentElement.scrollTop;
    const height =
      (document.documentElement.scrollHeight || document.body.scrollHeight) -
      window.innerHeight;
    const pct = height > 0 ? Math.min(100, (top / height) * 100) : 0;
    if (progressEl) progressEl.style.width = pct + "%";
    if (navEl) navEl.classList.toggle("is-scrolled", top > 12);
    scrollTick = false;
  };

  if (progressEl || navEl) {
    updateScroll();
    window.addEventListener(
      "scroll",
      () => {
        if (!scrollTick) {
          requestAnimationFrame(updateScroll);
          scrollTick = true;
        }
      },
      { passive: true }
    );
  }

  // ── Reveal on scroll
  const revealNodes = document.querySelectorAll(".reveal-up");
  if (revealNodes.length > 0) {
    if (reducedMotion || !("IntersectionObserver" in window)) {
      revealNodes.forEach((n) => n.classList.add("is-visible"));
    } else {
      const obs = new IntersectionObserver(
        (entries, o) => {
          entries.forEach((e) => {
            if (!e.isIntersecting) return;
            e.target.classList.add("is-visible");
            o.unobserve(e.target);
          });
        },
        { threshold: 0.14, rootMargin: "0px 0px -36px 0px" }
      );
      revealNodes.forEach((n) => obs.observe(n));
    }
  }

  // ── Mailto forms
  const openComposer = (form) => {
    if (typeof form.reportValidity === "function" && !form.reportValidity()) return;

    const v = (name) => form.querySelector(`[name='${name}']`)?.value?.trim() || "";
    const isLead = form.hasAttribute("data-lead-form");

    const body = isLead
      ? [
          "Vovix lead enquiry (vovix.in)", "",
          `Name: ${v("name")}`,
          `Corporate email: ${v("email")}`,
          `Company: ${v("company")}`,
          `Service needed: ${v("service")}`,
          "", "Project brief:", v("brief") || "N/A",
        ].join("\n")
      : [
          "Contact Vovix (vovix.in)", "",
          `Name: ${v("name")}`,
          `Work email: ${v("email")}`,
          `Company: ${v("company")}`,
          `Interest: ${v("scope")}`,
          `Timeline: ${v("timeline")}`,
          "", "What is one manual task each week that should not be manual?",
          v("automation") || "N/A",
          "", "Additional context:",
          v("notes") || "N/A",
        ].join("\n");

    const subject = encodeURIComponent(
      isLead ? `Vovix enquiry: ${v("service") || "Custom data"}` : "Contact Vovix - vovix.in"
    );
    const bodyEnc = encodeURIComponent(body);

    const statusEl =
      form.closest("section")?.querySelector("#leadFormStatus") ||
      document.getElementById("leadFormStatus");
    if (statusEl) statusEl.textContent = "Opening your email client…";

    window.location.href = `mailto:admin@vovix.in?subject=${subject}&body=${bodyEnc}`;
    setTimeout(() => {
      window.open(
        `https://mail.google.com/mail/?view=cm&fs=1&to=admin@vovix.in&su=${subject}&body=${bodyEnc}`,
        "_blank",
        "noopener,noreferrer"
      );
    }, 450);
  };

  document.querySelectorAll("[data-mailto-form]").forEach((form) => {
    form.addEventListener("submit", (e) => { e.preventDefault(); openComposer(form); });
    form.querySelector("[data-discovery-submit]")?.addEventListener("click", (e) => {
      e.preventDefault();
      openComposer(form);
    });
  });

  // ── Counter animation
  const animateCounter = (node) => {
    const target = Number(node.getAttribute("data-count"));
    if (!Number.isFinite(target) || target < 0) return;
    if (reducedMotion) { node.textContent = String(target); return; }
    const dur = 900;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      node.textContent = String(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const counterNodes = document.querySelectorAll("[data-count]");
  if (counterNodes.length > 0) {
    if (!("IntersectionObserver" in window) || reducedMotion) {
      counterNodes.forEach(animateCounter);
    } else {
      const obs = new IntersectionObserver(
        (entries, o) => {
          entries.forEach((e) => {
            if (!e.isIntersecting) return;
            animateCounter(e.target);
            o.unobserve(e.target);
          });
        },
        { threshold: 0.35 }
      );
      counterNodes.forEach((n) => obs.observe(n));
    }
  }

  // ── Code panel: auto-flip INPUT ↔ OUTPUT
  const codeInput  = document.getElementById("codePaneInput");
  const codeOutput = document.getElementById("codePaneOutput");
  const codeTabs   = document.querySelectorAll("[data-code-pane]");

  if (codeInput && codeOutput && !reducedMotion) {
    let showOutput = false;
    const swap = () => {
      showOutput = !showOutput;
      codeInput.classList.toggle("is-visible", !showOutput);
      codeInput.setAttribute("aria-hidden", showOutput ? "true" : "false");
      codeOutput.classList.toggle("is-visible", showOutput);
      codeOutput.setAttribute("aria-hidden", showOutput ? "false" : "true");
      codeTabs.forEach((tab) => {
        const pane = tab.getAttribute("data-code-pane");
        tab.classList.toggle("is-active", (pane === "output") === showOutput);
      });
    };
    setInterval(swap, 4200);
  }

  // ══════════════════════════════════════════════════════════
  //  MOTION LAYER — network canvas · stagger · spotlight · magnetic
  // ══════════════════════════════════════════════════════════
  const hoverCapable = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  // ── Hero ambient network canvas (all heroes)
  const initHeroCanvas = (hero) => {
    const ctx0 = document.createElement("canvas");
    ctx0.className = "hero-canvas";
    ctx0.setAttribute("aria-hidden", "true");
    hero.insertBefore(ctx0, hero.firstChild);
    const ctx = ctx0.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0, H = 0, nodes = [], pulses = [], raf = 0, running = false;
    const D = 150 * dpr;

    const build = () => {
      const count = Math.max(12, Math.min(38, Math.round((W * H) / (30000 * dpr * dpr))));
      nodes = [];
      for (let i = 0; i < count; i++)
        nodes.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - 0.5) * 0.12 * dpr, vy: (Math.random() - 0.5) * 0.12 * dpr });
    };
    const resize = () => {
      const r = hero.getBoundingClientRect();
      W = ctx0.width = Math.max(1, Math.round(r.width * dpr));
      H = ctx0.height = Math.max(1, Math.round(r.height * dpr));
      ctx0.style.width = r.width + "px";
      ctx0.style.height = r.height + "px";
      build();
    };
    const drawStatic = () => {
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < nodes.length; i++)
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j], d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < D) { ctx.globalAlpha = (1 - d / D) * 0.45; ctx.strokeStyle = "rgba(16,42,67,1)"; ctx.lineWidth = dpr; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
        }
      ctx.globalAlpha = 0.5; ctx.fillStyle = "rgba(16,42,67,1)";
      for (const n of nodes) { ctx.beginPath(); ctx.arc(n.x, n.y, 1.6 * dpr, 0, 7); ctx.fill(); }
      ctx.globalAlpha = 1;
    };
    const frame = () => {
      ctx.clearRect(0, 0, W, H);
      for (const n of nodes) { n.x += n.vx; n.y += n.vy; if (n.x < 0 || n.x > W) n.vx *= -1; if (n.y < 0 || n.y > H) n.vy *= -1; }
      for (let i = 0; i < nodes.length; i++)
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j], d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < D) { ctx.globalAlpha = (1 - d / D) * 0.45; ctx.strokeStyle = "rgba(16,42,67,1)"; ctx.lineWidth = dpr; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
        }
      ctx.globalAlpha = 0.5; ctx.fillStyle = "rgba(16,42,67,1)";
      for (const n of nodes) { ctx.beginPath(); ctx.arc(n.x, n.y, 1.6 * dpr, 0, 7); ctx.fill(); }
      ctx.globalAlpha = 1;
      if (pulses.length < 6 && Math.random() < 0.05 && nodes.length) {
        const a = nodes[(Math.random() * nodes.length) | 0];
        const near = nodes.filter((b) => b !== a && Math.hypot(a.x - b.x, a.y - b.y) < D);
        if (near.length) pulses.push({ a, b: near[(Math.random() * near.length) | 0], t: 0, sp: 0.012 + Math.random() * 0.02, c: Math.random() < 0.5 ? "0,200,83" : "0,229,255" });
      }
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i]; p.t += p.sp; if (p.t >= 1) { pulses.splice(i, 1); continue; }
        const x = p.a.x + (p.b.x - p.a.x) * p.t, y = p.a.y + (p.b.y - p.a.y) * p.t;
        const g = ctx.createRadialGradient(x, y, 0, x, y, 8 * dpr);
        g.addColorStop(0, "rgba(" + p.c + ",0.85)"); g.addColorStop(1, "rgba(" + p.c + ",0)");
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, 8 * dpr, 0, 7); ctx.fill();
      }
      raf = requestAnimationFrame(frame);
    };
    const start = () => { if (running) return; running = true; frame(); };
    const stop = () => { running = false; cancelAnimationFrame(raf); };

    resize();
    let rt;
    window.addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(resize, 200); }, { passive: true });
    if (reducedMotion) { drawStatic(); return; }
    if ("IntersectionObserver" in window) {
      new IntersectionObserver((es) => es.forEach((e) => (e.isIntersecting ? start() : stop())), { threshold: 0 }).observe(hero);
    } else start();
  };
  document.querySelectorAll(".hero-organic, .hero-page-organic").forEach(initHeroCanvas);

  // ── Staggered reveal (adds delay to grouped reveal-up siblings)
  document.querySelectorAll(".reveal-up").forEach((n) => {
    if (!n.parentElement) return;
    const sibs = Array.prototype.filter.call(n.parentElement.children, (c) => c.classList.contains("reveal-up"));
    const idx = sibs.indexOf(n);
    if (idx > 0) n.style.transitionDelay = Math.min(idx * 70, 350) + "ms";
  });

  // ── Card cursor spotlight
  if (hoverCapable && !reducedMotion) {
    const fxSel = ".org-product-card,.agency-card,.services-pillar-card,.product-showcase-card,.pipeline-step,.org-step,.impact-pill,.discovery-step-card,.section-frame,.org-mini-service-card";
    document.querySelectorAll(fxSel).forEach((card) => {
      card.classList.add("fx-card");
      card.addEventListener("pointermove", (e) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", ((e.clientX - r.left) / r.width) * 100 + "%");
        card.style.setProperty("--my", ((e.clientY - r.top) / r.height) * 100 + "%");
      });
    });

    // ── Magnetic hero buttons
    document.querySelectorAll(".hero-actions .btn").forEach((btn) => {
      btn.addEventListener("pointermove", (e) => {
        const r = btn.getBoundingClientRect();
        const mx = e.clientX - r.left - r.width / 2;
        const my = e.clientY - r.top - r.height / 2;
        btn.style.transform = "translate(" + mx * 0.15 + "px," + my * 0.22 + "px)";
      });
      btn.addEventListener("pointerleave", () => { btn.style.transform = ""; });
    });
  }
})();
