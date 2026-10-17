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

const channels = {
  music: { number: '88.1', kicker: 'NOW PLAYING', title: 'The song that refuses to end.', text: 'Sometimes I reach home and sit in the car for forty more minutes because the playlist understands the assignment.', link: 'Open this memory ↗', href: 'https://x.com/itsnikhilversee/status/2081462201479733641' },
  mountains: { number: '91.7', kicker: 'THE RESET', title: 'I go back to become lighter.', text: 'The mountains do not fix my life. They remove the noise long enough for me to hear the better question.', link: 'Read why I keep going back ↗', href: 'https://x.com/itsnikhilversee/status/2080717938701836336' },
  training: { number: '96.4', kicker: 'PROGRESSIVE OVERLOAD', title: 'Failure, with a name and a plan.', text: 'In the gym, failing a rep can still mean progress. Life is teaching me to trust the same process when growth is harder to see.', link: 'Read the training note ↗', href: 'https://www.linkedin.com/feed/update/urn:li:activity:7461664315939561472/' },
  people: { number: '101.9', kicker: 'THE REAL FLEX', title: 'I feel loved.', text: 'Nobody is completely self-made. People give us courage, confidence, memory, and somewhere softer to land.', link: 'Read the Friendship Day note ↗', href: 'https://www.linkedin.com/feed/update/urn:li:activity:7489526646002089985/' },
  cricket: { number: '107.3', kicker: 'ALWAYS LIVE', title: 'The opinion arrives before the result.', text: 'Cricket was part of the voice before it became part of the work. Match takes, team debates, and the game that never stays only a game.', link: 'Find the unfiltered commentary ↗', href: 'https://x.com/itsnikhilversee' }
};

$$('.freq').forEach((button) => {
  button.addEventListener('click', () => {
    const key = button.dataset.freq;
    const channel = channels[key];
    $$('.freq').forEach((item) => { const active = item === button; item.classList.toggle('active', active); item.setAttribute('aria-selected', String(active)); });
    const panel = $('#radioPanel');
    panel.dataset.channel = key;
    $('#radioNumber').textContent = channel.number;
    $('#radioKicker').textContent = channel.kicker;
    $('#radioTitle').textContent = channel.title;
    $('#radioText').textContent = channel.text;
    const link = $('#radioLink'); link.textContent = channel.link; link.href = channel.href;
  });
});

const cityCards = $$('.city-card');
cityCards.forEach((card) => {
  const activate = () => cityCards.forEach((item) => item.classList.toggle('active', item === card));
  card.addEventListener('mouseenter', activate);
  card.addEventListener('focusin', activate);
});

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
