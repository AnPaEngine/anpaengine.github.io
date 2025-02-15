import * as THREE from 'three';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.152.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.152.0/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'https://cdn.jsdelivr.net/npm/three@0.152.0/examples/jsm/loaders/DRACOLoader.js';

let scene, camera, renderer, controls;
let earth, moon, iss;
let starField;
let issData = { latitude: 0, longitude: 0, altitude: 0 };

const ISS_API_URL = 'https://api.wheretheiss.at/v1/satellites/25544';

function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 10, 20);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  controls = new OrbitControls(camera, renderer.domElement);

  // Lichtquellen
  const ambientLight = new THREE.AmbientLight(0x404040, 1.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
  directionalLight.position.set(10, 10, 10);
  scene.add(directionalLight);

  const pointLight = new THREE.PointLight(0xffffff, 1);
  pointLight.position.set(50, 50, 50);
  scene.add(pointLight);

  createEarth();
  createMoon();
  createStarField();

  loadISS();

  animate();

  window.addEventListener('resize', onWindowResize, false);
}

function createEarth() {
  const textureLoader = new THREE.TextureLoader();
  const earthTexture = textureLoader.load('textures/earth.jpg');
  earthTexture.minFilter = THREE.LinearFilter;

  const earthGeometry = new THREE.SphereGeometry(5, 32, 32);
  const earthMaterial = new THREE.MeshStandardMaterial({
    map: earthTexture,
    side: THREE.DoubleSide
  });
  earth = new THREE.Mesh(earthGeometry, earthMaterial);
  scene.add(earth);
}

function createMoon() {
  const textureLoader = new THREE.TextureLoader();
  const moonTexture = textureLoader.load('textures/moon.jpg');
  moonTexture.minFilter = THREE.LinearFilter;

  const moonGeometry = new THREE.SphereGeometry(1.35, 32, 32);
  const moonMaterial = new THREE.MeshStandardMaterial({
    map: moonTexture,
    side: THREE.DoubleSide
  });
  moon = new THREE.Mesh(moonGeometry, moonMaterial);
  moon.position.set(38, 0, 0); // Position des Mondes
  scene.add(moon);

  const orbitGeometry = new THREE.RingGeometry(38, 38.1, 64);
  const orbitMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide
  });
  const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
  orbit.rotation.x = Math.PI / 2; // Orbit als Ring darstellen
  scene.add(orbit);
}

function createStarField() {
  const textureLoader = new THREE.TextureLoader();
  const starTexture = textureLoader.load('textures/stars.jpg');

  const starGeometry = new THREE.SphereGeometry(90, 64, 64);
  const starMaterial = new THREE.MeshBasicMaterial({
    map: starTexture,
    side: THREE.BackSide
  });
  starField = new THREE.Mesh(starGeometry, starMaterial);
  scene.add(starField);
}

function loadISS() {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.4.3/');
  loader.setDRACOLoader(dracoLoader);

  loader.load(
    'models/iss_model.glb',
    (gltf) => {
      iss = gltf.scene;
      iss.scale.set(0.025, 0.025, 0.025); // Skalierung der ISS
      scene.add(iss);
      updateISS();
    },
    undefined,
    (error) => {
      console.error('Fehler beim Laden des ISS-Modells:', error);
    }
  );
}

async function updateISS() {
  try {
    const response = await fetch(ISS_API_URL);
    const data = await response.json();

    issData.latitude = data.latitude;
    issData.longitude = data.longitude;
    issData.altitude = data.altitude;

    // Berechnung der Position der ISS basierend auf den geographischen Koordinaten
    const lat = data.latitude * (Math.PI / 180);
    const lon = data.longitude * (Math.PI / 180);
    const radius = 10; // Radius der Umlaufbahn

    const x = radius * Math.cos(lat) * Math.cos(lon);
    const z = radius * Math.cos(lat) * Math.sin(lon);
    const y = radius * Math.sin(lat);

    if (iss) {
      iss.position.set(x, y, z);
    }

    // Anzeige der ISS-Daten
    document.getElementById('iss-data').innerHTML = `
      <p>Latitude: ${data.latitude.toFixed(2)}°</p>
      <p>Longitude: ${data.longitude.toFixed(2)}°</p>
      <p>Altitude: ${data.altitude.toFixed(2)} km</p>
    `;

    setTimeout(updateISS, 5000);
  } catch (error) {
    console.error('Fehler beim Abrufen der ISS-Daten:', error);
  }
}

function animate() {
  requestAnimationFrame(animate);

  // Rotation der Erde und des Mondes
  if (earth) {
    earth.rotation.y += 0.005;
  }

  // Mondrotation und Umlauf um die Erde
  if (moon) {
    // Mond um seine eigene Achse rotieren
    moon.rotation.y += 0.005;

    // Mond um die Erde bewegen
    const moonDistance = 38;
    const moonAngle = Date.now() * 0.0001; // langsame Bewegung des Mondes
    moon.position.x = moonDistance * Math.cos(moonAngle);
    moon.position.z = moonDistance * Math.sin(moonAngle);
  }

  controls.update();
  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

init();
