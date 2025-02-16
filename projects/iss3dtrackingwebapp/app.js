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
        
        // Städte und Ozeanregionen
const locations = [
  // Europa
  { name: "Berlin, Deutschland", latMin: 52.3, latMax: 52.7, lonMin: 13.2, lonMax: 13.6 },
  { name: "Paris, Frankreich", latMin: 48.8, latMax: 49.1, lonMin: 2.2, lonMax: 2.5 },
  { name: "London, Vereinigtes Königreich", latMin: 51.3, latMax: 51.7, lonMin: -0.5, lonMax: 0.2 },
  { name: "Rom, Italien", latMin: 41.8, latMax: 42.0, lonMin: 12.4, lonMax: 12.7 },
  { name: "Madrid, Spanien", latMin: 40.3, latMax: 40.5, lonMin: -3.8, lonMax: -3.6 },
  { name: "Athen, Griechenland", latMin: 37.9, latMax: 38.1, lonMin: 23.6, lonMax: 23.8 },
  { name: "Brüssel, Belgien", latMin: 50.8, latMax: 51.1, lonMin: 4.3, lonMax: 4.5 },
  { name: "Amsterdam, Niederlande", latMin: 52.3, latMax: 52.5, lonMin: 4.8, lonMax: 5.0 },
  { name: "Oslo, Norwegen", latMin: 59.9, latMax: 60.2, lonMin: 10.7, lonMax: 11.0 },

  // Nordamerika
  { name: "New York, USA", latMin: 40.5, latMax: 41.0, lonMin: -74.2, lonMax: -73.7 },
  { name: "Los Angeles, USA", latMin: 33.9, latMax: 34.1, lonMin: -118.5, lonMax: -118.2 },
  { name: "Mexico City, Mexiko", latMin: 19.3, latMax: 19.6, lonMin: -99.3, lonMax: -99.0 },
  { name: "Toronto, Kanada", latMin: 43.6, latMax: 43.9, lonMin: -79.4, lonMax: -79.1 },
  { name: "Vancouver, Kanada", latMin: 49.2, latMax: 49.3, lonMin: -123.1, lonMax: -122.9 },
  { name: "Montreal, Kanada", latMin: 45.4, latMax: 45.6, lonMin: -73.5, lonMax: -73.3 },
  { name: "Chicago, USA", latMin: 41.6, latMax: 41.9, lonMin: -87.6, lonMax: -87.3 },

  // Südamerika
  { name: "Rio de Janeiro, Brasilien", latMin: -23.0, latMax: -22.7, lonMin: -43.3, lonMax: -43.1 },
  { name: "Buenos Aires, Argentinien", latMin: -34.7, latMax: -34.5, lonMin: -58.5, lonMax: -58.3 },
  { name: "São Paulo, Brasilien", latMin: -23.6, latMax: -23.5, lonMin: -46.6, lonMax: -46.5 },
  { name: "Lima, Peru", latMin: -12.0, latMax: -11.8, lonMin: -77.1, lonMax: -76.9 },

  // Afrika
  { name: "Kairo, Ägypten", latMin: 30.0, latMax: 30.2, lonMin: 31.2, lonMax: 31.4 },
  { name: "Kapstadt, Südafrika", latMin: -34.1, latMax: -33.9, lonMin: 18.4, lonMax: 18.6 },
  { name: "Lagos, Nigeria", latMin: 6.4, latMax: 6.6, lonMin: 3.3, lonMax: 3.5 },
  { name: "Nairobi, Kenia", latMin: -1.3, latMax: -1.2, lonMin: 36.8, lonMax: 37.0 },
  { name: "Abuja, Nigeria", latMin: 9.0, latMax: 9.1, lonMin: 7.5, lonMax: 7.6 },
  { name: "Addis Abeba, Äthiopien", latMin: 9.0, latMax: 9.2, lonMin: 38.7, lonMax: 38.9 },

  // Asien
  { name: "Tokyo, Japan", latMin: 35.6, latMax: 35.8, lonMin: 139.6, lonMax: 139.9 },
  { name: "Peking, China", latMin: 39.8, latMax: 40.0, lonMin: 116.3, lonMax: 116.5 },
  { name: "Bangkok, Thailand", latMin: 13.7, latMax: 13.9, lonMin: 100.4, lonMax: 100.6 },
  { name: "Seoul, Südkorea", latMin: 37.5, latMax: 37.7, lonMin: 126.9, lonMax: 127.1 },
  { name: "Mumbai, Indien", latMin: 18.9, latMax: 19.1, lonMin: 72.8, lonMax: 73.0 },
  { name: "Dubai, Vereinigte Arabische Emirate", latMin: 25.2, latMax: 25.3, lonMin: 55.3, lonMax: 55.4 },
  { name: "Manila, Philippinen", latMin: 14.5, latMax: 14.7, lonMin: 120.9, lonMax: 121.1 },

  // Australien
  { name: "Sydney, Australien", latMin: -34.0, latMax: -33.7, lonMin: 151.1, lonMax: 151.3 },
  { name: "Melbourne, Australien", latMin: -37.8, latMax: -37.6, lonMin: 144.9, lonMax: 145.1 },
  { name: "Brisbane, Australien", latMin: -27.5, latMax: -27.3, lonMin: 153.0, lonMax: 153.2 },

  // Russland
  { name: "Moskau, Russland", latMin: 55.6, latMax: 55.9, lonMin: 37.4, lonMax: 37.7 },
  { name: "Sankt Petersburg, Russland", latMin: 59.9, latMax: 60.1, lonMin: 29.7, lonMax: 30.0 },
  { name: "Nowosibirsk, Russland", latMin: 54.8, latMax: 55.0, lonMin: 82.9, lonMax: 83.1 },

  // Grönland
  { name: "Nuuk, Grönland", latMin: 64.1, latMax: 64.2, lonMin: -51.7, lonMax: -51.5 },

  // Nordkorea
  { name: "Pyongyang, Nordkorea", latMin: 39.0, latMax: 39.2, lonMin: 125.5, lonMax: 125.7 },

  // Ozean Regionen
  { name: "🌊 Ozean (Pazifik)", latMin: -50, latMax: 50, lonMin: -180, lonMax: -140 },
  { name: "🌊 Ozean (Atlantik)", latMin: -50, latMax: 50, lonMin: -80, lonMax: -20 },
  { name: "🌊 Ozean (Indischer Ozean)", latMin: -40, latMax: 40, lonMin: 40, lonMax: 120 },
  { name: "🌊 Arktischer Ozean", latMin: 60, latMax: 90, lonMin: -180, lonMax: 180 }
];

// Update ISS-Position und Bestimmung des Ortes
function updateISS() {
  fetch('http://api.open-notify.org/iss-now.json')
    .then(response => response.json())
    .then(data => {
      if (data && data.iss_position) {
        const lat = parseFloat(data.iss_position.latitude);
        const lon = parseFloat(data.iss_position.longitude);
        const altitude = data.altitude || 'unbekannt'; // Höhe in km
        const velocity = data.velocity || 'unbekannt'; // Geschwindigkeit in km/h
        const visibility = data.visibility === "daylight" ? "🌞 Tag" : "🌙 Nacht";

        let location = "🌊 Ozean"; // Standardwert, falls keine Stadt gefunden wird

        // Bestimmung der Stadt oder Ozeanregion basierend auf den Koordinaten
        for (let i = 0; i < locations.length; i++) {
          const loc = locations[i];
          if (lat >= loc.latMin && lat <= loc.latMax && lon >= loc.lonMin && lon <= loc.lonMax) {
            location = loc.name;
            break;
          }
        }

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
            🛰️ <strong>ISS 3D Tracking</strong><br>
            🌎 Breitengrad: ${lat.toFixed(2)}°<br>
            🌍 Längengrad: ${lon.toFixed(2)}°<br>
            🌏 Altitude: ${altitude} km<br>
            🚀 Geschwindigkeit: ${velocity} km/h<br>
            🌐 Sichtbarkeit: ${visibility}<br>
            🌍 Ort: ${location}
          `;
        }
      }
    })
    .catch(error => {
      console

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
