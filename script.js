/* ============================================
   HARDEDGE CAFÉ – SCRIPTS
   ============================================ */

// --- Nav scroll effect ---
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

// --- Mobile burger menu ---
const burger = document.getElementById('burger');
const navLinks = document.querySelector('.nav__links');
burger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// --- Reveal on scroll ---
const reveals = document.querySelectorAll('.menu-card, .review-card, .contact__detail, .about__card, .about__text, .about__visual');
reveals.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

reveals.forEach(el => observer.observe(el));

// --- Animate rating bars on scroll ---
const barFills = document.querySelectorAll('.bar__fill');
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const target = e.target.style.width;
      e.target.style.width = '0';
      requestAnimationFrame(() => {
        setTimeout(() => { e.target.style.width = target; }, 50);
      });
      barObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
barFills.forEach(b => barObserver.observe(b));

// --- Load more reviews ---
const loadMoreBtn = document.getElementById('load-more');
const hiddenReviews = document.getElementById('reviews-hidden');

loadMoreBtn.addEventListener('click', () => {
  hiddenReviews.style.display = 'block';

  // Move hidden review cards into main grid
  const mainGrid = document.getElementById('reviews-grid');
  const cards = hiddenReviews.querySelectorAll('.review-card');
  cards.forEach(card => {
    card.classList.add('reveal');
    mainGrid.appendChild(card);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => card.classList.add('visible'));
    });
  });

  hiddenReviews.style.display = 'none';
  loadMoreBtn.parentElement.style.display = 'none';
});

// --- Smooth active nav link highlight ---
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav__links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navAnchors.forEach(a => {
    a.style.color = a.getAttribute('href') === `#${current}` ? 'var(--gold-lt)' : '';
  });
});
