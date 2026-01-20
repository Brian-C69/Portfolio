(() => {
  const whatsappNumberE164NoPlus = '60123095550';
  const faviconPath = '/assets/img/bernard_favicon.webp';
  const brandIconDarkPath = '/assets/img/bernard_favicon_dark.webp';
  const brandIconLightPath = '/assets/img/bernard_favicon_light.webp';
  const bootstrapIconsCssHref =
    'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css';
  const brandIconDark22Path = '/assets/img/bernard_favicon_dark-22px.webp';
  const brandIconDark44Path = '/assets/img/bernard_favicon_dark-44px.webp';
  const brandIconLight22Path = '/assets/img/bernard_favicon_light-22px.webp';
  const brandIconLight44Path = '/assets/img/bernard_favicon_light-44px.webp';
  const backgroundAudioSources = [
    { src: '/assets/audio/background-music.m4a', type: 'audio/mp4' },
    { src: '/assets/audio/background-music.mp3', type: 'audio/mpeg' },
    { src: '/assets/audio/background-music.ogg', type: 'audio/ogg' },
  ];
  const musicPreferenceKey = 'music';
  const musicTimeKey = 'musicTime';
  const defaultMusicVolume = 0.1;
  const languagePreferenceKey = 'lang';
  const supportedLanguages = ['en', 'ms', 'zh'];
  let currentLanguage = 'en';

  const translations = {
    en: {
      nav: { about: 'About', approach: 'Approach', trust: 'Trust', contact: 'Contact', whatsapp: 'WhatsApp', music: 'Music' },
      footer: { home: 'Home', projects: 'Projects', services: 'Services', about: 'About', contact: 'Contact', whatsapp: 'WhatsApp' },
      lang: { en: 'English', ms: 'Malay', zh: 'Chinese', short: { en: 'EN', ms: 'BM', zh: '中文' } },
      whatsappPrefill:
        'Hi Bernard — I found you via your portfolio. I need help with a website/platform:',
      home: {
        hero: { location: 'Based in Kuala Lumpur, Malaysia.', projects: 'My Projects', contact: 'Get in Touch' },
        about: {
          title: 'About me',
          lead:
            'Most projects don’t struggle because the team can’t build — they struggle in the gaps: integration, deployment, handover, and stability.',
          line2: 'That’s where I work best.',
          body:
            'Over the years, I’ve shipped across websites, backend modules, integrations, and the decisions that keep systems reliable after launch. The range isn’t random — it’s one connected workflow.',
          close:
            'If you need one owner who can understand the workflow, build what matters, and ship with a clean handover, I can help.',
          serviceMenu: 'Service menu',
        },
        projects: {
          title: 'Projects',
          lead: 'Selected builds and systems across software, infrastructure, and web.',
          visit: 'Visit site →',
          categories: { ecommerce: 'eCommerce', company: 'Company Website', wellness: 'Wellness' },
        },
        approach: {
          titleTop: 'My Approach',
          titleBottom: 'integration over hype',
          lead:
            'I’m not a “list-of-skills” freelancer. I’m a systems operator who builds solutions that survive real-world constraints: budget, people, maintenance, and business growth.',
          pills: { business: 'Business-first design', delivery: 'Documented delivery', maintainable: 'Maintainable structure' },
          steps: {
            assess: { title: 'Assess', desc: 'Understand workflow, risks, and real constraints.' },
            build: { title: 'Build', desc: 'Ship clean modules with clear roles and boundaries.' },
            integrate: { title: 'Integrate', desc: 'Connect software + infra + digital execution logically.' },
            optimize: { title: 'Optimize', desc: 'Performance, stability, and long-term sustainability.' },
          },
        },
        trust: {
          title: 'Trust',
          lead: 'Trust signals that reduce doubt fast.',
          stats: {
            years: 'Years building & shipping',
            industries: 'Industries served',
            shipped: 'Projects shipped',
            websites: 'Websites & landing pages',
          },
        },
        faq: {
          title: 'FAQ',
          lead: 'Quick answers about how I work and what I deliver.',
          q1: 'What do you actually build?',
          a1:
            'Websites and platforms, backend modules, integrations, and automation—work that connects the pieces so the whole system runs reliably after launch.',
          q2: 'Do you handle deployment and handover?',
          a2: 'Yes—deployment, DNS/SSL, environments, and a clean handover with notes or documentation so your team isn’t stuck later.',
          q3: 'Can you work with my current site/platform?',
          a3: 'Yes. I can improve what you already have, integrate new tools, or rebuild only what’s necessary—based on the constraints and the fastest path to stable results.',
          q4: 'What’s your process like?',
          a4: 'Align on the workflow → define scope and deliverables → ship in clear milestones → integrate and stabilize → handover and optional maintenance.',
          q5: 'Do you offer ongoing support?',
          a5: 'Yes—small retainers for updates, fixes, and improvements. If you prefer, I can also do “on-demand” support for specific tasks.',
          q6: 'How do we start?',
          a6: 'Message me on WhatsApp with your goal, timeline, and any links. I’ll ask a few questions, then propose the fastest clean path forward.',
        },
        contact: {
          title: 'Let’s build something that actually lasts.',
          lead: 'If you’re unsure which specialty fits your needs, start here — I’ll route you to the right solution lane.',
          whatsappMe: 'WhatsApp Me',
          email: 'Email',
          serviceMenu: 'View Service Menu',
          quickLinks: 'Quick Links',
          links: {
            software: 'Software Development Profile',
            networking: 'Networking Profile',
            cctv: 'CCTV Profile',
            algo: 'Algorithmic Trading Profile',
            hardware: 'Hardware/Servers Profile',
            marketing: 'Digital Growth Profile',
            copywriting: 'Company Profiles & Copywriting',
          },
        },
      },
      notFound: {
        title: '404 — Page not found',
        lead:
          'The page you’re looking for doesn’t exist (or was moved). Head back home, or message me and I’ll point you in the right direction.',
        home: 'Back to Home',
        whatsappMe: 'WhatsApp Me',
        try: 'Or try:',
      },
    },
    ms: {
      nav: { about: 'Tentang', approach: 'Pendekatan', trust: 'Kepercayaan', contact: 'Hubungi', whatsapp: 'WhatsApp', music: 'Muzik' },
      footer: { home: 'Laman Utama', projects: 'Projek', services: 'Perkhidmatan', about: 'Tentang', contact: 'Hubungi', whatsapp: 'WhatsApp' },
      lang: { en: 'Inggeris', ms: 'Melayu', zh: 'Cina', short: { en: 'EN', ms: 'BM', zh: '中文' } },
      whatsappPrefill:
        'Hi Bernard — saya jumpa anda melalui portfolio. Saya perlukan bantuan untuk laman web/platform:',
      home: {
        hero: { location: 'Berpangkalan di Kuala Lumpur, Malaysia.', projects: 'Projek Saya', contact: 'Hubungi Saya' },
        about: {
          title: 'Tentang saya',
          lead:
            'Kebanyakan projek tidak gagal kerana pasukan tidak boleh membina — ia gagal pada jurang: integrasi, deployment, serahan, dan kestabilan.',
          line2: 'Di situlah saya paling kuat.',
          body:
            'Selama bertahun-tahun, saya telah menghantar kerja merangkumi laman web, modul backend, integrasi, dan keputusan yang memastikan sistem stabil selepas dilancarkan. Skop ini bukan rawak — ia satu aliran kerja yang saling berkait.',
          close:
            'Jika anda perlukan seorang pemilik yang boleh faham aliran kerja, bina yang penting, dan serah dengan kemas, saya boleh bantu.',
          serviceMenu: 'Menu perkhidmatan',
        },
        projects: {
          title: 'Projek',
          lead: 'Binaan terpilih merentas perisian, infrastruktur, dan web.',
          visit: 'Lihat laman →',
          categories: { ecommerce: 'eDagang', company: 'Laman Syarikat', wellness: 'Kesejahteraan' },
        },
        approach: {
          titleTop: 'Pendekatan Saya',
          titleBottom: 'integrasi melebihi hype',
          lead:
            'Saya bukan freelancer “senarai kemahiran”. Saya operator sistem yang membina penyelesaian yang tahan kekangan dunia sebenar: bajet, orang, penyelenggaraan, dan pertumbuhan bisnes.',
          pills: { business: 'Reka bentuk berfokus bisnes', delivery: 'Serahan berdokumen', maintainable: 'Struktur mudah selenggara' },
          steps: {
            assess: { title: 'Nilai', desc: 'Faham aliran kerja, risiko, dan kekangan sebenar.' },
            build: { title: 'Bina', desc: 'Hantar modul kemas dengan peranan dan sempadan jelas.' },
            integrate: { title: 'Integrasi', desc: 'Sambungkan perisian + infra + pelaksanaan digital dengan logik.' },
            optimize: { title: 'Optimum', desc: 'Prestasi, kestabilan, dan kelestarian jangka panjang.' },
          },
        },
        trust: {
          title: 'Kepercayaan',
          lead: 'Isyarat yang cepat mengurangkan keraguan.',
          stats: { years: 'Tahun membina & menghantar', industries: 'Industri', shipped: 'Projek dihantar', websites: 'Laman web & landing page' },
        },
        faq: {
          title: 'Soalan Lazim',
          lead: 'Jawapan ringkas tentang cara saya bekerja dan apa yang saya hasilkan.',
          q1: 'Apa sebenarnya yang anda bina?',
          a1:
            'Laman web dan platform, modul backend, integrasi, dan automasi—kerja yang menghubungkan semuanya supaya sistem berjalan stabil selepas pelancaran.',
          q2: 'Adakah anda urus deployment dan serahan?',
          a2: 'Ya—deployment, DNS/SSL, persekitaran, dan serahan kemas dengan nota atau dokumentasi supaya pasukan anda tidak tersekat.',
          q3: 'Boleh kerja dengan laman/platform sedia ada?',
          a3: 'Ya. Saya boleh baiki yang ada, integrasi alat baharu, atau bina semula hanya yang perlu—berdasarkan kekangan dan laluan paling cepat ke hasil stabil.',
          q4: 'Macam mana proses anda?',
          a4: 'Selaraskan aliran kerja → tetapkan skop & deliverable → hantar ikut milestone → integrasi & stabilkan → serahan & sokongan opsyen.',
          q5: 'Ada sokongan berterusan?',
          a5: 'Ya—retainer kecil untuk kemas kini, pembaikan, dan penambahbaikan. Jika anda mahu, saya juga boleh buat sokongan “on-demand”.',
          q6: 'Macam mana nak mula?',
          a6: 'WhatsApp saya dengan matlamat, timeline, dan pautan. Saya akan tanya beberapa soalan, kemudian cadangkan laluan paling kemas dan pantas.',
        },
        contact: {
          title: 'Jom bina sesuatu yang benar-benar tahan lama.',
          lead: 'Jika anda belum pasti specialty yang sesuai, mula di sini — saya akan bawa anda ke laluan yang betul.',
          whatsappMe: 'WhatsApp Saya',
          email: 'Emel',
          serviceMenu: 'Lihat Menu Perkhidmatan',
          quickLinks: 'Pautan Pantas',
          links: {
            software: 'Profil Pembangunan Perisian',
            networking: 'Profil Rangkaian',
            cctv: 'Profil CCTV',
            algo: 'Profil Dagangan Algoritma',
            hardware: 'Profil Perkakasan/Pelayan',
            marketing: 'Profil Pertumbuhan Digital',
            copywriting: 'Profil Syarikat & Copywriting',
          },
        },
      },
      notFound: {
        title: '404 — Halaman tidak ditemui',
        lead:
          'Halaman yang anda cari tidak wujud (atau telah dipindahkan). Kembali ke laman utama, atau WhatsApp saya dan saya akan bantu.',
        home: 'Kembali ke Laman Utama',
        whatsappMe: 'WhatsApp Saya',
        try: 'Atau cuba:',
      },
    },
    zh: {
      nav: { about: '关于', approach: '方法', trust: '可信度', contact: '联系', whatsapp: 'WhatsApp', music: '音乐' },
      footer: { home: '首页', projects: '项目', services: '服务', about: '关于', contact: '联系', whatsapp: 'WhatsApp' },
      lang: { en: '英语', ms: '马来语', zh: '中文', short: { en: 'EN', ms: 'BM', zh: '中文' } },
      whatsappPrefill: '你好 Bernard — 我通过你的作品集找到你。我需要网站/平台方面的帮助：',
      home: {
        hero: { location: '常驻马来西亚吉隆坡。', projects: '我的项目', contact: '联系我' },
        about: {
          title: '关于我',
          lead: '多数项目出问题，并不是团队不会做——而是卡在“缝隙”：集成、部署、交接与稳定性。',
          line2: '这正是我最擅长的部分。',
          body:
            '这些年来，我交付过网站、后端模块、各类集成，以及让系统上线后依然可靠的关键决策。我的能力范围并不杂乱——它是一条连贯的工作流。',
          close: '如果你需要一个负责人能理解流程、做最关键的部分，并且干净交接，我可以帮你。',
          serviceMenu: '服务菜单',
        },
        projects: { title: '项目', lead: '覆盖软件、基础设施与网站的精选交付。', visit: '访问网站 →', categories: { ecommerce: '电商', company: '公司官网', wellness: '健康' } },
        approach: {
          titleTop: '我的方法',
          titleBottom: '集成胜过噱头',
          lead:
            '我不是“技能清单式”的自由职业者。我更像系统操盘手：在预算、人员、维护与业务增长等现实约束下，把方案做成、跑稳、交接干净。',
          pills: { business: '以业务为先', delivery: '交付可追溯', maintainable: '结构可维护' },
          steps: {
            assess: { title: '评估', desc: '理解流程、风险与真实约束。' },
            build: { title: '构建', desc: '以清晰边界交付模块化成果。' },
            integrate: { title: '集成', desc: '把软件、基础设施与执行链路串起来。' },
            optimize: { title: '优化', desc: '性能、稳定性与长期可持续。' },
          },
        },
        trust: {
          title: '可信度',
          lead: '快速降低疑虑的信号。',
          stats: { years: '年交付经验', industries: '服务行业', shipped: '已交付项目', websites: '网站与落地页' },
        },
        faq: {
          title: '常见问题',
          lead: '关于合作方式与交付内容的快速回答。',
          q1: '你具体交付什么？',
          a1: '网站与平台、后端模块、系统集成与自动化——把关键环节连起来，让系统上线后依然稳定运行。',
          q2: '你会负责部署和交接吗？',
          a2: '会——包括部署、DNS/SSL、环境配置，以及清晰交接（备注/文档），避免团队后期卡住。',
          q3: '可以在我现有的网站/系统上继续做吗？',
          a3: '可以。我可以优化现有系统、集成新工具，或只重做必要部分——以最稳妥且最快的路径达成结果。',
          q4: '你的流程是什么？',
          a4: '对齐流程 → 明确范围与交付物 → 分阶段交付 → 集成与稳定 → 交接与可选维护。',
          q5: '提供长期支持吗？',
          a5: '提供——小额维护/优化包，或按需支持特定任务。',
          q6: '如何开始？',
          a6: 'WhatsApp 我你的目标、时间线和链接。我会问几个关键问题，然后给出最干净可行的推进方案。',
        },
        contact: {
          title: '一起做一个真正“上线后还能跑稳”的系统。',
          lead: '如果你不确定需要哪条服务路线，从这里开始——我会把你带到正确的解决方案。',
          whatsappMe: 'WhatsApp 联系',
          email: '邮箱',
          serviceMenu: '查看服务菜单',
          quickLinks: '快速入口',
          links: {
            software: '软件开发简介',
            networking: '网络方案简介',
            cctv: 'CCTV 简介',
            algo: '量化/算法交易简介',
            hardware: '硬件/服务器简介',
            marketing: '增长与营销简介',
            copywriting: '公司简介与文案',
          },
        },
      },
      notFound: {
        title: '404 — 页面不存在',
        lead: '你访问的页面不存在（或已移动）。返回首页，或 WhatsApp 我，我会指引你到正确位置。',
        home: '返回首页',
        whatsappMe: 'WhatsApp 联系',
        try: '或者试试：',
      },
    },
  };

  function getWhatsAppHref() {
    const dict = translations[currentLanguage] || translations.en;
    const prefill = encodeURIComponent(dict.whatsappPrefill || translations.en.whatsappPrefill);
    return `https://wa.me/${whatsappNumberE164NoPlus}?text=${prefill}`;
  }

  function normalizeLanguage(value) {
    const raw = String(value || '').toLowerCase();
    if (raw.startsWith('ms')) return 'ms';
    if (raw.startsWith('zh')) return 'zh';
    if (raw.startsWith('en')) return 'en';
    if (supportedLanguages.includes(raw)) return raw;
    return 'en';
  }

  function detectLanguageFromNavigator() {
    try {
      const preferred = navigator.languages?.[0] || navigator.language || 'en';
      return normalizeLanguage(preferred);
    } catch {
      return 'en';
    }
  }

  function getLanguagePreference() {
    try {
      return localStorage.getItem(languagePreferenceKey);
    } catch {
      return null;
    }
  }

  function setLanguagePreference(lang) {
    try {
      localStorage.setItem(languagePreferenceKey, lang);
    } catch {
      // ignore
    }
  }

  function getTranslation(key) {
    const dict = translations[currentLanguage] || translations.en;
    const parts = String(key || '').split('.');
    let node = dict;
    for (const part of parts) {
      if (!node || typeof node !== 'object') return null;
      node = node[part];
    }
    return typeof node === 'string' ? node : null;
  }

  function applyTranslations() {
    const elements = Array.from(document.querySelectorAll('[data-i18n]'));
    for (const element of elements) {
      const key = element.getAttribute('data-i18n');
      if (!key) continue;
      const value = getTranslation(key);
      if (typeof value !== 'string') continue;
      element.textContent = value;
    }

    const htmlElements = Array.from(document.querySelectorAll('[data-i18n-html]'));
    for (const element of htmlElements) {
      const key = element.getAttribute('data-i18n-html');
      if (!key) continue;
      const value = getTranslation(key);
      if (typeof value !== 'string') continue;
      element.innerHTML = value;
    }
  }

  function updateWhatsAppLinks() {
    const prefix = `https://wa.me/${whatsappNumberE164NoPlus}`;
    const next = getWhatsAppHref();
    document.querySelectorAll(`a[href^="${prefix}"]`).forEach((anchor) => {
      anchor.setAttribute('href', next);
    });
  }

  function updateWhatsAppFloatingButton() {
    const anchor = document.getElementById('waFloat');
    if (!anchor) return;
    anchor.href = getWhatsAppHref();
  }

  function updateLanguageUI() {
    const short =
      translations[currentLanguage]?.lang?.short?.[currentLanguage] || currentLanguage.toUpperCase();
    const label = document.getElementById('langLabel');
    if (label) label.textContent = short;

    const items = Array.from(document.querySelectorAll('[data-lang]'));
    for (const item of items) {
      const lang = normalizeLanguage(item.getAttribute('data-lang'));
      item.classList.toggle('active', lang === currentLanguage);
      item.setAttribute('aria-current', lang === currentLanguage ? 'true' : 'false');
    }
  }

  function setLanguage(lang, { persist } = { persist: true }) {
    const next = normalizeLanguage(lang);
    currentLanguage = next;
    document.documentElement.lang = next === 'zh' ? 'zh-Hans' : next === 'ms' ? 'ms' : 'en';
    if (persist) setLanguagePreference(next);

    updateLanguageUI();
    applyTranslations();
    updateWhatsAppLinks();
    normalizeWhatsAppLinks();
    updateWhatsAppFloatingButton();
  }

  function initLanguageState() {
    const stored = getLanguagePreference();
    const initial = normalizeLanguage(stored || detectLanguageFromNavigator());
    currentLanguage = initial;
    document.documentElement.lang = initial === 'zh' ? 'zh-Hans' : initial === 'ms' ? 'ms' : 'en';
  }

  function initLanguageSwitcher() {
    updateLanguageUI();
    applyTranslations();
    updateWhatsAppLinks();
    normalizeWhatsAppLinks();
    updateWhatsAppFloatingButton();

    document.addEventListener('click', (event) => {
      const target = event.target?.closest?.('[data-lang]');
      if (!target) return;
      event.preventDefault();
      setLanguage(target.getAttribute('data-lang'), { persist: true });
    });
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

    upsert('siteManifest', 'manifest', withBase('/manifest.webmanifest'));

    const upsertMeta = (id, name, content) => {
      let meta = document.getElementById(id);
      if (!meta) {
        meta = document.createElement('meta');
        meta.id = id;
        head.appendChild(meta);
      }
      meta.setAttribute('name', name);
      meta.setAttribute('content', content);
    };

    upsertMeta('siteThemeColor', 'theme-color', '#0b1220');
    upsertMeta('siteAppleCapable', 'apple-mobile-web-app-capable', 'yes');
    upsertMeta('siteAppleStatus', 'apple-mobile-web-app-status-bar-style', 'black-translucent');
  }

  function getBrandIconSrc(theme) {
    return withBase(theme === 'light' ? brandIconLight22Path : brandIconDark22Path);
  }

  function getBrandIconSrcSet(theme) {
    const oneX = withBase(theme === 'light' ? brandIconLight22Path : brandIconDark22Path);
    const twoX = withBase(theme === 'light' ? brandIconLight44Path : brandIconDark44Path);
    return `${oneX} 1x, ${twoX} 2x`;
  }

  function updateBrandIcon(theme) {
    const img = document.getElementById('siteBrandIcon');
    if (!img) return;
    const nextSrc = getBrandIconSrc(theme);
    const nextSrcSet = getBrandIconSrcSet(theme);
    if (img.getAttribute('src') === nextSrc && img.getAttribute('srcset') === nextSrcSet) return;
    img.setAttribute('src', nextSrc);
    img.setAttribute('srcset', nextSrcSet);
  }

  function updateThemeColor(theme) {
    const meta = document.getElementById('siteThemeColor');
    if (!meta) return;
    meta.setAttribute('content', theme === 'light' ? '#f8fafc' : '#0b1220');
  }

  function deferBootstrapIconsCss() {
    const load = () => {
      if (document.getElementById('bootstrapIconsCss')) return;
      const link = document.createElement('link');
      link.id = 'bootstrapIconsCss';
      link.rel = 'stylesheet';
      link.href = bootstrapIconsCssHref;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    };

    if (document.readyState === 'complete') {
      window.setTimeout(load, 1200);
      return;
    }

    window.addEventListener(
      'load',
      () => {
        window.setTimeout(load, 1200);
      },
      { once: true }
    );
  }

  function applyTheme(theme) {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    root.setAttribute('data-bs-theme', theme === 'dark' ? 'dark' : 'light');
    updateBrandIcon(theme);
    updateThemeColor(theme);
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
    const navbarVariantClass = theme === 'light' ? 'navbar-light' : 'navbar-dark';
    const brandIconSrc = getBrandIconSrc(theme);
    const brandIconSrcSet = getBrandIconSrcSet(theme);
    const actionsMarkup = `
      <div class="nav-actions d-flex align-items-center gap-2 ms-auto order-lg-2 pe-2 ps-lg-3">
        <div class="dropdown">
          <button class="btn btn-sm btn-outline-light dropdown-toggle" type="button" id="langToggle" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="bi bi-globe"></i> <span id="langLabel">EN</span>
          </button>
          <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="langToggle">
            <li><button class="dropdown-item" type="button" data-lang="en"><span data-i18n="lang.en">English</span></button></li>
            <li><button class="dropdown-item" type="button" data-lang="ms"><span data-i18n="lang.ms">Malay</span></button></li>
            <li><button class="dropdown-item" type="button" data-lang="zh"><span data-i18n="lang.zh">Chinese</span></button></li>
          </ul>
        </div>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav" aria-controls="nav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>
    `;

    if (activePage === 'home') {
      return `
        <nav class="navbar navbar-expand-lg ${navbarVariantClass} fixed-top site-chrome-nav">
          <div class="container">
            <a class="navbar-brand fw-semibold d-flex align-items-center gap-2" href="${withBase('/')}">
              <img id="siteBrandIcon" class="brand-icon" src="${brandIconSrc}" srcset="${brandIconSrcSet}" alt="" width="22" height="22" decoding="async" loading="eager" /> Bernard Choong
            </a>
            ${actionsMarkup}
            <div class="collapse navbar-collapse order-lg-1" id="nav">
              <ul class="navbar-nav ms-auto align-items-lg-center gap-lg-2">
                <li class="nav-item"><a class="nav-link" href="#services"><span data-i18n="nav.about">About</span></a></li>
                <li class="nav-item"><a class="nav-link" href="#approach"><span data-i18n="nav.approach">Approach</span></a></li>
                <li class="nav-item"><a class="nav-link" href="#proof"><span data-i18n="nav.trust">Trust</span></a></li>
                <li class="nav-item"><a class="nav-link" href="#contact"><span data-i18n="nav.contact">Contact</span></a></li>
                <li class="nav-item ms-lg-2">
                  <a class="btn btn-sm btn-outline-light" href="${whatsappHref}" target="_blank" rel="noopener" aria-label="Message Bernard on WhatsApp">
                    <i class="bi bi-whatsapp"></i> <span data-i18n="nav.whatsapp">WhatsApp</span>
                  </a>
                </li>
                <li class="nav-item ms-lg-2">
                  <button id="themeToggle" class="btn btn-sm btn-outline-light" type="button" aria-label="Toggle theme">
                    <i id="themeIcon" class="bi bi-moon-stars"></i>
                  </button>
                </li>
                <li class="nav-item ms-lg-2">
                  <button id="musicToggle" class="btn btn-sm btn-outline-light" type="button" aria-label="Music off (click to turn on)">
                    <i id="musicIcon" class="bi bi-music-note"></i> <span class="d-lg-none ms-2" data-i18n="nav.music">Music</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      `;
    }

    return `
      <nav class="navbar navbar-expand-lg ${navbarVariantClass} fixed-top site-chrome-nav">
        <div class="container">
          <a class="navbar-brand fw-semibold d-flex align-items-center gap-2" href="${withBase('/')}">
            <img id="siteBrandIcon" class="brand-icon" src="${brandIconSrc}" srcset="${brandIconSrcSet}" alt="" width="22" height="22" decoding="async" loading="eager" /> Bernard Choong
          </a>
          ${actionsMarkup}
          <div class="collapse navbar-collapse order-lg-1" id="nav">
            <ul class="navbar-nav ms-auto align-items-lg-center gap-lg-2">
              <li class="nav-item"><a class="nav-link${isActive('services')}"${currentAttr('services')} href="${withBase('/services')}"><span data-i18n="footer.services">Services</span></a></li>
              <li class="nav-item"><a class="nav-link${isActive('about')}"${currentAttr('about')} href="${withBase('/about')}"><span data-i18n="nav.about">About</span></a></li>
              <li class="nav-item"><a class="nav-link${isActive('contact')}"${currentAttr('contact')} href="${withBase('/contact')}"><span data-i18n="nav.contact">Contact</span></a></li>
              <li class="nav-item ms-lg-2">
                <a class="btn btn-sm btn-outline-light" href="${whatsappHref}" target="_blank" rel="noopener" aria-label="Message Bernard on WhatsApp">
                  <i class="bi bi-whatsapp"></i> <span data-i18n="nav.whatsapp">WhatsApp</span>
                </a>
              </li>
              <li class="nav-item ms-lg-2">
                <button id="themeToggle" class="btn btn-sm btn-outline-light" type="button" aria-label="Toggle theme">
                  <i id="themeIcon" class="bi bi-moon-stars"></i>
                </button>
              </li>
              <li class="nav-item ms-lg-2">
                <button id="musicToggle" class="btn btn-sm btn-outline-light" type="button" aria-label="Music off (click to turn on)">
                  <i id="musicIcon" class="bi bi-music-note"></i> <span class="d-lg-none ms-2" data-i18n="nav.music">Music</span>
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
          <div class="d-flex flex-column flex-md-row align-items-center justify-content-between gap-2">
            <div class="text-muted-custom small text-center text-md-start">© <span id="year"></span> Bernard Choong.</div>
            <div class="d-flex gap-3 flex-wrap justify-content-center justify-content-md-end text-center">
              <a class="link-soft small" href="${withBase('/')}"><span data-i18n="footer.home">Home</span></a>
              <a class="link-soft small" href="${withBase('/#featured')}"><span data-i18n="footer.projects">Projects</span></a>
              <a class="link-soft small" href="${withBase('/services')}"><span data-i18n="footer.services">Services</span></a>
              <a class="link-soft small" href="${withBase('/about')}"><span data-i18n="footer.about">About</span></a>
              <a class="link-soft small" href="${withBase('/contact')}"><span data-i18n="footer.contact">Contact</span></a>
              <a class="link-soft small" href="${whatsappHref}" target="_blank" rel="noopener"><span data-i18n="footer.whatsapp">WhatsApp</span></a>
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

  function initBootstrapLite() {
    const initDropdowns = () => {
      const toggles = Array.from(document.querySelectorAll('[data-bs-toggle="dropdown"]'));
      if (!toggles.length) return;

      const closeAll = (exceptToggle) => {
        for (const toggle of toggles) {
          if (exceptToggle && toggle === exceptToggle) continue;
          const dropdown = toggle.closest('.dropdown');
          const menu = dropdown?.querySelector('.dropdown-menu');
          toggle.classList.remove('show');
          toggle.setAttribute('aria-expanded', 'false');
          if (dropdown) dropdown.classList.remove('show');
          if (menu) menu.classList.remove('show');
        }
      };

      for (const toggle of toggles) {
        const dropdown = toggle.closest('.dropdown');
        const menu = dropdown?.querySelector('.dropdown-menu');
        if (!dropdown || !menu) continue;

        toggle.addEventListener('click', (event) => {
          event.preventDefault();
          const isOpen = menu.classList.contains('show');
          closeAll(toggle);
          if (isOpen) return;
          dropdown.classList.add('show');
          toggle.classList.add('show');
          toggle.setAttribute('aria-expanded', 'true');
          menu.classList.add('show');
        });

        menu.addEventListener('click', () => {
          closeAll();
        });
      }

      document.addEventListener('click', (event) => {
        const target = event.target;
        if (!(target instanceof Node)) return;
        const insideDropdown = Boolean(target.closest?.('.dropdown'));
        if (insideDropdown) return;
        closeAll();
      });

      document.addEventListener('keydown', (event) => {
        if (event.key !== 'Escape') return;
        closeAll();
      });
    };

    const initCollapses = () => {
      const toggles = Array.from(document.querySelectorAll('[data-bs-toggle="collapse"]'));
      if (!toggles.length) return;

      const resolveTarget = (toggle) => {
        const selector = toggle.getAttribute('data-bs-target') || toggle.getAttribute('href');
        if (!selector) return null;
        if (!selector.startsWith('#')) return null;
        return document.querySelector(selector);
      };

      const findTogglesFor = (collapseEl) => {
        const id = collapseEl.getAttribute('id');
        if (!id) return [];
        return toggles.filter((toggle) => {
          const selector = toggle.getAttribute('data-bs-target') || toggle.getAttribute('href') || '';
          return selector === `#${id}`;
        });
      };

      const setToggleState = (toggle, isExpanded) => {
        toggle.setAttribute('aria-expanded', String(isExpanded));
        toggle.classList.toggle('collapsed', !isExpanded);
      };

      const animateShow = (el) =>
        new Promise((resolve) => {
          el.classList.remove('collapse');
          el.classList.remove('show');
          el.classList.add('collapsing');
          el.style.height = '0px';
          void el.offsetHeight;
          el.style.height = `${el.scrollHeight}px`;

          const done = () => {
            el.classList.remove('collapsing');
            el.classList.add('collapse');
            el.classList.add('show');
            el.style.height = '';
            el.removeEventListener('transitionend', done);
            resolve();
          };

          el.addEventListener('transitionend', done);
          window.setTimeout(done, 450);
        });

      const animateHide = (el) =>
        new Promise((resolve) => {
          el.style.height = `${el.getBoundingClientRect().height}px`;
          void el.offsetHeight;
          el.classList.add('collapsing');
          el.classList.remove('collapse');
          el.classList.remove('show');
          el.style.height = '0px';

          const done = () => {
            el.classList.remove('collapsing');
            el.classList.add('collapse');
            el.style.height = '';
            el.removeEventListener('transitionend', done);
            resolve();
          };

          el.addEventListener('transitionend', done);
          window.setTimeout(done, 450);
        });

      const setOpen = async (collapseEl, open) => {
        const isOpen = collapseEl.classList.contains('show');
        if (open === isOpen) return;

        const togglesForEl = findTogglesFor(collapseEl);
        for (const toggle of togglesForEl) setToggleState(toggle, open);

        if (open) {
          await animateShow(collapseEl);
          return;
        }

        await animateHide(collapseEl);
      };

      for (const toggle of toggles) {
        toggle.addEventListener('click', async (event) => {
          event.preventDefault();
          const target = resolveTarget(toggle);
          if (!target) return;

          const parentSelector = target.getAttribute('data-bs-parent');
          if (parentSelector) {
            const parent = document.querySelector(parentSelector);
            if (parent) {
              const others = Array.from(parent.querySelectorAll('.collapse.show')).filter(
                (el) => el !== target
              );
              for (const other of others) await setOpen(other, false);
            }
          }

          await setOpen(target, !target.classList.contains('show'));
        });
      }
    };

    initDropdowns();
    initCollapses();
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
      video.setAttribute('preload', 'none');
    } catch {
      // ignore
    }

    const getViewportWidth = () =>
      Math.max(document.documentElement?.clientWidth || 0, window.innerWidth || 0);

    const getConnection = () =>
      navigator.connection || navigator.mozConnection || navigator.webkitConnection;

    const shouldDisableMedia = () => {
      const connection = getConnection();
      const effectiveType = connection?.effectiveType;
      const saveData = Boolean(connection?.saveData);
      return (
        saveData ||
        effectiveType === 'slow-2g' ||
        effectiveType === '2g' ||
        effectiveType === '3g'
      );
    };

    const pickPoster = (viewportWidth) => {
      if (viewportWidth < 768) return '/assets/img/Hero-fallback-640w.webp';
      if (viewportWidth < 1200) return '/assets/img/Hero-fallback-960w.webp';
      if (viewportWidth < 1800) return '/assets/img/Hero-fallback-1280w.webp';
      return '/assets/img/Hero-fallback-1920w.webp';
    };

    const pickVideoSrc = (viewportWidth) => {
      // Serve lighter source on mobile while still allowing playback
      if (viewportWidth < 768) return '/assets/video/tech-background-720p.mp4';
      if (viewportWidth < 1400) return '/assets/video/tech-background-1080p.mp4';
      return '/assets/video/tech-background-2k.mp4';
    };

    const viewportWidth = getViewportWidth();
    const posterPath = pickPoster(viewportWidth);
    if (posterPath) video.poster = withBase(posterPath);

    if (shouldDisableMedia()) return;

    const src = pickVideoSrc(viewportWidth);
    if (!src) return;

    const loadAndPlay = async () => {
      if (!document.body.contains(video)) return;
      if (video.getAttribute('data-hero-loaded') === '1') return;
      video.setAttribute('data-hero-loaded', '1');

      try {
        video.src = withBase(src);
        video.load();
      } catch {
        // ignore
      }

      try {
        await video.play();
      } catch {
        // ignore
      }
    };

    if (typeof requestIdleCallback === 'function') {
      requestIdleCallback(() => loadAndPlay(), { timeout: 2500 });
    } else {
      window.setTimeout(() => loadAndPlay(), 900);
    }
  }

  function prefersReducedMotion() {
    return (
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  }

  function getMusicPreference() {
    try {
      return localStorage.getItem(musicPreferenceKey) || 'off';
    } catch {
      return 'off';
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
    audio.preload = 'none';
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

    let audio = null;
    const ensureAudio = () => {
      audio = audio || getOrCreateBackgroundAudio();
      return audio;
    };
    const desiredOn = getMusicPreference() === 'on';
    updateMusicButton(desiredOn);

    const tryStartFromGesture = async () => {
      if (getMusicPreference() !== 'on') return;
      await tryPlayAudio(ensureAudio());
    };

    if (desiredOn) {
      document.addEventListener('pointerdown', tryStartFromGesture, { once: true });
      document.addEventListener('keydown', tryStartFromGesture, { once: true });
    }

    toggle.addEventListener('click', async () => {
      const currentDesiredOn = getMusicPreference() === 'on';
      const nextDesiredOn = !currentDesiredOn;
      setMusicPreference(nextDesiredOn ? 'on' : 'off');
      updateMusicButton(nextDesiredOn);

      if (!nextDesiredOn) {
        if (audio) audio.pause();
        return;
      }

      const ok = await tryPlayAudio(ensureAudio());
      if (ok) return;

      const retry = async () => {
        if (!audio) return;
        await tryPlayAudio(audio);
      };

      document.addEventListener('pointerdown', retry, { once: true });
      document.addEventListener('keydown', retry, { once: true });
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

      // Clone more than one full set on both ends so the carousel never reveals
      // "empty" space at the edges (especially on wide viewports showing 2–3 cards).
      const len = realSlides.length;
      const clonesCount = len * 2;

      const prependFragment = document.createDocumentFragment();
      for (let i = 0; i < clonesCount; i += 1) {
        const sourceIndex = ((len - clonesCount + i) % len + len) % len;
        const clone = realSlides[sourceIndex].cloneNode(true);
        clone.classList.add('is-clone');
        clone.setAttribute('aria-hidden', 'true');
        prependFragment.appendChild(clone);
      }
      track.insertBefore(prependFragment, realSlides[0]);

      const appendFragment = document.createDocumentFragment();
      for (let i = 0; i < clonesCount; i += 1) {
        const clone = realSlides[i % len].cloneNode(true);
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

      const snapToIndex = (nextIndex) => {
        index = nextIndex;
        setTransition(false);
        applyTransform(0);
        window.requestAnimationFrame(() => {
          setTransition(true);
        });
      };

      const normalizeIndexIntoRealRange = () => {
        if (len <= 1) return;
        if (index < clonesCount) index += len;
        if (index >= clonesCount + len) index -= len;
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

      const getRealIndex = () => ((index - clonesCount) % len + len) % len;

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
        snapToIndex(nextIndex);
      };

      const next = () => {
        if (!isReducedMotion && isAnimating) return;
        isAnimating = true;

        // If we’re at the last real slide, snap to an equivalent position first,
        // then animate forward so the wrap never “snaps” visibly.
        if (index >= clonesCount + len - 1) {
          index -= len;
          setTransition(false);
          applyTransform(0);
          void track.offsetHeight;
          setTransition(true);
        }

        index += 1;
        setTransition(true);
        applyTransform(0);
        updateDots();
        if (isReducedMotion) {
          normalizeIndexIntoRealRange();
          jumpToIndex(index);
          isAnimating = false;
        }
      };

      const prev = () => {
        if (!isReducedMotion && isAnimating) return;
        isAnimating = true;

        // If we’re at the first real slide, snap to an equivalent position first,
        // then animate backward so the wrap never “snaps” visibly.
        if (index <= clonesCount) {
          index += len;
          setTransition(false);
          applyTransform(0);
          void track.offsetHeight;
          setTransition(true);
        }

        index -= 1;
        setTransition(true);
        applyTransform(0);
        updateDots();
        if (isReducedMotion) {
          normalizeIndexIntoRealRange();
          jumpToIndex(index);
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

        if (len <= 1) return;

        const before = index;
        normalizeIndexIntoRealRange();
        if (index !== before) {
          snapToIndex(index);
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
      .site-chrome-nav .navbar-toggler{
        border-color: rgba(148,163,184,0.40);
      }
      .site-chrome-nav .navbar-toggler:focus{
        box-shadow: 0 0 0 .2rem rgba(var(--bs-primary-rgb), 0.25);
      }
      html[data-theme="light"] .site-chrome-nav .navbar-toggler{
        background: rgba(255,255,255,0.86);
        border-color: rgba(15,23,42,0.18);
      }
      html[data-theme="light"] .site-chrome-nav .navbar-toggler-icon{
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%2815%2c23%2c42%2c0.75%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
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
        .site-chrome-nav .navbar-collapse .dropdown-menu{
          width: 100%;
        }
        .site-chrome-nav #musicToggle.btn,
        .site-chrome-nav #themeToggle.btn{
          border-radius: .9rem;
        }
      }
      .site-chrome-nav .dropdown-menu{
        border: 1px solid var(--border-soft);
        backdrop-filter: blur(12px);
        background: rgba(2, 6, 23, 0.92);
        padding: .35rem;
      }
      .site-chrome-nav .dropdown-item{
        border-radius: .75rem;
        color: var(--text-100);
        padding: .55rem .75rem;
      }
      .site-chrome-nav .dropdown-item:hover,
      .site-chrome-nav .dropdown-item:focus{
        background: rgba(var(--bs-primary-rgb), 0.14);
        color: var(--text-100);
      }
      .site-chrome-nav .dropdown-item.active,
      .site-chrome-nav .dropdown-item:active{
        background: rgba(var(--bs-primary-rgb), 0.22);
        color: var(--text-100);
      }
      html[data-theme="light"] .site-chrome-nav .dropdown-menu{
        background: rgba(248, 250, 252, 0.95);
      }
      html[data-theme="light"] .site-chrome-nav .dropdown-item{
        color: #0b1120;
      }
      html[data-theme="light"] .site-chrome-nav .dropdown-item:hover,
      html[data-theme="light"] .site-chrome-nav .dropdown-item:focus{
        color: #0b1120;
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

  function registerServiceWorker() {
    if (!('serviceWorker' in navigator)) return;
    if (!(window.isSecureContext || window.location.hostname === 'localhost')) return;

    navigator.serviceWorker.register(withBase('/sw.js')).catch(() => {
      // ignore
    });
  }

  function init() {
    injectChromeStyles();
    deferBootstrapIconsCss();
    initLanguageState();
    ensureFavicons();
    renderSiteChrome();
    initBootstrapLite();
    initLanguageSwitcher();
    normalizeRootAnchors();
    initHomeNavTransparency();
    initHomeHeroVideo();
    initMusicToggle();
    initThemeToggle();
    setYear();
    renderFloatingWhatsApp();
    initTypewriters();
    initCarousels();
    initCountUps();
    registerServiceWorker();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
