// Importiere Three.js (über die Import Map) sowie OrbitControls, GLTFLoader und DRACOLoader als ES Module
import * as THREE from 'three';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.152.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.152.0/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'https://cdn.jsdelivr.net/npm/three@0.152.0/examples/jsm/loaders/DRACOLoader.js';

let scene, camera, renderer, controls;
let earth, moon, iss;

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
  // Erhöhe die Ambient-Beleuchtung
  const ambientLight = new THREE.AmbientLight(0x404040, 1.5);
  scene.add(ambientLight);
  
  // Hinzufügen eines Directional Light, um starke Lichtakzente zu setzen
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
  directionalLight.position.set(10, 10, 10);
  scene.add(directionalLight);
  
  // Optional: Ein Point Light, das weiterhin vorhanden sein kann
  const pointLight = new THREE.PointLight(0xffffff, 1);
  pointLight.position.set(50, 50, 50);
  scene.add(pointLight);

  createEarth();
  createMoon();
  createStarField(); // Fügt den Sternenhimmel hinzu

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
  moon.position.set(38, 0, 0);
  scene.add(moon);

  const orbitGeometry = new THREE.RingGeometry(38, 38.1, 64);
  const orbitMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide
  });
  const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
  orbit.rotation.x = Math.PI / 2;
  scene.add(orbit);
}

function createStarField() {
  // Bitte lege eine Datei "textures/stars.jpg" in den Ordner "textures" (Ein Bild eines sternenklaren Himmels)
  const textureLoader = new THREE.TextureLoader();
  const starTexture = textureLoader.load('textures/stars.jpg');
  
  // Erstelle eine sehr große Kugel, deren Innenseite den Sternenhimmel zeigt
  const starGeometry = new THREE.SphereGeometry(90, 64, 64);
  const starMaterial = new THREE.MeshBasicMaterial({
    map: starTexture,
    side: THREE.BackSide
  });
  const starField = new THREE.Mesh(starGeometry, starMaterial);
  scene.add(starField);
}

function loadISS() {
  const loader = new GLTFLoader();
  // DRACOLoader initialisieren und dem GLTFLoader zuweisen
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.4.3/');
  loader.setDRACOLoader(dracoLoader);

  loader.load(
    'models/iss_model.glb',
    (gltf) => {
      iss = gltf.scene;
      console.log("ISS Modell geladen:", iss);
      // Testweise: Skaliere das Modell auf 1, damit es gut sichtbar wird
      iss.scale.set(1, 1, 1);
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

    const lat = data.latitude * (Math.PI / 180);
    const lon = data.longitude * (Math.PI / 180);
    const radius = 10; // Stelle sicher, dass die ISS außerhalb der Erde positioniert wird

    const x = radius * Math.cos(lat) * Math.cos(lon);
    const z = radius * Math.cos(lat) * Math.sin(lon);
    const y = radius * Math.sin(lat);

    if (iss) {
      iss.position.set(x, y, z);
    }
    setTimeout(updateISS, 5000);
  } catch (error) {
    console.error('Fehler beim Abrufen der ISS-Daten:', error);
  }
}

function animate() {
  requestAnimationFrame(animate);
  earth.rotation.y += 0.001;
  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

init();
