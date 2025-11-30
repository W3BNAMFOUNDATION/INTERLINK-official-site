document.addEventListener('DOMContentLoaded', () => {
  console.log('INTERLINK site loaded.');

  // Highlight active navigation link
  const navLinks = document.querySelectorAll('.nav-links a');
  const current = location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach((link) => {
    if (link.getAttribute('href') === current) {
      link.classList.add('active');
    }
  });

  // Smooth scroll for internal anchors
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Copy-to-clipboard helpers
  const copyToClipboard = (text, button) => {
    navigator.clipboard.writeText(text).then(() => {
      button.textContent = 'Copied!';
      setTimeout(() => (button.textContent = 'Copy command'), 1600);
    });
  };

  document.querySelectorAll('[data-copy]').forEach((btn) => {
    btn.addEventListener('click', () => copyToClipboard(btn.dataset.copy, btn));
  });

  // Contact form (front-end only placeholder)
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      alert('Your message has been sent successfully!');
      form.reset();
    });
  }
});
