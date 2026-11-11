document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector("#site-nav");

  const onScroll = () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 24);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  toggle?.addEventListener("click", () => {
    const open = header.classList.toggle("nav-open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  nav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      header.classList.remove("nav-open");
      toggle?.setAttribute("aria-expanded", "false");
    });
  });

  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-visible"));
  }

  const tipo = document.querySelector("#tipo");
  document.querySelectorAll(".js-cta-tipo").forEach((btn) => {
    btn.addEventListener("click", (ev) => {
      const value = btn.getAttribute("data-tipo");
      if (tipo && value) tipo.value = value;
      // allow default hash navigation if href="#contacto"
    });
  });

  const form = document.querySelector("#contact-form");
  const status = document.querySelector("#form-status");

  form?.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const endpoint = form.getAttribute("action");
    status.textContent = "Enviando…";
    const submitBtn = form.querySelector('[type="submit"]');
    submitBtn.disabled = true;

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error("send failed");
      status.textContent = "Mensaje enviado. Gracias por contactarnos.";
      form.reset();
    } catch (err) {
      status.textContent =
        "No se pudo enviar. Escríbenos a asociacionagroalimentaria79@gmail.com o WhatsApp +57 320-420-0954.";
    } finally {
      submitBtn.disabled = false;
    }
  });
});
