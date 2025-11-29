const navLinks = document.querySelectorAll('.nav a');
const themeToggle = document.getElementById('themeToggle');

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
  });
});

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll('.section, .card, .hero-panel').forEach(el => {
  el.classList.add('reveal');
  observer.observe(el);
});

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('glow-off');
  });
}

const smoothLinks = document.querySelectorAll('a[href^="#"]');
smoothLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});
