// Simple nav highlighting for current page
(function() {
  const current = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll('.nav a').forEach((link) => {
    const href = link.getAttribute('href');
    if (href && href.includes(current)) {
      link.setAttribute('aria-current', 'page');
    }
  });
})();
