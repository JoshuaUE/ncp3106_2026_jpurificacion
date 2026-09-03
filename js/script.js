// CpE Website — interactivity (progressive enhancement; site works without JS)
(function(){
  const root = document.documentElement;

  // Persisted theme
  try{
    const saved = localStorage.getItem('cpe-theme');
    if(saved) root.setAttribute('data-theme', saved);
  }catch(e){}

  document.addEventListener('DOMContentLoaded', () => {
    // Footer year
    document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });

    // Theme toggle
    document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
      const sync = () => {
        const dark = root.getAttribute('data-theme') === 'dark';
        btn.innerHTML = dark ? '<i class="bi bi-sun"></i> Light' : '<i class="bi bi-moon-stars"></i> Dark';
        btn.setAttribute('aria-pressed', String(dark));
      };
      sync();
      btn.addEventListener('click', () => {
        const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        root.setAttribute('data-theme', next);
        try{ localStorage.setItem('cpe-theme', next); }catch(e){}
        sync();
      });
    });

    // Scroll-to-top
    const topBtn = document.getElementById('scrollTop');
    if(topBtn){
      const onScroll = () => topBtn.classList.toggle('show', window.scrollY > 500);
      window.addEventListener('scroll', onScroll, {passive:true}); onScroll();
      topBtn.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));
    }

    // Generic card filtering: [data-filter-group] buttons + [data-filter-target] container
    document.querySelectorAll('[data-filter-group]').forEach(group => {
      const targetSel = group.getAttribute('data-filter-group');
      const target = document.querySelector(targetSel);
      if(!target) return;
      const buttons = group.querySelectorAll('[data-filter]');
      const countEl = document.querySelector(group.getAttribute('data-count') || '__none');
      const apply = (val) => {
        let visible = 0;
        target.querySelectorAll('[data-category]').forEach(card => {
          const cats = (card.getAttribute('data-category') || '').toLowerCase().split(/\s+/);
          const show = val === 'all' || cats.includes(val.toLowerCase());
          card.style.display = show ? '' : 'none';
          if(show) visible++;
        });
        if(countEl) countEl.textContent = visible;
        buttons.forEach(b => b.classList.toggle('active', b.getAttribute('data-filter') === val));
      };
      buttons.forEach(b => b.addEventListener('click', () => apply(b.getAttribute('data-filter'))));
    });

    // Live search filtering (careers page)
    document.querySelectorAll('[data-search-input]').forEach(input => {
      const target = document.querySelector(input.getAttribute('data-search-input'));
      if(!target) return;
      input.addEventListener('input', () => {
        const q = input.value.trim().toLowerCase();
        target.querySelectorAll('[data-searchable]').forEach(el => {
          const text = el.textContent.toLowerCase();
          el.style.display = (!q || text.includes(q)) ? '' : 'none';
        });
      });
    });

    // Contact form validation (Bootstrap style + success message)
    const form = document.getElementById('contactForm');
    if(form){
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        e.stopPropagation();
        form.classList.add('was-validated');
        if(!form.checkValidity()) return;
        const alertBox = document.getElementById('formSuccess');
        if(alertBox) alertBox.classList.remove('d-none');
        form.reset();
        form.classList.remove('was-validated');
        setTimeout(() => alertBox && alertBox.classList.add('d-none'), 6000);
      });
    }

    // Project modal: populate from data-* attributes
    const projModal = document.getElementById('projectModal');
    if(projModal){
      projModal.addEventListener('show.bs.modal', (event) => {
        const btn = event.relatedTarget;
        if(!btn) return;
        const title = btn.getAttribute('data-title') || 'Project';
        const body = btn.getAttribute('data-detail') || '';
        const tags = btn.getAttribute('data-tags') || '';
        projModal.querySelector('.modal-title').textContent = title;
        projModal.querySelector('[data-modal-body]').textContent = body;
        const tagWrap = projModal.querySelector('[data-modal-tags]');
        if(tagWrap){
          tagWrap.innerHTML = '';
          tags.split(',').map(s => s.trim()).filter(Boolean).forEach(t => {
            const span = document.createElement('span');
            span.className = 'badge badge-tech me-1 mb-1';
            span.textContent = t;
            tagWrap.appendChild(span);
          });
        }
      });
    }
  });
})();
