(() => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* Mobile nav */
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");

  if (toggle && nav) {
    const closeNav = () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
    };

    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeNav);
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeNav();
    });
  }

  /* Scroll reveal */
  const revealTargets = [
    ...document.querySelectorAll(
      ".section-inner > .eyebrow, .section-inner > h2, .section-inner > .section-lead, .facts, .service-grid, .contact-form"
    ),
    ...document.querySelectorAll(".skill-list li"),
    ...document.querySelectorAll(".business-item"),
  ];

  revealTargets.forEach((el) => {
    if (!el.matches(".skill-list li") && !el.matches(".business-item")) {
      el.classList.add("reveal");
    }
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        el.classList.add("is-visible");

        if (el.matches(".skill-list li") || el.matches(".business-item")) {
          const siblings = [...el.parentElement.children];
          const index = siblings.indexOf(el);
          el.style.transitionDelay = `${index * 90}ms`;
        }

        observer.unobserve(el);
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  document
    .querySelectorAll(".reveal, .skill-list li, .business-item")
    .forEach((el) => observer.observe(el));

  /* Contact form (client-side demo) */
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  if (form && status) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      status.classList.remove("is-error");

      const data = new FormData(form);
      const name = String(data.get("name") || "").trim();
      const email = String(data.get("email") || "").trim();
      const message = String(data.get("message") || "").trim();

      if (!name || !email || !message) {
        status.textContent = "Please fill in all fields.";
        status.classList.add("is-error");
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        status.textContent = "Please enter a valid email address.";
        status.classList.add("is-error");
        return;
      }

      status.textContent = `Thanks, ${name}! Your message is ready — connect a form backend to send it live.`;
      form.reset();
    });
  }
})();
