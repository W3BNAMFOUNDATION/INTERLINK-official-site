// Minimal functionality for navbar highlighting, smooth scrolling, and logo animations

document.addEventListener("DOMContentLoaded", () => {
  // Highlight active page in navbar
  const current = window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll("nav a").forEach((link) => {
    const href = link.getAttribute("href") || "";
    if (href.includes(current)) {
      link.classList.add("active");
    }
  });

  // Smooth scroll for any anchor links (future use)
  const anchors = document.querySelectorAll('a[href^="#"]');
  anchors.forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const target = document.querySelector(anchor.getAttribute("href"));
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Logo tilt animation
  const logo = document.querySelector(".logo-3d");
  const frame = document.querySelector(".logo-frame");

  if (logo && frame) {
    frame.addEventListener("mousemove", (event) => {
      const { left, top, width, height } = frame.getBoundingClientRect();
      const x = (event.clientX - left) / width - 0.5;
      const y = (event.clientY - top) / height - 0.5;
      logo.style.transform = `rotateY(${x * 30}deg) rotateX(${y * -30}deg)`;
    });

    frame.addEventListener("mouseleave", () => {
      logo.style.transform = "";
    });
  }
});
