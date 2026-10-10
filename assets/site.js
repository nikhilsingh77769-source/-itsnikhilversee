const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

const door = $('#door');
const drive = $('#drive');
const enterDrive = $('#enterDrive');
const screens = $$('.screen');
const controls = $$('[data-target]');
const consoleButtons = $$('.console-button');
const place = $('#drivePlace');
const tripCount = $('#tripCount');

const places = {
  drive: 'Somewhere between here and next',
  route: 'Route memory loaded',
  engine: 'The engine room',
  radio: 'Signal found',
  glovebox: 'Personal effects',
  home: 'Route recalculating: home',
  signal: 'Transmission open'
};

const scenes = {
  drive: 'drive',
  route: 'delhi',
  engine: 'engine',
  radio: 'radio',
  glovebox: 'glovebox',
  home: 'home',
  signal: 'signal'
};

let currentScreen = 'drive';
let trip = 0;
let tripTimer;

function startTripCounter() {
  clearInterval(tripTimer);
  tripTimer = window.setInterval(() => {
    trip += 1;
    tripCount.textContent = String(trip).padStart(5, '0');
    if (trip >= 24) clearInterval(tripTimer);
  }, 70);
}

function enter() {
  door.classList.add('closed');
  drive.classList.add('ready');
  drive.setAttribute('aria-hidden', 'false');
  window.localStorage.setItem('nikhil-drive-entered', 'true');
  startTripCounter();
  window.setTimeout(() => $('.console-button').focus({ preventScroll: true }), 850);
}

function showScreen(name, updateHash = true) {
  const next = $(`[data-screen="${name}"]`);
  if (!next) return;
  currentScreen = name;
  screens.forEach((screen) => {
    const active = screen === next;
    screen.hidden = !active;
    screen.classList.toggle('active', active);
  });
  controls.forEach((button) => button.classList.toggle('active', button.dataset.target === name));
  drive.dataset.scene = scenes[name];
  place.textContent = places[name];
  if (updateHash) history.replaceState(null, '', name === 'drive' ? location.pathname : `#${name}`);
  next.scrollTop = 0;
}

enterDrive.addEventListener('click', enter);

controls.forEach((button) => {
  button.addEventListener('click', () => showScreen(button.dataset.target));
});

$$('[data-first-target]').forEach((button) => {
  button.addEventListener('click', () => {
    drive.classList.add('trip-started');
    showScreen(button.dataset.firstTarget);
  });
});

$$('[data-screen-link]').forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    showScreen(link.dataset.screenLink);
  });
});

const routeSceneCopy = {
  delhi: 'Delhi · the root and the return',
  mumbai: 'Mumbai · the unplanned chapter',
  bengaluru: 'Bengaluru · now'
};

$$('[data-route-scene]').forEach((button) => {
  button.addEventListener('click', () => {
    $$('.route-stop').forEach((stop) => stop.classList.toggle('active', stop.contains(button)));
    drive.dataset.scene = button.dataset.routeScene;
    place.textContent = routeSceneCopy[button.dataset.routeScene];
  });
});

const stations = {
  music: {
    number: '88.1',
    kicker: 'ON REPEAT',
    title: 'The plot continues<br>inside a parked car.',
    text: 'Reached home 40 minutes ago. Still sitting in the car because the playlist refuses to end the scene.',
    link: 'the original thought ↗',
    href: 'https://x.com/itsnikhilversee/status/2081462201479733641'
  },
  cars: {
    number: '91.7',
    kicker: 'EXPENSIVE PERSONALITY TRAIT',
    title: 'I noticed the shape<br>before the specs.',
    text: 'The BMW M4 F82 started it. The Cruze stayed in memory. Cars became a language for freedom long before they became possessions.',
    link: 'where the obsession began ↗',
    href: 'https://x.com/itsnikhilversee/status/1604792148263436289'
  },
  mountains: {
    number: '96.4',
    kicker: 'LESS NOISE',
    title: 'The problems wait.<br>I return lighter.',
    text: 'The mountains do not solve the week. They make enough silence for a better question to arrive.',
    link: 'the long note ↗',
    href: 'https://x.com/itsnikhilversee/status/2080717938701836336'
  },
  cricket: {
    number: '101.9',
    kicker: 'ALWAYS LIVE',
    title: 'First a fan.<br>Then inside the game.',
    text: 'Cricket was already part of my voice. Dream Cricket gave me the strange privilege of studying why a digital shot feels right.',
    link: 'the all-night sprint ↗',
    href: 'https://www.linkedin.com/feed/update/urn:li:activity:7477601772543328256/'
  },
  people: {
    number: '107.3',
    kicker: 'THE REAL FLEX',
    title: 'I am not self-made.<br>I am people-made.',
    text: 'Friends gave courage, confidence, memory, and somewhere softer to land. Ambition makes more sense when there are people to share it with.',
    link: 'the friendship note ↗',
    href: 'https://www.linkedin.com/feed/update/urn:li:activity:7489526646002089985/'
  }
};

$$('.station').forEach((button) => {
  button.addEventListener('click', () => {
    const station = stations[button.dataset.station];
    $$('.station').forEach((item) => {
      const active = item === button;
      item.classList.toggle('active', active);
      item.setAttribute('aria-selected', String(active));
    });
    $('#stationNumber').textContent = station.number;
    $('#stationKicker').textContent = station.kicker;
    $('#radioTitle').innerHTML = station.title;
    $('#stationText').textContent = station.text;
    $('#stationLink').textContent = station.link;
    $('#stationLink').href = station.href;
  });
});

document.addEventListener('keydown', (event) => {
  if (door.classList.contains('closed') === false) {
    if (event.key === 'Enter' || event.key === ' ') enter();
    return;
  }
  if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
  const order = consoleButtons.map((button) => button.dataset.target);
  const index = order.indexOf(currentScreen);
  const offset = event.key === 'ArrowRight' ? 1 : -1;
  const next = order[(index + offset + order.length) % order.length];
  showScreen(next);
  $(`.console-button[data-target="${next}"]`).focus({ preventScroll: true });
});

const initial = location.hash.slice(1);
if (screens.some((screen) => screen.dataset.screen === initial)) showScreen(initial, false);

if (window.matchMedia('(max-width: 680px)').matches && window.localStorage.getItem('nikhil-drive-entered') === 'true') {
  enterDrive.textContent = 'Get back in →';
}
