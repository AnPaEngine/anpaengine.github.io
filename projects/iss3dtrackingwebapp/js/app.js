// Importiere Three.js und andere notwendige Module
import * as THREE from 'three';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.152.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.152.0/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'https://cdn.jsdelivr.net/npm/three@0.152.0/examples/jsm/loaders/DRACOLoader.js';
import { getISSData } from './api.js';  // Importiere die getISSData Funktion

let scene, camera, renderer, controls;
let earth, moon, starField, iss;

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

  const moonGeometry = new THREE.SphereGeometry(1.35, 64, 64); // Höhere Detailgenauigkeit für die Kugel
  const moonMaterial = new THREE.MeshStandardMaterial({
    map: moonTexture,
    side: THREE.DoubleSide,
    roughness: 0.7, // Optional, um den Effekt realistischer zu machen
  });
  moon = new THREE.Mesh(moonGeometry, moonMaterial);
  moon.position.set(38, 0, 0); // Positionierung des Mondes
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
      console.log("ISS Modell geladen:", iss);
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

async function updateISS() {
  try {
    const data = await getISSData(); // Abruf der ISS-Daten

    const lat = data.latitude * (Math.PI / 180);  // Umwandlung in Bogenmaß
    const lon = data.longitude * (Math.PI / 180);  // Umwandlung in Bogenmaß
    const radius = 10;

    const x = radius * Math.cos(lat) * Math.cos(lon);
    const z = radius * Math.cos(lat) * Math.sin(lon);
    const y = radius * Math.sin(lat);

    if (iss) {
      iss.position.set(x, y, z);
    }

    // Update der Info-Leiste
    document.getElementById('issPosition').textContent = `Position: Lat ${data.latitude.toFixed(2)}° | Lon ${data.longitude.toFixed(2)}°`;
    document.getElementById('issSpeed').textContent = `Speed: ${data.velocity.toFixed(2)} km/h`;

    // Crew-Informationen anzeigen
    const crewList = data.crew.map(person => person.name).join(', ');
    document.getElementById('issCrew').textContent = `Crew: ${crewList || 'Keine Daten'}`;
    document.getElementById('issOrbit').textContent = `Orbit: ${data.orbit}`;
    document.getElementById('issWeather').textContent = `Weather: N/A`;  // Placeholder für Wetterdaten, falls vorhanden

    setTimeout(updateISS, 5000); // Aktualisierung alle 5 Sekunden
  } catch (error) {
    console.error('Fehler beim Abrufen der ISS-Daten:', error);
  }
}

function animate() {
  requestAnimationFrame(animate);

  // Rotation der Erde
  earth.rotation.y += 0.001;

  // Rotation des Mondes (um seine eigene Achse)
  moon.rotation.y += 0.0001;

  // Mond bewegt sich in seiner Umlaufbahn um die Erde
  const distance = 38;  // Entfernung des Mondes zur Erde
  moon.position.x = distance * Math.cos(earth.rotation.y);
  moon.position.z = distance * Math.sin(earth.rotation.y);

  // Sehr langsame Rotation des Sternenhimmels
  starField.rotation.y += 0.00005;

  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

init();
