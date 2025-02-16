// Importiere Three.js (über die Import Map) sowie OrbitControls, GLTFLoader und DRACOLoader als ES Module
import * as THREE from 'three';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.152.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.152.0/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'https://cdn.jsdelivr.net/npm/three@0.152.0/examples/jsm/loaders/DRACOLoader.js';

let scene, camera, renderer, controls;
let earth, moon, starField, iss;

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

  createEarth();
  createMoon();
  createStarField();
  loadISS();
  createInfoPanel();

  animate();
  window.addEventListener('resize', onWindowResize, false);
}

function createEarth() {
  const textureLoader = new THREE.TextureLoader();
  const earthTexture = textureLoader.load('textures/earth.jpg');

  const earthGeometry = new THREE.SphereGeometry(5, 32, 32);
  const earthMaterial = new THREE.MeshStandardMaterial({
    map: earthTexture
  });
  earth = new THREE.Mesh(earthGeometry, earthMaterial);
  scene.add(earth);
}

function createMoon() {
  const textureLoader = new THREE.TextureLoader();
  const moonTexture = textureLoader.load('textures/moon.jpg');

  const moonGeometry = new THREE.SphereGeometry(1.35, 64, 64);
  const moonMaterial = new THREE.MeshStandardMaterial({
    map: moonTexture,
    roughness: 0.7,
  });
  moon = new THREE.Mesh(moonGeometry, moonMaterial);
  moon.position.set(38, 0, 0);
  scene.add(moon);
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
      iss.scale.set(0.25, 0.25, 0.25);
      scene.add(iss);
      updateISS();
    },
    undefined,
    (error) => {
      console.error('Fehler beim Laden des ISS-Modells:', error);
    }
  );
}

// Info-Panel erstellen
function createInfoPanel() {
  const infoPanel = document.createElement("div");
  infoPanel.id = "infoPanel";
  infoPanel.style.position = "absolute";
  infoPanel.style.bottom = "10px";
  infoPanel.style.left = "50%";
  infoPanel.style.transform = "translateX(-50%)";
  infoPanel.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
  infoPanel.style.color = "white";
  infoPanel.style.padding = "10px";
  infoPanel.style.borderRadius = "5px";
  infoPanel.style.fontFamily = "Arial, sans-serif";
  infoPanel.style.fontSize = "14px";
  infoPanel.style.textAlign = "center";
  document.body.appendChild(infoPanel);
}

async function getCityAndCountry(lat, lon) {
  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
    const data = await response.json();
    return data.address ? `${data.address.city || data.address.town || data.address.village || "Unbekannt"}, ${data.address.country || "Unbekannt"}` : "Über dem Ozean";
  } catch (error) {
    console.error("Fehler beim Abrufen der Stadt/Land-Daten:", error);
    return "Ort unbekannt";
  }
}

async function updateISS() {
  try {
    const response = await fetch(ISS_API_URL);
    const data = await response.json();

    const lat = data.latitude;
    const lon = data.longitude;
    const alt = data.altitude.toFixed(2);
    const speed = data.velocity.toFixed(2);
    const visibility = data.visibility === "daylight" ? "Sichtbar" : "Im Schatten";
    const footprint = data.footprint.toFixed(2);
    const timestamp = new Date(data.timestamp * 1000).toLocaleTimeString();
    const location = await getCityAndCountry(lat, lon);

    const radius = 10;
    const x = radius * Math.cos(lat * (Math.PI / 180)) * Math.cos(lon * (Math.PI / 180));
    const z = radius * Math.cos(lat * (Math.PI / 180)) * Math.sin(lon * (Math.PI / 180));
    const y = radius * Math.sin(lat * (Math.PI / 180));

    if (iss) {
      iss.position.set(x, y, z);
    }

    updateInfoPanel(lat, lon, alt, speed, visibility, footprint, timestamp, location);
    setTimeout(updateISS, 5000);
  } catch (error) {
    console.error("Fehler beim Abrufen der ISS-Daten:", error);
  }
}

function updateInfoPanel(lat, lon, alt, speed, visibility, footprint, timestamp, location) {
  const infoPanel = document.getElementById("infoPanel");
  infoPanel.innerHTML = `
    🌍 Position: ${lat.toFixed(2)}° N, ${lon.toFixed(2)}° E <br>
    🏙️ Über: ${location} <br>
    🚀 Höhe: ${alt} km <br>
    ⚡ Geschwindigkeit: ${speed} km/h <br>
    👀 Sichtbarkeit: ${visibility} <br>
    🌎 Sichtbereich: ${footprint} km <br>
    ⏰ Aktualisiert: ${timestamp}
  `;
}

function animate() {
  requestAnimationFrame(animate);
  earth.rotation.y += 0.001;
  moon.rotation.y += 0.0001;
  starField.rotation.y += 0.00005;
  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

init();
