// Grundlegende Szene aufbauen
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Renderer erstellen und ins DOM einfügen
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Einen Kreis (z.B. Planeten) erstellen
const geometry = new THREE.SphereGeometry(1, 32, 32);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const planet = new THREE.Mesh(geometry, material);
scene.add(planet);

// Kamera positionieren
camera.position.z = 5;

// Animationsfunktion
function animate() {
    requestAnimationFrame(animate);

    // Rotation der Planeten (Astronomie Thema)
    planet.rotation.x += 0.01;
    planet.rotation.y += 0.01;

    renderer.render(scene, camera);
}

// Auf Fenstergrößenänderungen reagieren
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Start der Animation
animate();
