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

  // Simple contact form handler (no backend yet)
  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const button = contactForm.querySelector("button");
      const originalText = button?.textContent || "";

      if (button) {
        button.textContent = "Sending...";
        button.disabled = true;
      }

      setTimeout(() => {
        alert("Message sent successfully! Our team will contact you soon.");
        if (button) {
          button.textContent = originalText;
          button.disabled = false;
        }
        contactForm.reset();
      }, 1200);
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
