const stories = {
  delhi: { kicker: '01 / THE ROOTS', title: 'Delhi, in<br><em>my bones.</em>', image: 'delhi-india-gate-night.jpg', figure: 'INDIA GATE / DELHI, AFTER DARK', body: ['Before work started moving me between cities, Delhi was the whole map. The familiar roads, the food, the people who don’t need the polished introduction.', 'I began in operations at GoMechanic. At PhysicsWallah, I moved further into data. I was learning what I liked doing by actually doing it.', 'There are different versions of me now. This city still knows the first one.'], source: 'https://www.linkedin.com/feed/update/urn:li:activity:7297874172808937472/', sourceLabel: 'THE PHYSICSWALLAH FAREWELL ↗' },
  mumbai: { kicker: '02 / THE UNEXPECTED', title: 'Some detours<br><em>stay with you.</em>', image: 'mumbai-sea-link-night.jpg', figure: 'BANDRA–WORLI SEA LINK / MUMBAI', body: ['I arrived in Mumbai for Dream11. IPL was a different kind of pace: economics, experiments, cricket, and the small details behind what people actually do.', 'Somewhere in all of it, an unfamiliar city started feeling familiar. The work gave me a reason to come. The city gave me reasons to care.', 'My farewell post says more than a job title could. Mumbai became a chapter I didn’t know I needed.'], source: 'https://www.linkedin.com/feed/update/urn:li:activity:7471056192446976000/', sourceLabel: 'READ THE LAST-DAY NOTE ↗' },
  return: { kicker: '03 / THE BREATH BETWEEN', title: 'A return is<br><em>still movement.</em>', image: 'delhi-connaught-place-night.jpg', figure: 'CONNAUGHT PLACE / DELHI', body: ['Delhi again. A familiar place with a slightly different person in it.', 'Some parts of a journey don’t come with a new title or a spectacular photograph. They give you room to work out what the next move is for.', 'The route wasn’t Delhi to somewhere better. It was Delhi, Mumbai, Delhi, Bengaluru. Each place kept a part.'], source: 'https://x.com/itsnikhilversee', sourceLabel: 'THE ONGOING JOURNAL ↗' },
  bengaluru: { kicker: '04 / THE CHAPTER I’M IN', title: 'Hello,<br><em>Bengaluru.</em>', image: 'bengaluru-night-traffic.jpg', figure: 'BENGALURU / A NEW CHAPTER', body: ['New city. Different room. The very real business of making a place feel like your own.', 'My Bengaluru arrival post comes with traffic. Of course it does. A city has to make an introduction somehow.', 'The ambition came with me. So did the music, the car opinions, and the part of me that will always miss home. I’m still writing this chapter.'], source: 'https://x.com/itsnikhilversee/status/2102736767963263405', sourceLabel: 'THE ARRIVAL POST ↗' },
  cars: { kicker: 'THE GARAGE IN MY HEAD', title: 'Before the keys,<br><em>the obsession.</em>', image: 'bmw-f82-black.jpg', figure: 'BMW M4 / A LONG-STANDING FASCINATION', body: ['The BMW M4 F82 is the car that made me a car person. I wrote about it back in 2022, long before this website.', 'Then there’s the Chevrolet Cruze. A memory of wanting something when it was out of reach can stay surprisingly sharp.', 'This isn’t a garage tour. It’s the story of why a machine can take up so much room in someone’s head.'], source: 'https://x.com/itsnikhilversee/status/1604792148263436289', sourceLabel: 'THE M4 ORIGIN STORY ↗' },
  music: { kicker: 'ONE MORE SONG', title: 'Forty minutes.<br><em>Still parked.</em>', image: 'bmw-f82-rear.jpg', figure: 'THE NIGHT DRIVE / BMW M4 F82', body: ['There’s a post about reaching home and staying in the car for forty more minutes because of the playlist. That pretty much explains the situation.', 'Aujla at full volume. Shreya doing what Shreya does. A Bollywood song I somehow know every word to.', 'The profile below is my actual Apple Music corner. Pick something and take the longer road.'], source: 'https://music.apple.com/profile/itsnikhilversee', sourceLabel: 'OPEN MY APPLE MUSIC ↗' },
  mountains: { kicker: 'A LITTLE ALTITUDE', title: 'Less noise.<br><em>More room.</em>', image: 'mountain-stars-hd.jpg', figure: 'MOENA, ITALY / ILLUSTRATIVE PHOTOGRAPHY BY BENJAMIN VOROS', body: ['Jibhi. Nainital. The mountain trips that sit between the work posts and the city changes.', 'I wrote about the way the mountains change what feels urgent. They don’t remove the problems, but they give the comparison and the noise a little less room.', 'Sometimes a different view is enough to ask a better question.'], source: 'https://x.com/itsnikhilversee/status/2080717938701836336', sourceLabel: 'THE MOUNTAINS NOTE ↗' },
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
    ['Snow mountains under stars — Benjamin Voros / Unsplash','https://unsplash.com/photos/snow-mountain-under-stars-phIFdC6lA4E'],
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


;
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

;
(() => {
  const dialog=document.querySelector('#pocketDrive'),canvas=document.querySelector('#driveCanvas'),ctx=canvas.getContext('2d');
  const start=document.querySelector('#driveStart'),message=document.querySelector('#driveMessage'),distance=document.querySelector('#driveDistance'),fuelFill=document.querySelector('#driveFuel'),fuelLabel=document.querySelector('#driveFuelLabel');
  const key='nikhil.little-detour.best.v1';
  let best=0,frame=0,trigger=null,width=480,height=270,last=0;
  try{best=Number(localStorage.getItem(key))||0}catch{}
  let state={phase:'idle',lane:1,x:.5,fuel:75,km:0,elapsed:0,spawn:0,items:[],bump:0,pickups:0};
  const lanes=()=>[width*.37,width*.5,width*.63];
  const rounded=(x,y,w,h,r,fill,stroke)=>{ctx.beginPath();ctx.roundRect(x,y,w,h,r);if(fill){ctx.fillStyle=fill;ctx.fill()}if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=1;ctx.stroke()}};
  const fuelIcon=(x,y)=>{rounded(x-7,y-8,12,17,1,'#e7e7e7','#747474');ctx.fillStyle='#747474';ctx.fillRect(x-5,y-5,8,5);ctx.fillRect(x-8,y+9,16,2);ctx.strokeStyle='#747474';ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(x+5,y-4);ctx.lineTo(x+10,y);ctx.lineTo(x+10,y+8);ctx.quadraticCurveTo(x+8,y+11,x+7,y+6);ctx.stroke()};
  const cone=(x,y)=>{ctx.fillStyle='#898989';ctx.beginPath();ctx.moveTo(x,y-11);ctx.lineTo(x-8,y+7);ctx.lineTo(x+8,y+7);ctx.closePath();ctx.fill();ctx.fillStyle='#e8e8e8';ctx.fillRect(x-4,y-1,8,3);rounded(x-10,y+7,20,3,1,'#757575')};
  const tree=(x,y,s=1)=>{ctx.fillStyle='#a0a0a0';ctx.fillRect(x-1,y+7*s,2,6*s);ctx.beginPath();ctx.moveTo(x,y-11*s);ctx.lineTo(x-8*s,y+9*s);ctx.lineTo(x+8*s,y+9*s);ctx.closePath();ctx.fill();ctx.fillStyle='#b9b9b9';ctx.beginPath();ctx.moveTo(x,y-13*s);ctx.lineTo(x-6*s,y+1*s);ctx.lineTo(x+6*s,y+1*s);ctx.fill()};
  const car=(x,y)=>{ctx.save();ctx.translate(x,y);const scale=Math.min(1,width/360);ctx.scale(scale,scale);if(state.bump>0)ctx.translate(Math.sin(state.bump*45)*3,0);rounded(-18,-16,5,11,1,'#353535');rounded(13,-16,5,11,1,'#353535');rounded(-18,12,5,11,1,'#353535');rounded(13,12,5,11,1,'#353535');rounded(-14,-28,28,56,6,'#373737','#c7c7c7');rounded(-11,-17,22,12,3,'#b0b0b0');rounded(-10,11,20,8,2,'#8b8b8b');ctx.fillStyle='#d7d7d7';ctx.fillRect(-11,-25,6,3);ctx.fillRect(5,-25,6,3);ctx.fillStyle='#727272';ctx.fillRect(-11,23,6,2);ctx.fillRect(5,23,6,2);ctx.strokeStyle='#6f6f6f';ctx.beginPath();ctx.moveTo(-10,-1);ctx.lineTo(-10,9);ctx.moveTo(10,-1);ctx.lineTo(10,9);ctx.stroke();ctx.restore()};
  const draw=()=>{
    ctx.clearRect(0,0,width,height);ctx.fillStyle='#d7d7d7';ctx.fillRect(0,0,width,height);
    const roadLeft=width*.29,roadWidth=width*.42,offset=state.km*400;
    ctx.fillStyle='#7f7f7f';ctx.fillRect(roadLeft,0,roadWidth,height);ctx.fillStyle='#dfdfdf';ctx.fillRect(roadLeft+4,0,2,height);ctx.fillRect(roadLeft+roadWidth-6,0,2,height);
    ctx.strokeStyle='#c8c8c8';ctx.lineWidth=1;ctx.setLineDash([12,15]);ctx.lineDashOffset=-offset%27;for(const x of [width*.435,width*.565]){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,height);ctx.stroke()}ctx.setLineDash([]);
    for(let i=-1;i<6;i++){const y=((i*75+offset*.55)%(height+90)+height+90)%(height+90)-40;tree(width*.16,y,.8);tree(width*.84,y+28,1)}
    for(const item of state.items){const x=lanes()[item.lane];if(item.type==='fuel')fuelIcon(x,item.y);else cone(x,item.y)}car(state.x*width,height*.76);
    if(state.phase==='idle'){fuelIcon(width*.37,height*.27);cone(width*.63,height*.48)}
  };
  const updateUI=()=>{distance.textContent=state.km.toFixed(2);fuelFill.style.width=`${Math.max(0,state.fuel)}%`;fuelLabel.setAttribute('aria-valuenow',String(Math.round(state.fuel)));document.querySelector('#driveBest').textContent=`${best.toFixed(2)} KM`};
  const finish=()=>{state.phase='finished';cancelAnimationFrame(frame);if(state.km>best){best=state.km;try{localStorage.setItem(key,String(best))}catch{}}message.textContent=state.fuel<=0?'Out of fuel. Luckily, this one has a restart.':`${state.km.toFixed(2)} km. See? The longer way is better.`;start.textContent='One more spin?';start.hidden=false;updateUI()};
  const tick=now=>{
    if(!dialog.open||state.phase!=='driving')return;
    const dt=Math.min((now-last)/1000,.05);last=now;state.elapsed+=dt;state.km+=dt*.042;state.fuel-=dt*3.3;state.bump=Math.max(0,state.bump-dt);state.x+=(lanes()[state.lane]/width-state.x)*Math.min(1,dt*13);state.spawn+=dt;
    if(state.spawn>=1.7){state.spawn=0;const count=Math.floor(state.elapsed/1.7);state.items.push({type:count%3===0?'cone':'fuel',lane:count%3,y:-20,passed:false})}
    const playerY=height*.76;
    for(const item of state.items){item.y+=dt*height*.53;if(!item.passed&&item.y>playerY-16&&item.y<playerY+24&&Math.abs(lanes()[item.lane]-state.x*width)<width*.075){item.passed=true;if(item.type==='fuel'){state.fuel=Math.min(100,state.fuel+23);state.pickups++;message.textContent=['Fuelled up. Long way home?','One more song. Plenty of petrol.','Good catch. Keep rolling.'][state.pickups%3];item.y=height+50}else{state.fuel-=12;state.bump=.5;message.textContent='A tiny bump. We carry on.';item.y=height+50}}}
    state.items=state.items.filter(item=>item.y<height+40);updateUI();draw();if(state.elapsed>=22||state.fuel<=0){finish();return}frame=requestAnimationFrame(tick);
  };
  const steer=direction=>{if(state.phase==='driving')state.lane=Math.max(0,Math.min(2,state.lane+direction))};
  const resize=()=>{const r=canvas.getBoundingClientRect();if(!r.width)return;width=r.width;height=r.height;const ratio=Math.min(devicePixelRatio||1,2);canvas.width=width*ratio;canvas.height=height*ratio;ctx.setTransform(ratio,0,0,ratio,0,0);draw()};
  const reset=()=>{cancelAnimationFrame(frame);state={phase:'idle',lane:1,x:.5,fuel:75,km:0,elapsed:0,spawn:0,items:[],bump:0,pickups:0};message.textContent='No rush. Just a little detour.';start.hidden=false;start.textContent='Let’s drive';updateUI();resize()};
  start.addEventListener('click',()=>{reset();state.phase='driving';start.hidden=true;message.textContent='Grab the fuel. Miss the cones. Take it easy.';last=performance.now();frame=requestAnimationFrame(tick)});
  document.querySelectorAll('[data-play-drive]').forEach(button=>button.addEventListener('click',()=>{trigger=button;document.body.classList.add('locked');dialog.showModal();reset()}));
  document.querySelector('.drive-close').addEventListener('click',()=>dialog.close());document.querySelector('[data-steer="left"]').addEventListener('click',()=>steer(-1));document.querySelector('[data-steer="right"]').addEventListener('click',()=>steer(1));
  document.addEventListener('keydown',event=>{if(!dialog.open)return;if(['ArrowLeft','ArrowRight'].includes(event.key)){event.preventDefault();steer(event.key==='ArrowLeft'?-1:1)}if(event.code==='Space'&&event.target!==start&&state.phase!=='driving'){event.preventDefault();start.click()}});
  let touchStart=0;canvas.addEventListener('pointerdown',event=>{touchStart=event.clientX});canvas.addEventListener('pointerup',event=>{const delta=event.clientX-touchStart;if(Math.abs(delta)>12)steer(delta<0?-1:1);else steer(event.offsetX<width/2?-1:1)});
  dialog.addEventListener('close',()=>{cancelAnimationFrame(frame);document.body.classList.remove('locked');(trigger?.getClientRects().length ? trigger : document.querySelector('.index-toggle'))?.focus({preventScroll:true})});dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close()}});
  new ResizeObserver(resize).observe(canvas);
})();
