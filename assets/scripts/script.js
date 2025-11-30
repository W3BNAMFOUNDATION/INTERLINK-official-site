// ===============================
// INTERLINK — GLOBAL JS
// Clean, lightweight, enterprise-ready
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const target = document.querySelector(anchor.getAttribute("href"));
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // Automatic Active Navbar Highlight
  const navLinks = document.querySelectorAll(".nav a");
  const current = window.location.pathname.split("/").pop() || "index.html";

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (href === current) {
      link.classList.add("active");
    }
  });

  // Contact form validation (client-side only)
  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    const status = contactForm.querySelector(".form-status");

    const validators = {
      name: (value) => (value ? "" : "Please enter your name."),
      email: (value) => {
        if (!value) return "Please enter your email.";
        const emailPattern = /[^@\s]+@[^@\s]+\.[^@\s]+/;
        return emailPattern.test(value) ? "" : "Please enter a valid email.";
      },
      message: (value) => (value ? "" : "Please enter a message."),
    };

    const showError = (field, message) => {
      const input = contactForm.querySelector(`[name="${field}"]`);
      const error = contactForm.querySelector(`[data-error-for="${field}"]`);
      if (input) {
        input.classList.toggle("input-error", Boolean(message));
        input.setAttribute("aria-invalid", String(Boolean(message)));
      }
      if (error) {
        error.textContent = message;
      }
    };

    const clearMessages = () => {
      Object.keys(validators).forEach((field) => showError(field, ""));
      if (status) {
        status.textContent = "";
      }
    };

    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      clearMessages();

      const formData = new FormData(contactForm);
      let isValid = true;

      Object.entries(validators).forEach(([field, validate]) => {
        const value = (formData.get(field) || "").toString().trim();
        const message = validate(value);
        showError(field, message);
        if (message) isValid = false;
      });

      if (!isValid) return;

      const button = contactForm.querySelector("button");
      const originalText = button?.textContent || "";

      if (button) {
        button.textContent = "Sending...";
        button.disabled = true;
      }

      setTimeout(() => {
        if (status) {
          status.textContent = "Message sent successfully! Our team will contact you soon.";
        }
        if (button) {
          button.textContent = originalText;
          button.disabled = false;
        }
        contactForm.reset();
      }, 800);
    });
  }

  // Header shadow on scroll
  const header = document.querySelector(".header");
  const toggleShadow = () => {
    if (!header) return;
    header.style.boxShadow = window.scrollY > 20 ? "0 2px 10px rgba(0,0,0,0.4)" : "none";
  };

  toggleShadow();
  window.addEventListener("scroll", toggleShadow);
});
