const getBasePath = () => {
  const script = document.currentScript;
  if (!script) return '';
  const [base] = script.src.split('assets/scripts/ui.js');
  return base || '';
};

const applyPathPrefix = (root, basePath) => {
  if (!basePath) return;

  root.querySelectorAll('[data-nav]').forEach((link) => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('http')) return;
    const resolved = new URL(href, basePath);
    link.setAttribute('href', resolved.href);
  });

  root.querySelectorAll('[data-asset-src]').forEach((asset) => {
    const src = asset.getAttribute('data-asset-src');
    if (!src) return;
    const resolved = new URL(src, basePath);
    asset.setAttribute('src', resolved.href);
  });
};

const highlightActive = (root) => {
  const current = window.location.pathname.split('/').pop() || 'index.html';
  root.querySelectorAll('a').forEach((link) => {
    const href = link.getAttribute('href');
    if (!href) return;
    const linkPath = new URL(href, window.location.href).pathname.split('/').pop();
    if (linkPath === current) {
      link.classList.add('active');
    }
  });
};

const insertComponent = async (path, position) => {
  try {
    const response = await fetch(path);
    if (!response.ok) return;
    const html = await response.text();
    const wrapper = document.createElement('div');
    wrapper.innerHTML = html.trim();
    const fragment = wrapper.firstElementChild;
    if (!fragment) return;
    const basePath = getBasePath();
    applyPathPrefix(fragment, basePath);
    document.body.insertAdjacentElement(position, fragment);
    highlightActive(fragment);
  } catch (error) {
    console.warn(`Could not load component: ${path}`, error);
  }
};

const bootstrapUI = () => {
  const basePath = getBasePath();
  insertComponent(`${basePath}components/header.html`, 'afterbegin');
  insertComponent(`${basePath}components/footer.html`, 'beforeend');
};

document.addEventListener('DOMContentLoaded', bootstrapUI);
