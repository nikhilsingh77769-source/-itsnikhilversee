const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');

// One document, one scroll direction. Anchors remain native links.
let returnFocus = null;
const chapterIndex = $('#chapterIndex');
function openDialog(dialog, trigger) {
  returnFocus = trigger;
  dialog.showModal();
  dialog.scrollTop = 0;
  document.body.classList.add('locked');
  if (!reducedMotion.matches) dialog.animate([{ opacity: .5, translate: '0 12px' }, { opacity: 1, translate: '0 0' }], { duration: 280, easing: 'ease-out' });
}
$('.index-toggle').addEventListener('click', event => openDialog(chapterIndex, event.currentTarget));
$$('[data-close]').forEach(button => button.addEventListener('click', () => $('#' + button.dataset.close).close()));
$$('dialog:not(#pocketDrive)').forEach(dialog => {
  dialog.addEventListener('close', () => {
    document.body.classList.remove('locked');
    returnFocus?.focus({ preventScroll: true });
  });
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
});
$$('.chapter-index nav a').forEach(link => link.addEventListener('click', event => {
  event.preventDefault();
  const target = $(link.getAttribute('href'));
  chapterIndex.close();
  requestAnimationFrame(() => {
    target?.setAttribute('tabindex', '-1');
    target?.focus({ preventScroll: true });
    target?.scrollIntoView({ behavior: reducedMotion.matches ? 'instant' : 'smooth', block: 'start' });
    history.replaceState(null, '', link.getAttribute('href'));
  });
}));

// Credits are optional. The personal story itself is already on the page.
$$('[data-story]').forEach(button => button.addEventListener('click', () => {
  const story = stories[button.dataset.story];
  if (!story) return;
  $('#readerImage').src = `assets/${story.image}`;
  $('#readerImage').alt = story.figure;
  $('#readerCaption').textContent = story.figure;
  $('#readerKicker').textContent = story.kicker;
  $('#readerTitle').innerHTML = story.title;
  $('#readerBody').replaceChildren();
  story.body.forEach(text => { const p = document.createElement('p'); p.textContent = text; $('#readerBody').append(p); });
  if (story.credits) {
    const list = document.createElement('ul');
    story.credits.forEach(([label, href]) => {
      const li = document.createElement('li'), a = document.createElement('a');
      a.href = href; a.textContent = label; a.target = '_blank'; a.rel = 'noopener noreferrer';
      li.append(a); list.append(li);
    });
    $('#readerBody').append(list);
  }
  $('#readerSource').hidden = !story.source;
  if (story.source) $('#readerSource').href = story.source;
  openDialog($('#reader'), button);
}));

// Motion adds a little life without ever holding the scroll position.
const revealed = new WeakSet();
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting || revealed.has(entry.target)) return;
    revealed.add(entry.target);
    if (!reducedMotion.matches) entry.target.animate([
      { opacity: .4, translate: '0 24px' },
      { opacity: 1, translate: '0 0' }
    ], { duration: 850, easing: 'cubic-bezier(.2,.8,.2,1)' });
    revealObserver.unobserve(entry.target);
  });
}, { threshold: .08, rootMargin: '0px 0px -25px 0px' });
$$('.reveal').forEach(element => revealObserver.observe(element));
if (!reducedMotion.matches) {
  $$('.hero h1>span').forEach((element, i) => element.animate([
    { opacity: .1, translate: '0 45px' }, { opacity: 1, translate: '0 0' }
  ], { duration: 1000, delay: 100 + i * 90, easing: 'cubic-bezier(.2,.8,.2,1)', fill: 'backwards' }));
}
const chapters = $$('[data-chapter]');
const header = $('.masthead');
const progress = $('#readingProgress');
const heroPhoto = $('.hero-photo>img');
const mountainSection = $('.mountains');
const mountainPhoto = $('.mountain-photo img');
let updateQueued = false;
function updateReading() {
  updateQueued = false;
  const y = window.scrollY, viewport = innerHeight;
  const maxScroll = Math.max(1, document.documentElement.scrollHeight - viewport);
  progress.style.transform = `scaleX(${Math.min(1, Math.max(0, y / maxScroll))})`;
  header.classList.toggle('scrolled', y > 70);
  let active = chapters[0];
  for (const section of chapters) if (section.getBoundingClientRect().top <= viewport * .38) active = section;
  $('#chapterNumber').textContent = active.dataset.chapter;
  $('#chapterName').textContent = active.dataset.name;
  if (!reducedMotion.matches) {
    if (y < viewport * 1.2) heroPhoto.style.transform = `translateY(${Math.min(y * .09, viewport * .1)}px) scale(1.045)`;
    const r = mountainSection.getBoundingClientRect();
    if (r.top < viewport && r.bottom > 0) {
      const shift = Math.max(-20, Math.min(20, (viewport * .5 - r.top - r.height * .5) * .035));
      mountainPhoto.style.transform = `translateY(${shift}px) scale(1.055)`;
    }
  }
}
function queueReading() { if (!updateQueued) { updateQueued = true; requestAnimationFrame(updateReading); } }
window.addEventListener('scroll', queueReading, { passive: true });
window.addEventListener('resize', queueReading);
reducedMotion.addEventListener('change', () => {
  if (reducedMotion.matches) { heroPhoto.style.transform = ''; mountainPhoto.style.transform = ''; }
  queueReading();
});
// Refresh begins at the opening. In-page shortcuts work normally while reading.
history.scrollRestoration = 'manual';
if (performance.getEntriesByType('navigation')[0]?.type === 'reload') {
  history.replaceState(null, '', location.pathname + location.search);
  window.scrollTo({ top: 0, behavior: 'instant' });
}
window.addEventListener('pageshow', () => {
  if (performance.getEntriesByType('navigation')[0]?.type === 'reload') window.scrollTo({ top: 0, behavior: 'instant' });
  queueReading();
});
updateReading();
document.documentElement.dataset.ready = 'true';
