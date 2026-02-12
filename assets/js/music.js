/**
 * Music page (music.html): play/pause tracks (MP3 or MOD via BassoonTracker),
 * progress bar, blink playing icon. Loaded only on music.html.
 */
(function() {
  "use strict";

  let currentMusicAudio = null;
  let currentMusicRowEl = null;
  let currentMusicType = null;
  let musicBlinkInterval = null;
  let modPlayingCheckInterval = null;
  let musicPaused = false;
  let modPausedPosition = null;
  let modPausedSongPosition = null;
  let modProgressInterval = null;

  function removeMusicProgressBar() {
    if (currentMusicRowEl) {
      var td = currentMusicRowEl.parentNode;
      if (td) {
        var bar = td.querySelector('.music-progress-container');
        if (bar) bar.remove();
      }
    }
  }

  function createMusicProgressBar() {
    if (!currentMusicRowEl || !currentMusicType) return;
    removeMusicProgressBar();
    var td = currentMusicRowEl.parentNode;
    if (!td) return;
    var container = document.createElement('span');
    container.className = 'music-progress-container';
    var range = document.createElement('input');
    range.type = 'range';
    range.min = 0;
    range.max = 100;
    range.value = 0;
    container.appendChild(range);
    td.appendChild(container);

    if (currentMusicType === 'mp3' && currentMusicAudio) {
      function setMp3ProgressPct() {
        var pct = range.max > 0 ? (parseFloat(range.value) / parseFloat(range.max)) * 100 : 0;
        range.style.setProperty('--music-progress-pct', pct + '%');
      }
      function updateMp3Progress() {
        if (!currentMusicAudio || !td.contains(range)) return;
        var d = currentMusicAudio.duration;
        if (isFinite(d) && d > 0) {
          range.max = 100;
          range.value = (currentMusicAudio.currentTime / d) * 100;
          setMp3ProgressPct();
        }
      }
      currentMusicAudio.addEventListener('timeupdate', updateMp3Progress);
      currentMusicAudio.addEventListener('loadedmetadata', updateMp3Progress);
      range.addEventListener('input', function() {
        if (!currentMusicAudio) return;
        var d = currentMusicAudio.duration;
        if (isFinite(d) && d > 0) {
          currentMusicAudio.currentTime = (parseFloat(range.value) / 100) * d;
        }
        setMp3ProgressPct();
      });
      updateMp3Progress();
    } else if (currentMusicType === 'mod' && typeof window.BassoonTracker !== 'undefined') {
      var song = window.BassoonTracker.getSong();
      if (!song || !song.length) return;
      var totalSteps = song.length * 64;
      range.min = 0;
      range.max = Math.max(0, totalSteps - 1);
      range.value = 0;

      function setModProgressPct() {
        var max = parseFloat(range.max);
        var pct = max > 0 ? (parseFloat(range.value) / max) * 100 : 0;
        range.style.setProperty('--music-progress-pct', pct + '%');
      }
      function updateModProgress() {
        if (typeof window.BassoonTracker === 'undefined' || !td.contains(range)) return;
        var songPos = window.BassoonTracker.getCrSongPos();
        var ptPos = 0;
        if (typeof window.BassoonTracker.getCrPtPos === 'function') {
          ptPos = window.BassoonTracker.getCrPtPos();
        }
        range.value = songPos * 64 + ptPos;
        setModProgressPct();
      }
      function startModProgressPolling() {
        if (modProgressInterval) clearInterval(modProgressInterval);
        modProgressInterval = setInterval(updateModProgress, 200);
        updateModProgress();
      }
      startModProgressPolling();

      range.addEventListener('input', function() {
        if (typeof window.BassoonTracker === 'undefined') return;
        setModProgressPct();
        var val = parseInt(range.value, 10);
        var songPos = Math.floor(val / 64);
        var ptPos = val % 64;
        window.BassoonTracker.setCurrentSongPosition(songPos, false);
        if (typeof window.BassoonTracker.setCrPtPos === 'function') {
          window.BassoonTracker.setCrPtPos(ptPos);
        }
        if (window.BassoonTracker.isPlaying()) {
          window.BassoonTracker.stop();
          window.BassoonTracker.playSong();
        }
      });
    }
  }

  function stopMusicBlink() {
    if (musicBlinkInterval) {
      clearInterval(musicBlinkInterval);
      musicBlinkInterval = null;
    }
    if (modProgressInterval) {
      clearInterval(modProgressInterval);
      modProgressInterval = null;
    }
    removeMusicProgressBar();
    if (currentMusicRowEl) {
      currentMusicRowEl.classList.remove('music-playing', 'music-playing-blink', 'bi-pause-btn');
      currentMusicRowEl.classList.add('bi-play-btn');
      currentMusicRowEl = null;
    }
  }

  function startMusicBlink() {
    if (!currentMusicRowEl) return;
    currentMusicRowEl.classList.add('music-playing', 'music-playing-blink');
    musicBlinkInterval = setInterval(function() {
      if (currentMusicRowEl) {
        currentMusicRowEl.classList.toggle('music-playing-blink');
      }
    }, 500);
  }

  function pauseCurrentMusic() {
    if (currentMusicType === 'mp3' && currentMusicAudio) {
      currentMusicAudio.pause();
    }
    if (currentMusicType === 'mod' && typeof window.BassoonTracker !== 'undefined' && window.BassoonTracker.isPlaying()) {
      modPausedPosition = window.BassoonTracker.getCrPtPos();
      modPausedSongPosition = window.BassoonTracker.getCrSongPos();
      window.BassoonTracker.stop();
    }
    if (modPlayingCheckInterval) {
      clearInterval(modPlayingCheckInterval);
      modPlayingCheckInterval = null;
    }
    if (modProgressInterval) {
      clearInterval(modProgressInterval);
      modProgressInterval = null;
    }
    if (musicBlinkInterval) {
      clearInterval(musicBlinkInterval);
      musicBlinkInterval = null;
    }
    if (currentMusicRowEl) {
      currentMusicRowEl.classList.remove('music-playing-blink', 'bi-play-btn');
      currentMusicRowEl.classList.add('music-playing', 'bi-pause-btn');
    }
    musicPaused = true;
  }

  function resumeCurrentMusic() {
    if (currentMusicRowEl) {
      currentMusicRowEl.classList.remove('bi-pause-btn');
      currentMusicRowEl.classList.add('bi-play-btn');
    }
    if (currentMusicType === 'mp3' && currentMusicAudio) {
      currentMusicAudio.play().catch(function() {});
      startMusicBlink();
      musicPaused = false;
      return;
    }
    if (currentMusicType === 'mod' && typeof window.BassoonTracker !== 'undefined') {
      if (modPausedPosition === null || modPausedSongPosition === null) return;
      window.BassoonTracker.setCurrentSongPosition(modPausedSongPosition, false);
      if (typeof window.BassoonTracker.setCrPtPos === 'function') {
        window.BassoonTracker.setCrPtPos(modPausedPosition);
      }
      window.BassoonTracker.playSong();
      modPausedPosition = null;
      modPausedSongPosition = null;
      startMusicBlink();
      var tdResume = currentMusicRowEl ? currentMusicRowEl.parentNode : null;
      var rangeResume = tdResume ? tdResume.querySelector('.music-progress-container input[type=range]') : null;
      if (rangeResume) {
        if (modProgressInterval) clearInterval(modProgressInterval);
        modProgressInterval = setInterval(function() {
          if (typeof window.BassoonTracker === 'undefined' || !rangeResume.parentNode) return;
          var songPos = window.BassoonTracker.getCrSongPos();
          var ptPos = typeof window.BassoonTracker.getCrPtPos === 'function' ? window.BassoonTracker.getCrPtPos() : 0;
          rangeResume.value = songPos * 64 + ptPos;
          var max = parseFloat(rangeResume.max);
          var pct = max > 0 ? (parseFloat(rangeResume.value) / max) * 100 : 0;
          rangeResume.style.setProperty('--music-progress-pct', pct + '%');
        }, 200);
      }
      modPlayingCheckInterval = setInterval(function() {
        if (typeof window.BassoonTracker !== 'undefined' && !window.BassoonTracker.isPlaying()) {
          clearInterval(modPlayingCheckInterval);
          modPlayingCheckInterval = null;
          stopCurrentMusic();
        }
      }, 500);
      musicPaused = false;
    }
  }

  function stopCurrentMusic() {
    musicPaused = false;
    modPausedPosition = null;
    modPausedSongPosition = null;
    if (currentMusicType === 'mp3' && currentMusicAudio) {
      currentMusicAudio.pause();
      currentMusicAudio.currentTime = 0;
      currentMusicAudio = null;
    }
    if (currentMusicType === 'mod' && typeof window.BassoonTracker !== 'undefined') {
      if (window.BassoonTracker.isPlaying()) {
        window.BassoonTracker.stop();
      }
    }
    if (modPlayingCheckInterval) {
      clearInterval(modPlayingCheckInterval);
      modPlayingCheckInterval = null;
    }
    currentMusicType = null;
    stopMusicBlink();
  }

  function toggleMusic(clickedEl) {
    if (!clickedEl || !clickedEl.getAttribute) return;
    var path = clickedEl.getAttribute('path') || '';
    var id = clickedEl.getAttribute('id') || clickedEl.id || '';
    var type = (clickedEl.getAttribute('type') || '').toLowerCase();
    if (!id || !type) return;

    path = path.replace(/\\/g, '/');
    if (path.length && path.charAt(path.length - 1) !== '/') {
      path += '/';
    }
    var trackUrl = path + id;

    var isSameRow = currentMusicRowEl === clickedEl;
    if (isSameRow && (currentMusicRowEl || currentMusicType)) {
      if (musicPaused) {
        resumeCurrentMusic();
      } else {
        pauseCurrentMusic();
      }
      return;
    }
    if (currentMusicRowEl || currentMusicType) {
      stopCurrentMusic();
    }

    if (type === 'mp3') {
      currentMusicAudio = new Audio();
      currentMusicAudio.src = trackUrl;
      currentMusicType = 'mp3';
      currentMusicRowEl = clickedEl;
      currentMusicAudio.addEventListener('ended', function() {
        stopCurrentMusic();
      });
      currentMusicAudio.play().catch(function() {});
      startMusicBlink();
      createMusicProgressBar();
    } else if (type === 'mod') {
      if (typeof window.BassoonTracker === 'undefined') {
        return;
      }
      currentMusicType = 'mod';
      currentMusicRowEl = clickedEl;
      window.BassoonTracker.load(trackUrl).then(function() {
        window.BassoonTracker.play();
        startMusicBlink();
        createMusicProgressBar();
        modPlayingCheckInterval = setInterval(function() {
          if (typeof window.BassoonTracker !== 'undefined' && !window.BassoonTracker.isPlaying()) {
            clearInterval(modPlayingCheckInterval);
            modPlayingCheckInterval = null;
            stopCurrentMusic();
          }
        }, 500);
      }).catch(function() {});
    }
  }

  window.toggleMusic = toggleMusic;

})();
