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
