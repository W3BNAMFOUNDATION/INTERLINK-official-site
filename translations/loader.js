import LANGUAGES from "./lang-config.js";

function resolvePath(path) {
  const baseHref = document.querySelector("base")?.getAttribute("href") ||
    (window.location.pathname.includes("/pages/") ? "../" : "./");
  const baseURL = new URL(baseHref, window.location.href);
  return new URL(path, baseURL).href;
}

async function fetchDictionary(path) {
  try {
    const response = await fetch(path);
    if (response.ok) return response.json();
  } catch (_) {
    /* Network failure will fall through to fallback handling */
  }
  return null;
}

export async function loadLang(lang) {
  const target = LANGUAGES[lang] ? lang : "en";
  const sources = [
    resolvePath(`translations/${target}.json`),
    resolvePath(`assets/i18n/${target}.json`)
  ];

  const dictionaries = await Promise.all(sources.map(fetchDictionary));
  const merged = dictionaries.filter(Boolean).reduce((acc, dict) => ({ ...acc, ...dict }), {});

  if (!Object.keys(merged).length && target !== "en") {
    return loadLang("en");
  }

  return merged;
}

export function ensureI18nBindings(dict = {}) {
  const defaults = { ...dict };
  let counter = 0;

  document.querySelectorAll("body *").forEach(el => {
    if (el.children.length > 0) return;
    const text = (el.textContent || "").trim();
    if (!text) return;

    if (!el.dataset.i18n) {
      const slug = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "_")
        .replace(/^_+|_+$/g, "");
      const baseKey = slug || `text_${counter + 1}`;
      let key = baseKey;
      while (defaults[key]) {
        counter += 1;
        key = `${baseKey}_${counter}`;
      }
      if (!defaults[key]) counter += 1;
      el.dataset.i18n = key;
    }

    const key = el.dataset.i18n;
    if (!defaults[key]) defaults[key] = text;
  });

  return defaults;
}

export function applyTranslations(dict) {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) el.innerHTML = dict[key];
  });
}

export function detectLanguage() {
  const saved = localStorage.getItem("lang");
  if (saved && LANGUAGES[saved]) return saved;
  const browser = (navigator.language || "en").split("-")[0];
  return LANGUAGES[browser] ? browser : "en";
}

export function syncLanguageSelector(lang) {
  const select = document.getElementById("langSelect");
  if (select) select.value = lang;
}

export async function initTranslations() {
  const lang = detectLanguage();
  const loaded = await loadLang(lang);
  const mergedDict = ensureI18nBindings(loaded);
  applyTranslations(mergedDict);
  syncLanguageSelector(lang);
}
