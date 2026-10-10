const $ = (selector) => document.querySelector(selector);

const menuToggle = $('#menuToggle');
const navLinks = $('#navLinks');
const closeMenu = () => {
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open menu');
  navLinks.classList.remove('open');
};

menuToggle.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') !== 'true';
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  navLinks.classList.toggle('open', open);
});
navLinks.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});

const thoughts = [
  'A good question can change the whole day.',
  'Some songs know you before you know yourself.',
  'There is always one more tab open in my head.',
  'Maybe the long way around is the story.',
  'The best ideas usually start with “wait, why?”'
];
let thoughtIndex = -1;
$('#thoughtButton').addEventListener('click', () => {
  thoughtIndex = (thoughtIndex + 1) % thoughts.length;
  $('#randomThought').textContent = thoughts[thoughtIndex];
});

const worlds = {
  music: {
    kicker: 'THE SOUNDTRACK', symbol: '♫', number: '01',
    title: 'Some songs say it first.',
    text: 'Hip hop, Bollywood, and whatever can carry a mood better than I can explain it.',
    link: 'Find me on Apple Music', href: 'https://music.apple.com/profile/itsnikhilversee'
  },
  cars: {
    kicker: 'THE OBSESSION', symbol: '↗', number: '02',
    title: 'Yes, I’ll look back at it.',
    text: 'The lines, the details, the feeling of going somewhere. Cars are design and possibility in one beautiful object.',
    link: 'See what catches my eye', href: 'https://www.instagram.com/itsnikhilversee/'
  },
  training: {
    kicker: 'THE DISCIPLINE', symbol: '✳', number: '03',
    title: 'One more rep. Then another.',
    text: 'Training gives me a simple promise to keep: show up, do the work, come back tomorrow.',
    link: 'A little more of my life', href: 'https://www.instagram.com/itsnikhilversee/'
  },
  places: {
    kicker: 'THE WANDERLUST', symbol: '⌁', number: '04',
    title: 'I like the in-between.',
    text: 'New streets, unfamiliar turns, and that moment a place starts feeling a little less new.',
    link: 'See my moments', href: 'https://www.instagram.com/itsnikhilversee/'
  },
  people: {
    kicker: 'THE HEART OF IT', symbol: '♡', number: '05',
    title: 'The people make the place.',
    text: 'I like independence. I like conversation. I miss home. All of that can be true at once.',
    link: 'Read the quieter note', href: '#home'
  },
  words: {
    kicker: 'THE OPEN TABS', symbol: '✎', number: '06',
    title: 'Sometimes I write it down.',
    text: 'Questions, half-formed ideas, and lines that arrive before I know what to do with them.',
    link: 'Read a few thoughts', href: '#words'
  }
};

const stage = $('#worldStage');
document.querySelectorAll('.world-control').forEach((button) => {
  button.addEventListener('click', () => {
    const key = button.dataset.world;
    const world = worlds[key];
    if (!world) return;
    document.querySelectorAll('.world-control').forEach((control) => {
      const active = control === button;
      control.classList.toggle('active', active);
      control.setAttribute('aria-pressed', String(active));
    });
    stage.dataset.world = key;
    $('#worldKicker').textContent = world.kicker;
    $('#worldSymbol').textContent = world.symbol;
    $('#worldWatermark').textContent = world.number;
    $('#worldTitle').textContent = world.title;
    $('#worldText').textContent = world.text;
    $('#worldCount').textContent = `${world.number} — 06`;
    const link = $('#worldLink');
    link.firstChild.textContent = `${world.link} `;
    link.href = world.href;
    if (world.href.startsWith('#')) {
      link.removeAttribute('target');
      link.removeAttribute('rel');
    } else {
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    }
  });
});

$('#year').textContent = new Date().getFullYear();
const progress = $('#scrollProgress');
let scrolling = false;
const updateProgress = () => {
  const distance = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${distance > 0 ? Math.min(100, window.scrollY / distance * 100) : 0}%`;
  scrolling = false;
};
window.addEventListener('scroll', () => {
  if (!scrolling) {
    scrolling = true;
    requestAnimationFrame(updateProgress);
  }
}, { passive: true });
window.addEventListener('resize', updateProgress);
updateProgress();
