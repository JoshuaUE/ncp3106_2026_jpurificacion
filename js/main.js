/**
 * js/main.js — Interest section shared preview panel
 *
 * Drives the single shared #interest-preview panel in the
 * #interests section. On desktop (pointer: fine), hovering or
 * focusing an .interest-row updates the panel with that row's
 * image/caption and makes it visible. On touch devices the panel
 * is shown/hidden in its mobile inline layout when the user taps
 * a row (opening the <details> accordion).
 *
 * No framework. No build step. Plain DOM APIs only.
 */

(function () {
    'use strict';

    /* ── DOM references ─────────────────────────────────── */
    const stage   = document.querySelector('.interest-stage');
    const panel   = document.getElementById('interest-preview');
    const rows    = document.querySelectorAll('.interest-row');

    if (!stage || !panel || !rows.length) return; // guard: elements not found

    const panelImg    = panel.querySelector('.preview-media img');
    const panelTags   = panel.querySelector('.preview-tags');
    const panelStatus = panel.querySelector('.preview-status');

    /* ── State ──────────────────────────────────────────── */
    let hideTimer  = null;
    let activeKey  = null;

    /* ── Helpers ────────────────────────────────────────── */
    function isCoarsePointer() {
        return window.matchMedia('(pointer: coarse)').matches;
    }

    function showPanel(row) {
        const key    = row.dataset.key    || '';
        const src    = row.dataset.src    || '';
        const alt    = row.dataset.alt    || '';
        const label  = row.dataset.label  || '';
        const status = row.dataset.status || '';

        // Only update DOM if the key changed (avoids flicker on re-enter)
        if (key !== activeKey) {
            activeKey = key;
            panel.dataset.key = key;

            if (panelImg) {
                panelImg.src = src;
                panelImg.alt = alt;
            }
            if (panelTags)   panelTags.textContent   = label;
            if (panelStatus) {
                panelStatus.textContent = status ? 'STATUS: ' + status : '';
                panelStatus.hidden      = !status;
            }
        }

        clearTimeout(hideTimer);
        panel.classList.add('is-visible');
        panel.removeAttribute('aria-hidden');
    }

    function hidePanel(immediate) {
        clearTimeout(hideTimer);
        if (immediate) {
            _doHide();
        } else {
            hideTimer = setTimeout(_doHide, 120);
        }
    }

    function _doHide() {
        panel.classList.remove('is-visible');
        panel.setAttribute('aria-hidden', 'true');
        activeKey = null;
    }

    /* ── Desktop: hover / keyboard focus ────────────────── */
    function bindDesktopEvents() {
        rows.forEach(function (row) {
            // Mouse enter → show
            row.addEventListener('mouseenter', function () {
                showPanel(row);
            });

            // Focus (keyboard Tab) → show
            row.addEventListener('focusin', function () {
                showPanel(row);
            });

            row.addEventListener('click', function (event) {
                if (!isCoarsePointer()) event.preventDefault();
            });
        });

        // Mouse leave the whole stage → hide after short delay
        stage.addEventListener('mouseleave', function () {
            hidePanel(false);
        });

        // Focus leaves the stage (Tab past last row or Shift+Tab past first)
        stage.addEventListener('focusout', function (e) {
            // Only hide if focus moved outside the stage entirely
            if (!stage.contains(e.relatedTarget)) {
                hidePanel(false);
            }
        });

        // Re-entering the stage cancels a pending hide
        stage.addEventListener('mouseenter', function () {
            clearTimeout(hideTimer);
        });
    }

    /* ── Mobile: tapping keeps the list fixed and updates the shared panel. */
    function bindMobileEvents() {
        rows.forEach(function (row) {
            row.addEventListener('click', function () {
                showPanel(row);
            });
        });
    }

    /* ── Init ───────────────────────────────────────────── */
    if (isCoarsePointer()) {
        bindMobileEvents();
    } else {
        bindDesktopEvents();
    }

}());

/* Sync dots and navigation with the visible section. */
(function () {
    const sections = Array.from(document.querySelectorAll('main > .section'));
    const dots = Array.from(document.querySelectorAll('.progress-dot'));
    const navLinks = Array.from(document.querySelectorAll('.site-nav nav a'));
    if (!sections.length) return;
    function setActive(id) {
        dots.forEach(function (dot) { dot.classList.toggle('is-active', dot.getAttribute('href') === '#' + id); });
        navLinks.forEach(function (link) { link.classList.toggle('nav-active', link.getAttribute('href') === '#' + id); });
    }
    new IntersectionObserver(function (entries) {
        const visible = entries.filter(function (entry) { return entry.isIntersecting; }).sort(function (a, b) { return b.intersectionRatio - a.intersectionRatio; })[0];
        if (visible) setActive(visible.target.id);
    }, { threshold: [0.45, 0.65] }).observe(sections[0]);
    sections.slice(1).forEach(function (section) { new IntersectionObserver(function (entries) { if (entries[0].isIntersecting) setActive(section.id); }, { threshold: 0.65 }).observe(section); });
}());

/* Fine-pointer-only cursor orb. */
(function () {
    const blob = document.getElementById('cursor-blob');
    if (!blob || !matchMedia('(pointer: fine)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const target = { x: -100, y: -100 }, current = { x: -100, y: -100 };
    document.documentElement.classList.add('has-custom-cursor');
    addEventListener('pointermove', function (event) { target.x = event.clientX; target.y = event.clientY; blob.classList.add('is-visible'); }, { passive: true });
    document.addEventListener('pointerover', function (event) { blob.classList.toggle('is-hovering', Boolean(event.target.closest('a, button, summary, label, input'))); });
    addEventListener('pointerdown', function () { blob.classList.add('is-clicking'); });
    addEventListener('pointerup', function () { blob.classList.remove('is-clicking'); });
    function render() { current.x += (target.x - current.x) * 0.16; current.y += (target.y - current.y) * 0.16; blob.style.transform = 'translate3d(' + current.x + 'px, ' + current.y + 'px, 0) translate(-50%, -50%)'; requestAnimationFrame(render); }
    requestAnimationFrame(render);
}());

/* Three background layers use a slow, visible parallax LERP. */
(function () {
    const layers = [[document.querySelector('.background .glow-one'), 50], [document.querySelector('.background .glow-two'), 28], [document.querySelector('.background .glow-three'), 14]].filter(function (layer) { return layer[0]; });
    const grid = document.querySelector('.bg-grid');
    if (!layers.length || !matchMedia('(pointer: fine)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const target = { x: 0, y: 0 }, current = { x: 0, y: 0 };
    addEventListener('pointermove', function (event) { target.x = event.clientX / innerWidth - 0.5; target.y = event.clientY / innerHeight - 0.5; }, { passive: true });
    function render() { current.x += (target.x - current.x) * 0.05; current.y += (target.y - current.y) * 0.05; layers.forEach(function (layer) { layer[0].style.setProperty('--parallax-x', (current.x * layer[1] * 2) + 'px'); layer[0].style.setProperty('--parallax-y', (current.y * layer[1] * 2) + 'px'); }); if (grid) grid.style.backgroundPosition = (current.x * 20) + 'px ' + (current.y * 20) + 'px'; requestAnimationFrame(render); }
    requestAnimationFrame(render);
}());
/* Three-step personality quiz: all state remains in this page session. */
(function () {
    const quiz = document.getElementById('personality-quiz');
    if (!quiz) return;

    const steps = Array.from(quiz.querySelectorAll('.quiz-step'));
    const progress = quiz.querySelector('[data-quiz-current]');
    const back = quiz.querySelector('.quiz-back');
    const next = quiz.querySelector('.quiz-next');
    const result = quiz.querySelector('.quiz-result');
    const resultTitle = quiz.querySelector('#quiz-result-title');
    const resultCopy = quiz.querySelector('.quiz-result-copy');
    const resultTrait = quiz.querySelector('.quiz-result-trait');
    const motif = quiz.querySelector('.result-motif');
    const restart = quiz.querySelector('.quiz-restart');
    const answers = new Array(steps.length);
    let current = 0;

    const outcomes = {
        patient: { title: 'The Patient Problem-Solver', copy: 'You build confidence through steady focus. When something is difficult, you give it the time and care needed to understand it properly.', trait: '01 / PATIENT' },
        curious: { title: 'The Curious Builder', copy: 'You are energized by questions and possibilities. You learn by exploring systems, testing ideas, and following what you discover.', trait: '02 / CURIOUS' },
        creative: { title: 'The Creative Engineer', copy: 'You bring a point of view to every project. You care about how things work, but also how they look, feel, and connect with people.', trait: '03 / CREATIVE' }
    };

    function updateStep() {
        steps.forEach(function (step, index) {
            const active = index === current;
            step.hidden = !active;
            step.classList.toggle('is-current', active);
        });
        progress.textContent = current + 1;
        back.disabled = current === 0;
        next.disabled = !answers[current];
        next.textContent = current === steps.length - 1 ? 'SEE RESULT →' : 'NEXT →';
    }

    function selectAnswer(button) {
        const step = button.closest('.quiz-step');
        const index = Number(step.dataset.step);
        answers[index] = button.dataset.trait;
        step.querySelectorAll('.quiz-answers button').forEach(function (answer) {
            answer.classList.toggle('is-selected', answer === button);
            answer.setAttribute('aria-pressed', answer === button ? 'true' : 'false');
        });
        updateStep();
    }

    function showResult() {
        const score = { patient: 0, curious: 0, creative: 0 };
        answers.forEach(function (trait) { score[trait] += 1; });
        const winner = ['curious', 'creative', 'patient'].reduce(function (best, trait) {
            return score[trait] > score[best] ? trait : best;
        }, 'curious');
        const outcome = outcomes[winner];
        quiz.querySelector('.quiz-topline').hidden = true;
        quiz.querySelector('.quiz-steps').hidden = true;
        quiz.querySelector('.quiz-controls').hidden = true;
        motif.dataset.result = winner;
        resultTitle.textContent = outcome.title;
        resultCopy.textContent = outcome.copy;
        resultTrait.textContent = outcome.trait;
        result.hidden = false;
        resultTitle.focus();
    }

    quiz.querySelectorAll('.quiz-answers button').forEach(function (button) {
        button.setAttribute('aria-pressed', 'false');
        button.addEventListener('click', function () { selectAnswer(button); });
    });
    back.addEventListener('click', function () { if (current > 0) { current -= 1; updateStep(); } });
    next.addEventListener('click', function () { if (!answers[current]) return; if (current === steps.length - 1) { showResult(); } else { current += 1; updateStep(); } });
    restart.addEventListener('click', function () {
        answers.fill(undefined); current = 0; result.hidden = true;
        quiz.querySelector('.quiz-topline').hidden = false;
        quiz.querySelector('.quiz-steps').hidden = false;
        quiz.querySelector('.quiz-controls').hidden = false;
        quiz.querySelectorAll('.quiz-answers button').forEach(function (button) { button.classList.remove('is-selected'); button.setAttribute('aria-pressed', 'false'); });
        updateStep();
        steps[0].querySelector('.quiz-answers button').focus();
    });
    updateStep();
}());