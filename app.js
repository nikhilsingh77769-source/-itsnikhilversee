const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const canAnimate = Boolean(window.gsap && window.ScrollTrigger && !reduceMotion);
const syncMasthead = () => $('.masthead').classList.toggle('scrolled', window.scrollY > 60);
window.addEventListener('scroll', syncMasthead, { passive: true });
syncMasthead();

// Every story points to the public source behind the editorial adaptation.
const stories = {
  delhi: { kicker: '01 / THE ROOTS', title: 'Delhi, in<br><em>my bones.</em>', image: 'delhi-india-gate-night.jpg', figure: 'INDIA GATE / DELHI, AFTER DARK', body: ['Before work started moving me between cities, Delhi was the whole map. The familiar roads, the food, the people who don’t need the polished introduction.', 'I began in operations at GoMechanic. At PhysicsWallah, I moved further into data. I was learning what I liked doing by actually doing it.', 'There are different versions of me now. This city still knows the first one.'], source: 'https://www.linkedin.com/feed/update/urn:li:activity:7297874172808937472/', sourceLabel: 'THE PHYSICSWALLAH FAREWELL ↗' },
  mumbai: { kicker: '02 / THE UNEXPECTED', title: 'Some detours<br><em>stay with you.</em>', image: 'mumbai-sea-link-night.jpg', figure: 'BANDRA–WORLI SEA LINK / MUMBAI', body: ['I arrived in Mumbai for Dream11. IPL was a different kind of pace: economics, experiments, cricket, and the small details behind what people actually do.', 'Somewhere in all of it, an unfamiliar city started feeling familiar. The work gave me a reason to come. The city gave me reasons to care.', 'My farewell post says more than a job title could. Mumbai became a chapter I didn’t know I needed.'], source: 'https://www.linkedin.com/feed/update/urn:li:activity:7471056192446976000/', sourceLabel: 'READ THE LAST-DAY NOTE ↗' },
  return: { kicker: '03 / THE BREATH BETWEEN', title: 'A return is<br><em>still movement.</em>', image: 'delhi-connaught-place-night.jpg', figure: 'CONNAUGHT PLACE / DELHI', body: ['Delhi again. A familiar place with a slightly different person in it.', 'Some parts of a journey don’t come with a new title or a spectacular photograph. They give you room to work out what the next move is for.', 'The route wasn’t Delhi to somewhere better. It was Delhi, Mumbai, Delhi, Bengaluru. Each place kept a part.'], source: 'https://x.com/itsnikhilversee', sourceLabel: 'THE ONGOING JOURNAL ↗' },
  bengaluru: { kicker: '04 / THE CHAPTER I’M IN', title: 'Hello,<br><em>Bengaluru.</em>', image: 'bengaluru-night-traffic.jpg', figure: 'BENGALURU / A NEW CHAPTER', body: ['New city. Different room. The very real business of making a place feel like your own.', 'My Bengaluru arrival post comes with traffic. Of course it does. A city has to make an introduction somehow.', 'The ambition came with me. So did the music, the car opinions, and the part of me that will always miss home. I’m still writing this chapter.'], source: 'https://x.com/itsnikhilversee/status/2102736767963263405', sourceLabel: 'THE ARRIVAL POST ↗' },
  cars: { kicker: 'THE GARAGE IN MY HEAD', title: 'Before the keys,<br><em>the obsession.</em>', image: 'bmw-f82-black.jpg', figure: 'BMW M4 / A LONG-STANDING FASCINATION', body: ['The BMW M4 F82 is the car that made me a car person. I wrote about it back in 2022, long before this website.', 'Then there’s the Chevrolet Cruze. A memory of wanting something when it was out of reach can stay surprisingly sharp.', 'This isn’t a garage tour. It’s the story of why a machine can take up so much room in someone’s head.'], source: 'https://x.com/itsnikhilversee/status/1604792148263436289', sourceLabel: 'THE M4 ORIGIN STORY ↗' },
  music: { kicker: 'ONE MORE SONG', title: 'Forty minutes.<br><em>Still parked.</em>', image: 'bmw-f82-rear.jpg', figure: 'THE NIGHT DRIVE / BMW M4 F82', body: ['There’s a post about reaching home and staying in the car for forty more minutes because of the playlist. That pretty much explains the situation.', 'Aujla at full volume. Shreya doing what Shreya does. A Bollywood song I somehow know every word to.', 'The profile below is my actual Apple Music corner. Pick something and take the longer road.'], source: 'https://music.apple.com/profile/itsnikhilversee', sourceLabel: 'OPEN MY APPLE MUSIC ↗' },
  mountains: { kicker: 'A LITTLE ALTITUDE', title: 'Less noise.<br><em>More room.</em>', image: 'himalayas-night.jpg', figure: 'THE HIMALAYAS / AFTER DARK', body: ['Jibhi. Nainital. The mountain trips that sit between the work posts and the city changes.', 'I wrote about the way the mountains change what feels urgent. They don’t remove the problems, but they give the comparison and the noise a little less room.', 'Sometimes a different view is enough to ask a better question.'], source: 'https://x.com/itsnikhilversee/status/2080717938701836336', sourceLabel: 'THE MOUNTAINS NOTE ↗' },
  cricket: { kicker: 'A FAN, BEFORE AN ANALYST', title: 'Never only<br><em>a game.</em>', image: 'cricket-night.jpg', figure: 'WANKHEDE / AN IPL NIGHT', body: ['Cricket opinions were part of the personality before cricket became part of the job.', 'At Dream Cricket, playing the game became a way to understand the product. I wrote about a first night that turned into playing until morning.', 'The fan and the analyst have a lot to say to each other. They don’t always agree.'], source: 'https://www.linkedin.com/feed/update/urn:li:activity:7477601772543328256/', sourceLabel: 'THE FIRST-NIGHT STORY ↗' },
  people: { kicker: 'MY KIND OF WEALTH', title: 'People-made.<br><em>Always.</em>', image: 'people-night.jpg', figure: 'FRIENDSHIP / AN ATMOSPHERIC IMAGE, NOT MY PERSONAL PHOTO', body: ['The Friendship Day note is one of the pieces I wanted to keep here. Because people have given me more than a professional timeline can explain.', 'Courage. Confidence. Memories. A softer place to land. The feeling of being understood without rehearsing the explanation.', 'Being loved is still the biggest flex.'], source: 'https://www.linkedin.com/feed/update/urn:li:activity:7489526646002089985/', sourceLabel: 'THE FRIENDSHIP DAY NOTE ↗' },
  training: { kicker: 'ANOTHER REP', title: 'Failure, with<br><em>a plan.</em>', image: 'iron-night.jpg', figure: 'IRON / AN ONGOING PRACTICE', body: ['There’s a particular kind of honesty in the gym. The weight doesn’t care how convincing your explanation sounds.', 'I wrote about failure in training, and the strange way it can also be evidence of progress.', 'The difficult part is trusting the same thing when growth happens outside the gym. Still working on that.'], source: 'https://www.linkedin.com/feed/update/urn:li:activity:7461664315939561472/', sourceLabel: 'THE TRAINING NOTE ↗' },
  dream: { kicker: 'WORK / DREAM CRICKET', title: 'The fan had<br><em>good questions.</em>', image: 'cricket-night.jpg', figure: 'THE WORLD AROUND THE WORK / CRICKET', body: ['The first-night story is a better introduction to my work than a list of tools.', 'I played Dream Cricket until morning. Understanding the game as a player changed the questions I brought back as an analyst.', 'I like that meeting point: close enough to the data to see a pattern, close enough to the experience to know why it matters.'], source: 'https://www.linkedin.com/feed/update/urn:li:activity:7477601772543328256/', sourceLabel: 'READ THE ORIGINAL WORK STORY ↗' },
  eventify: { kicker: 'WORK / EVENTIFY', title: 'This should be<br><em>less painful.</em>', image: 'bengaluru-night-traffic.jpg', figure: 'WORKING NOTE / THE BUILDING INSTINCT', body: ['Some tools begin because the same friction keeps showing up. Eventify is one of those stories.', 'In my public account, I described a workflow that took two days and the tool that brought it down to twenty minutes.', 'The part that interests me is getting close enough to a problem to make the work meaningfully easier.'], source: 'https://www.linkedin.com/feed/update/urn:li:activity:7467790924903960576/', sourceLabel: 'READ THE EVENTIFY STORY ↗' },
  sql: { kicker: 'WORK / TEXT TO SQL', title: 'A better path<br><em>to the answer.</em>', image: 'delhi-connaught-place-night.jpg', figure: 'WORKING NOTE / LESS FRICTION', body: ['A business question shouldn’t always need a translation service between the person asking and the data.', 'I worked on a plain-English route to SQL: a way for people to ask for an answer without waiting for an analyst to write the query.', 'That’s the kind of work I keep coming back to. A real bottleneck, a useful tool, and more room for people to do their own thinking.'], source: 'https://www.linkedin.com/feed/update/urn:li:activity:7462728862700007424/', sourceLabel: 'READ THE ANALYTICS TOOL STORY ↗' },
  becoming: { kicker: 'NOTE 001 / ON BEGINNING', title: 'Keep<br><em>the before.</em>', image: 'mountain-dusk.jpg', figure: 'A LIFE, STILL IN MOTION', body: ['It’s tempting to wait until the story looks finished. The impressive title. The right photograph. The version of you that sounds certain.', 'My pinned introduction brings the work and the rest of me into the same place. Product, data, cars, lifting, mountains, music, writing, ambition, overthinking.', 'This journal is a place to keep the middle. Before the ending edits everything into a neat explanation.'], source: 'https://x.com/itsnikhilversee/status/2094483045843955953', sourceLabel: 'THE PINNED INTRODUCTION ↗' },
  home: { kicker: 'NOTE 002 / A CONSTANT', title: 'Forever<br><em>mumma’s boy.</em>', image: 'delhi-india-gate-night.jpg', figure: 'HOME / THE PART THAT COMES ALONG', body: ['A new city teaches you independence in surprisingly ordinary ways. A room. A routine. A quiet evening.', 'And then you miss your mother. Not as a dramatic chapter. Just because you do.', 'There’s a post about it. I wanted that version of me here, too.'], source: 'https://x.com/itsnikhilversee/status/2108875377791951186', sourceLabel: 'THE HOME NOTE ↗' },
  credits: { kicker: 'THE PEOPLE BEHIND THE PICTURES', title: 'A few<br><em>thank-yous.</em>', image: 'mountain-dusk.jpg', figure: 'THE SCENIC ROUTE / LIU WATER', body: ['The photography sets the scene. Stock photos illustrate places and interests; they aren’t presented as photographs of my own experiences. The stories link to my own original posts. Photographs of places and objects set the atmosphere.'], credits: [
    ['Mountain light trails — Liu water / Unsplash','https://unsplash.com/photos/d2M94wF00gs'],
    ['Himalayas at night — Eugene Ga / Unsplash','https://unsplash.com/photos/B5We-yetl8U'],
    ['BMW M4 F82, front — Low Is / Pexels','https://www.pexels.com/photo/black-bmw-m4-3581833/'],
    ['BMW M4 F82, rear — Jae Park / Pexels','https://www.pexels.com/photo/black-bmw-m4-coupe-3849556/'],
    ['Iron dumbbells — DΛVΞ GΛRCIΛ / Pexels','https://www.pexels.com/photo/close-up-view-of-black-dumbbells-in-gym-35567437/'],
    ['Mumbai Sea Link — Yogesh Gaikwad / Pexels','https://www.pexels.com/photo/bridge-over-the-river-13074008/'],
    ['Friendship — Samet Tecimen / Pexels','https://www.pexels.com/photo/group-of-friends-celebrating-at-night-38930354/'],
    ['Wankhede — Zoshua Colah / Unsplash','https://unsplash.com/photos/uplPFLDsn84'],
    ['Connaught Place — Budhesh / CC BY-SA 3.0','https://commons.wikimedia.org/wiki/File:View_of_Connaught_Place_at_Night.JPG'],
    ['Bengaluru traffic — Rohit Durbha / Unsplash','https://unsplash.com/photos/pOqnfnwVs90'],
    ['India Gate — Unsplash / retained from the existing site','https://unsplash.com/s/photos/india-gate']
  ] }
};

const dialog = $('.story-dialog');
let storyTrigger = null;
$$('[data-story]').forEach(button => button.addEventListener('click', () => {
  const story = stories[button.dataset.story];
  if (!story) return;
  storyTrigger = button;
  $('#story-image').src = `assets/${story.image}`;
  $('#story-image').alt = story.figure;
  $('#story-figure').textContent = story.figure;
  $('#story-kicker').textContent = story.kicker;
  $('#story-title').innerHTML = story.title;
  $('#story-body').replaceChildren();
  story.body.forEach(text => { const p = document.createElement('p'); p.textContent = text; $('#story-body').append(p); });
  if (story.credits) {
    const list = document.createElement('ul');
    story.credits.forEach(([label, href]) => { const li = document.createElement('li'); const a = document.createElement('a'); a.href = href; a.textContent = label; a.target = '_blank'; a.rel = 'noopener noreferrer'; li.append(a); list.append(li); });
    $('#story-body').append(list);
  }
  $('#story-source').hidden = !story.source;
  if (story.source) { $('#story-source').href = story.source; $('#story-source').textContent = story.sourceLabel; }
  document.body.classList.add('locked');
  dialog.showModal();
  dialog.scrollTop = 0;
  if (canAnimate) gsap.fromTo(dialog, { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: .45, ease: 'power3.out' });
}));
$('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) { const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close(); } });
dialog.addEventListener('close', () => { document.body.classList.remove('locked'); storyTrigger?.focus({ preventScroll: true }); });

const indexButton = $('.index-toggle');
const indexPanel = $('#index');
const setIndex = open => {
  indexButton.setAttribute('aria-expanded', String(open));
  indexPanel.hidden = !open;
  document.body.classList.toggle('locked', open);
  $('.masthead').classList.toggle('index-open', open);
  if (open && canAnimate) { gsap.fromTo(indexPanel, { opacity: 0 }, { opacity: 1, duration: .25 }); gsap.fromTo($$('.index-links a'), { y: 25, opacity: 0 }, { y: 0, opacity: 1, stagger: .045, duration: .5, ease: 'power3.out' }); }
  if (open) $('.index-links a').focus({ preventScroll: true });
};
indexButton.addEventListener('click', () => setIndex(indexButton.getAttribute('aria-expanded') !== 'true'));
$$('.index-links a').forEach(link => link.addEventListener('click', () => setIndex(false)));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !indexPanel.hidden) { setIndex(false); indexButton.focus({ preventScroll: true }); }
  if (event.key === 'Tab' && !indexPanel.hidden) {
    const focusable = [indexButton, ...$$('.index-links a')];
    const first = focusable[0], last = focusable.at(-1);
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }
});

const interestImages = {
  cars: { image: 'bmw-f82-black.jpg', alt: 'Black BMW M4 F82 photographed beneath a concrete structure', label: '01 / THE GARAGE IN MY HEAD', note: 'Some dreams come with four wheels.' },
  music: { image: 'bmw-f82-rear.jpg', alt: 'Rear view of a black BMW M4 F82, with crisp red taillights in a garage', label: '02 / ONE MORE SONG', note: 'The drive is over. The song isn’t.' },
  mountains: { image: 'himalayas-night.jpg', alt: 'The Himalayas beneath a star-filled night sky', label: '03 / A LITTLE ALTITUDE', note: 'The mountains make room in my head.' },
  cricket: { image: 'cricket-night.jpg', alt: 'Wankhede Stadium filled with cricket fans at night', label: '04 / NEVER JUST A GAME', note: 'The opinion arrives before the result.' },
  people: { image: 'people-night.jpg', alt: 'Friends embracing and laughing at night, illustrative photograph', label: '05 / MY KIND OF WEALTH', note: 'I am not self-made. I am people-made.' },
  training: { image: 'iron-night.jpg', alt: 'A close-up of iron dumbbells on a gym rack', label: '06 / ANOTHER REP', note: 'Still a work in progress.' }
};
const phoneLayout = matchMedia('(max-width: 700px)');
const positionInterestImage = () => {
  const visual = $('.off-visual');
  if (phoneLayout.matches) $('.off-item.active .off-button').after(visual);
  else $('.off-layout').prepend(visual);
};
positionInterestImage();
phoneLayout.addEventListener('change', positionInterestImage);
$$('.off-button').forEach(button => button.addEventListener('click', () => {
  if (button.getAttribute('aria-expanded') === 'true') return;
  $$('.off-item').forEach(item => { const active = item.contains(button); item.classList.toggle('active', active); $('.off-button', item).setAttribute('aria-expanded', String(active)); $('.off-button b', item).textContent = active ? '−' : '+'; $('.off-detail', item).hidden = !active; });
  const data = interestImages[button.dataset.interest];
  $('.off-visual').dataset.interest = button.dataset.interest;
  positionInterestImage();
  if (phoneLayout.matches) window.scrollTo({ top: button.getBoundingClientRect().top + scrollY - 80, behavior: reduceMotion ? 'instant' : 'smooth' });
  const update = () => { $('#offImage').src = `assets/${data.image}`; $('#offImage').alt = data.alt; $('#offImageLabel').textContent = data.label; $('#offImageNote').textContent = data.note; };
  if (canAnimate) { gsap.to('#offImage', { opacity: 0, scale: 1.03, duration: .17, onComplete: () => { update(); gsap.to('#offImage', { opacity: 1, scale: 1, duration: .5, ease: 'power2.out' }); } }); }
  else update();
}));

let journeyScroll = null;
let journeyDistance = null;
const filmWindow = $('.film-window');
const cityFrames = $$('.city-frame');
const setActiveCity = index => { $$('.city-stops button').forEach((button, i) => { button.classList.toggle('active', i === index); button.setAttribute('aria-pressed', String(i === index)); }); $('.city-counter').textContent = `${String(index + 1).padStart(2, '0')} / 04`; };
$$('.city-stops button').forEach(button => button.addEventListener('click', () => {
  const index = Number(button.dataset.stop);
  if (journeyScroll && journeyDistance) { const targetX = Math.min(cityFrames[index].offsetLeft - cityFrames[0].offsetLeft, journeyDistance()); const fraction = targetX / journeyDistance(); window.scrollTo({ top: journeyScroll.start + fraction * (journeyScroll.end - journeyScroll.start), behavior: 'smooth' }); }
  else { filmWindow.scrollTo({ left: cityFrames[index].offsetLeft - cityFrames[0].offsetLeft, behavior: reduceMotion ? 'instant' : 'smooth' }); setActiveCity(index); }
}));
filmWindow.addEventListener('scroll', () => { if (journeyScroll) return; const step = cityFrames[1].offsetLeft - cityFrames[0].offsetLeft; setActiveCity(Math.max(0, Math.min(3, Math.round(filmWindow.scrollLeft / step)))); }, { passive: true });

if (canAnimate) {
  gsap.registerPlugin(ScrollTrigger);
  const media = gsap.matchMedia();
  gsap.from('.intro-title-wrap h1>span', { yPercent: 45, opacity: 0, duration: 1.3, stagger: .12, ease: 'power3.out', delay: .1 });
  gsap.from('.intro-photo img', { scale: 1.18, duration: 2.2, ease: 'power2.out' });
  gsap.from('.intro-meta, .intro-bottom, .eyebrow, .intro-description', { opacity: 0, y: 8, duration: .8, stagger: .05, delay: .7 });

  const introTimeline = gsap.timeline({ scrollTrigger: { trigger: '.intro', start: 'top top', end: 'bottom bottom', scrub: .7, invalidateOnRefresh: true } });
  introTimeline.to('.intro-title-wrap', { y: -80, opacity: 0, duration: .38, ease: 'none' }, 0)
    .to('.intro-meta, .intro-bottom, .photo-margin, .intro-photo figcaption', { opacity: 0, duration: .15 }, 0)
    .to('.intro-photo', { left: '0%', top: '0%', width: '100%', height: '100%', duration: .6, ease: 'power1.inOut' }, .1)
    .to('.intro-photo img', { scale: 1, objectPosition: '50% 65%', duration: .8, ease: 'none' }, .1)
    .to('.photo-shade', { background: 'linear-gradient(0deg,rgba(4,12,17,.5),rgba(4,12,17,.28))', duration: .4 }, .3)
    .fromTo('.into-scene', { opacity: 0, y: 35 }, { opacity: 1, y: 0, duration: .35, ease: 'power2.out' }, .55);

  media.add('(min-width: 701px)', () => {
    const distance = () => $('.city-track').scrollWidth + innerWidth * .062 - innerWidth;
    const tween = gsap.to('.city-track', { x: () => -distance(), ease: 'none', scrollTrigger: { trigger: '.journey', start: 'top top', end: () => `+=${distance()}`, pin: true, scrub: .7, invalidateOnRefresh: true, onUpdate: self => setActiveCity(Math.min(3, Math.round(self.progress * 3))) } });
    journeyScroll = tween.scrollTrigger;
    journeyDistance = distance;
    return () => { journeyScroll = null; journeyDistance = null; };
  });
  if (matchMedia('(max-width: 700px)').matches) $('.journey-hint').textContent = 'SWIPE THROUGH THE CHAPTERS →';

  $$('.word-reveal').forEach(heading => {
    const walker = document.createTreeWalker(heading, NodeFilter.SHOW_TEXT);
    const nodes = []; while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node => { const fragment = document.createDocumentFragment(); node.textContent.split(/(\s+)/).forEach(text => { if (!text.trim()) fragment.append(document.createTextNode(text)); else { const span = document.createElement('span'); span.className = 'reveal-word'; span.textContent = text; fragment.append(span); } }); node.replaceWith(fragment); });
    gsap.fromTo($$('.reveal-word', heading), { opacity: .22 }, { opacity: 1, stagger: .075, ease: 'none', scrollTrigger: { trigger: heading, start: 'top 85%', end: 'bottom 45%', scrub: .6 } });
  });
  $$('.off-heading, .work-heading, .notes-heading, .soundtrack-copy').forEach(element => gsap.from(element, { y: 45, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: element, start: 'top 90%', once: true } }));
  $$('.work-row').forEach(element => gsap.from(element, { y: 24, opacity: 0, duration: .7, scrollTrigger: { trigger: element, start: 'top 92%', once: true } }));
  gsap.from('.paper-note', { y: 70, opacity: 0, stagger: .12, duration: .9, ease: 'power3.out', scrollTrigger: { trigger: '.note-desk', start: 'top 85%', once: true } });
  gsap.from('.home-ending h2', { y: 60, opacity: 0, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: '.home-ending', start: 'top 70%', once: true } });
  document.fonts.ready.then(() => ScrollTrigger.refresh());
  window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
} else {
  if (innerWidth > 700) { filmWindow.style.overflowX = 'auto'; $('.journey-hint').textContent = 'EXPLORE THE CHAPTERS →'; }
}

// Native links keep normal browser semantics; a short fade belongs only to story dialogs.
$$('a[href^="#"]').forEach(link => link.addEventListener('click', event => {
  const target = document.getElementById(link.hash.slice(1));
  if (!target) return;
  event.preventDefault();
  target.scrollIntoView({ behavior: reduceMotion ? 'instant' : 'smooth', block: 'start' });
}));
