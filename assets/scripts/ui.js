const applyPathPrefix = (root) => {
  const isNested = window.location.pathname.includes('/pages/');
  const prefix = isNested ? '../' : '';

  root.querySelectorAll('[data-nav]').forEach((link) => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('http')) return;
    link.setAttribute('href', `${prefix}${href}`);
  });

  root.querySelectorAll('[data-asset-src]').forEach((asset) => {
    const src = asset.getAttribute('data-asset-src');
    if (!src) return;
    asset.setAttribute('src', `${prefix}${src}`);
  });
};

const highlightActive = (root) => {
  const current = window.location.pathname.split('/').pop() || 'index.html';
  root.querySelectorAll('a').forEach((link) => {
    const href = link.getAttribute('href');
    if (!href) return;
    if (href.endsWith(current)) {
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
    applyPathPrefix(fragment);
    document.body.insertAdjacentElement(position, fragment);
    highlightActive(fragment);
  } catch (error) {
    console.warn(`Could not load component: ${path}`, error);
  }
};

const bootstrapUI = () => {
  const isNested = window.location.pathname.includes('/pages/');
  const base = isNested ? '../' : '';
  insertComponent(`${base}components/header.html`, 'afterbegin');
  insertComponent(`${base}components/footer.html`, 'beforeend');
};

document.addEventListener('DOMContentLoaded', bootstrapUI);
