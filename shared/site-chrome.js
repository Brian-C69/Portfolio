(() => {
  const whatsappNumberE164NoPlus = '60123095550';
  const whatsappPrefillText = encodeURIComponent(
    'Hi Bernard — I found you via your portfolio. I need help with a website/platform:'
  );
  const faviconPath = '/assets/img/bernard_favicon.webp';
  const brandIconDarkPath = '/assets/img/bernard_favicon_dark.webp';
  const brandIconLightPath = '/assets/img/bernard_favicon_light.webp';
  const backgroundAudioSources = [
    { src: '/assets/audio/background-music.m4a', type: 'audio/mp4' },
    { src: '/assets/audio/background-music.mp3', type: 'audio/mpeg' },
    { src: '/assets/audio/background-music.ogg', type: 'audio/ogg' },
  ];
  const musicPreferenceKey = 'music';
  const musicTimeKey = 'musicTime';
  const defaultMusicVolume = 0.1;

  function getWhatsAppHref() {
    return `https://wa.me/${whatsappNumberE164NoPlus}?text=${whatsappPrefillText}`;
  }

  function getBasePrefix() {
    const pathParts = (window.location.pathname || '').split('/').filter(Boolean);
    const first = (pathParts[0] || '').toLowerCase();
    return first === 'portfolio' ? `/${pathParts[0]}` : '';
  }

  const base = getBasePrefix();

  function withBase(path) {
    if (!path || !path.startsWith('/')) return path;
    if (!base) return path;
    if (path.startsWith(base + '/')) return path;
    return base + path;
  }

  function normalizeRootAnchors() {
    if (!base) return;
    document.querySelectorAll('a[href^="/"]').forEach((anchor) => {
      const href = anchor.getAttribute('href');
      if (!href || href.startsWith('//')) return;
      anchor.setAttribute('href', withBase(href));
    });
  }

  function normalizeWhatsAppLinks() {
    const whatsappHref = getWhatsAppHref();
    const prefix = `https://wa.me/${whatsappNumberE164NoPlus}`;

    document.querySelectorAll('a[href]').forEach((anchor) => {
      const href = anchor.getAttribute('href');
      if (!href) return;
      if (!href.startsWith(prefix)) return;

      const trimmed = href.replace(/\/+$/, '');
      const hasText = trimmed.includes('?') && trimmed.toLowerCase().includes('text=');
      if (hasText) return;

      anchor.setAttribute('href', whatsappHref);
    });
  }

  function ensureFavicons() {
    const head = document.head;
    if (!head) return;

    const upsert = (id, rel, href, type) => {
      let link = document.getElementById(id);
      if (!link) {
        link = document.createElement('link');
        link.id = id;
        head.appendChild(link);
      }
      link.rel = rel;
      link.href = href;
      if (type) link.type = type;
    };

    const href = withBase(faviconPath);
    upsert('siteFavicon', 'icon', href, 'image/webp');
    upsert('siteAppleTouchIcon', 'apple-touch-icon', href, 'image/webp');
  }

  function getBrandIconSrc(theme) {
    return withBase(theme === 'light' ? brandIconLightPath : brandIconDarkPath);
  }

  function updateBrandIcon(theme) {
    const img = document.getElementById('siteBrandIcon');
    if (!img) return;
    const nextSrc = getBrandIconSrc(theme);
    if (img.getAttribute('src') === nextSrc) return;
    img.setAttribute('src', nextSrc);
  }

  function applyTheme(theme) {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    root.setAttribute('data-bs-theme', theme === 'dark' ? 'dark' : 'light');
    updateBrandIcon(theme);
    const icon = document.getElementById('themeIcon');
    if (icon) {
      icon.classList.remove('bi-moon-stars', 'bi-sun');
      icon.classList.add(theme === 'dark' ? 'bi-moon-stars' : 'bi-sun');
    }
  }

  function initThemeToggle() {
    const storedTheme = localStorage.getItem('theme');
    const prefersDark =
      window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = storedTheme || (prefersDark ? 'dark' : 'light');
    applyTheme(initialTheme);

    const toggle = document.getElementById('themeToggle');
    if (!toggle) return;
    toggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      try {
        localStorage.setItem('theme', next);
      } catch {
        // ignore
      }
    });
  }

  function setYear() {
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }

  function getActivePage() {
    const fromBody = document.body?.dataset?.page;
    if (fromBody) return fromBody;

    const pathParts = (window.location.pathname || '').split('/').filter(Boolean);
    const parts = base ? pathParts.slice(1) : pathParts;
    return parts[0] || 'home';
  }

  function headerMarkup(activePage) {
    const isActive = (page) => (activePage === page ? ' active' : '');
    const currentAttr = (page) => (activePage === page ? ' aria-current="page"' : '');
    const whatsappHref = getWhatsAppHref();
    const theme = document.documentElement.getAttribute('data-theme') || 'dark';
    const brandIconSrc = getBrandIconSrc(theme);

    if (activePage === 'home') {
      return `
        <nav class="navbar navbar-expand-lg navbar-dark fixed-top site-chrome-nav">
          <div class="container">
            <a class="navbar-brand fw-semibold d-flex align-items-center gap-2" href="${withBase('/')}">
              <img id="siteBrandIcon" class="brand-icon" src="${brandIconSrc}" alt="" width="22" height="22" decoding="async" loading="eager" /> Bernard Choong
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="nav">
              <ul class="navbar-nav ms-auto align-items-lg-center gap-lg-2">
                <li class="nav-item"><a class="nav-link" href="#services">About</a></li>
                <li class="nav-item"><a class="nav-link" href="#approach">Approach</a></li>
                <li class="nav-item"><a class="nav-link" href="#proof">Trust</a></li>
                <li class="nav-item"><a class="nav-link" href="#contact">Contact</a></li>
                <li class="nav-item ms-lg-2">
                  <a class="btn btn-sm btn-outline-light" href="${whatsappHref}" target="_blank" rel="noopener" aria-label="Message Bernard on WhatsApp">
                    <i class="bi bi-whatsapp"></i> WhatsApp
                  </a>
                </li>
                <li class="nav-item ms-lg-2">
                  <button id="musicToggle" class="btn btn-sm btn-outline-light" type="button" aria-label="Music off (click to turn on)">
                    <i id="musicIcon" class="bi bi-music-note"></i>
                  </button>
                </li>
                <li class="nav-item ms-lg-2">
                  <button id="themeToggle" class="btn btn-sm btn-outline-light" type="button" aria-label="Toggle theme">
                    <i id="themeIcon" class="bi bi-moon-stars"></i>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      `;
    }

    return `
      <nav class="navbar navbar-expand-lg navbar-dark fixed-top site-chrome-nav">
        <div class="container">
          <a class="navbar-brand fw-semibold d-flex align-items-center gap-2" href="${withBase('/')}">
            <img id="siteBrandIcon" class="brand-icon" src="${brandIconSrc}" alt="" width="22" height="22" decoding="async" loading="eager" /> Bernard Choong
          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="nav">
            <ul class="navbar-nav ms-auto align-items-lg-center gap-lg-2">
              <li class="nav-item"><a class="nav-link${isActive('services')}"${currentAttr('services')} href="${withBase('/services')}">Services</a></li>
              <li class="nav-item"><a class="nav-link${isActive('about')}"${currentAttr('about')} href="${withBase('/about')}">About</a></li>
              <li class="nav-item"><a class="nav-link${isActive('contact')}"${currentAttr('contact')} href="${withBase('/contact')}">Contact</a></li>
              <li class="nav-item ms-lg-2">
                <a class="btn btn-sm btn-outline-light" href="${whatsappHref}" target="_blank" rel="noopener" aria-label="Message Bernard on WhatsApp">
                  <i class="bi bi-whatsapp"></i> WhatsApp
                </a>
              </li>
              <li class="nav-item ms-lg-2">
                <button id="musicToggle" class="btn btn-sm btn-outline-light" type="button" aria-label="Music off (click to turn on)">
                  <i id="musicIcon" class="bi bi-music-note"></i>
                </button>
              </li>
              <li class="nav-item ms-lg-2">
                <button id="themeToggle" class="btn btn-sm btn-outline-light" type="button" aria-label="Toggle theme">
                  <i id="themeIcon" class="bi bi-moon-stars"></i>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    `;
  }

  function footerMarkup() {
    const whatsappHref = getWhatsAppHref();

    return `
      <footer class="py-4">
        <div class="container">
          <div class="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-2">
            <div class="text-muted-custom small">© <span id="year"></span> Bernard Choong.</div>
            <div class="d-flex gap-3 flex-wrap">
              <a class="link-soft small" href="${withBase('/')}">Home</a>
              <a class="link-soft small" href="${withBase('/#featured')}">Projects</a>
              <a class="link-soft small" href="${withBase('/services')}">Services</a>
              <a class="link-soft small" href="${withBase('/about')}">About</a>
              <a class="link-soft small" href="${withBase('/contact')}">Contact</a>
              <a class="link-soft small" href="${whatsappHref}" target="_blank" rel="noopener">WhatsApp</a>
            </div>
          </div>
        </div>
      </footer>
    `;
  }

  function renderSiteChrome() {
    const activePage = getActivePage();

    const headerHost = document.getElementById('siteHeader');
    if (headerHost) headerHost.innerHTML = headerMarkup(activePage);

    const footerHost = document.getElementById('siteFooter');
    if (footerHost) footerHost.innerHTML = footerMarkup();
  }

  function initHomeNavTransparency() {
    const activePage = getActivePage();
    if (activePage !== 'home') return;

    const nav = document.querySelector('.site-chrome-nav');
    if (!nav) return;

    function update() {
      nav.classList.toggle('nav-transparent', window.scrollY < 12);
    }

    update();
    window.addEventListener('scroll', update, { passive: true });
  }

  function initHomeHeroVideo() {
    const activePage = getActivePage();
    if (activePage !== 'home') return;

    const video = document.querySelector('video.hero-video');
    if (!video) return;

    try {
      video.muted = true;
      video.playsInline = true;
      video.setAttribute('playsinline', '');
      video.setAttribute('webkit-playsinline', '');
    } catch {
      // ignore
    }

    const attempt = async () => {
      try {
        await video.play();
      } catch {
        // ignore
      }
    };

    attempt();
    document.addEventListener('pointerdown', attempt, { once: true });
    document.addEventListener('keydown', attempt, { once: true });
  }

  function prefersReducedMotion() {
    return (
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  }

  function getMusicPreference() {
    try {
      return localStorage.getItem(musicPreferenceKey) || 'on';
    } catch {
      return 'on';
    }
  }

  function setMusicPreference(value) {
    try {
      localStorage.setItem(musicPreferenceKey, value);
    } catch {
      // ignore
    }
  }

  function updateMusicButton(isOn) {
    const icon = document.getElementById('musicIcon');
    const toggle = document.getElementById('musicToggle');
    if (!icon || !toggle) return;

    icon.classList.remove('bi-music-note', 'bi-music-note-beamed');
    icon.classList.add(isOn ? 'bi-music-note-beamed' : 'bi-music-note');
    toggle.setAttribute(
      'aria-label',
      isOn ? 'Music on (click to turn off)' : 'Music off (click to turn on)'
    );
  }

  function getOrCreateBackgroundAudio() {
    let audio = document.getElementById('siteMusic');
    if (audio) return audio;

    audio = document.createElement('audio');
    audio.id = 'siteMusic';
    audio.preload = 'auto';
    audio.loop = true;
    audio.volume = defaultMusicVolume;
    audio.style.display = 'none';
    audio.setAttribute('aria-hidden', 'true');

    for (const source of backgroundAudioSources) {
      const sourceEl = document.createElement('source');
      sourceEl.src = withBase(source.src);
      sourceEl.type = source.type;
      audio.appendChild(sourceEl);
    }

    const resumeTimeRaw =
      typeof sessionStorage !== 'undefined' ? sessionStorage.getItem(musicTimeKey) : null;
    const resumeTime = resumeTimeRaw ? Number.parseFloat(resumeTimeRaw) : 0;

    if (Number.isFinite(resumeTime) && resumeTime > 0) {
      audio.addEventListener(
        'loadedmetadata',
        () => {
          try {
            audio.currentTime = resumeTime;
          } catch {
            // ignore
          }
        },
        { once: true }
      );
    }

    const storeTime = () => {
      try {
        if (typeof sessionStorage === 'undefined') return;
        sessionStorage.setItem(musicTimeKey, String(audio.currentTime || 0));
      } catch {
        // ignore
      }
    };

    window.addEventListener('pagehide', storeTime);
    document.body.appendChild(audio);
    return audio;
  }

  async function tryPlayAudio(audio) {
    try {
      await audio.play();
      return true;
    } catch {
      return false;
    }
  }

  function initMusicToggle() {
    const toggle = document.getElementById('musicToggle');
    if (!toggle) return;

    const audio = getOrCreateBackgroundAudio();
    const desiredOn = getMusicPreference() === 'on';
    updateMusicButton(desiredOn);

    const attemptAutoPlay = async () => {
      const ok = await tryPlayAudio(audio);
      if (ok) return;

      const retry = async () => {
        await tryPlayAudio(audio);
      };

      document.addEventListener('pointerdown', retry, { once: true });
      document.addEventListener('keydown', retry, { once: true });
    };

    if (desiredOn) {
      attemptAutoPlay();
    } else {
      audio.pause();
    }

    toggle.addEventListener('click', async () => {
      const currentDesiredOn = getMusicPreference() === 'on';
      const nextDesiredOn = !currentDesiredOn;
      setMusicPreference(nextDesiredOn ? 'on' : 'off');
      updateMusicButton(nextDesiredOn);

      if (!nextDesiredOn) {
        audio.pause();
        return;
      }

      await tryPlayAudio(audio);
    });
  }

  function initTypewriters() {
    const elements = Array.from(document.querySelectorAll('[data-typewriter]'));
    if (!elements.length) return;

    for (const element of elements) {
      if (!element || element.dataset.animated === 'true') continue;

      let words;
      try {
        words = JSON.parse(element.dataset.typewriter || '[]');
      } catch {
        words = [];
      }

      if (!Array.isArray(words) || !words.length) continue;

      element.dataset.animated = 'true';

      if (prefersReducedMotion()) {
        element.textContent = String(words[0] ?? '');
        continue;
      }

      const typingMs = Number.parseInt(element.dataset.typewriterType || '70', 10);
      const eraseMs = Number.parseInt(element.dataset.typewriterErase || '40', 10);
      const holdMs = Number.parseInt(element.dataset.typewriterHold || '1100', 10);
      const loop = element.dataset.typewriterLoop !== 'false';

      let wordIndex = 0;
      let charIndex = 0;
      let isDeleting = false;

      function tick() {
        const currentWord = String(words[wordIndex] ?? '');

        if (!isDeleting) {
          charIndex = Math.min(currentWord.length, charIndex + 1);
          element.textContent = currentWord.slice(0, charIndex);

          if (charIndex >= currentWord.length) {
            isDeleting = true;
            window.setTimeout(tick, holdMs);
            return;
          }

          window.setTimeout(tick, typingMs);
          return;
        }

        charIndex = Math.max(0, charIndex - 1);
        element.textContent = currentWord.slice(0, charIndex);

        if (charIndex <= 0) {
          isDeleting = false;
          wordIndex += 1;

          if (!loop && wordIndex >= words.length) return;

          wordIndex = wordIndex % words.length;
          window.setTimeout(tick, 240);
          return;
        }

        window.setTimeout(tick, eraseMs);
      }

      element.textContent = '';
      tick();
    }
  }

  function initCarousels() {
    const wraps = Array.from(document.querySelectorAll('[data-carousel-wrap]'));
    if (!wraps.length) return;

    const isReducedMotion = prefersReducedMotion();
    const defaultTransition = isReducedMotion ? 'none' : 'transform .35s ease';

    for (const wrap of wraps) {
      const viewport =
        wrap.querySelector('[data-carousel-viewport]') ||
        wrap.querySelector('.carousel-viewport') ||
        wrap;

      const track = wrap.querySelector('.carousel-track[data-carousel]');
      if (!track) continue;
      if (track.dataset.carouselInit === 'true') continue;

      const prevBtn = wrap.querySelector('[data-carousel-prev]');
      const nextBtn = wrap.querySelector('[data-carousel-next]');
      const dotsHost = wrap.querySelector('[data-carousel-dots]');

      const autoplayEnabled = wrap.dataset.carouselAutoplay === 'true';
      const autoplayIntervalMs = Number.parseInt(wrap.dataset.carouselInterval || '4200', 10);
      const realSlides = Array.from(track.children).filter((el) =>
        el.classList.contains('carousel-slide')
      );

      if (realSlides.length <= 1) {
        if (dotsHost) dotsHost.innerHTML = '';
        continue;
      }

      track.dataset.carouselInit = 'true';

      const clonesCount = Math.min(3, realSlides.length);

      const prependFragment = document.createDocumentFragment();
      for (const slide of realSlides.slice(-clonesCount)) {
        const clone = slide.cloneNode(true);
        clone.classList.add('is-clone');
        clone.setAttribute('aria-hidden', 'true');
        prependFragment.appendChild(clone);
      }
      track.insertBefore(prependFragment, realSlides[0]);

      const appendFragment = document.createDocumentFragment();
      for (const slide of realSlides.slice(0, clonesCount)) {
        const clone = slide.cloneNode(true);
        clone.classList.add('is-clone');
        clone.setAttribute('aria-hidden', 'true');
        appendFragment.appendChild(clone);
      }
      track.appendChild(appendFragment);

      let index = clonesCount;
      let stepPx = 0;
      let isAnimating = false;
      let isDragging = false;
      let startX = 0;
      let startY = 0;
      let dragX = 0;
      let rafId = 0;
      let autoplayTimer = 0;
      let resumeTimer = 0;

      const setTransition = (enabled) => {
        track.style.transition = enabled ? defaultTransition : 'none';
      };

      const getGapPx = () => {
        const gapRaw = getComputedStyle(track).gap || '0px';
        const gap = Number.parseFloat(gapRaw) || 0;
        return gap;
      };

      const computeStep = () => {
        const children = Array.from(track.children);
        const slide = children[index] || children[1] || children[0];
        const width = slide ? slide.getBoundingClientRect().width : 0;
        const gap = getGapPx();
        stepPx = (width || Math.max(240, viewport.clientWidth * 0.9)) + gap;
      };

      const applyTransform = (offsetPx = 0) => {
        const x = -(index * stepPx) + offsetPx;
        track.style.transform = `translate3d(${x}px, 0, 0)`;
      };

      const getRealIndex = () => {
        const len = realSlides.length;
        return ((index - clonesCount) % len + len) % len;
      };

      const renderDots = () => {
        if (!dotsHost) return;
        dotsHost.innerHTML = '';
        for (let dotIndex = 0; dotIndex < realSlides.length; dotIndex += 1) {
          const button = document.createElement('button');
          button.type = 'button';
          button.className = 'carousel-dot';
          button.setAttribute('aria-label', `Go to project ${dotIndex + 1}`);
          button.addEventListener('click', () => {
            if (!isReducedMotion && isAnimating) return;
            const nextIndex = clonesCount + dotIndex;
            if (nextIndex === index) return;

            isAnimating = true;
            index = nextIndex;
            setTransition(true);
            applyTransform(0);
            updateDots();
            if (isReducedMotion) {
              isAnimating = false;
            }
          });
          dotsHost.appendChild(button);
        }
      };

      const updateDots = () => {
        if (!dotsHost) return;
        const active = getRealIndex();
        const dots = Array.from(dotsHost.querySelectorAll('.carousel-dot'));
        dots.forEach((dot, i) => {
          dot.classList.toggle('is-active', i === active);
        });
      };

      const jumpToIndex = (nextIndex) => {
        index = nextIndex;
        setTransition(false);
        applyTransform(0);
        // force reflow so next transition works
        void track.offsetHeight;
        setTransition(true);
      };

      const next = () => {
        if (!isReducedMotion && isAnimating) return;
        isAnimating = true;
        index += 1;
        setTransition(true);
        applyTransform(0);
        updateDots();
        if (isReducedMotion) {
          const len = realSlides.length;
          if (index < clonesCount) jumpToIndex(index + len);
          if (index >= clonesCount + len) jumpToIndex(index - len);
          isAnimating = false;
        }
      };

      const prev = () => {
        if (!isReducedMotion && isAnimating) return;
        isAnimating = true;
        index -= 1;
        setTransition(true);
        applyTransform(0);
        updateDots();
        if (isReducedMotion) {
          const len = realSlides.length;
          if (index < clonesCount) jumpToIndex(index + len);
          if (index >= clonesCount + len) jumpToIndex(index - len);
          isAnimating = false;
        }
      };

      if (prevBtn) prevBtn.addEventListener('click', prev);
      if (nextBtn) nextBtn.addEventListener('click', next);

      const stopAutoplay = () => {
        if (resumeTimer) {
          window.clearTimeout(resumeTimer);
          resumeTimer = 0;
        }
        if (!autoplayTimer) return;
        window.clearInterval(autoplayTimer);
        autoplayTimer = 0;
      };

      const startAutoplay = () => {
        if (!autoplayEnabled) return;
        if (autoplayTimer) return;

        const interval = Number.isFinite(autoplayIntervalMs)
          ? Math.max(2200, autoplayIntervalMs)
          : 4200;

        autoplayTimer = window.setInterval(() => {
          if (document.hidden) return;
          if (isDragging || isAnimating) return;
          next();
        }, interval);
      };

      const scheduleResume = () => {
        if (!autoplayEnabled) return;
        if (resumeTimer) window.clearTimeout(resumeTimer);
        resumeTimer = window.setTimeout(() => startAutoplay(), 1200);
      };

      track.addEventListener('transitionend', () => {
        isAnimating = false;

        const len = realSlides.length;
        if (len <= 1) return;

        if (index < clonesCount) {
          jumpToIndex(index + len);
        } else if (index >= clonesCount + len) {
          jumpToIndex(index - len);
        }
        updateDots();
      });

      const onPointerDown = (event) => {
        if (event.button != null && event.button !== 0) return;
        if (!isReducedMotion && isAnimating) return;
        if (event.target?.closest?.('a, button, input, textarea, select, label')) return;

        stopAutoplay();
        isDragging = true;
        startX = event.clientX || 0;
        startY = event.clientY || 0;
        dragX = 0;
        setTransition(false);
        viewport.setPointerCapture?.(event.pointerId);
      };

      const onPointerMove = (event) => {
        if (!isDragging) return;
        const dxRaw = (event.clientX || 0) - startX;
        const dy = (event.clientY || 0) - startY;

        if (Math.abs(dy) > Math.abs(dxRaw) * 1.3) return;

        const clamp = Math.max(60, stepPx * 1.1);
        dragX = Math.max(-clamp, Math.min(clamp, dxRaw));
        if (rafId) return;
        rafId = window.requestAnimationFrame(() => {
          rafId = 0;
          applyTransform(dragX);
        });
      };

      const onPointerUp = () => {
        if (!isDragging) return;
        isDragging = false;
        setTransition(true);
        if (rafId) {
          window.cancelAnimationFrame(rafId);
          rafId = 0;
        }

        const threshold = Math.max(40, stepPx * 0.18);
        if (dragX <= -threshold) {
          next();
          return;
        }
        if (dragX >= threshold) {
          prev();
          return;
        }

        applyTransform(0);
        scheduleResume();
      };

      viewport.addEventListener('pointerdown', onPointerDown);
      viewport.addEventListener('pointermove', onPointerMove);
      viewport.addEventListener('pointerup', onPointerUp);
      viewport.addEventListener('pointercancel', onPointerUp);
      viewport.addEventListener('pointerleave', onPointerUp);
      viewport.addEventListener('mouseenter', stopAutoplay);
      viewport.addEventListener('mouseleave', scheduleResume);
      viewport.addEventListener('focusin', stopAutoplay);
      viewport.addEventListener('focusout', scheduleResume);

      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          stopAutoplay();
        } else {
          scheduleResume();
        }
      });

      if (!viewport.hasAttribute('tabindex')) viewport.setAttribute('tabindex', '0');
      viewport.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowRight') {
          stopAutoplay();
          next();
          scheduleResume();
          return;
        }
        if (event.key === 'ArrowLeft') {
          stopAutoplay();
          prev();
          scheduleResume();
        }
      });

      let resizeTimer;
      const onResize = () => {
        window.clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(() => {
          computeStep();
          setTransition(false);
          applyTransform(0);
          void track.offsetHeight;
          setTransition(true);
        }, 120);
      };

      window.addEventListener('resize', onResize, { passive: true });

      renderDots();
      computeStep();
      setTransition(false);
      applyTransform(0);
      void track.offsetHeight;
      setTransition(true);
      updateDots();
      startAutoplay();
    }
  }

  function animateCountUp(element) {
    if (!element || element.dataset.animated === 'true') return;

    const target = Number.parseInt(element.dataset.count || '0', 10);
    const from = Number.parseInt(element.dataset.from || '0', 10);
    const suffix = element.dataset.suffix || '';

    if (!Number.isFinite(target)) return;

    element.dataset.animated = 'true';

    if (prefersReducedMotion()) {
      element.textContent = `${target}${suffix}`;
      return;
    }

    const durationMs = Number.parseInt(element.dataset.duration || '900', 10);
    const start = performance.now();

    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    function step(now) {
      const elapsed = now - start;
      const t = Math.min(1, Math.max(0, elapsed / durationMs));
      const eased = easeOutCubic(t);
      const current = Math.round(from + (target - from) * eased);
      element.textContent = `${current}${suffix}`;
      if (t < 1) requestAnimationFrame(step);
    }

    element.textContent = `${from}${suffix}`;
    requestAnimationFrame(step);
  }

  function initCountUps() {
    const elements = Array.from(document.querySelectorAll('.count-up[data-count]'));
    if (!elements.length) return;

    if (!('IntersectionObserver' in window)) {
      elements.forEach((el) => animateCountUp(el));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          animateCountUp(entry.target);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.35 }
    );

    elements.forEach((el) => observer.observe(el));
  }

  function injectChromeStyles() {
    if (document.getElementById('siteChromeStyles')) return;
    const styleEl = document.createElement('style');
    styleEl.id = 'siteChromeStyles';
    styleEl.textContent = `
      :root,
      :root[data-bs-theme="dark"],
      :root[data-bs-theme="light"]{
        --bs-primary: #0a84ff;
        --bs-primary-rgb: 10, 132, 255;
        --bs-link-color: #0a84ff;
        --bs-link-hover-color: #0a84ff;
        --shadow-soft: 0 10px 28px rgba(0,0,0,0.20);
      }
      :root[data-theme="light"]{
        --shadow-soft: 0 10px 28px rgba(15,23,42,0.10);
      }
      html, body{
        background: var(--bg-900) !important;
        background-image: none !important;
      }
      html, body{
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
      html::-webkit-scrollbar, body::-webkit-scrollbar{
        width: 0;
        height: 0;
      }
      .site-chrome-nav{
        transition: background-color .18s ease, border-color .18s ease, backdrop-filter .18s ease;
      }
      .site-chrome-nav.nav-transparent{
        background: transparent !important;
        border-color: transparent !important;
        backdrop-filter: none !important;
      }
      .site-chrome-nav .navbar-brand{ color: var(--text-100); text-decoration: none; }
      .site-chrome-nav .navbar-brand:hover{ color: var(--text-100); opacity: .92; }
      .brand-icon{
        width: 22px;
        height: 22px;
        border-radius: 6px;
        display: inline-block;
      }
      .site-chrome-nav .nav-link.active{ color: var(--text-100); }
      #musicToggle.btn, #themeToggle.btn{
        border-radius: 999px;
        padding-inline: .75rem;
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }
      @media (max-width: 991.98px){
        .site-chrome-nav .navbar-nav{
          width: 100%;
          text-align: center;
          align-items: stretch !important;
          gap: .25rem;
          padding-top: .75rem;
          padding-bottom: .25rem;
        }
        .site-chrome-nav .navbar-nav .nav-item{
          width: 100%;
          margin-left: 0 !important;
        }
        .site-chrome-nav .navbar-nav .nav-link{
          display: flex;
          justify-content: center;
          padding: .75rem 0;
        }
        .site-chrome-nav .navbar-nav .btn{
          width: 100%;
          justify-content: center;
          padding: .7rem 1rem;
        }
        .site-chrome-nav #musicToggle.btn,
        .site-chrome-nav #themeToggle.btn{
          border-radius: .9rem;
        }
      }
      .meta-btn{
        display: inline-flex;
        align-items: center;
        gap: .4rem;
        padding: .4rem .7rem;
        border-radius: .75rem;
        border: 1px solid var(--border-soft);
        background: rgba(255,255,255,0.02);
        color: var(--text-200);
        font-size: .82rem;
        line-height: 1.1;
        user-select: none;
        white-space: nowrap;
      }
      html[data-theme="light"] .meta-btn{
        background: rgba(255,255,255,0.65);
        color: #0f172a;
      }
      @media (hover: hover) and (pointer: fine){
        .meta-btn:hover{
          border-color: rgba(var(--bs-primary-rgb), 0.28);
        }
      }
      .carousel-wrap{
        position: relative;
      }
      .carousel-viewport{
        overflow: hidden;
        touch-action: pan-y;
      }
      .carousel-btn{
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 44px;
        height: 44px;
        border-radius: 999px;
        display: grid;
        place-items: center;
        border: 1px solid var(--border-soft);
        background: rgba(2, 6, 23, 0.55);
        color: var(--text-100);
        z-index: 2;
        backdrop-filter: blur(10px);
        transition: transform .12s ease, opacity .12s ease;
      }
      .carousel-btn:hover{ transform: translateY(-50%) scale(1.03); }
      .carousel-btn:active{ transform: translateY(-50%) scale(0.98); }
      html[data-theme="light"] .carousel-btn{
        background: rgba(248, 250, 252, 0.75);
        color: #0f172a;
      }
      [data-carousel-prev]{ left: 10px; }
      [data-carousel-next]{ right: 10px; }
      @media (max-width: 575px){
        .carousel-btn{ display: none; }
      }
      .carousel-track{
        --carousel-gap: 1rem;
        display: flex;
        gap: var(--carousel-gap);
        will-change: transform;
        transform: translate3d(0,0,0);
        padding: .25rem 0;
      }
      .carousel-viewport:focus{
        outline: 2px solid rgba(var(--bs-primary-rgb), 0.35);
        outline-offset: 6px;
        border-radius: 1rem;
      }
      .carousel-slide{
        flex: 0 0 86%;
      }
      @media (min-width: 768px){
        .carousel-slide{ flex-basis: calc((100% - var(--carousel-gap)) / 2); }
      }
      @media (min-width: 992px){
        .carousel-slide{ flex-basis: calc((100% - (var(--carousel-gap) * 2)) / 3); }
      }
      .carousel-dots{
        margin-top: 1rem;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: .5rem;
      }
      .carousel-dot{
        width: 7px;
        height: 7px;
        border-radius: 999px;
        border: 0;
        padding: 0;
        cursor: pointer;
        background: rgba(148,163,184,0.45);
        transition: transform .12s ease, background-color .12s ease, width .12s ease;
      }
      .carousel-dot:focus{
        outline: 2px solid rgba(var(--bs-primary-rgb), 0.45);
        outline-offset: 4px;
      }
      .carousel-dot.is-active{
        background: rgba(var(--bs-primary-rgb), 0.95);
        width: 20px;
      }
      html[data-theme="light"] .carousel-dot{
        background: rgba(71,85,105,0.32);
      }
      html[data-theme="light"] .carousel-dot.is-active{
        background: rgba(var(--bs-primary-rgb), 0.95);
      }
      @media (max-width: 575px){
        .carousel-slide{ flex-basis: 92%; }
      }
      html[data-theme="light"] .site-chrome-nav .btn.btn-outline-light{
        border-color: rgba(148,163,184,0.5);
        color: #0f172a;
        background: rgba(255,255,255,0.8);
      }
      .btn-outline-light:hover,
      .btn-outline-light:focus{
        color: var(--text-300) !important;
      }
      .hero-panel{
        background: rgba(255,255,255,0.02) !important;
      }
      .card-soft{
        background: rgba(255,255,255,0.02) !important;
      }
      .hover-lift:hover{
        border-color: rgba(var(--bs-primary-rgb), 0.28) !important;
      }
      .icon-bubble{
        background: rgba(var(--bs-primary-rgb), 0.12) !important;
        border-color: rgba(var(--bs-primary-rgb), 0.22) !important;
        color: var(--bs-primary) !important;
      }
      html[data-theme="light"] .icon-bubble{
        background: rgba(var(--bs-primary-rgb), 0.10) !important;
        border-color: rgba(var(--bs-primary-rgb), 0.18) !important;
        color: var(--bs-primary) !important;
      }
      .soft-divider{
        background: rgba(255,255,255,0.10) !important;
      }
      .media-frame{
        border: 1px solid var(--border-soft);
        border-radius: 1rem;
        overflow: hidden;
        background: rgba(255,255,255,0.02);
      }
      .media-frame img{
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }
      .media-top{
        margin: 0 !important;
        border: 0 !important;
        border-bottom: 1px solid var(--border-soft) !important;
        border-top-left-radius: var(--radius-xl);
        border-top-right-radius: var(--radius-xl);
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
      }
      .card.card-soft{
        display: flex;
        flex-direction: column;
      }
      .card.card-soft > .card-body{
        flex: 1 1 auto;
      }
      .card.card-soft > .card-footer{
        margin-top: auto;
      }
      .wa-float{
        position: fixed;
        right: 18px;
        bottom: 18px;
        z-index: 1080;
        width: 52px;
        height: 52px;
        border-radius: 999px;
        display: grid;
        place-items: center;
        text-decoration: none;
        border: 1px solid var(--border-soft);
        box-shadow: 0 16px 40px rgba(0,0,0,0.35);
        background: rgba(34, 197, 94, 0.16);
        color: var(--text-100);
        backdrop-filter: blur(10px);
      }
      .wa-float:hover{ transform: translateY(-2px); }
      .wa-float i{ font-size: 1.25rem; }
      html[data-theme="light"] .wa-float{
        box-shadow: 0 16px 40px rgba(15,23,42,0.18);
        background: rgba(34, 197, 94, 0.14);
        color: #0f172a;
      }
    `;
    document.head.appendChild(styleEl);
  }

  function renderFloatingWhatsApp() {
    if (document.getElementById('waFloat')) return;
    const anchor = document.createElement('a');
    anchor.id = 'waFloat';
    anchor.className = 'wa-float';
    anchor.href = getWhatsAppHref();
    anchor.target = '_blank';
    anchor.rel = 'noopener';
    anchor.setAttribute('aria-label', 'Message Bernard on WhatsApp');
    anchor.innerHTML = '<i class="bi bi-whatsapp"></i>';
    document.body.appendChild(anchor);
  }

  function init() {
    injectChromeStyles();
    ensureFavicons();
    renderSiteChrome();
    normalizeRootAnchors();
    normalizeWhatsAppLinks();
    initHomeNavTransparency();
    initHomeHeroVideo();
    initMusicToggle();
    initThemeToggle();
    setYear();
    renderFloatingWhatsApp();
    initTypewriters();
    initCarousels();
    initCountUps();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
