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
const places = { drive: 'Somewhere between here and next', route: 'Route memory loaded', engine: 'The engine room', radio: 'Signal found · 88.1', glovebox: 'Personal effects', home: 'Route recalculating: home', signal: 'Transmission open' };
const scenes = { drive: 'drive', route: 'delhi', engine: 'engine', radio: 'radio', glovebox: 'glovebox', home: 'home', signal: 'signal' };
let currentScreen = 'drive';
let trip = 0;
let tripTimer;
let routeTimer;

function emitScene(scene) {
  window.dispatchEvent(new CustomEvent('journeychange', { detail: { scene } }));
}

function startTripCounter() {
  clearInterval(tripTimer);
  tripTimer = setInterval(() => {
    trip += 1;
    tripCount.textContent = String(trip).padStart(5, '0');
    if (trip >= 47) clearInterval(tripTimer);
  }, 62);
}

function enter() {
  door.classList.add('closed');
  drive.classList.add('ready');
  drive.setAttribute('aria-hidden', 'false');
  localStorage.setItem('nikhil-drive-entered', 'true');
  startTripCounter();
  window.dispatchEvent(new Event('journeystart'));
  setTimeout(() => window.dispatchEvent(new Event('journeystop')), 1700);
  setTimeout(() => $('.console-button').focus({ preventScroll: true }), 850);
}

function showScreen(name, updateHash = true) {
  const next = $(`[data-screen="${name}"]`);
  if (!next) return;
  clearInterval(routeTimer);
  $('#startRoute')?.classList.remove('playing');
  currentScreen = name;
  screens.forEach((screen) => {
    const active = screen === next;
    screen.hidden = !active;
    screen.classList.toggle('active', active);
  });
  controls.forEach((button) => button.classList.toggle('active', button.dataset.target === name));
  drive.dataset.scene = scenes[name];
  place.textContent = places[name];
  emitScene(scenes[name]);
  if (updateHash) history.replaceState(null, '', name === 'drive' ? location.pathname : `#${name}`);
  next.scrollTop = 0;
}

enterDrive.addEventListener('click', enter);
controls.forEach((button) => button.addEventListener('click', () => showScreen(button.dataset.target)));
$$('[data-first-target]').forEach((button) => button.addEventListener('click', () => {
  drive.classList.add('trip-started', 'accelerating');
  window.dispatchEvent(new Event('journeystart'));
  setTimeout(() => drive.classList.remove('accelerating'), 1500);
  setTimeout(() => window.dispatchEvent(new Event('journeystop')), 1800);
  showScreen(button.dataset.firstTarget);
}));
$$('[data-screen-link]').forEach((link) => link.addEventListener('click', (event) => {
  event.preventDefault();
  showScreen(link.dataset.screenLink);
}));

const routeSceneCopy = {
  delhi: 'Delhi · the root and the first drive',
  mumbai: 'Mumbai · the chapter I did not plan',
  'delhi-return': 'Delhi · returning changed the view',
  bengaluru: 'Bengaluru · 47 km, 2 hr 22 min, hello'
};
const routeMemories = {
  delhi: { image: '/assets/nikhil-delhi-view.jpg', alt: "Delhi seen through Nikhil's camera", caption: 'Home is the place I keep leaving and keep carrying.' },
  mumbai: { image: '/assets/nikhil-mumbai-skyline.jpg', alt: "Mumbai skyline from Nikhil's time there", caption: 'I did not plan to love this city. That was probably why I did.' },
  'delhi-return': { image: '/assets/nikhil-car-playlist.jpg', alt: "A night drive and playlist from Nikhil's camera", caption: 'Same roads. Different person behind the wheel.' },
  bengaluru: { image: '/assets/nikhil-bengaluru-board.jpg', alt: 'Bengaluru arrival sign photographed by Nikhil', caption: 'The newest pin on a map that is still being drawn.' }
};
const routeButtons = $$('[data-route-scene]');

function selectRouteStop(button, index = routeButtons.indexOf(button)) {
  $$('.route-stop').forEach((stop) => stop.classList.toggle('active', stop.contains(button)));
  const scene = button.dataset.routeScene;
  drive.dataset.scene = scene;
  place.textContent = routeSceneCopy[scene];
  const memory = routeMemories[scene];
  $('#routeImage').src = memory.image;
  $('#routeImage').alt = memory.alt;
  $('#routeCaption').textContent = memory.caption;
  $('#routeStatus').textContent = `Stop ${index + 1} of ${routeButtons.length} · ${button.querySelector('strong').textContent}`;
  drive.classList.add('route-flash');
  setTimeout(() => drive.classList.remove('route-flash'), 650);
  emitScene(scene);
}

routeButtons.forEach((button, index) => button.addEventListener('click', () => selectRouteStop(button, index)));
$('#startRoute')?.addEventListener('click', (event) => {
  const trigger = event.currentTarget;
  if (trigger.classList.contains('playing')) {
    clearInterval(routeTimer);
    trigger.classList.remove('playing');
    trigger.querySelector('span').textContent = 'Resume the route';
    window.dispatchEvent(new Event('journeystop'));
    return;
  }
  trigger.classList.add('playing');
  trigger.querySelector('span').textContent = 'Pause the route';
  let index = 0;
  selectRouteStop(routeButtons[index], index);
  window.dispatchEvent(new Event('journeystart'));
  routeTimer = setInterval(() => {
    index += 1;
    if (index >= routeButtons.length) {
      clearInterval(routeTimer);
      trigger.classList.remove('playing');
      trigger.querySelector('span').textContent = 'Drive it again';
      window.dispatchEvent(new Event('journeystop'));
      return;
    }
    selectRouteStop(routeButtons[index], index);
  }, 3300);
});

const tracks = {
  airplane: [
    { title: 'Pehli Nazar Mein', artist: 'Atif Aslam & Pritam', count: '92 plays', art: 'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/38/44/21/384421ca-69a0-83f2-0a34-88653d45db97/8901854001385.jpg/400x400bb.jpg', preview: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/0d/db/cf/0ddbcf31-22d7-088e-c71f-1dd88a3dd8a2/mzaf_16563349538675654632.plus.aac.p.m4a', apple: 'https://music.apple.com/in/album/pehli-nazar-mein/1537030727?i=1537031094' },
    { title: 'Tere Bin', artist: 'Atif Aslam', count: '75 plays', art: 'https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/32/c3/a7/32c3a7c9-c4b2-5448-0f4d-2915971ed76f/8901854000029.jpg/400x400bb.jpg', preview: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/c6/a3/58/c6a358b3-8cb6-5cc5-1308-18f37d020a1b/mzaf_13194969397587329790.plus.aac.p.m4a', apple: 'https://music.apple.com/in/album/tere-bin/1537450561?i=1537451077' }
  ],
  gedi: [
    { title: 'Lemonade', artist: 'Diljit Dosanjh', count: '81 plays', art: 'https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/1b/2b/c5/1b2bc5ce-f6c1-c6c2-69bc-d5bc804701c7/859763661467_cover.jpg/400x400bb.jpg', preview: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/18/27/b1/1827b18b-6b70-6c1d-3665-38f2c0effc74/mzaf_158287080029555485.plus.aac.p.m4a', apple: 'https://music.apple.com/in/album/lemonade/1633626644?i=1633627190' },
    { title: 'Noormahal', artist: 'Chani Nattan, Inderpal Moga & J-Statik', count: '154 plays', art: 'https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/52/60/d7/5260d73e-be23-eb0c-9a17-30ffee9fc0f1/cover.jpg/400x400bb.jpg', preview: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/cd/a5/7b/cda57bd2-cb15-e353-a286-cac178358ada/mzaf_16031356656396228544.plus.aac.p.m4a', apple: 'https://music.apple.com/in/album/noormahal/1702861400?i=1702861786' }
  ],
  high: [
    { title: 'Jat Clan', artist: 'Dhanda Nyoliwala & Yogi Aulakh', count: '132 plays', art: 'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/51/90/65/5190659b-b801-9c7c-959e-c86e5725b192/24UMGIM31366.rgb.jpg/400x400bb.jpg', preview: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/97/77/cb/9777cb9a-7675-092a-bf00-ec305be1deff/mzaf_4755001481882689009.plus.aac.p.m4a', apple: 'https://music.apple.com/in/album/jat-clan/1737196303?i=1737196354' },
    { title: 'BLACK RIDE', artist: 'Dhanda Nyoliwala & Hammy Muzic', count: '130 plays', art: 'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/00/ce/36/00ce3668-0448-2001-4afb-dc8ccc3f1a14/25UM1IM52042.rgb.jpg/400x400bb.jpg', preview: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/0c/9f/ea/0c9fea94-29e9-0ff3-eb10-c388711ed976/mzaf_9606923577355059215.plus.aac.p.m4a', apple: 'https://music.apple.com/in/album/black-ride/1842580772?i=1842580773' }
  ],
  mix: [
    { title: 'Yaariyan', artist: 'Billa Sonipat Ala', count: '125 plays', art: 'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/6b/bc/33/6bbc331c-6bc2-9993-4280-500d8459aa23/820233621502.jpg/400x400bb.jpg', preview: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/62/af/19/62af1940-def7-d3c1-3373-54211f334b26/mzaf_7618972377483756395.plus.aac.p.m4a', apple: 'https://music.apple.com/in/album/yaariyan/6775438989?i=6775438994' },
    { title: 'Spellbound', artist: 'Dhanda Nyoliwala & Xvir Grewal', count: '124 plays', art: 'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/6f/71/ed/6f71ed1c-48b0-197a-e1be-07357e48e9b5/24UMGIM32018.rgb.jpg/400x400bb.jpg', preview: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/5f/a4/22/5fa42282-ee34-dc4a-20ed-2b79bf314003/mzaf_5460595601913836422.plus.aac.p.m4a', apple: 'https://music.apple.com/in/album/spellbound/1737196597?i=1737196600' }
  ]
};

const audio = new Audio();
audio.preload = 'none';
let playlist = 'airplane';
let trackIndex = 0;
function currentTrack() { return tracks[playlist][trackIndex]; }

function renderTrack(autoplay = false) {
  const track = currentTrack();
  audio.src = track.preview;
  $('#trackArt').src = track.art;
  $('#trackArt').alt = `${track.title} artwork`;
  $('#radioTitle').textContent = track.title;
  $('#trackArtist').textContent = `${track.artist} · ${track.count}`;
  $('#stationLink').href = track.apple;
  $('#stationLink').textContent = 'open this track in Apple Music ↗';
  $('#miniArt').src = track.art.replace('400x400', '100x100');
  $('#miniTitle').textContent = track.title;
  $('#miniArtist').textContent = track.artist;
  $('#playProgress').style.width = '0%';
  updatePlayState(false);
  if (autoplay) audio.play().catch(() => {});
}

function updatePlayState(playing = !audio.paused) {
  $('#playTrack').textContent = playing ? 'PAUSE' : 'PLAY';
  $('#miniState').textContent = playing ? 'Ⅱ' : '▶';
  drive.classList.toggle('music-playing', playing);
}
function toggleAudio() {
  if (!audio.src) renderTrack();
  if (audio.paused) audio.play().catch(() => {}); else audio.pause();
}
function stepTrack(direction) {
  const set = tracks[playlist];
  trackIndex = (trackIndex + direction + set.length) % set.length;
  renderTrack(true);
}

$$('[data-playlist]').forEach((button) => button.addEventListener('click', () => {
  playlist = button.dataset.playlist;
  trackIndex = 0;
  $$('.station').forEach((item) => {
    const active = item === button;
    item.classList.toggle('active', active);
    item.setAttribute('aria-selected', String(active));
  });
  $('#stationKicker').textContent = button.lastChild.textContent.trim();
  renderTrack(true);
}));
$('#playTrack').addEventListener('click', toggleAudio);
$('#miniPlayer').addEventListener('click', toggleAudio);
$('#prevTrack').addEventListener('click', () => stepTrack(-1));
$('#nextTrack').addEventListener('click', () => stepTrack(1));
audio.addEventListener('play', () => updatePlayState(true));
audio.addEventListener('pause', () => updatePlayState(false));
audio.addEventListener('ended', () => stepTrack(1));
audio.addEventListener('timeupdate', () => {
  const progress = audio.duration ? audio.currentTime / audio.duration * 100 : 0;
  $('#playProgress').style.width = `${progress}%`;
});

document.addEventListener('keydown', (event) => {
  if (!door.classList.contains('closed')) {
    if (event.key === 'Enter' || event.key === ' ') enter();
    return;
  }
  if (!['ArrowLeft', 'ArrowRight'].includes(event.key) || /INPUT|BUTTON|A/.test(document.activeElement.tagName)) return;
  const order = consoleButtons.map((button) => button.dataset.target);
  const index = order.indexOf(currentScreen);
  const offset = event.key === 'ArrowRight' ? 1 : -1;
  const next = order[(index + offset + order.length) % order.length];
  showScreen(next);
  $(`.console-button[data-target="${next}"]`).focus({ preventScroll: true });
});

const initial = location.hash.slice(1);
if (screens.some((screen) => screen.dataset.screen === initial)) showScreen(initial, false);
if (matchMedia('(max-width: 680px)').matches && localStorage.getItem('nikhil-drive-entered') === 'true') enterDrive.textContent = 'Get back in →';
renderTrack();
