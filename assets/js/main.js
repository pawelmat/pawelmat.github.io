/**
* Based on a template from BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  function initializeMobileNav() {
    const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

    function mobileNavToogle() {
      document.querySelector('body').classList.toggle('mobile-nav-active');
      mobileNavToggleBtn.classList.toggle('bi-list');
      mobileNavToggleBtn.classList.toggle('bi-x');
    }
    if (mobileNavToggleBtn) {
      mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
    }

    /**
     * Hide mobile nav on same-page/hash links
     */
    document.querySelectorAll('#navmenu a').forEach(navmenu => {
      navmenu.addEventListener('click', () => {
        if (document.querySelector('.mobile-nav-active')) {
          mobileNavToogle();
        }
      });

    });

    /**
     * Toggle mobile nav dropdowns
     */
    document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
      navmenu.addEventListener('click', function(e) {
        e.preventDefault();
        this.parentNode.classList.toggle('active');
        this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
        e.stopImmediatePropagation();
      });
    });
  }

  // Initialize mobile nav when header/footer are loaded
  document.addEventListener('headerFooterLoaded', initializeMobileNav);
  // Also initialize on page load for pages without dynamic header loading
  window.addEventListener('load', initializeMobileNav);

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
    'assets/music/background/maintune2.mp3', 
    'assets/music/background/maintune3.mp3',
    'assets/music/background/maintune4.mp3'
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
  }

  function updateBackgroundMusicToggleUI(isOn) {
    const el = document.getElementById('background-music-toggle');
    if (!el) return;
    el.title = isOn ? 'Turn background music off' : 'Turn background music on';
    el.classList.remove('bi-volume-mute', 'bi-volume-up-fill');
    el.classList.add(isOn ? 'bi-volume-up-fill' : 'bi-volume-mute');
    if (isOn) {
      el.classList.remove('background-music-off');
    } else {
      el.classList.add('background-music-off');
    }
  }

  function startBackgroundMusicBlink() {
    stopBackgroundMusicBlink();
    const el = document.getElementById('background-music-toggle');
    if (!el) return;
    backgroundMusicBlinkInterval = setInterval(function() {
      if (!el) return;
      el.classList.toggle('background-music-blink');
    }, 500);
  }

  function stopBackgroundMusicBlink() {
    if (backgroundMusicBlinkInterval) {
      clearInterval(backgroundMusicBlinkInterval);
      backgroundMusicBlinkInterval = null;
    }
    const el = document.getElementById('background-music-toggle');
    if (el) {
      el.classList.remove('background-music-blink');
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

})();