// Slider arrow helper
function initSliderArrows(prevId, nextId, sliderId) {
  const prev = document.getElementById(prevId);
  const next = document.getElementById(nextId);
  const slider = document.getElementById(sliderId);
  if (!prev || !next || !slider) return;
  const scroll = (dir) => {
    const card = slider.querySelector('[class*="card"]');
    const amount = card ? card.offsetWidth + 14 : slider.offsetWidth * 0.85;
    slider.scrollBy({ left: dir * amount, behavior: 'smooth' });
  };
  prev.addEventListener('click', () => scroll(-1));
  next.addEventListener('click', () => scroll(1));
}
initSliderArrows('cardsPrev', 'cardsNext', 'cardsSlider');
initSliderArrows('testPrev', 'testNext', 'testSlider');

// Nav dropdown
const dropBtn = document.getElementById('navDropBtn');
const dropPanel = document.getElementById('navDropPanel');
if (dropBtn && dropPanel) {
  dropBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    dropBtn.classList.toggle('open');
    dropPanel.classList.toggle('open');
  });
  document.addEventListener('click', () => {
    dropBtn.classList.remove('open');
    dropPanel.classList.remove('open');
  });
}

// Fade-in on scroll
const fadeEls = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
}, { threshold: 0.12 });
fadeEls.forEach(el => observer.observe(el));

// Image reference numbers (visible only with ?ref=1 in URL)
if (new URLSearchParams(location.search).get('ref') === '1') {
  document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent = '.img-ref-badge{position:absolute;top:8px;left:8px;background:#C6BEB5;color:#000;font-family:monospace;font-size:13px;font-weight:700;line-height:1;padding:4px 8px;z-index:9999;pointer-events:none;box-shadow:0 2px 6px rgba(0,0,0,.5);}';
    document.head.appendChild(style);
    let n = 1;
    document.querySelectorAll('img').forEach(img => {
      if (img.closest('.navbar') || img.closest('.footer')) return;
      const wrap = img.parentElement;
      const pos = getComputedStyle(wrap).position;
      if (pos === 'static') wrap.style.position = 'relative';
      const badge = document.createElement('span');
      badge.className = 'img-ref-badge';
      badge.textContent = n++;
      wrap.appendChild(badge);
    });
  });
}

// Welcome modal
const modal = document.getElementById('welcome-modal');
const closeBtn = document.getElementById('welcomeClose');
const backdrop = document.getElementById('welcomeBackdrop');
if (modal) {
  if (!sessionStorage.getItem('welcomed')) {
    setTimeout(() => { modal.classList.add('active'); }, 900);
    sessionStorage.setItem('welcomed', '1');
  }
  const closeModal = () => modal.classList.remove('active');
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (backdrop) backdrop.addEventListener('click', closeModal);
}
