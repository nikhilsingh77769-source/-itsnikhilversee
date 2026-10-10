import * as THREE from './three.module.min.js';

const canvas = document.querySelector('#roadCanvas');
const drive = document.querySelector('#drive');
if (!canvas || !drive) throw new Error('Road scene mount missing');

const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: 'high-performance' });
drive.classList.add('webgl-ready');
renderer.setPixelRatio(Math.min(devicePixelRatio, 1.7));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = .72;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x020505);
scene.fog = new THREE.FogExp2(0x040706, .023);

const camera = new THREE.PerspectiveCamera(57, 1, .1, 220);
camera.position.set(0, 2.65, 8.6);
camera.lookAt(0, .6, -32);

scene.add(new THREE.HemisphereLight(0x6c7a86, 0x090604, 1.05));
const moon = new THREE.DirectionalLight(0xb0c2c8, 1.4);
moon.position.set(-14, 20, -28);
scene.add(moon);

const road = new THREE.Mesh(
  new THREE.PlaneGeometry(13.6, 190),
  new THREE.MeshStandardMaterial({ color: 0x111614, roughness: .92, metalness: .08 })
);
road.rotation.x = -Math.PI / 2;
road.position.set(0, 0, -80);
scene.add(road);

const shoulderMaterial = new THREE.MeshStandardMaterial({ color: 0x25231e, roughness: 1 });
[-7.4, 7.4].forEach((x) => {
  const shoulder = new THREE.Mesh(new THREE.PlaneGeometry(1.35, 190), shoulderMaterial);
  shoulder.rotation.x = -Math.PI / 2;
  shoulder.position.set(x, -.02, -80);
  scene.add(shoulder);
});

const moving = [];
const dashMaterial = new THREE.MeshBasicMaterial({ color: 0xc3bba8, toneMapped: false });
for (let i = 0; i < 34; i += 1) {
  const dash = new THREE.Mesh(new THREE.PlaneGeometry(.12, 2.4), dashMaterial);
  dash.rotation.x = -Math.PI / 2;
  dash.position.set(0, .012, 5 - i * 5.8);
  dash.userData.loop = 197;
  moving.push(dash);
  scene.add(dash);
}

const edgeMaterial = new THREE.MeshBasicMaterial({ color: 0x8a6d5b, toneMapped: false });
[-6.45, 6.45].forEach((x) => {
  const edge = new THREE.Mesh(new THREE.PlaneGeometry(.1, 190), edgeMaterial);
  edge.rotation.x = -Math.PI / 2;
  edge.position.set(x, .014, -80);
  scene.add(edge);
});

const railMaterial = new THREE.MeshStandardMaterial({ color: 0x3c403c, roughness: .55, metalness: .62 });
[-8.05, 8.05].forEach((x) => {
  const rail = new THREE.Mesh(new THREE.BoxGeometry(.1, .14, 190), railMaterial);
  rail.position.set(x, .54, -80);
  scene.add(rail);
});

const lampGlowMaterial = new THREE.MeshBasicMaterial({ color: 0xe39a67, toneMapped: false });
const poleMaterial = new THREE.MeshStandardMaterial({ color: 0x242824, roughness: .7, metalness: .5 });
for (let i = 0; i < 14; i += 1) {
  [-1, 1].forEach((side) => {
    const group = new THREE.Group();
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(.035, .06, 3.7, 6), poleMaterial);
    pole.position.y = 1.85;
    const glow = new THREE.Mesh(new THREE.SphereGeometry(.1, 9, 7), lampGlowMaterial);
    glow.position.set(-side * .35, 3.7, 0);
    const arm = new THREE.Mesh(new THREE.BoxGeometry(.7, .045, .045), poleMaterial);
    arm.position.set(-side * .22, 3.67, 0);
    group.add(pole, arm, glow);
    group.position.set(side * 9, 0, -i * 15 - 3);
    group.userData.loop = 210;
    moving.push(group);
    scene.add(group);
  });
}

function seeded(n) {
  const value = Math.sin(n * 91.733) * 12853.31;
  return value - Math.floor(value);
}

const mountainMaterial = new THREE.MeshStandardMaterial({ color: 0x0b1110, roughness: 1, flatShading: true });
for (let i = 0; i < 26; i += 1) {
  const side = i % 2 ? 1 : -1;
  const height = 7 + seeded(i) * 15;
  const mountain = new THREE.Mesh(new THREE.ConeGeometry(6 + seeded(i + 4) * 9, height, 5), mountainMaterial);
  mountain.position.set(side * (14 + seeded(i + 10) * 11), height / 2 - .4, -7 - i * 7.2);
  mountain.rotation.y = seeded(i + 20) * Math.PI;
  scene.add(mountain);
}

const starPositions = [];
for (let i = 0; i < 560; i += 1) {
  starPositions.push((seeded(i) - .5) * 165, 7 + seeded(i + 700) * 52, -8 - seeded(i + 1400) * 190);
}
const starGeometry = new THREE.BufferGeometry();
starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starPositions, 3));
const stars = new THREE.Points(starGeometry, new THREE.PointsMaterial({ color: 0xd7d3c7, size: .12, transparent: true, opacity: .52, sizeAttenuation: true }));
scene.add(stars);

const cityPositions = [];
for (let i = 0; i < 180; i += 1) {
  cityPositions.push((seeded(i + 2300) - .5) * 92, .2 + seeded(i + 2700) * 3.2, -38 - seeded(i + 3100) * 145);
}
const cityGeometry = new THREE.BufferGeometry();
cityGeometry.setAttribute('position', new THREE.Float32BufferAttribute(cityPositions, 3));
const city = new THREE.Points(cityGeometry, new THREE.PointsMaterial({ color: 0xd8754e, size: .22, transparent: true, opacity: .66 }));
scene.add(city);

let pointerX = 0;
let currentSpeed = reduceMotion ? 0 : .055;
let targetSpeed = currentSpeed;
let paletteTarget = new THREE.Color(0x040706);
const palettes = {
  drive: 0x040706,
  delhi: 0x0b0806,
  'delhi-return': 0x080706,
  mumbai: 0x07080b,
  bengaluru: 0x05090a,
  engine: 0x070706,
  radio: 0x080609,
  glovebox: 0x080906,
  home: 0x090605,
  signal: 0x050707
};

function applyScene(name) {
  paletteTarget.setHex(palettes[name] || palettes.drive);
  targetSpeed = reduceMotion ? 0 : (name === 'drive' ? .055 : .115);
}

window.addEventListener('journeychange', (event) => applyScene(event.detail.scene));
window.addEventListener('journeystart', () => { if (!reduceMotion) targetSpeed = .22; });
window.addEventListener('journeystop', () => { if (!reduceMotion) targetSpeed = .075; });
window.addEventListener('pointermove', (event) => { pointerX = (event.clientX / innerWidth - .5) * 2; }, { passive: true });

function resize() {
  const width = canvas.clientWidth || innerWidth;
  const height = canvas.clientHeight || innerHeight;
  renderer.setSize(width, height, false);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}

addEventListener('resize', resize, { passive: true });
resize();

const clock = new THREE.Clock();
function render() {
  const delta = Math.min(clock.getDelta(), .04);
  currentSpeed += (targetSpeed - currentSpeed) * .028;
  if (!reduceMotion) {
    moving.forEach((item) => {
      item.position.z += currentSpeed * delta * 72;
      if (item.position.z > 12) item.position.z -= item.userData.loop;
    });
    camera.position.x += (pointerX * .34 - camera.position.x) * .022;
    camera.rotation.z += (-pointerX * .006 - camera.rotation.z) * .025;
    stars.rotation.y += delta * .002;
  }
  scene.background.lerp(paletteTarget, .018);
  scene.fog.color.copy(scene.background);
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

render();
