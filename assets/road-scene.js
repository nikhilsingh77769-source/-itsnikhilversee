import * as THREE from './three.module.min.js';

const canvas = document.querySelector('#roadCanvas');
const drive = document.querySelector('#drive');
const vrButton = document.querySelector('#vrButton');
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(devicePixelRatio, 1.7));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = .74;
renderer.xr.enabled = true;
drive.classList.add('webgl-ready');

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x020505);
scene.fog = new THREE.FogExp2(0x030605, .022);

const car = new THREE.Group();
scene.add(car);
const camera = new THREE.PerspectiveCamera(62, 1, .08, 240);
camera.position.set(-.72, 1.63, 4.35); // passenger seat; driver is on the right
camera.rotation.order = 'YXZ';
car.add(camera);

scene.add(new THREE.HemisphereLight(0x647888, 0x0a0705, 1.18));
const moon = new THREE.DirectionalLight(0xb7cad2, 1.7);
moon.position.set(-18, 24, -35);
scene.add(moon);
const dashGlow = new THREE.PointLight(0xd45d43, 2.1, 8, 2);
dashGlow.position.set(0, 1.05, 2.1);
car.add(dashGlow);

// Road and moving world
const road = new THREE.Mesh(new THREE.PlaneGeometry(15, 230), new THREE.MeshStandardMaterial({ color: 0x101412, roughness: .88, metalness: .12 }));
road.rotation.x = -Math.PI / 2;
road.position.set(0, 0, -93);
scene.add(road);
[-8.2, 8.2].forEach((x) => {
  const shoulder = new THREE.Mesh(new THREE.PlaneGeometry(1.7, 230), new THREE.MeshStandardMaterial({ color: 0x24221e, roughness: 1 }));
  shoulder.rotation.x = -Math.PI / 2; shoulder.position.set(x, -.015, -93); scene.add(shoulder);
});

const moving = [];
const laneMaterial = new THREE.MeshBasicMaterial({ color: 0xd2c7b1, toneMapped: false });
for (let i = 0; i < 42; i += 1) {
  const dash = new THREE.Mesh(new THREE.PlaneGeometry(.12, 2.55), laneMaterial);
  dash.rotation.x = -Math.PI / 2; dash.position.set(0, .018, 7 - i * 5.7); dash.userData.loop = 239;
  moving.push(dash); scene.add(dash);
}
[-7.05, 7.05].forEach((x) => {
  const line = new THREE.Mesh(new THREE.PlaneGeometry(.1, 230), new THREE.MeshBasicMaterial({ color: 0x947260, toneMapped: false }));
  line.rotation.x = -Math.PI / 2; line.position.set(x, .02, -93); scene.add(line);
});

const poleMat = new THREE.MeshStandardMaterial({ color: 0x252a26, roughness: .68, metalness: .52 });
const lampMat = new THREE.MeshBasicMaterial({ color: 0xe49461, toneMapped: false });
for (let i = 0; i < 16; i += 1) {
  [-1, 1].forEach((side) => {
    const lamp = new THREE.Group();
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(.035, .065, 4.3, 7), poleMat); pole.position.y = 2.15;
    const arm = new THREE.Mesh(new THREE.BoxGeometry(.75, .05, .05), poleMat); arm.position.set(-side * .25, 4.25, 0);
    const glow = new THREE.Mesh(new THREE.SphereGeometry(.115, 10, 8), lampMat); glow.position.set(-side * .57, 4.23, 0);
    lamp.add(pole, arm, glow); lamp.position.set(side * 9.7, 0, 2 - i * 15); lamp.userData.loop = 240;
    moving.push(lamp); scene.add(lamp);
  });
}

function seeded(n) { const v = Math.sin(n * 91.733) * 12853.31; return v - Math.floor(v); }
const mountainMat = new THREE.MeshStandardMaterial({ color: 0x0a100f, roughness: 1, flatShading: true });
const mountains = new THREE.Group();
for (let i = 0; i < 30; i += 1) {
  const side = i % 2 ? 1 : -1;
  const height = 8 + seeded(i) * 17;
  const mesh = new THREE.Mesh(new THREE.ConeGeometry(6 + seeded(i + 4) * 10, height, 5), mountainMat);
  mesh.position.set(side * (15 + seeded(i + 10) * 12), height / 2 - .5, -5 - i * 7.7);
  mesh.rotation.y = seeded(i + 20) * Math.PI; mountains.add(mesh);
}
scene.add(mountains);

const city = new THREE.Group();
const buildingMat = new THREE.MeshStandardMaterial({ color: 0x0b1112, roughness: .9, metalness: .08 });
for (let i = 0; i < 48; i += 1) {
  const side = i % 2 ? 1 : -1;
  const height = 2 + seeded(i + 50) * 9;
  const width = 1.4 + seeded(i + 100) * 3;
  const box = new THREE.Mesh(new THREE.BoxGeometry(width, height, width), buildingMat);
  box.position.set(side * (12 + seeded(i + 200) * 15), height / 2, -14 - i * 4.5);
  city.add(box);
}
scene.add(city);

const starsPosition = [];
for (let i = 0; i < 650; i += 1) starsPosition.push((seeded(i) - .5) * 180, 6 + seeded(i + 700) * 58, -6 - seeded(i + 1400) * 215);
const starsGeo = new THREE.BufferGeometry(); starsGeo.setAttribute('position', new THREE.Float32BufferAttribute(starsPosition, 3));
const stars = new THREE.Points(starsGeo, new THREE.PointsMaterial({ color: 0xded9cc, size: .12, opacity: .55, transparent: true })); scene.add(stars);
const cityLightsPosition = [];
for (let i = 0; i < 230; i += 1) cityLightsPosition.push((seeded(i + 2200) - .5) * 104, .3 + seeded(i + 2600) * 5, -24 - seeded(i + 3000) * 185);
const lightsGeo = new THREE.BufferGeometry(); lightsGeo.setAttribute('position', new THREE.Float32BufferAttribute(cityLightsPosition, 3));
const cityLights = new THREE.Points(lightsGeo, new THREE.PointsMaterial({ color: 0xd77a51, size: .2, opacity: .7, transparent: true })); scene.add(cityLights);

// The car is real geometry around the passenger, rather than a screen overlay.
const trim = new THREE.MeshStandardMaterial({ color: 0x070908, roughness: .45, metalness: .32 });
const softTrim = new THREE.MeshStandardMaterial({ color: 0x111411, roughness: .92 });
const metal = new THREE.MeshStandardMaterial({ color: 0x3e423e, roughness: .32, metalness: .76 });
const dash = new THREE.Mesh(new THREE.BoxGeometry(5.2, .62, 1.5), softTrim); dash.position.set(0, .72, 2.05); dash.rotation.x = -.08; car.add(dash);
const dashTop = new THREE.Mesh(new THREE.BoxGeometry(5.15, .12, 1.65), trim); dashTop.position.set(0, 1.04, 1.94); dashTop.rotation.x = -.08; car.add(dashTop);
const consoleBridge = new THREE.Mesh(new THREE.BoxGeometry(.72, .65, 2.25), trim); consoleBridge.position.set(.08, .5, 3.02); consoleBridge.rotation.x = -.12; car.add(consoleBridge);

const wheel = new THREE.Mesh(new THREE.TorusGeometry(.43, .055, 12, 40), trim); wheel.position.set(1.18, 1.17, 2.56); wheel.rotation.x = -.24; car.add(wheel);
const wheelHub = new THREE.Mesh(new THREE.CylinderGeometry(.13, .13, .12, 24), metal); wheelHub.position.set(1.18, 1.17, 2.54); wheelHub.rotation.x = Math.PI / 2; car.add(wheelHub);
for (let a = 0; a < 3; a += 1) { const spoke = new THREE.Mesh(new THREE.BoxGeometry(.055, .34, .045), metal); spoke.position.set(1.18, 1.17, 2.51); spoke.rotation.z = a * Math.PI * 2 / 3; car.add(spoke); }

const gaugeMat = new THREE.MeshBasicMaterial({ color: 0xc96349, toneMapped: false });
[-.17, .17].forEach((offset) => { const gauge = new THREE.Mesh(new THREE.TorusGeometry(.13, .012, 7, 24), gaugeMat); gauge.position.set(1.18 + offset, 1.36, 1.77); car.add(gauge); });

const gpsCanvas = document.createElement('canvas'); gpsCanvas.width = 600; gpsCanvas.height = 240;
const gpsCtx = gpsCanvas.getContext('2d');
gpsCtx.fillStyle = '#090d0b'; gpsCtx.fillRect(0, 0, 600, 240);
gpsCtx.strokeStyle = '#8d594b'; gpsCtx.lineWidth = 3; gpsCtx.strokeRect(10, 10, 580, 220);
gpsCtx.fillStyle = '#c96349'; gpsCtx.font = '18px monospace'; gpsCtx.fillText('NS / LIVE ROUTE', 35, 44);
gpsCtx.strokeStyle = '#807b70'; gpsCtx.lineWidth = 5; gpsCtx.beginPath(); gpsCtx.moveTo(55, 178); gpsCtx.bezierCurveTo(170, 40, 250, 205, 350, 92); gpsCtx.bezierCurveTo(430, 10, 470, 175, 548, 65); gpsCtx.stroke();
[[55,178],[208,112],[350,92],[470,123],[548,65]].forEach(([x,y],index)=>{gpsCtx.fillStyle=index===0?'#c96349':'#d8d1c5';gpsCtx.beginPath();gpsCtx.arc(x,y,index===0?10:6,0,Math.PI*2);gpsCtx.fill()});
const gps = new THREE.Mesh(new THREE.PlaneGeometry(1.6, .64), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(gpsCanvas), toneMapped: false })); gps.position.set(-.18, 1.15, 1.62); gps.rotation.x = -.12; car.add(gps);

const mirror = new THREE.Mesh(new THREE.BoxGeometry(1.4, .37, .09), trim); mirror.position.set(0, 2.58, 2.0); car.add(mirror);
const mirrorGlass = new THREE.Mesh(new THREE.PlaneGeometry(1.28, .27), new THREE.MeshStandardMaterial({ color: 0x18201e, roughness: .12, metalness: .72 })); mirrorGlass.position.set(0, 2.58, 1.95); car.add(mirrorGlass);
[-2.33, 2.33].forEach((x) => { const pillar = new THREE.Mesh(new THREE.CylinderGeometry(.07, .13, 3.2, 8), trim); pillar.position.set(x, 2.0, 1.45); pillar.rotation.z = x < 0 ? -.28 : .28; car.add(pillar); });
const roof = new THREE.Mesh(new THREE.BoxGeometry(5.5, .18, 2.6), trim); roof.position.set(0, 3.18, 2.45); car.add(roof);

// A restrained driver silhouette makes the passenger-seat premise literal.
const driver = new THREE.Group();
const body = new THREE.Mesh(new THREE.CapsuleGeometry(.33, .75, 5, 10), new THREE.MeshStandardMaterial({ color: 0x090b0a, roughness: 1 })); body.position.y = .78;
const head = new THREE.Mesh(new THREE.SphereGeometry(.24, 18, 12), new THREE.MeshStandardMaterial({ color: 0x151612, roughness: 1 })); head.position.set(0, 1.68, -.05);
driver.add(body, head); driver.position.set(1.18, .04, 3.42); driver.rotation.x = -.07; car.add(driver);

const seat = new THREE.Mesh(new THREE.BoxGeometry(1.05, 1.15, .38), softTrim); seat.position.set(-.72, .75, 4.73); seat.rotation.x = -.12; car.add(seat);

let currentSpeed = reduceMotion ? 0 : .035;
let targetSpeed = currentSpeed;
let targetFog = new THREE.Color(0x030605);
let yaw = 0;
let pitch = -.045;
let targetYaw = 0;
let targetPitch = -.045;
let dragging = false;
let pointerX = 0;
let pointerY = 0;
let billboard;
let boardLight;
let journeyMode = 'waiting';

function interactiveTarget(target) { return target.closest('button,a,.journey-picker,.moment,.radio,.ride-controls,.ride-head'); }
drive.addEventListener('pointerdown', (event) => {
  if (interactiveTarget(event.target)) return;
  dragging = true; pointerX = event.clientX; pointerY = event.clientY; drive.classList.add('looking');
  drive.setPointerCapture?.(event.pointerId);
});
drive.addEventListener('pointermove', (event) => {
  if (!dragging) return;
  const dx = event.clientX - pointerX; const dy = event.clientY - pointerY;
  targetYaw = THREE.MathUtils.clamp(targetYaw - dx * .0042, -.95, .95);
  targetPitch = THREE.MathUtils.clamp(targetPitch - dy * .0034, -.38, .3);
  pointerX = event.clientX; pointerY = event.clientY;
});
function stopLook(event) { dragging = false; drive.classList.remove('looking'); try { drive.releasePointerCapture?.(event.pointerId); } catch {} }
drive.addEventListener('pointerup', stopLook); drive.addEventListener('pointercancel', stopLook);

function removeBillboard() {
  if (billboard) { scene.remove(billboard); billboard.traverse((obj) => { obj.geometry?.dispose(); if (obj.material?.map) obj.material.map.dispose(); obj.material?.dispose(); }); billboard = null; }
  if (boardLight) { scene.remove(boardLight); boardLight = null; }
}

function showMemoryBillboard(stop) {
  removeBillboard();
  const group = new THREE.Group();
  const frame = new THREE.Mesh(new THREE.BoxGeometry(5.4, 3.5, .16), new THREE.MeshStandardMaterial({ color: 0x171816, roughness: .55, metalness: .35 }));
  group.add(frame);
  new THREE.TextureLoader().load(stop.image, (texture) => {
    texture.colorSpace = THREE.SRGBColorSpace;
    const image = new THREE.Mesh(new THREE.PlaneGeometry(5.05, 3.15), new THREE.MeshBasicMaterial({ map: texture, toneMapped: false }));
    image.position.z = .09; group.add(image);
  });
  group.position.set(7.1, 3.3, -11.5); group.rotation.y = -.36;
  scene.add(group); billboard = group;
  boardLight = new THREE.PointLight(0xd47b57, 3, 17, 2); boardLight.position.set(4.5, 3.8, -8); scene.add(boardLight);
}

window.addEventListener('experienceenter', () => { targetSpeed = reduceMotion ? 0 : .05; });
window.addEventListener('ride:depart', (event) => {
  journeyMode = 'driving'; removeBillboard(); targetSpeed = reduceMotion ? 0 : .38;
  targetFog.set(event.detail.journey === 'head' ? 0x09050a : event.detail.journey === 'heart' ? 0x0a0505 : event.detail.journey === 'engine' ? 0x080705 : 0x030605);
  mountains.visible = event.detail.journey !== 'engine'; city.visible = event.detail.journey !== 'heart';
});
window.addEventListener('ride:arrive', (event) => {
  journeyMode = 'stopped'; targetSpeed = reduceMotion ? 0 : .014; showMemoryBillboard(event.detail.stop);
});
window.addEventListener('ride:reset', () => { journeyMode = 'waiting'; targetSpeed = reduceMotion ? 0 : .045; targetFog.set(0x030605); mountains.visible = true; city.visible = true; removeBillboard(); });
window.addEventListener('view:recenter', () => { targetYaw = 0; targetPitch = -.045; });

async function setupXR() {
  if (!navigator.xr || !await navigator.xr.isSessionSupported('immersive-vr').catch(() => false)) return;
  vrButton.hidden = false;
  vrButton.addEventListener('click', async () => {
    if (renderer.xr.isPresenting) return;
    const session = await navigator.xr.requestSession('immersive-vr', { optionalFeatures: ['local-floor'] });
    await renderer.xr.setSession(session);
    vrButton.textContent = 'VR ACTIVE';
    session.addEventListener('end', () => { vrButton.innerHTML = '<span>◫</span> enter VR'; });
  });
}
setupXR();

function resize() {
  const width = canvas.clientWidth || innerWidth; const height = canvas.clientHeight || innerHeight;
  renderer.setSize(width, height, false); camera.aspect = width / height; camera.updateProjectionMatrix();
}
addEventListener('resize', resize, { passive: true }); resize();

const clock = new THREE.Clock();
renderer.setAnimationLoop(() => {
  const delta = Math.min(clock.getDelta(), .04);
  currentSpeed += (targetSpeed - currentSpeed) * .034;
  if (!reduceMotion) {
    moving.forEach((item) => { item.position.z += currentSpeed * delta * 82; if (item.position.z > 12) item.position.z -= item.userData.loop; });
    yaw += (targetYaw - yaw) * .1; pitch += (targetPitch - pitch) * .1;
    camera.rotation.y = yaw; camera.rotation.x = pitch;
    const bob = journeyMode === 'driving' ? Math.sin(performance.now() * .009) * .006 : Math.sin(performance.now() * .002) * .002;
    camera.position.y = 1.63 + bob;
    wheel.rotation.z += currentSpeed * delta * .08;
    stars.rotation.y += delta * .0015;
  }
  scene.background.lerp(targetFog, .018); scene.fog.color.copy(scene.background);
  renderer.render(scene, camera);
});
