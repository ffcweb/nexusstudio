//   Copyright © 2025 Fang C.
//   All rights reserved.This file may not be copied, modified, or distributed without permission.

// menu section
const hamburgerBtn = document.getElementById('hamburger-btn');
const menu = document.getElementById('primary-menu');
const overlay = document.getElementById('overlay');

function closeMenu() {
  hamburgerBtn.setAttribute('aria-expanded', 'false');
  menu.classList.remove('open');
  menu.setAttribute('aria-hidden', 'true');
  menu.querySelectorAll('a').forEach(link => link.tabIndex = -1);
  overlay.classList.remove('active');
  hamburgerBtn.focus();
}

hamburgerBtn.addEventListener('click', () => {
  const expanded = hamburgerBtn.getAttribute('aria-expanded') === 'true';
  if (expanded) {
    closeMenu();
  } else {
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    menu.classList.add('open');
    menu.setAttribute('aria-hidden', 'false');
    menu.querySelectorAll('a').forEach(link => link.tabIndex = 0);
    overlay.classList.add('active');
  }
});

overlay.addEventListener('click', closeMenu);

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && menu.classList.contains('open')) {
    closeMenu();
  }
});


// hero section
const images = document.querySelectorAll('.carousel-img');
let current = 0;

function showNextImage() {
  images[current].classList.remove('active');
  current = (current + 1) % images.length;
  images[current].classList.add('active');
}

setInterval(showNextImage, 3000); // Change image every 3 seconds


// tabs for blogs
const tabs2 = document.querySelectorAll('.tab-list [role="tab"]');
const panels2 = document.querySelectorAll('.tab-panel');

function activateTab2(tab) {
  tabs2.forEach(t => {
    t.setAttribute('aria-selected', 'false');
    t.setAttribute('tabindex', '-1');
  });
  panels2.forEach(p => p.setAttribute('aria-hidden', 'true'));

  tab.setAttribute('aria-selected', 'true');
  tab.setAttribute('tabindex', '0');
  document.getElementById(tab.getAttribute('aria-controls')).setAttribute('aria-hidden', 'false');
  tab.focus();
}

tabs2.forEach(tab => {
  tab.addEventListener('click', () => activateTab2(tab));
  tab.addEventListener('keydown', e => {
    const index = Array.from(tabs2).indexOf(e.target);
    let newIndex = null;
    switch (e.key) {
      case 'ArrowRight':
        newIndex = (index + 1) % tabs2.length;
        tabs2[newIndex].focus();
        break;
      case 'ArrowLeft':
        newIndex = (index - 1 + tabs2.length) % tabs2.length;
        tabs2[newIndex].focus();
        break;
      case 'Home':
        tabs2[0].focus();
        break;
      case 'End':
        tabs2[tabs2.length - 1].focus();
        break;
      case 'Enter':
      case ' ':
        activateTab2(e.target);
        break;
    }
  });
});


// testimoial
const cards = document.getElementById('testimonialCards');
const prevBtn = document.querySelector('.testimonial-nav .prev');
const nextBtn = document.querySelector('.testimonial-nav .next');

function getCardWidth() {
  const card = cards.querySelector('.testimonial-card');
  const style = getComputedStyle(cards);
  const gap = parseInt(style.gap) || 0;
  return card.offsetWidth + gap;
}

prevBtn.addEventListener('click', () => {
  const scrollAmount = getCardWidth();
  cards.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
});

nextBtn.addEventListener('click', () => {
  const scrollAmount = getCardWidth();
  cards.scrollBy({ left: scrollAmount, behavior: 'smooth' });
});