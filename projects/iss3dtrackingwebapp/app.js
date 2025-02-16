// Importiere Three.js (über die Import Map) sowie OrbitControls, GLTFLoader und DRACOLoader als ES Module
import * as THREE from 'three';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.152.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.152.0/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'https://cdn.jsdelivr.net/npm/three@0.152.0/examples/jsm/loaders/DRACOLoader.js';

let scene, camera, renderer, controls;
let earth, moon, starField, iss;
let moonAngle = 0;

const ISS_API_URL = 'https://api.wheretheiss.at/v1/satellites/25544';

function updateISS() {
  fetch(ISS_API_URL)
    .then(response => response.json())
    .then(data => {
      if (iss) {
        const lat = data.latitude.toFixed(2);
        const lon = data.longitude.toFixed(2);
        const altitude = data.altitude.toFixed(1); // Höhe in km
        const velocity = data.velocity.toFixed(1); // Geschwindigkeit in km/h
        const visibility = data.visibility === "daylight" ? "🌞 Tag" : "🌙 Nacht";
        
        // Stadt oder Ozean bestimmen (vereinfachte Methode)
        let location = "🌊 Ozean";
        if (lat > 48 && lat < 55 && lon > 6 && lon < 14) location = "🇩🇪 Deutschland";
        else if (lat > 36 && lat < 43 && lon > -9 && lon < 3) location = "🇪🇸 Spanien";
        else if (lat > 40 && lat < 50 && lon > -80 && lon < -70) location = "🇺🇸 USA (Ostküste)";

        const radius = 10;
        const phi = THREE.MathUtils.degToRad(90 - lat);
        const theta = THREE.MathUtils.degToRad(lon);

        iss.position.set(
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.cos(phi),
          radius * Math.sin(phi) * Math.sin(theta)
        );

        // InfoPanel aktualisieren
        const infoPanel = document.getElementById("infoPanel");
        if (infoPanel) {
          infoPanel.innerHTML = `
            🚀 <strong>ISS Position</strong><br>
            📍 Breitengrad: ${lat}° | Längengrad: ${lon}°<br>
            📏 Höhe: ${altitude} km<br>
            💨 Geschwindigkeit: ${velocity} km/h<br>
            🗺️ Über: ${location}<br>
            ☁  Sichtbarkeit: ${visibility}
          `;
        }
      }
    })
    .catch(error => console.error("Fehler beim Abrufen der ISS-Daten:", error));
}

setInterval(updateISS, 5000);

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

  const ambientLight = new THREE.AmbientLight(0x404040, 1);
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

function createEarth() {
  const textureLoader = new THREE.TextureLoader();
  const earthTexture = textureLoader.load('textures/earth.jpg');
  const earthGeometry = new THREE.SphereGeometry(5, 32, 32);
  const earthMaterial = new THREE.MeshStandardMaterial({ map: earthTexture });
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
  scene.add(moon);
}

function createStarField() {
  const textureLoader = new THREE.TextureLoader();
  const starTexture = textureLoader.load('textures/stars.jpg');
  const starGeometry = new THREE.SphereGeometry(90, 64, 64);
  const starMaterial = new THREE.MeshBasicMaterial({
    map: starTexture,
    side: THREE.BackSide,
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

function animate() {
  requestAnimationFrame(animate);
  
  earth.rotation.y += 0.001;
  starField.rotation.y += 0.00005;
  moon.rotation.y += 0.0001;

  const distance = 22;
  moonAngle += 0.002;
  moon.position.set(
    distance * Math.cos(moonAngle),
    2,
    distance * Math.sin(moonAngle)
  );

  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

init();
