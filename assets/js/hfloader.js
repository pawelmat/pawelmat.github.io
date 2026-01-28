/**
 * Header and Footer Loader
 * Loads header and footer from header.html before showing the page
 */

(function() {
  "use strict";

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
      
      // Parse the loaded HTML
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      
      // Extract header and footer from header.html
      const newHeader = doc.querySelector('#header');
      const newFooter = doc.querySelector('#footer');
      
      // Replace header in the current document
      if (newHeader) {
        const currentHeader = document.querySelector('#header');
        if (currentHeader) {
          currentHeader.replaceWith(newHeader.cloneNode(true));
        }
      }
      
      // Replace footer in the current document
      if (newFooter) {
        const currentFooter = document.querySelector('#footer');
        if (currentFooter) {
          currentFooter.replaceWith(newFooter.cloneNode(true));
        }
      }
      
      // Show the page after replacement
      document.body.style.display = '';
      
      // Dispatch custom event to notify that header/footer are loaded
      document.dispatchEvent(new Event('headerFooterLoaded'));
    } catch (error) {
      console.error('Error loading header/footer:', error);
      // Show the page even if loading fails to prevent blank page
      document.body.style.display = '';
    }
  }
  
  // Load header and footer immediately when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadHeaderFooter);
  } else {
    loadHeaderFooter();
  }

})();
