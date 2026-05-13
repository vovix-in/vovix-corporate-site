(() => {
  if (document.querySelector(".mobile-sticky-cta")) {
    document.body.classList.add("has-mobile-sticky-cta");
  }

  const yearEl = document.getElementById("y");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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
    const scope = form.querySelector("[name='scope']")?.value?.trim() || "";
    const timeline = form.querySelector("[name='timeline']")?.value?.trim() || "";
    const automation = form.querySelector("[name='automation']")?.value?.trim() || "";
    const notes = form.querySelector("[name='notes']")?.value?.trim() || "";

    const plainBody = [
      "Contact Vovix — vovix.in",
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

    const subject = encodeURIComponent("Contact Vovix - vovix.in");
    const body = encodeURIComponent(plainBody);
    const gmailBody = encodeURIComponent(plainBody);

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
})();
