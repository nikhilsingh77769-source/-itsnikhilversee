const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

const menuButton = $('#menuButton');
const mobileMenu = $('#mobileMenu');
const closeMenu = () => {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.textContent = 'Menu';
  mobileMenu.classList.remove('open');
  document.body.classList.remove('menu-open');
};

menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.textContent = open ? 'Close' : 'Menu';
  mobileMenu.classList.toggle('open', open);
  document.body.classList.toggle('menu-open', open);
});
$$('a', mobileMenu).forEach((link) => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeMenu(); });

const choiceMessages = {
  work: 'First turn: the work. The road will interrupt soon enough.',
  route: 'First turn: the cities. Four places, several versions.',
  'after-hours': 'First turn: the person after work. Good choice.'
};

$$('.conversation').forEach((button) => {
  button.addEventListener('click', () => {
    const destination = button.dataset.destination;
    $$('.conversation').forEach((item) => item.classList.toggle('selected', item === button));
    $('#chooseNote').textContent = choiceMessages[destination];
    window.setTimeout(() => document.getElementById(destination).scrollIntoView({ behavior: 'smooth' }), 260);
  });
});

const worlds = {
  music: {
    number: '01', kicker: 'MUSIC / PARKED, STILL PLAYING',
    title: 'The car is home.\nI am not done yet.',
    text: 'Sometimes I reach home and sit in the car for forty more minutes because the playlist understands the assignment.',
    link: 'Open this memory ↗', href: 'https://x.com/itsnikhilversee/status/2081462201479733641'
  },
  mountains: {
    number: '02', kicker: 'MOUNTAINS / THE RESET',
    title: 'The problems wait.\nI return lighter.',
    text: 'The mountains do not fix my life. They remove the noise long enough for me to hear the better question.',
    link: 'Read why I keep going back ↗', href: 'https://x.com/itsnikhilversee/status/2080717938701836336'
  },
  training: {
    number: '03', kicker: 'TRAINING / PROGRESSIVE OVERLOAD',
    title: 'Failure, with a name\nand a plan.',
    text: 'In the gym, failing a rep can still mean progress. Life is teaching me to trust the same process when growth is harder to see.',
    link: 'Read the training note ↗', href: 'https://www.linkedin.com/feed/update/urn:li:activity:7461664315939561472/'
  },
  people: {
    number: '04', kicker: 'PEOPLE / THE REAL FLEX',
    title: 'I am not self-made.\nI am people-made.',
    text: 'People give us courage, confidence, memory, and somewhere softer to land. Feeling loved is still the biggest flex.',
    link: 'Read the Friendship Day note ↗', href: 'https://www.linkedin.com/feed/update/urn:li:activity:7489526646002089985/'
  },
  cricket: {
    number: '05', kicker: 'CRICKET / NEVER ONLY A GAME',
    title: 'The opinion arrives\nbefore the result.',
    text: 'Cricket was part of the voice before it became part of the work. Match takes, team debates, and the game that never stays only a game.',
    link: 'Find the unfiltered commentary ↗', href: 'https://x.com/itsnikhilversee'
  }
};

$$('.world-button').forEach((button) => {
  button.addEventListener('click', () => {
    const key = button.dataset.world;
    const world = worlds[key];
    $$('.world-button').forEach((item) => {
      const active = item === button;
      item.classList.toggle('active', active);
      item.setAttribute('aria-selected', String(active));
    });
    const stage = $('#worldStage');
    stage.dataset.world = key;
    $('#worldKicker').textContent = world.kicker;
    $('#worldTitle').innerHTML = world.title.replace('\n', '<br>');
    $('#worldText').textContent = world.text;
    $('#worldNumber').textContent = world.number;
    $('#worldLink').textContent = world.link;
    $('#worldLink').href = world.href;
  });
});

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -8%', threshold: 0.08 });
  $$('.reveal:not(.hero .reveal)').forEach((item) => revealObserver.observe(item));

  const cityObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => entry.target.classList.toggle('is-visible', entry.isIntersecting));
  }, { threshold: 0.25 });
  $$('.city').forEach((city) => cityObserver.observe(city));

  const railLinks = $$('.journey-rail a');
  const chapterObserver = new IntersectionObserver((entries) => {
    const activeEntry = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!activeEntry) return;
    railLinks.forEach((link) => {
      const active = link.dataset.section === activeEntry.target.id;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current');
    });
  }, { rootMargin: '-20% 0px -65%', threshold: [0, 0.2, 0.5] });
  ['route', 'work', 'road', 'after-hours', 'home'].forEach((id) => chapterObserver.observe(document.getElementById(id)));
} else {
  $$('.reveal').forEach((item) => item.classList.add('in-view'));
}

const pageProgress = $('#pageProgress');
const railProgress = $('#railProgress');
const tripProgress = $('#tripProgress');
let ticking = false;
const updateProgress = () => {
  const total = document.documentElement.scrollHeight - window.innerHeight;
  const progress = total > 0 ? Math.min(100, Math.max(0, (window.scrollY / total) * 100)) : 0;
  pageProgress.style.width = `${progress}%`;
  railProgress.style.width = `${progress}%`;
  tripProgress.textContent = `${String(Math.round(progress)).padStart(2, '0')}%`;
  ticking = false;
};
window.addEventListener('scroll', () => {
  if (!ticking) { ticking = true; window.requestAnimationFrame(updateProgress); }
}, { passive: true });
window.addEventListener('resize', updateProgress);
$('#year').textContent = new Date().getFullYear();
updateProgress();

