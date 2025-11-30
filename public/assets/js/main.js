const navLinks = document.querySelectorAll('.nav-links a');
const current = location.pathname.split('/').pop() || 'index.html';
navLinks.forEach((link) => {
  if (link.getAttribute('href') === current) {
    link.classList.add('active');
  }
});

function copyToClipboard(text, button) {
  navigator.clipboard.writeText(text).then(() => {
    button.textContent = 'Copied!';
    setTimeout(() => (button.textContent = 'Copy command'), 1600);
  });
}

document.querySelectorAll('[data-copy]').forEach((btn) => {
  btn.addEventListener('click', () => copyToClipboard(btn.dataset.copy, btn));
});
