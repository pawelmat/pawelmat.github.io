/**
* Main non-Bootstrap JavaScript file for the Citadel Universe website.
*/

(function() {
  "use strict";

  const CONFIG_COOKIE_NAME = "citadel-universe-config";
  const CONFIG_COOKIE_MAX_AGE_YEARS = 10;

  /** Current UI language: "eng" or "pol" (more may be added later). */
  let language = "eng";

  function getConfigCookie() {
    try {
      const parts = document.cookie.split(";");
      for (let i = 0; i < parts.length; i++) {
        const part = parts[i].trim();
        if (part.startsWith(CONFIG_COOKIE_NAME + "=")) {
          const value = part.substring(CONFIG_COOKIE_NAME.length + 1);
          return JSON.parse(decodeURIComponent(value));
        }
      }
    } catch (err) {
      /* ignore */
    }
    return null;
  }

  function setConfigCookie(config) {
    const value = encodeURIComponent(JSON.stringify(config));
    const maxAge = CONFIG_COOKIE_MAX_AGE_YEARS * 365 * 24 * 60 * 60;
    document.cookie = CONFIG_COOKIE_NAME + "=" + value + "; path=/; max-age=" + maxAge + "; SameSite=Lax";
    if (config.language !== undefined) {
      // console.debug("[citadel-universe] language cookie set: " + config.language);
    }
  }

  /** Content language codes we show/hide by (do not touch e.g. html lang="en"). */
  const CONTENT_LANG_CODES = ["eng", "pol"];

  function applyLanguageVisibility() {
    document.querySelectorAll("[lang]").forEach(function(el) {
      const elLang = el.getAttribute("lang");
      if (CONTENT_LANG_CODES.indexOf(elLang) === -1) return;
      if (elLang === language) {
        el.classList.remove("lang-hidden");
        el.removeAttribute("hidden");
      } else {
        el.classList.add("lang-hidden");
        el.setAttribute("hidden", "");
      }
    });
  }

  function initLanguage() {
    const config = getConfigCookie();
    if (config && (config.language === "pol" || config.language === "eng")) {
      language = config.language;
    } else {
      const primary = (navigator.languages && navigator.languages[0]) || navigator.language || "";
      language = primary.toLowerCase().startsWith("pl") ? "pol" : "eng";
      setConfigCookie({ language: language });
    }
    applyLanguageVisibility();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initLanguage);
  } else {
    initLanguage();
  }

  /** Expose current language for other scripts (e.g. translations). */
  Object.defineProperty(window, "citadelLanguage", {
    get: function() { return language; },
    configurable: true
  });

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader) return;
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav: single delegated click listener (avoids race with header load).
   */
  document.addEventListener('click', function(e) {
    const toggleBtn = e.target.closest('.mobile-nav-toggle');
    if (toggleBtn) {
      document.body.classList.toggle('mobile-nav-active');
      toggleBtn.classList.toggle('bi-list');
      toggleBtn.classList.toggle('bi-x');
      return;
    }
    const dropdownToggle = e.target.closest('.navmenu .toggle-dropdown');
    if (dropdownToggle) {
      e.preventDefault();
      e.stopPropagation();
      dropdownToggle.parentNode.classList.toggle('active');
      dropdownToggle.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      return;
    }
    const navLink = e.target.closest('#navmenu a');
    if (navLink && document.body.classList.contains('mobile-nav-active')) {
      document.body.classList.remove('mobile-nav-active');
      const btn = document.querySelector('.mobile-nav-toggle');
      if (btn) {
        btn.classList.remove('bi-x');
        btn.classList.add('bi-list');
      }
    }
    const languageLink = e.target.closest('a[data-language]');
    if (languageLink) {
      e.preventDefault();
      const value = languageLink.getAttribute('data-language');
      if (value === 'eng' || value === 'pol') {
        language = value;
        setConfigCookie({ language: language });
        applyLanguageVisibility();
        if (typeof window.reloadHeaderFooter === 'function') {
          window.reloadHeaderFooter(language);
        }
      }
      return;
    }
    const musicToggleLink = e.target.closest('a[href="#background-music-toggle"]');
    if (musicToggleLink) {
      const el = document.getElementById('background-music-toggle');
      if (el) {
        setTimeout(function() {
          el.classList.add('background-music-pulsate');
          setTimeout(function() {
            el.classList.remove('background-music-pulsate');
          }, 2000);
        }, 1500);
      }
    }
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  if (scrollTop) {
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Background music toggle (loads only on first turn-on to save resources).
   */
  const BACKGROUND_MUSIC_SONGS = [
    'assets/music/background/maintune1.mp3',
    'assets/music/background/maintune3.mp3',
    'assets/music/background/maintune5.mp3',
    'assets/music/background/maintune2.mp3', 
    'assets/music/background/maintune4.mp3',
    'assets/music/background/maintune6.mp3'
  ];
  let backgroundMusicOn = false;
  let backgroundMusicAudio = null;
  let backgroundMusicCurrentIndex = -1;
  let backgroundMusicBlinkInterval = null;

  function playNextBackgroundSong() {
    if (!backgroundMusicAudio || BACKGROUND_MUSIC_SONGS.length === 0) return;
    backgroundMusicCurrentIndex = (backgroundMusicCurrentIndex + 1) % BACKGROUND_MUSIC_SONGS.length;
    backgroundMusicAudio.src = BACKGROUND_MUSIC_SONGS[backgroundMusicCurrentIndex];
    backgroundMusicAudio.play().catch(function() {});
    updateBackgroundMusicCounter();
  }

  function updateBackgroundMusicToggleUI(isOn) {
    const el = document.getElementById('background-music-toggle');
    if (!el) return;
    el.title = isOn ? 'Turn background music off' : 'Turn background music on';
    el.classList.remove('bi-volume-mute', 'bi-volume-up-fill', 'bi-volume-down-fill');
    el.classList.add(isOn ? 'bi-volume-up-fill' : 'bi-volume-mute');
    if (isOn) {
      el.classList.remove('background-music-off');
    } else {
      el.classList.add('background-music-off');
    }
    const prevEl = document.getElementById('background-music-prev');
    const nextEl = document.getElementById('background-music-next');
    const counterEl = document.getElementById('background-music-counter');
    if (prevEl) prevEl.classList.toggle('background-music-nav-visible', isOn);
    if (nextEl) nextEl.classList.toggle('background-music-nav-visible', isOn);
    if (counterEl) counterEl.classList.toggle('background-music-nav-visible', isOn);
    if (isOn) updateBackgroundMusicCounter();
  }

  function updateBackgroundMusicCounter() {
    const el = document.getElementById('background-music-counter');
    if (!el || BACKGROUND_MUSIC_SONGS.length === 0) return;
    const current = backgroundMusicCurrentIndex >= 0 ? backgroundMusicCurrentIndex + 1 : 1;
    el.textContent = current + '/' + BACKGROUND_MUSIC_SONGS.length;
  }

  function backgroundMusicChange(direction) {
    if (!backgroundMusicAudio || BACKGROUND_MUSIC_SONGS.length === 0) return;
    const len = BACKGROUND_MUSIC_SONGS.length;
    if (direction === 'previous') {
      backgroundMusicCurrentIndex = (backgroundMusicCurrentIndex - 1 + len) % len;
    } else {
      backgroundMusicCurrentIndex = (backgroundMusicCurrentIndex + 1) % len;
    }
    backgroundMusicAudio.src = BACKGROUND_MUSIC_SONGS[backgroundMusicCurrentIndex];
    backgroundMusicAudio.play().catch(function() {});
    updateBackgroundMusicCounter();
  }

  function startBackgroundMusicBlink() {
    stopBackgroundMusicBlink();
    const el = document.getElementById('background-music-toggle');
    if (!el) return;
    el.classList.remove('bi-volume-down-fill');
    el.classList.add('background-music-blink', 'bi-volume-up-fill');
    backgroundMusicBlinkInterval = setInterval(function() {
      if (el) {
        el.classList.toggle('background-music-blink');
        if (el.classList.contains('bi-volume-up-fill')) {
          el.classList.remove('bi-volume-up-fill');
          el.classList.add('bi-volume-down-fill');
        } else {
          el.classList.remove('bi-volume-down-fill');
          el.classList.add('bi-volume-up-fill');
        }
      }
    }, 500);
  }

  function stopBackgroundMusicBlink() {
    if (backgroundMusicBlinkInterval) {
      clearInterval(backgroundMusicBlinkInterval);
      backgroundMusicBlinkInterval = null;
    }
    const el = document.getElementById('background-music-toggle');
    if (el) {
      el.classList.remove('background-music-blink', 'bi-volume-down-fill');
      el.classList.add('bi-volume-up-fill');
    }
  }

  function toggleBackgroundMusic() {
    const el = document.getElementById('background-music-toggle');
    if (!el) return;

    backgroundMusicOn = !backgroundMusicOn;

    if (backgroundMusicOn) {
      if (backgroundMusicAudio && backgroundMusicAudio.src) {
        backgroundMusicAudio.play().catch(function() {});
      } else {
        if (!backgroundMusicAudio) {
          backgroundMusicAudio = new Audio();
          backgroundMusicAudio.addEventListener('ended', playNextBackgroundSong);
        }
        backgroundMusicCurrentIndex = Math.floor(Math.random() * BACKGROUND_MUSIC_SONGS.length);
        backgroundMusicAudio.src = BACKGROUND_MUSIC_SONGS[backgroundMusicCurrentIndex];
        backgroundMusicAudio.load();
        backgroundMusicAudio.play().catch(function() {});
      }
      updateBackgroundMusicToggleUI(true);
      startBackgroundMusicBlink();
    } else {
      if (backgroundMusicAudio) {
        backgroundMusicAudio.pause();
      }
      stopBackgroundMusicBlink();
      updateBackgroundMusicToggleUI(false);
    }
  }

  window.toggleBackgroundMusic = toggleBackgroundMusic;
  window.backgroundMusicChange = backgroundMusicChange;

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  document.addEventListener('headerFooterLoaded', function() {
    navmenulinks = document.querySelectorAll('.navmenu a');
    navmenuScrollspy();
  });

})();