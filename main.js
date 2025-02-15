// main.js

// 1. Szene, Kamera und Renderer erstellen
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 2. Hintergrund mit bewegten Sternen (Astronomie-Thema)
const starGeometry = new THREE.BufferGeometry();
const starMaterial = new THREE.PointsMaterial({ color: 0x888888, size: 0.1 });
const stars = [];

for (let i = 0; i < 10000; i++) {
    const star = new THREE.Vector3(
        Math.random() * 1000 - 500,
        Math.random() * 1000 - 500,
        Math.random() * 1000 - 500
    );
    stars.push(star);
}

starGeometry.setFromPoints(stars);
const starField = new THREE.Points(starGeometry, starMaterial);
scene.add(starField);

// 3. Ein Planeten-Objekt erstellen (Astronomie)
const planetGeometry = new THREE.SphereGeometry(1, 32, 32);
const planetMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const planet = new THREE.Mesh(planetGeometry, planetMaterial);
planet.position.x = 5; // Der Planet wird ein wenig verschoben
scene.add(planet);

// 4. Interaktive Kamera-Bewegung basierend auf Mausbewegung
document.addEventListener('mousemove', (event) => {
    const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    camera.position.x = mouseX * 5;  // Kamera bewegt sich basierend auf der Mausposition
    camera.position.y = mouseY * 5;
    camera.lookAt(scene.position); // Kamera bleibt auf der Szene fokussiert
});

// 5. Animation: Planeten rotieren und Sterne bewegen sich
function animate() {
    requestAnimationFrame(animate);

    // Planetenrotation (Astronomie-Thema)
    planet.rotation.x += 0.01;
    planet.rotation.y += 0.01;

    // Sterne bewegen sich leicht für einen dynamischen Effekt
    starField.rotation.x += 0.0001;
    starField.rotation.y += 0.0001;

    renderer.render(scene, camera);
}

// 6. Auf Fenstergrößenänderung reagieren
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// 7. Start der Animation
animate();
