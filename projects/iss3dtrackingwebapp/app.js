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
        if (lat > 48 && lat < 55 && lon > 6 && lon < 14) location = "🇩🇪 Deutschland (Berlin)";
        else if (lat > 36 && lat < 43 && lon > -9 && lon < 3) location = "🇪🇸 Spanien (Madrid)";
        else if (lat > 40 && lat < 50 && lon > -80 && lon < -70) location = "🇺🇸 USA (New York)";
        else if (lat > 33 && lat < 35 && lon > -119 && lon < -117) location = "🇺🇸 USA (Los Angeles)";
        else if (lat > 55 && lat < 57 && lon > 36 && lon < 38) location = "🇷🇺 Russland (Moskau)";
        else if (lat > 35 && lat < 45 && lon > 135 && lon < 145) location = "🇯🇵 Japan (Tokyo)";
        else if (lat > -35 && lat < -25 && lon > 135 && lon < 155) location = "🇦🇺 Australien (Sydney)";
        else if (lat > -10 && lat < 5 && lon > 110 && lon < 155) location = "🇮🇩 Indonesien (Jakarta)";
        else if (lat > -5 && lat < 5 && lon > -80 && lon < -35) location = "🇧🇷 Brasilien (São Paulo)";
        else if (lat > 50 && lat < 60 && lon > -10 && lon < 5) location = "🇬🇧 Großbritannien (London)";
        else if (lat > 30 && lat < 40 && lon > 20 && lon < 30) location = "🇬🇷 Griechenland (Athen)";
        else if (lat > -60 && lat < -50 && lon > -70 && lon < -50) location = "🇦🇷 Argentinien (Buenos Aires)";
        else if (lat > 20 && lat < 30 && lon > 70 && lon < 90) location = "🇮🇳 Indien (Neu-Delhi)";
        else if (lat > 25 && lat < 35 && lon > -10 && lon < 10) location = "🇫🇷 Frankreich (Paris)";
        else if (lat > 50 && lat < 60 && lon > 5 && lon < 15) location = "🇳🇱 Niederlande (Amsterdam)";
        else if (lat > 35 && lat < 45 && lon > -10 && lon < 5) location = "🇵🇹 Portugal (Lissabon)";
        else if (lat > 10 && lat < 20 && lon > 100 && lon < 110) location = "🇹🇭 Thailand (Bangkok)";
        else if (lat > 30 && lat < 40 && lon > 110 && lon < 120) location = "🇨🇳 China (Peking)";
        else if (lat > 60 && lat < 75 && lon > -60 && lon < -10) location = "🇬🇱 Grönland (Nuuk)";
        else if (lat > 35 && lat < 47 && lon > 6 && lon < 19) location = "🇮🇹 Italien (Rom)";
        else if (lat > 45 && lat < 50 && lon > 7 && lon < 15) location = "🇨🇭 Schweiz (Zürich)";
        else if (lat > 35 && lat < 40 && lon > 5 && lon < 10) location = "🇪🇸 Spanien (Barcelona)";
        else if (lat > 50 && lat < 55 && lon > 10 && lon < 20) location = "🇩🇰 Dänemark (Kopenhagen)";
        else if (lat > 55 && lat < 65 && lon > 10 && lon < 25) location = "🇸🇪 Schweden (Stockholm)";
        else if (lat > 50 && lat < 60 && lon > 15 && lon < 30) location = "🇵🇱 Polen (Warschau)";
        else if (lat > 40 && lat < 50 && lon > 20 && lon < 30) location = "🇭🇺 Ungarn (Budapest)";
        else if (lat > 50 && lat < 55 && lon > 20 && lon < 30) location = "🇨🇿 Tschechien (Prag)";
        else if (lat > 45 && lat < 55 && lon > 25 && lon < 35) location = "🇺🇦 Ukraine (Kiew)";
        else if (lat > 35 && lat < 40 && lon > -90 && lon < -80) location = "🇺🇸 USA (Chicago)";
        else if (lat > 25 && lat < 35 && lon > -110 && lon < -100) location = "🇺🇸 USA (Dallas)";
        else if (lat > 30 && lat < 40 && lon > -85 && lon < -75) location = "🇺🇸 USA (Washington D.C.)";
        else if (lat > 35 && lat < 45 && lon > -100 && lon < -90) location = "🇺🇸 USA (Kansas City)";
        else if (lat > 35 && lat < 45 && lon > 25 && lon < 35) location = "🇹🇷 Türkei (Istanbul)";
        else if (lat > -35 && lat < -25 && lon > -65 && lon < -55) location = "🇦🇷 Argentinien (Cordoba)";
        else if (lat > -35 && lat < -25 && lon > -75 && lon < -65) location = "🇨🇱 Chile (Santiago)";
        else if (lat > -35 && lat < -25 && lon > -60 && lon < -50) location = "🇺🇾 Uruguay (Montevideo)";
        else if (lat > -5 && lat < 5 && lon > 35 && lon < 50) location = "🇰🇪 Kenia (Nairobi)";
        else if (lat > -5 && lat < 5 && lon > 10 && lon < 30) location = "🇨🇩 Demokratische Republik Kongo (Kinshasa)";
        else if (lat > 10 && lat < 20 && lon > -20 && lon < 0) location = "🇸🇳 Senegal (Dakar)";
        else if (lat > 20 && lat < 30 && lon > -20 && lon < 0) location = "🇲🇦 Marokko (Rabat)";
        else if (lat > 10 && lat < 20 && lon > 30 && lon < 40) location = "🇸🇩 Sudan (Khartum)";
        else if (lat > 30 && lat < 40 && lon > 35 && lon < 45) location = "🇮🇶 Irak (Bagdad)";
        else if (lat > 25 && lat < 35 && lon > 50 && lon < 60) location = "🇮🇷 Iran (Teheran)";
        else if (lat > 20 && lat < 30 && lon > 40 && lon < 50) location = "🇸🇦 Saudi-Arabien (Riad)";
        else if (lat > -30 && lat < -20 && lon > 25 && lon < 35) location = "🇿🇦 Südafrika (Johannesburg)";
        else if (lat > -10 && lat < 0 && lon > 130 && lon < 145) location = "🇵🇬 Papua-Neuguinea (Port Moresby)";
        else if (lat > -50 && lat < -40 && lon > 160 && lon < 180) location = "🇳🇿 Neuseeland (Wellington)";
        else if (lat > 50 && lat < 60 && lon > 30 && lon < 40) location = "🇪🇪 Estland (Tallinn)";
        else if (lat > 40 && lat < 50 && lon > 10 && lon < 20) location = "🇦🇹 Österreich (Wien)";
        else if (lat > 45 && lat < 50 && lon > 14 && lon < 24) location = "🇭🇷 Kroatien (Zagreb)";
        else if (lat > 35 && lat < 45 && lon > 25 && lon < 35) location = "🇧🇬 Bulgarien (Sofia)";
        else if (lat > 40 && lat < 50 && lon > 20 && lon < 30) location = "🇷🇴 Rumänien (Bukarest)";
        else if (lat > 35 && lat < 42 && lon > 10 && lon < 20) location = "🇷🇸 Serbien (Belgrad)";
        else if (lat > 50 && lat < 55 && lon > 30 && lon < 35) location = "🇧🇾 Weißrussland (Minsk)";
        else if (lat > 50 && lat < 60 && lon > 25 && lon < 30) location = "🇱🇹 Litauen (Vilnius)";
        else if (lat > 50 && lat < 60 && lon > 20 && lon < 26) location = "🇱🇻 Lettland (Riga)";
        else if (lat > 50 && lat < 60 && lon > 24 && lon < 30) location = "🇪🇪 Estland (Tallinn)";
        else if (lat > 45 && lat < 55 && lon > 5 && lon < 10) location = "🇧🇪 Belgien (Brüssel)";
        else if (lat > 45 && lat < 55 && lon > 4 && lon < 8) location = "🇱🇺 Luxemburg (Luxemburg)";
        else if (lat > 35 && lat < 45 && lon > 5 && lon < 15) location = "🇸🇮 Slowenien (Ljubljana)";
        else if (lat > 35 && lat < 45 && lon > 10 && lon < 25) location = "🇭🇺 Ungarn (Budapest)";
        else if (lat > 45 && lat < 55 && lon > 10 && lon < 20) location = "🇨🇿 Tschechien (Prag)";
        else if (lat > 35 && lat < 45 && lon > 19 && lon < 29) location = "🇸🇰 Slowakei (Bratislava)";
        else if (lat > 35 && lat < 45 && lon > -10 && lon < 5) location = "🇪🇸 Spanien (Sevilla)";
        else if (lat > 50 && lat < 60 && lon > 0 && lon < 5) location = "🇮🇪 Irland (Dublin)";
        else if (lat > 35 && lat < 45 && lon > -80 && lon < -70) location = "🇺🇸 USA (Boston)";
        else if (lat > 40 && lat < 50 && lon > -90 && lon < -80) location = "🇺🇸 USA (Detroit)";
        else if (lat > 40 && lat < 50 && lon > -100 && lon < -90) location = "🇺🇸 USA (Minneapolis)";
        else if (lat > 35 && lat < 45 && lon > -120 && lon < -110) location = "🇺🇸 USA (Phoenix)";
        else if (lat > 25 && lat < 35 && lon > -90 && lon < -80) location = "🇺🇸 USA (Atlanta)";
        else if (lat > 35 && lat < 45 && lon > -90 && lon < -80) location = "🇺🇸 USA (Cleveland)";
        else if (lat > -10 && lat < 5 && lon > 30 && lon < 40) location = "🇪🇹 Äthiopien (Addis Abeba)";
        else if (lat > 5 && lat < 15 && lon > -5 && lon < 5) location = "🇨🇮 Elfenbeinküste (Abidjan)";
        else if (lat > 5 && lat < 15 && lon > 5 && lon < 15) location = "🇳🇬 Nigeria (Lagos)";
        else if (lat > -30 && lat < -20 && lon > 20 && lon < 30) location = "🇿🇦 Südafrika (Kapstadt)";
        else if (lat > 10 && lat < 20 && lon > 40 && lon < 50) location = "🇾🇪 Jemen (Sanaa)";
        else if (lat > 10 && lat < 20 && lon > 50 && lon < 60) location = "🇴🇲 Oman (Maskat)";
        else if (lat > 10 && lat < 20 && lon > 90 && lon < 100) location = "🇲🇲 Myanmar (Rangun)";
        else if (lat > 30 && lat < 40 && lon > 100 && lon < 110) location = "🇨🇳 China (Chengdu)";
        else if (lat > 30 && lat < 40 && lon > 120 && lon < 130) location = "🇰🇷 Südkorea (Seoul)";
        else if (lat > 30 && lat < 40 && lon > 130 && lon < 140) location = "🇯🇵 Japan (Osaka)";
        else if (lat > 55 && lat < 65 && lon > 20 && lon < 30) location = "🇫🇮 Finnland (Helsinki)";
        else if (lat > 45 && lat < 50 && lon > 25 && lon < 30) location = "🇲🇩 Moldawien (Chișinău)";
        else if (lat > 50 && lat < 60 && lon > 35 && lon < 40) location = "🇷🇺 Russland (Sankt Petersburg)";
        else if (lat > 35 && lat < 40 && lon > 45 && lon < 55) location = "🇦🇿 Aserbaidschan (Baku)";
        else if (lat > 40 && lat < 45 && lon > 70 && lon < 80) location = "🇰🇿 Kasachstan (Astana)";
        else if (lat > 25 && lat < 30 && lon > 30 && lon < 35) location = "🇪🇬 Ägypten (Kairo)";
        else if (lat > -5 && lat < 5 && lon > 35 && lon < 40) location = "🇹🇿 Tansania (Dodoma)";
        else if (lat > 5 && lat < 15 && lon > 35 && lon < 45) location = "🇸🇸 Südsudan (Juba)";
        else if (lat > -30 && lat < -20 && lon > -65 && lon < -55) location = "🇧🇴 Bolivien (La Paz)";
        else if (lat > -25 && lat < -15 && lon > -60 && lon < -50) location = "🇵🇾 Paraguay (Asunción)";
        else if (lat > -15 && lat < -5 && lon > -50 && lon < -40) location = "🇧🇷 Brasilien (Brasília)";
        else if (lat > -40 && lat < -30 && lon > -75 && lon < -65) location = "🇦🇷 Argentinien (Mendoza)";
        else if (lat > -15 && lat < -5 && lon > 45 && lon < 55) location = "🇲🇬 Madagaskar (Antananarivo)";
        else if (lat > -25 && lat < -15 && lon > 25 && lon < 35) location = "🇿🇼 Simbabwe (Harare)";
        else if (lat > -5 && lat < 5 && lon > 10 && lon < 20) location = "🇬🇦 Gabun (Libreville)";
        else if (lat > 0 && lat < 10 && lon > -80 && lon < -70) location = "🇨🇴 Kolumbien (Bogotá)";
        else if (lat > 10 && lat < 20 && lon > -90 && lon < -80) location = "🇬🇹 Guatemala (Guatemala-Stadt)";
        else if (lat > 10 && lat < 20 && lon > -80 && lon < -70) location = "🇻🇪 Venezuela (Caracas)";
        else if (lat > 10 && lat < 20 && lon > -100 && lon < -90) location = "🇲🇽 Mexiko (Mexiko-Stadt)";
        else if (lat > 20 && lat < 30 && lon > -110 && lon < -100) location = "🇲🇽 Mexiko (Monterrey)";
        else if (lat > 10 && lat < 20 && lon > 105 && lon < 115) location = "🇰🇭 Kambodscha (Phnom Penh)";
        else if (lat > 0 && lat < 10 && lon > 100 && lon < 110) location = "🇻🇳 Vietnam (Ho-Chi-Minh-Stadt)";
        else if (lat > 40 && lat < 50 && lon > 130 && lon < 140) location = "🇯🇵 Japan (Sapporo)";
        else if (lat > 45 && lat < 55 && lon > 60 && lon < 70) location = "🇷🇺 Russland (Jekaterinburg)";
        else if (lat > 55 && lat < 65 && lon > 60 && lon < 70) location = "🇷🇺 Russland (Nowosibirsk)";
        else if (lat > -10 && lat < 0 && lon > 140 && lon < 150) location = "🇮🇩 Indonesien (Jayapura)";
        else if (lat > -40 && lat < -30 && lon > 115 && lon < 125) location = "🇦🇺 Australien (Perth)";
        else if (lat > -30 && lat < -20 && lon > 130 && lon < 140) location = "🇦🇺 Australien (Alice Springs)";
        else if (lat > 60 && lat < 70 && lon > -150 && lon < -140) location = "🇺🇸 USA (Anchorage, Alaska)";
        else if (lat > 20 && lat < 30 && lon > -160 && lon < -150) location = "🇺🇸 USA (Hawaii, Honolulu)";
        else if (lat > -10 && lat < 0 && lon > -80 && lon < -70) location = "🇪🇨 Ecuador (Quito)";
        else if (lat > 0 && lat < 10 && lon > -60 && lon < -50) location = "🇬🇾 Guyana (Georgetown)";
        else if (lat > -10 && lat < 0 && lon > -50 && lon < -40) location = "🇧🇷 Brasilien (Belém)"; 
        else if (lat > -40 && lat < -30 && lon > 140 && lon < 150) location = "🇦🇺 Australien (Melbourne)";
        else if (lat > -20 && lat < -10 && lon > 140 && lon < 150) location = "🇦🇺 Australien (Darwin)";
        else if (lat > -40 && lat < -30 && lon > 170 && lon < 180) location = "🇳🇿 Neuseeland (Auckland)";
        else if (lat > -10 && lat < 10 && lon > -30 && lon < 30) location = "🌊 Atlantischer Ozean";
        else if (lat > -60 && lat < 60 && lon > 100 && lon < 180) location = "🌊 Pazifischer Ozean";
        else if (lat > -60 && lat < 60 && lon > 30 && lon < 100) location = "🌊 Indischer Ozean";
        else if (lat > 60 || lat < -60) location = "🌊 Arktischer Ozean";

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
            🌎 Breitengrad: ${lat}°<br>
            🌍 Längengrad: ${lon}°<br>
            🌏 Altitude (Höhe): ${altitude} km<br>
            💨 Geschwindigkeit: ${velocity} km/h<br>
            🗺️ Über: ${location}<br>
            👀 Sichtbarkeit: ${visibility}
          `;
        }
      }
    })
    .catch(error => console.error("Fehler beim Abrufen der ISS-Daten:", error));
}

setInterval(updateISS, 60000);

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
  moon.rotation.y += 0.00005;

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
