/**
 * Header and Footer Loader
 * Loads header and footer from header.html before showing the page
 */

(function() {
  "use strict";

  const CONFIG_COOKIE_NAME = "citadel-universe-config";
  let cachedHeaderHtml = null;

  /**
   * Get locale "eng" or "pol" from cookie (read-only) or browser. Does not set any cookie.
   */
  function getLocale() {
    try {
      const parts = document.cookie.split(";");
      for (let i = 0; i < parts.length; i++) {
        const part = parts[i].trim();
        if (part.startsWith(CONFIG_COOKIE_NAME + "=")) {
          const value = part.substring(CONFIG_COOKIE_NAME.length + 1);
          const config = JSON.parse(decodeURIComponent(value));
          if (config && (config.language === "pol" || config.language === "eng")) {
            return config.language;
          }
          break;
        }
      }
    } catch (err) {
      /* ignore */
    }
    const primary = (navigator.languages && navigator.languages[0]) || navigator.language || "";
    return primary.toLowerCase().startsWith("pl") ? "pol" : "eng";
  }

  /**
   * Apply header and footer from a parsed document for the given locale.
   * Replaces current #header and #footer; does not show body or dispatch events.
   */
  function applyHeaderFooter(doc, locale) {
    const headerId = locale === "pol" ? "header_pol" : "header_eng";
    const footerId = locale === "pol" ? "footer_pol" : "footer_eng";
    let newHeader = doc.querySelector("#" + headerId);
    let newFooter = doc.querySelector("#" + footerId);
    if (!newHeader) newHeader = doc.querySelector("#header_eng");
    if (!newFooter) newFooter = doc.querySelector("#footer_eng");

    if (newHeader) {
      const currentHeader = document.querySelector('#header');
      if (currentHeader) {
        const headerClone = newHeader.cloneNode(true);
        headerClone.id = "header";
        currentHeader.replaceWith(headerClone);
      }
    }
    if (newFooter) {
      const currentFooter = document.querySelector('#footer');
      if (currentFooter) {
        const footerClone = newFooter.cloneNode(true);
        footerClone.id = "footer";
        currentFooter.replaceWith(footerClone);
      }
    }
  }

  /**
   * Load header and footer from header.html before showing the page
   */
  async function loadHeaderFooter() {
    try {
      const response = await fetch('header.html');
      if (!response.ok) {
        throw new Error('Failed to load header.html');
      }
      const html = await response.text();
      cachedHeaderHtml = html;

      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const locale = getLocale();
      applyHeaderFooter(doc, locale);

      document.body.style.display = '';
      document.dispatchEvent(new Event('headerFooterLoaded'));
    } catch (error) {
      console.error('Error loading header/footer:', error);
      document.body.style.display = '';
    }
  }

  /**
   * Reload header and footer with the given locale (e.g. after language change).
   * Uses cached HTML when available; dispatches headerFooterLoaded when done.
   */
  async function reloadHeaderFooter(locale) {
    try {
      let html = cachedHeaderHtml;
      if (!html) {
        const response = await fetch('header.html');
        if (!response.ok) throw new Error('Failed to load header.html');
        html = await response.text();
        cachedHeaderHtml = html;
      }
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      applyHeaderFooter(doc, locale);
      document.dispatchEvent(new Event('headerFooterLoaded'));
    } catch (error) {
      console.error('Error reloading header/footer:', error);
    }
  }

  window.reloadHeaderFooter = reloadHeaderFooter;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadHeaderFooter);
  } else {
    loadHeaderFooter();
  }

})();
