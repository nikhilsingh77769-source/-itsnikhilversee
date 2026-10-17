const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

const menuButton = $('#menuButton');
const siteNav = $('#siteNav');
const closeMenu = () => {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.textContent = 'Menu';
  siteNav.classList.remove('open');
};
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.textContent = open ? 'Close' : 'Menu';
  siteNav.classList.toggle('open', open);
});
$$('a', siteNav).forEach((link) => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeMenu(); });

const routeTargets = { work: '#work', motion: '#timeline', human: '#archive' };
const routeMessages = {
  work: 'Starting with the work. The rest of him will interrupt soon enough.',
  motion: 'Starting with the road. Cities, cars, mountains, then everything underneath.',
  human: 'Starting with the person. Music, people, home, and the thoughts between.'
};
$$('.route-choice').forEach((button) => {
  button.addEventListener('click', () => {
    const route = button.dataset.routeChoice;
    document.body.dataset.route = route;
    $$('.route-choice').forEach((choice) => choice.classList.toggle('selected', choice === button));
    $('#routeStatus').textContent = routeMessages[route];
    window.setTimeout(() => $(routeTargets[route]).scrollIntoView({ behavior: 'smooth' }), 280);
  });
});

const worlds = {
  music: { number: '01', kicker: 'AFTER HOURS', title: 'The car is parked.\nThe song is not done.', text: 'Sometimes I reach home and sit in the car for forty more minutes because the playlist understands the assignment.', link: 'Open this memory ↗', href: 'https://x.com/itsnikhilversee/status/2081462201479733641' },
  mountains: { number: '02', kicker: 'THE RESET', title: 'I go back\nto become lighter.', text: 'The mountains do not fix my life. They remove the noise long enough for me to hear the better question.', link: 'Read why I keep going back ↗', href: 'https://x.com/itsnikhilversee/status/2080717938701836336' },
  training: { number: '03', kicker: 'PROGRESSIVE OVERLOAD', title: 'Failure, with a name\nand a plan.', text: 'In the gym, failing a rep can still mean progress. Life is teaching me to trust the same process when growth is harder to see.', link: 'Read the training note ↗', href: 'https://www.linkedin.com/feed/update/urn:li:activity:7461664315939561472/' },
  people: { number: '04', kicker: 'THE REAL FLEX', title: 'I am not self-made.\nI am people-made.', text: 'People give us courage, confidence, memory, and somewhere softer to land. Feeling loved is still the biggest flex.', link: 'Read the Friendship Day note ↗', href: 'https://www.linkedin.com/feed/update/urn:li:activity:7489526646002089985/' },
  cricket: { number: '05', kicker: 'ALWAYS LIVE', title: 'The opinion arrives\nbefore the result.', text: 'Cricket was part of the voice before it became part of the work. Match takes, team debates, and the game that never stays only a game.', link: 'Find the unfiltered commentary ↗', href: 'https://x.com/itsnikhilversee' }
};

$$('.world-tab').forEach((button) => {
  button.addEventListener('click', () => {
    const key = button.dataset.world;
    const world = worlds[key];
    $$('.world-tab').forEach((item) => { const active = item === button; item.classList.toggle('active', active); item.setAttribute('aria-selected', String(active)); });
    const panel = $('#worldPanel');
    panel.dataset.world = key;
    $('#worldNumber').textContent = world.number;
    $('#worldKicker').textContent = world.kicker;
    $('#worldTitle').innerHTML = world.title.replace('\n', '<br>');
    $('#worldText').textContent = world.text;
    const link = $('#worldLink'); link.textContent = world.link; link.href = world.href;
  });
});

const cityCards = $$('.city-card');
cityCards.forEach((card) => {
  const activate = () => cityCards.forEach((item) => item.classList.toggle('active', item === card));
  card.addEventListener('mouseenter', activate);
  card.addEventListener('focusin', activate);
});

const chapterLinks = $$('.chapter-rail a');
if ('IntersectionObserver' in window) {
  const chapterObserver = new IntersectionObserver((entries) => {
    const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    chapterLinks.forEach((link) => {
      const active = link.getAttribute('href') === `#${visible.target.id}`;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current');
    });
  }, { rootMargin: '-20% 0px -65%', threshold: [0, .2, .5] });
  ['timeline', 'work', 'road', 'archive', 'notes', 'hello'].forEach((id) => {
    const section = document.getElementById(id);
    if (section) chapterObserver.observe(section);
  });
}

const progressBar = $('#progressBar');
let scheduled = false;
const updateProgress = () => {
  const height = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = height > 0 ? `${Math.min(100, (window.scrollY / height) * 100)}%` : '0%';
  scheduled = false;
};
window.addEventListener('scroll', () => { if (!scheduled) { scheduled = true; requestAnimationFrame(updateProgress); } }, { passive: true });
window.addEventListener('resize', updateProgress);
$('#year').textContent = new Date().getFullYear();
updateProgress();
