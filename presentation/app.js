(() => {
  'use strict';

  const slides = Array.from(document.querySelectorAll('.slide'));
  const total = slides.length;
  const progress = document.getElementById('progressBar');
  const progressTrack = document.querySelector('.progress-track');
  const counter = document.getElementById('slideCounter');
  const prevButton = document.getElementById('prevButton');
  const nextButton = document.getElementById('nextButton');
  const menuButton = document.getElementById('menuButton');
  const fullscreenButton = document.getElementById('fullscreenButton');
  const tocDialog = document.getElementById('tocDialog');
  const closeTocButton = document.getElementById('closeTocButton');
  const tocList = document.getElementById('tocList');
  const helpHint = document.getElementById('helpHint');
  let current = 0;
  let touchStartX = null;

  slides.forEach((slide) => { slide.tabIndex = -1; });

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  function indexFromHash() {
    const match = window.location.hash.match(/slide=(\d+)/);
    return match ? clamp(Number(match[1]) - 1, 0, total - 1) : 0;
  }

  function updateTocCurrent() {
    tocList.querySelectorAll('button').forEach((button, index) => {
      button.setAttribute('aria-current', index === current ? 'true' : 'false');
    });
  }

  function showSlide(index, options = {}) {
    current = clamp(index, 0, total - 1);
    slides.forEach((slide, slideIndex) => {
      const active = slideIndex === current;
      slide.classList.toggle('is-active', active);
      slide.classList.toggle('is-before', slideIndex < current);
      slide.setAttribute('aria-hidden', active ? 'false' : 'true');
      if ('inert' in slide) slide.inert = !active;
    });

    const position = current + 1;
    counter.textContent = `${position} / ${total}`;
    progress.style.width = `${(position / total) * 100}%`;
    progressTrack.setAttribute('aria-valuenow', String(position));
    progressTrack.setAttribute('aria-valuemax', String(total));
    prevButton.disabled = current === 0;
    nextButton.disabled = current === total - 1;
    updateTocCurrent();

    const nextHash = `#slide=${position}`;
    if (window.location.hash !== nextHash) {
      history.replaceState(null, '', nextHash);
    }

    document.title = `${position}/${total} ${slides[current].dataset.title}｜攝影新手入門`;
    if (options.focus) slides[current].focus({ preventScroll: true });
  }

  function nextSlide() { showSlide(current + 1); }
  function previousSlide() { showSlide(current - 1); }

  function buildToc() {
    const fragment = document.createDocumentFragment();
    slides.forEach((slide, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.innerHTML = `<span class="toc-number">${String(index + 1).padStart(2, '0')}</span><span><span class="toc-title">${slide.dataset.title}</span><span class="toc-section">${slide.dataset.section}</span></span>`;
      button.addEventListener('click', () => {
        showSlide(index, { focus: true });
        tocDialog.close();
      });
      fragment.appendChild(button);
    });
    tocList.appendChild(fragment);
  }

  function openToc() {
    if (tocDialog.open) return;
    updateTocCurrent();
    tocDialog.showModal();
    const currentButton = tocList.querySelector('[aria-current="true"]');
    currentButton?.focus();
  }

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  }

  function setupQuizzes() {
    document.querySelectorAll('.quiz').forEach((quiz) => {
      const answer = quiz.dataset.answer;
      const feedback = quiz.querySelector('.quiz-feedback');
      quiz.querySelectorAll('[data-choice]').forEach((button) => {
        button.addEventListener('click', () => {
          quiz.querySelectorAll('[data-choice]').forEach((option) => {
            option.classList.remove('is-correct', 'is-wrong');
            option.removeAttribute('aria-pressed');
          });
          const correct = button.dataset.choice === answer;
          button.classList.add(correct ? 'is-correct' : 'is-wrong');
          button.setAttribute('aria-pressed', 'true');
          feedback.textContent = correct ? feedback.dataset.correct : feedback.dataset.wrong;
        });
      });
    });
  }

  function isInteractiveTarget(target) {
    return Boolean(target.closest('button, a, input, select, textarea, dialog'));
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && tocDialog.open) {
      tocDialog.close();
      menuButton.focus();
      return;
    }
    if (isInteractiveTarget(event.target) || tocDialog.open) return;

    switch (event.key) {
      case 'ArrowRight':
      case 'PageDown':
      case ' ':
        event.preventDefault();
        nextSlide();
        break;
      case 'ArrowLeft':
      case 'PageUp':
        event.preventDefault();
        previousSlide();
        break;
      case 'Home':
        event.preventDefault();
        showSlide(0);
        break;
      case 'End':
        event.preventDefault();
        showSlide(total - 1);
        break;
      case 'm':
      case 'M':
        event.preventDefault();
        openToc();
        break;
      case 'f':
      case 'F':
        event.preventDefault();
        toggleFullscreen();
        break;
      default:
        break;
    }
  });

  document.addEventListener('fullscreenchange', () => {
    const active = Boolean(document.fullscreenElement);
    fullscreenButton.setAttribute('aria-label', active ? '離開全螢幕' : '切換全螢幕');
  });

  document.addEventListener('touchstart', (event) => {
    if (isInteractiveTarget(event.target)) return;
    touchStartX = event.changedTouches[0].clientX;
  }, { passive: true });

  document.addEventListener('touchend', (event) => {
    if (touchStartX === null || isInteractiveTarget(event.target)) return;
    const distance = event.changedTouches[0].clientX - touchStartX;
    touchStartX = null;
    if (Math.abs(distance) < 55) return;
    distance < 0 ? nextSlide() : previousSlide();
  }, { passive: true });

  window.addEventListener('hashchange', () => showSlide(indexFromHash()));
  prevButton.addEventListener('click', previousSlide);
  nextButton.addEventListener('click', nextSlide);
  menuButton.addEventListener('click', openToc);
  closeTocButton.addEventListener('click', () => tocDialog.close());
  fullscreenButton.addEventListener('click', toggleFullscreen);

  buildToc();
  setupQuizzes();
  showSlide(indexFromHash());

  window.setTimeout(() => {
    helpHint.classList.add('is-visible');
    window.setTimeout(() => helpHint.classList.remove('is-visible'), 3600);
  }, 700);
})();
