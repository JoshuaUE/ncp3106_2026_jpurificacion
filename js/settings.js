// CpE Website — Settings Manager (color themes, hero styles, persistence)
(function () {
  'use strict';

  const STORAGE_KEY = 'cpe-settings';
  const DEFAULTS = {
    colorTheme: 'ue-red',
    heroStyle: 'gradient',
    heroPatternOpacity: 0.18,
  };

  // Color theme presets - each defines CSS variable overrides
  const COLOR_THEMES = {
    'ue-red': {
      label: 'UE Red',
      primary: '#A6192E',
      primaryDark: '#7A1120',
      primaryLight: '#C9273F',
      accent: '#0EA5B7',
      accentDark: '#0B7E8C',
      accentLight: '#7FE3EF',
      heroGrad1: '#7A1120',
      heroGrad2: '#A6192E',
      heroGrad3: '#123A41',
      rgb: '166, 25, 46',
      accentRgb: '14, 165, 183',
    },
    blue: {
      label: 'Blue',
      primary: '#1E5FCC',
      primaryDark: '#164099',
      primaryLight: '#3B7DD8',
      accent: '#00B4D8',
      accentDark: '#0096B7',
      accentLight: '#A5F3FF',
      heroGrad1: '#164099',
      heroGrad2: '#1E5FCC',
      heroGrad3: '#0A1A3D',
      rgb: '30, 95, 204',
      accentRgb: '0, 180, 216',
    },
    green: {
      label: 'Green',
      primary: '#1B7A3D',
      primaryDark: '#14562D',
      primaryLight: '#28A745',
      accent: '#2EC4B6',
      accentDark: '#1AA39B',
      accentLight: '#A5F3E8',
      heroGrad1: '#14562D',
      heroGrad2: '#1B7A3D',
      heroGrad3: '#0A2E15',
      rgb: '27, 122, 61',
      accentRgb: '46, 196, 182',
    },
    purple: {
      label: 'Purple',
      primary: '#6D28D9',
      primaryDark: '#5019B8',
      primaryLight: '#8B5CF6',
      accent: '#A855F7',
      accentDark: '#9333EA',
      accentLight: '#E9D5FF',
      heroGrad1: '#5019B8',
      heroGrad2: '#6D28D9',
      heroGrad3: '#2D0A4A',
      rgb: '109, 40, 217',
      accentRgb: '168, 85, 247',
    },
    orange: {
      label: 'Orange',
      primary: '#E86C00',
      primaryDark: '#B05000',
      primaryLight: '#F97316',
      accent: '#F97316',
      accentDark: '#EA580C',
      accentLight: '#FFEDD5',
      heroGrad1: '#B05000',
      heroGrad2: '#E86C00',
      heroGrad3: '#4A2500',
      rgb: '232, 108, 0',
      accentRgb: '249, 115, 22',
    },
  };

  // Hero style variants
  const HERO_STYLES = {
    gradient: { label: 'Gradient', icon: 'bi-diagram-3' },
    solid: { label: 'Solid', icon: 'bi-square-fill' },
    minimal: { label: 'Minimal', icon: 'bi-ui-radios' },
  };

  class SettingsManager {
    constructor() {
      this.settings = { ...DEFAULTS };
      this.listeners = new Set();
      this.offcanvasEl = null;
      this.init();
    }

    init() {
      this.load();
      this.applyToDocument();
      this.createOffcanvas();
      this.bindUI();
    }

    load() {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          this.settings = { ...DEFAULTS, ...parsed };
        }
      } catch (e) {
        console.warn('Failed to load settings:', e);
      }
    }

    save() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.settings));
        this.applyToDocument();
        this.notify();
      } catch (e) {
        console.warn('Failed to save settings:', e);
      }
    }

    applyToDocument() {
      const root = document.documentElement;
      root.setAttribute('data-color-theme', this.settings.colorTheme);
      root.setAttribute('data-hero-style', this.settings.heroStyle);

      // Apply pattern opacity via CSS variable
      root.style.setProperty('--hero-pattern-opacity', this.settings.heroPatternOpacity);

      // Update hero gradient variables for the selected color theme
      const theme = COLOR_THEMES[this.settings.colorTheme];
      if (theme) {
        root.style.setProperty('--brand-primary', theme.primary);
        root.style.setProperty('--brand-primary-dark', theme.primaryDark);
        root.style.setProperty('--brand-primary-light', theme.primaryLight);
        root.style.setProperty('--brand-accent', theme.accent);
        root.style.setProperty('--brand-accent-dark', theme.accentDark);
        root.style.setProperty('--brand-accent-light', theme.accentLight);
        root.style.setProperty('--brand-primary-rgb', theme.rgb);
        root.style.setProperty('--brand-accent-rgb', theme.accentRgb);
        root.style.setProperty('--hero-grad-1', theme.heroGrad1);
        root.style.setProperty('--hero-grad-2', theme.heroGrad2);
        root.style.setProperty('--hero-grad-3', theme.heroGrad3);
      }
    }

    notify() {
      this.listeners.forEach(fn => fn(this.settings));
    }

    subscribe(fn) {
      this.listeners.add(fn);
      return () => this.listeners.delete(fn);
    }

    getColorThemes() {
      return Object.entries(COLOR_THEMES).map(([key, value]) => ({ key, ...value }));
    }

    getHeroStyles() {
      return Object.entries(HERO_STYLES).map(([key, value]) => ({ key, ...value }));
    }

    setColorTheme(key) {
      if (COLOR_THEMES[key]) {
        this.settings.colorTheme = key;
        this.save();
      }
    }

    setHeroStyle(key) {
      if (HERO_STYLES[key]) {
        this.settings.heroStyle = key;
        this.save();
      }
    }

    setHeroPatternOpacity(value) {
      const num = Math.max(0, Math.min(1, parseFloat(value)));
      this.settings.heroPatternOpacity = num;
      this.save();
    }

    reset() {
      this.settings = { ...DEFAULTS };
      this.save();
    }

    // Offcanvas UI
    createOffcanvas() {
      const html = `
        <div class="offcanvas offcanvas-end settings-offcanvas" tabindex="-1" id="settingsOffcanvas" aria-labelledby="settingsOffcanvasLabel">
          <div class="offcanvas-header border-bottom">
            <h5 class="offcanvas-title" id="settingsOffcanvasLabel">
              <i class="bi bi-sliders me-2"></i>Appearance Settings
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div class="offcanvas-body">
            <!-- Color Theme -->
            <fieldset class="mb-4">
              <legend class="h6 mb-3"><i class="bi bi-palette me-1"></i>Color Theme</legend>
              <div class="row g-2" id="colorThemeOptions" role="radiogroup" aria-label="Color theme"></div>
            </fieldset>

            <!-- Hero Style -->
            <fieldset class="mb-4">
              <legend class="h6 mb-3"><i class="bi bi-layout-text-window me-1"></i>Hero Style</legend>
              <div class="row g-2" id="heroStyleOptions" role="radiogroup" aria-label="Hero style"></div>
            </fieldset>

            <!-- Pattern Opacity -->
            <fieldset class="mb-4">
              <legend class="h6 mb-3"><i class="bi bi-sliders me-1"></i>Hero Pattern Opacity</legend>
              <div class="d-flex align-items-center gap-3">
                <input type="range" class="form-range flex-grow-1" id="patternOpacitySlider" min="0" max="100" step="5" aria-label="Pattern opacity percentage">
                <span class="fw-mono" id="patternOpacityValue" style="min-width: 3rem;">${Math.round(this.settings.heroPatternOpacity * 100)}%</span>
              </div>
            </fieldset>

            <!-- Reset -->
            <div class="d-grid">
              <button type="button" class="btn btn-outline-secondary" id="settingsReset">
                <i class="bi bi-arrow-counterclockwise me-1"></i>Reset to Defaults
              </button>
            </div>
          </div>
        </div>
      `;

      // Append to body
      document.body.insertAdjacentHTML('beforeend', html);
      this.offcanvasEl = document.getElementById('settingsOffcanvas');
      this.renderOptions();
      this.bindOffcanvasEvents();
    }

    renderOptions() {
      // Color theme options
      const colorContainer = document.getElementById('colorThemeOptions');
      if (colorContainer) {
        colorContainer.innerHTML = this.getColorThemes().map(t => `
          <div class="col-6 col-md-4">
            <label class="theme-option-card ${this.settings.colorTheme === t.key ? 'active' : ''}" data-theme-key="${t.key}" role="radio" aria-checked="${this.settings.colorTheme === t.key}" tabindex="0">
              <div class="theme-swatch" style="background: linear-gradient(135deg, ${t.primaryDark}, ${t.primary})"></div>
              <div class="theme-label">${t.label}</div>
            </label>
          </div>
        `).join('');
      }

      // Hero style options
      const heroContainer = document.getElementById('heroStyleOptions');
      if (heroContainer) {
        heroContainer.innerHTML = this.getHeroStyles().map(s => `
          <div class="col-6 col-md-4">
            <label class="theme-option-card ${this.settings.heroStyle === s.key ? 'active' : ''}" data-hero-key="${s.key}" role="radio" aria-checked="${this.settings.heroStyle === s.key}" tabindex="0">
              <i class="bi ${s.icon} fs-2"></i>
              <div class="theme-label">${s.label}</div>
            </label>
          </div>
        `).join('');
      }
    }

    bindOffcanvasEvents() {
      if (!this.offcanvasEl) return;

      // Use event delegation for color theme and hero style options
      // since renderOptions() re-renders the HTML and removes direct listeners

      // Color theme selection (delegated)
      const colorContainer = this.offcanvasEl.querySelector('#colorThemeOptions');
      if (colorContainer) {
        colorContainer.addEventListener('click', (e) => {
          const card = e.target.closest('[data-theme-key]');
          if (card) {
            this.setColorTheme(card.dataset.themeKey);
            this.renderOptions();
          }
        });
        colorContainer.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            const card = e.target.closest('[data-theme-key]');
            if (card) {
              e.preventDefault();
              card.click();
            }
          }
        });
      }

      // Hero style selection (delegated)
      const heroContainer = this.offcanvasEl.querySelector('#heroStyleOptions');
      if (heroContainer) {
        heroContainer.addEventListener('click', (e) => {
          const card = e.target.closest('[data-hero-key]');
          if (card) {
            this.setHeroStyle(card.dataset.heroKey);
            this.renderOptions();
          }
        });
        heroContainer.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            const card = e.target.closest('[data-hero-key]');
            if (card) {
              e.preventDefault();
              card.click();
            }
          }
        });
      }

      // Pattern opacity slider
      const slider = this.offcanvasEl.querySelector('#patternOpacitySlider');
      const valueEl = this.offcanvasEl.querySelector('#patternOpacityValue');
      if (slider && valueEl) {
        slider.value = Math.round(this.settings.heroPatternOpacity * 100);
        slider.addEventListener('input', (e) => {
          const val = parseInt(e.target.value, 10) / 100;
          valueEl.textContent = `${e.target.value}%`;
          this.setHeroPatternOpacity(val);
        });
      }

      // Reset button
      const resetBtn = this.offcanvasEl.querySelector('#settingsReset');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          this.reset();
          this.renderOptions();
          if (slider) slider.value = Math.round(this.settings.heroPatternOpacity * 100);
          if (valueEl) valueEl.textContent = `${Math.round(this.settings.heroPatternOpacity * 100)}%`;
        });
      }

      // Re-render when offcanvas shows (in case settings changed elsewhere)
      this.offcanvasEl.addEventListener('shown.bs.offcanvas', () => this.renderOptions());
    }

    bindUI() {
      // Settings toggle button in navbar
      const toggleBtn = document.querySelector('[data-settings-toggle]');
      if (toggleBtn && this.offcanvasEl) {
        toggleBtn.addEventListener('click', () => {
          const offcanvas = bootstrap.Offcanvas.getOrCreateInstance(this.offcanvasEl);
          offcanvas.show();
        });
      }
    }
  }

  // Initialize on DOM ready
  document.addEventListener('DOMContentLoaded', () => {
    window.cpeSettings = new SettingsManager();
  });
})();