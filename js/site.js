(() => {
  if (document.querySelector(".mobile-sticky-cta")) {
    document.body.classList.add("has-mobile-sticky-cta");
  }

  const yearEl = document.getElementById("y");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // --- Scroll progress bar (gradient) + navbar elevation ---
  const progressEl = document.getElementById("scrollProgress");
  const navEl = document.querySelector(".navbar");
  let scrollTicking = false;

  const updateScrollUI = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight =
      (document.documentElement.scrollHeight || document.body.scrollHeight) - window.innerHeight;
    const pct = docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0;
    if (progressEl) progressEl.style.width = pct + "%";
    if (navEl) navEl.classList.toggle("is-scrolled", scrollTop > 12);
    scrollTicking = false;
  };

  if (progressEl || navEl) {
    updateScrollUI();
    window.addEventListener(
      "scroll",
      () => {
        if (!scrollTicking) {
          window.requestAnimationFrame(updateScrollUI);
          scrollTicking = true;
        }
      },
      { passive: true }
    );
  }

  const revealNodes = document.querySelectorAll(".reveal-up");

  if (revealNodes.length > 0) {
    if (reducedMotion || !("IntersectionObserver" in window)) {
      revealNodes.forEach((node) => node.classList.add("is-visible"));
    } else {
      const revealObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          });
        },
        { threshold: 0.16, rootMargin: "0px 0px -40px 0px" }
      );

      revealNodes.forEach((node) => revealObserver.observe(node));
    }
  }

  const mailForms = document.querySelectorAll("[data-mailto-form]");
  const openDiscoveryComposer = (form) => {
    if (typeof form.reportValidity === "function" && !form.reportValidity()) {
      return;
    }

    const name = form.querySelector("[name='name']")?.value?.trim() || "";
    const email = form.querySelector("[name='email']")?.value?.trim() || "";
    const company = form.querySelector("[name='company']")?.value?.trim() || "";
    const service = form.querySelector("[name='service']")?.value?.trim() || "";
    const brief = form.querySelector("[name='brief']")?.value?.trim() || "";
    const scope = form.querySelector("[name='scope']")?.value?.trim() || "";
    const timeline = form.querySelector("[name='timeline']")?.value?.trim() || "";
    const automation = form.querySelector("[name='automation']")?.value?.trim() || "";
    const notes = form.querySelector("[name='notes']")?.value?.trim() || "";

    const isLeadForm = form.hasAttribute("data-lead-form");
    const plainBody = isLeadForm
      ? [
          "Vovix lead enquiry (vovix.in)",
          "",
          `Name: ${name}`,
          `Corporate email: ${email}`,
          `Company: ${company}`,
          `Service needed: ${service}`,
          "",
          "Project brief:",
          brief || "N/A"
        ].join("\n")
      : [
          "Contact Vovix (vovix.in)",
          "",
          `Name: ${name}`,
          `Work email: ${email}`,
          `Company: ${company}`,
          `Interest: ${scope}`,
          `Timeline: ${timeline}`,
          "",
          "What is one manual task each week that should not be manual?",
          automation || "N/A",
          "",
          "Additional context:",
          notes || "N/A"
        ].join("\n");

    const subject = encodeURIComponent(
      isLeadForm ? `Vovix enquiry: ${service || "Custom data"}` : "Contact Vovix - vovix.in"
    );
    const body = encodeURIComponent(plainBody);
    const gmailBody = encodeURIComponent(plainBody);

    const statusEl = form.closest("section")?.querySelector("#leadFormStatus") || document.getElementById("leadFormStatus");
    if (statusEl) {
      statusEl.textContent = "Opening your email client with your enquiry…";
    }

    window.location.href = `mailto:admin@vovix.in?subject=${subject}&body=${body}`;

    // If a local mail client is unavailable, open webmail compose as fallback.
    setTimeout(() => {
      window.open(
        `https://mail.google.com/mail/?view=cm&fs=1&to=admin@vovix.in&su=${subject}&body=${gmailBody}`,
        "_blank",
        "noopener,noreferrer"
      );
    }, 450);
  };

  mailForms.forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      openDiscoveryComposer(form);
    });

    const submitButton = form.querySelector("[data-discovery-submit]");
    if (submitButton) {
      submitButton.addEventListener("click", (event) => {
        event.preventDefault();
        openDiscoveryComposer(form);
      });
    }
  });

  const counterNodes = document.querySelectorAll("[data-count]");
  if (counterNodes.length === 0) return;

  const animateCounter = (node) => {
    const target = Number(node.getAttribute("data-count"));
    if (!Number.isFinite(target) || target < 0) return;
    if (reducedMotion) {
      node.textContent = String(target);
      return;
    }

    const durationMs = 900;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      node.textContent = String(Math.round(target * eased));
      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  };

  if (!("IntersectionObserver" in window) || reducedMotion) {
    counterNodes.forEach(animateCounter);
    return;
  }

  const counterObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.35 }
  );

  counterNodes.forEach((node) => counterObserver.observe(node));

  // --- Hero code panel: alternate INPUT / OUTPUT ---
  const codeInput = document.getElementById("codePaneInput");
  const codeOutput = document.getElementById("codePaneOutput");
  const codeTabs = document.querySelectorAll("[data-code-pane]");

  if (codeInput && codeOutput && !reducedMotion) {
    let showOutput = false;
    const swapPanes = () => {
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
    window.setInterval(swapPanes, 4200);
  }
})();
