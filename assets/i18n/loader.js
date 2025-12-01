import LANGUAGES from "./lang-config.js";

export async function loadLang(lang) {
  if (!LANGUAGES[lang]) lang = "en";
  const response = await fetch(`/assets/i18n/${lang}.json`);
  return response.json();
}

export function applyTranslations(dict) {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) el.innerHTML = dict[key];
  });
}
