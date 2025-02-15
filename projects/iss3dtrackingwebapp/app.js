let scene, camera, renderer, controls;
let earth, moon, iss;

const ISS_API_URL = 'https://api.wheretheiss.at/v1/satellites/25544';

function init() {
  // Szene erstellen
  scene = new THREE.Scene();

  // Kamera einrichten
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 10, 20);

  // Renderer erstellen
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // OrbitControls hinzufügen
  controls = new THREE.OrbitControls(camera, renderer.domElement);

  // Lichtquellen
  const pointLight = new THREE.PointLight(0xffffff, 1);
  pointLight.position.set(50, 50, 50);
  scene.add(pointLight);

  const ambientLight = new THREE.AmbientLight(0x404040, 1);
  scene.add(ambientLight);

  // Erde und Mond erstellen
  createEarth();
  createMoon();

  // ISS-Modell laden
  loadISS();

  // Animation starten
  animate();

  window.addEventListener('resize', onWindowResize, false);
}

function createEarth() {
  const textureLoader = new THREE.TextureLoader();
  const earthGeometry = new THREE.SphereGeometry(5, 32, 32);
  const earthMaterial = new THREE.MeshStandardMaterial({
    map: textureLoader.load('textures/earth.jpg')
  });
  earth = new THREE.Mesh(earthGeometry, earthMaterial);
  scene.add(earth);
}

function createMoon() {
  const textureLoader = new THREE.TextureLoader();
  const moonGeometry = new THREE.SphereGeometry(1.35, 32, 32);
  const moonMaterial = new THREE.MeshStandardMaterial({
    map: textureLoader.load('textures/moon.jpg')
  });
  moon = new THREE.Mesh(moonGeometry, moonMaterial);
  moon.position.set(38, 0, 0);
  scene.add(moon);

  // Orbit-Ring um den Mond (zur Veranschaulichung)
  const orbitGeometry = new THREE.RingGeometry(38, 38.1, 64);
  const orbitMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide
  });
  const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
  orbit.rotation.x = Math.PI / 2;
  scene.add(orbit);
}

function loadISS() {
  const loader = new THREE.GLTFLoader();
  loader.load(
    'models/iss_model.glb',
    (gltf) => {
      iss = gltf.scene;
      iss.scale.set(0.1, 0.1, 0.1);
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
    const radius = 7;

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
