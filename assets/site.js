const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

const journeys = {
  road: {
    label: 'THE ROAD', tint: '#b9674e',
    stops: [
      { year: 'ORIGIN', place: 'DELHI', aside: 'Before every departure', title: 'Home is the place I keep leaving.', text: 'Delhi gave me my first roads, my first reasons to look at cars twice, and the certainty that however far I go, some part of me is still trying to get home before dinner.', image: '/assets/nikhil-delhi-view.jpg', alt: "Delhi through Nikhil's camera", link: 'https://x.com/itsnikhilversee/status/2108875377791951186' },
      { year: 'THE FIRST LOVE', place: 'SOMEWHERE ON THE ROAD', aside: 'I love, breathe cars', title: 'The shape came before the specs.', text: 'A BMW M4 F82 started the obsession. The Cruze stayed in memory. Cars became a language for freedom long before they became possessions.', image: '/assets/story-beemer.jpg', alt: "A drive from Nikhil's Beemer stories", link: 'https://x.com/itsnikhilversee/status/1604792148263436289' },
      { year: '2025', place: 'MUMBAI', aside: 'The chapter I did not plan', title: 'Then a city surprised me.', text: 'Mumbai arrived through work and became more personal than expected. Long nights, cricket, skyline silence, and the strange ache of leaving a place I never planned to love.', image: '/assets/nikhil-mumbai-skyline.jpg', alt: "Mumbai skyline photographed by Nikhil", link: 'https://x.com/itsnikhilversee/status/2091462322569269382' },
      { year: 'WHEN IT GETS LOUD', place: 'THE MOUNTAINS', aside: 'Less signal. Better questions.', title: 'I leave to hear myself again.', text: 'The mountains never solve the week. They make enough silence for a better question to arrive. That has usually been enough.', image: '/assets/story-jibhi.jpg', alt: "A mountain road from Nikhil's travels", link: 'https://x.com/itsnikhilversee/status/2080717938701836336' },
      { year: 'NOW', place: 'BENGALURU', aside: '47 km · 2 hr 22 min', title: 'The map is still being drawn.', text: 'A new city, another traffic story, and a version of me that has learned to arrive without pretending he already knows the way.', image: '/assets/nikhil-bengaluru-board.jpg', alt: 'Bengaluru arrival sign photographed by Nikhil', link: 'https://x.com/itsnikhilversee/status/2102736767963263405' }
    ]
  },
  engine: {
    label: 'THE ENGINE', tint: '#9f6953',
    stops: [
      { year: 'FIRST GEAR', place: 'GOMECHANIC', aside: 'Real cars. Real consequences.', title: 'The dashboard never had the whole answer.', text: 'The work began close to the ground: customers calling back, workshops, messy operations, and problems that refused to stay inside a spreadsheet.', image: '/assets/nikhil-car-playlist.jpg', alt: "A car dashboard from Nikhil's camera", link: 'https://www.linkedin.com/in/itsnikhilversee/' },
      { year: 'NEXT GEAR', place: 'PHYSICSWALLAH', aside: 'Numbers with students behind them', title: 'Scale taught me to look closer.', text: 'Every metric represented someone trying to learn, choose, return, or move forward. Growth got interesting when it stopped being an abstract graph.', image: '/assets/nikhil-delhi-view.jpg', alt: "A working evening from Nikhil's camera", link: 'https://www.linkedin.com/in/itsnikhilversee/' },
      { year: '2025', place: 'DREAM11', aside: 'The fan entered the data', title: 'Cricket became the job for a while.', text: 'Dream Cricket made the old obsession useful. Product questions, shot feel, player behaviour, and an all-night sprint that somehow still felt like play.', image: '/assets/nikhil-mumbai-skyline.jpg', alt: "Mumbai during Nikhil's Dream11 chapter", link: 'https://www.linkedin.com/feed/update/urn:li:activity:7477601772543328256/' },
      { year: 'ALWAYS', place: 'SIDE PROJECTS', aside: 'Built because the irritation stayed', title: 'Some things would not leave me alone.', text: 'Eventify, text-to-SQL, small tools, unfinished experiments. I build when a problem keeps tapping the glass.', image: '/assets/nikhil-aravallis.jpg', alt: 'Nikhil working outdoors in the Aravallis', link: 'https://www.linkedin.com/feed/update/urn:li:activity:7467790924903960576/' }
    ]
  },
  head: {
    label: 'THE HEAD', tint: '#80677f',
    stops: [
      { year: '88.1 FM', place: 'PARKED CAR', aside: 'One more song', title: 'The plot continues after I reach home.', text: 'Forty minutes parked downstairs because the playlist has not ended the scene yet. Music is where I let a feeling finish its sentence.', image: '/assets/nikhil-car-playlist.jpg', alt: "Nikhil's playlist playing inside a car", link: 'https://x.com/itsnikhilversee/status/2081462201479733641' },
      { year: 'SINCE FOREVER', place: 'CRICKET', aside: 'Fan first. Analyst later.', title: 'Some games become part of your voice.', text: 'Cricket existed before the job and stayed after it. I can study the data, argue about the shot, then forget both when the match gets close.', image: '/assets/nikhil-bengaluru-flight.jpg', alt: "A view from one of Nikhil's journeys", link: 'https://www.linkedin.com/feed/update/urn:li:activity:7477601772543328256/' },
      { year: 'REPS', place: 'THE GYM', aside: 'NIKBEAST, occasionally', title: 'The body is also a work in progress.', text: 'Discipline looks less cinematic from inside it. Repetition, missed days, starting again, and learning to enjoy what takes time.', image: '/assets/story-training.jpg', alt: 'Nikhil after training', link: 'https://www.instagram.com/itsnikhilversee/' },
      { year: '3:17 AM', place: 'NOTES APP', aside: 'Still thinking', title: 'I romanticise. Then I interrogate it.', text: 'Ideas, overthinking, product questions, dramatic one-liners, and truths that only become honest after the third rewrite.', image: '/assets/story-portrait.jpg', alt: 'A portrait of Nikhil', link: 'https://x.com/itsnikhilversee' }
    ]
  },
  heart: {
    label: 'THE HEART', tint: '#a55d51',
    stops: [
      { year: 'HOME', place: 'MAA', aside: 'Forever mumma’s boy', title: 'Independence has a homesick side.', text: 'I wanted my own room, my own rules, a life that felt chosen. Then one quiet evening in Bengaluru, I missed having my maa close enough to annoy.', image: '/assets/nikhil-bengaluru-flight.jpg', alt: 'The journey between Bengaluru and home', link: 'https://x.com/itsnikhilversee/status/2108875377791951186' },
      { year: 'THE REAL FLEX', place: 'MY PEOPLE', aside: 'People-made', title: 'I am not self-made.', text: 'Friends gave courage, confidence, memory, perspective, and somewhere softer to land. Ambition makes more sense when there are people to share it with.', image: '/assets/story-portrait.jpg', alt: 'A personal portrait of Nikhil', link: 'https://www.linkedin.com/feed/update/urn:li:activity:7489526646002089985/' },
      { year: '7:00 AM', place: 'ARAVALLIS', aside: 'Accidentally booked for a set', title: 'Joy is sometimes very unserious.', text: 'A laptop, a view, a playlist, a joke that became a photograph. Not every memory needs to improve me. Some can simply be good.', image: '/assets/nikhil-aravallis.jpg', alt: 'Nikhil mixing music outdoors in the Aravallis', link: 'https://x.com/itsnikhilversee/status/2099005667222945858' },
      { year: 'OPEN LINE', place: 'YOUR TURN', aside: 'Send a signal', title: 'What are you carrying?', text: 'Bring a song, a product problem, a car opinion, a mountain plan, a cricket argument, or a better opening line. The passenger seat is still warm.', image: '/assets/nikhil-bengaluru-board.jpg', alt: 'A road sign from Nikhil’s latest chapter', link: 'mailto:nikhilsingh77769@gmail.com' }
    ]
  }
};

const radioTracks = [
  { title: 'Noormahal', artist: 'Chani Nattan, Inderpal Moga & J-Statik', art: 'https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/52/60/d7/5260d73e-be23-eb0c-9a17-30ffee9fc0f1/cover.jpg/100x100bb.jpg', preview: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/cd/a5/7b/cda57bd2-cb15-e353-a286-cac178358ada/mzaf_16031356656396228544.plus.aac.p.m4a' },
  { title: 'Jat Clan', artist: 'Dhanda Nyoliwala & Yogi Aulakh', art: 'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/51/90/65/5190659b-b801-9c7c-959e-c86e5725b192/24UMGIM31366.rgb.jpg/100x100bb.jpg', preview: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/97/77/cb/9777cb9a-7675-092a-bf00-ec305be1deff/mzaf_4755001481882689009.plus.aac.p.m4a' },
  { title: 'BLACK RIDE', artist: 'Dhanda Nyoliwala & Hammy Muzic', art: 'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/00/ce/36/00ce3668-0448-2001-4afb-dc8ccc3f1a14/25UM1IM52042.rgb.jpg/100x100bb.jpg', preview: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/0c/9f/ea/0c9fea94-29e9-0ff3-eb10-c388711ed976/mzaf_9606923577355059215.plus.aac.p.m4a' },
  { title: 'Yaariyan', artist: 'Billa Sonipat Ala', art: 'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/6b/bc/33/6bbc331c-6bc2-9993-4280-500d8459aa23/820233621502.jpg/100x100bb.jpg', preview: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/62/af/19/62af1940-def7-d3c1-3373-54211f334b26/mzaf_7618972377483756395.plus.aac.p.m4a' },
  { title: 'Pehli Nazar Mein', artist: 'Atif Aslam & Pritam', art: 'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/38/44/21/384421ca-69a0-83f2-0a34-88653d45db97/8901854001385.jpg/100x100bb.jpg', preview: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/0d/db/cf/0ddbcf31-22d7-088e-c71f-1dd88a3dd8a2/mzaf_16563349538675654632.plus.aac.p.m4a' }
];

const door = $('#door');
const drive = $('#drive');
const picker = $('#journeyPicker');
const moment = $('#momentCard');
const progress = $('#rideProgress');
let activeJourney = null;
let stopIndex = 0;
let trip = 0;
let tripTimer;
let ambientMuted = false;
let engineAudio;
let engineGain;

function dispatch(name, detail = {}) { window.dispatchEvent(new CustomEvent(name, { detail })); }

function startEngineAudio() {
  if (engineAudio) return;
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;
  engineAudio = new AudioContext();
  engineGain = engineAudio.createGain();
  const filter = engineAudio.createBiquadFilter();
  const low = engineAudio.createOscillator();
  const pulse = engineAudio.createOscillator();
  low.type = 'sawtooth'; low.frequency.value = 42;
  pulse.type = 'sine'; pulse.frequency.value = 84;
  filter.type = 'lowpass'; filter.frequency.value = 150;
  engineGain.gain.value = .012;
  low.connect(filter); pulse.connect(filter); filter.connect(engineGain); engineGain.connect(engineAudio.destination);
  low.start(); pulse.start();
}

function enterRide() {
  door.classList.add('closed');
  drive.classList.add('ready');
  drive.setAttribute('aria-hidden', 'false');
  startEngineAudio();
  dispatch('experienceenter');
  setTimeout(() => $('#lookHint').classList.add('dismissed'), 4800);
}

function renderProgress() {
  const stops = journeys[activeJourney].stops;
  progress.innerHTML = stops.map((_, index) => `<i class="${index === stopIndex ? 'active' : index < stopIndex ? 'past' : ''}"></i>`).join('');
}

function beginLeg() {
  const stop = journeys[activeJourney].stops[stopIndex];
  moment.hidden = true;
  drive.dataset.state = 'driving';
  drive.classList.add('transitioning');
  $('#rideSignal').textContent = 'ON THE ROAD';
  $('#rideLocation').textContent = `Next · ${stop.place}`;
  renderProgress();
  clearInterval(tripTimer);
  tripTimer = setInterval(() => { trip += 1; $('#tripCount').textContent = String(trip).padStart(5, '0'); }, 130);
  dispatch('ride:depart', { journey: activeJourney, stop, index: stopIndex, tint: journeys[activeJourney].tint });
  setTimeout(() => drive.classList.remove('transitioning'), 850);
  setTimeout(arriveAtStop, 3600);
}

function arriveAtStop() {
  const route = journeys[activeJourney];
  const stop = route.stops[stopIndex];
  clearInterval(tripTimer);
  drive.dataset.state = 'stopped';
  $('#rideSignal').textContent = 'MEMORY FOUND';
  $('#rideLocation').textContent = `${route.label} · ${stop.place}`;
  $('#momentImage').src = stop.image;
  $('#momentImage').alt = stop.alt;
  $('#momentYear').textContent = stop.year;
  $('#momentNumber').textContent = `${String(stopIndex + 1).padStart(2, '0')} / ${String(route.stops.length).padStart(2, '0')}`;
  $('#momentPlace').textContent = stop.place;
  $('#momentAside').textContent = stop.aside;
  $('#momentTitle').textContent = stop.title;
  $('#momentText').textContent = stop.text;
  $('#momentLink').href = stop.link;
  $('#momentLink').textContent = stop.link.startsWith('mailto:') ? 'send me a signal ↗' : 'the original memory ↗';
  const isLast = stopIndex === route.stops.length - 1;
  $('#continueRide span').textContent = isLast ? 'Choose another road' : 'Keep driving';
  moment.hidden = false;
  renderProgress();
  dispatch('ride:arrive', { journey: activeJourney, stop, index: stopIndex, tint: route.tint });
}

function chooseJourney(name) {
  activeJourney = name;
  stopIndex = 0;
  picker.classList.add('departed');
  progress.hidden = false;
  beginLeg();
}

function returnToPicker() {
  clearInterval(tripTimer);
  activeJourney = null;
  moment.hidden = true;
  progress.hidden = true;
  picker.classList.remove('departed');
  drive.dataset.state = 'waiting';
  $('#rideSignal').textContent = 'ENGINE IDLE';
  $('#rideLocation').textContent = 'Passenger seat · choose a route';
  dispatch('ride:reset');
}

$('#enterDrive').addEventListener('click', enterRide);
$$('[data-journey]').forEach((button) => button.addEventListener('click', () => chooseJourney(button.dataset.journey)));
$('#continueRide').addEventListener('click', () => {
  if (stopIndex >= journeys[activeJourney].stops.length - 1) returnToPicker();
  else { stopIndex += 1; beginLeg(); }
});
$('#backToPicker').addEventListener('click', returnToPicker);
$('#recenter').addEventListener('click', () => dispatch('view:recenter'));

$('#soundToggle').addEventListener('click', () => {
  ambientMuted = !ambientMuted;
  if (engineGain) engineGain.gain.setTargetAtTime(ambientMuted ? 0 : .012, engineAudio.currentTime, .08);
  $('#soundToggle').innerHTML = `<span>${ambientMuted ? '○' : '◖'}</span> ${ambientMuted ? 'muted' : 'sound'}`;
});

const radioAudio = new Audio();
radioAudio.preload = 'none';
let radioIndex = 0;
function loadRadio(autoplay = false) {
  const track = radioTracks[radioIndex];
  radioAudio.src = track.preview;
  $('#radioArt').src = track.art;
  $('#radioTitle').textContent = track.title;
  $('#radioArtist').textContent = track.artist;
  if (autoplay) radioAudio.play().catch(() => {});
}
function radioState(playing) { $('#radio').classList.toggle('playing', playing); $('#radioState').textContent = playing ? 'Ⅱ' : '▶'; }
$('#toggleRadio').addEventListener('click', () => radioAudio.paused ? radioAudio.play().catch(() => {}) : radioAudio.pause());
$('#nextRadio').addEventListener('click', () => { radioIndex = (radioIndex + 1) % radioTracks.length; loadRadio(true); });
radioAudio.addEventListener('play', () => radioState(true));
radioAudio.addEventListener('pause', () => radioState(false));
radioAudio.addEventListener('ended', () => { radioIndex = (radioIndex + 1) % radioTracks.length; loadRadio(true); });
loadRadio();

document.addEventListener('keydown', (event) => {
  if (!door.classList.contains('closed') && (event.key === 'Enter' || event.key === ' ')) enterRide();
  if (event.key === 'Escape' && activeJourney) returnToPicker();
});
