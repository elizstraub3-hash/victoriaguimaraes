// Hamburger menu
const hamburger = document.getElementById('hamburger');
const navMobile = document.getElementById('navMobile');
if (hamburger && navMobile) {
  hamburger.addEventListener('click', () => {
    navMobile.classList.toggle('open');
    hamburger.classList.toggle('open');
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
  // Show only once per session
  if (!sessionStorage.getItem('welcomed')) {
    setTimeout(() => { modal.classList.add('active'); }, 900);
    sessionStorage.setItem('welcomed', '1');
  }
  const closeModal = () => modal.classList.remove('active');
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (backdrop) backdrop.addEventListener('click', closeModal);
}
