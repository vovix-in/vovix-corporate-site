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
})();
