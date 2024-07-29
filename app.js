import * as THREE from 'three';

// Creating a scene
const scene = new THREE.Scene();

// Creating a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Creating a renderer and adding it to the DOM
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Creating the sun
const sunGeometry = new THREE.SphereGeometry(1, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

// Function to create planets and dwarf planets
function createPlanet(size, color, distance) {
    const planetGeometry = new THREE.SphereGeometry(size, 32, 32);
    const planetMaterial = new THREE.MeshBasicMaterial({ color: color });
    const planet = new THREE.Mesh(planetGeometry, planetMaterial);
    planet.userData = { distance: distance, angle: 0, moons: [] };
    return planet;
}

// Function to create moons
function createMoon(size, color, distance) {
    const moonGeometry = new THREE.SphereGeometry(size, 32, 32);
    const moonMaterial = new THREE.MeshBasicMaterial({ color: color });
    const moon = new THREE.Mesh(moonGeometry, moonMaterial);
    moon.userData = { distance: distance, angle: 0 };
    return moon;
}

// Creating planets with their approximate sizes and distances from the sun
const planets = [
    createPlanet(0.038, 0xa9a9a9, 2), // Mercury
    createPlanet(0.094, 0xffa500, 3), // Venus
    createPlanet(0.1, 0x0000ff, 4),   // Earth
    createPlanet(0.053, 0xff4500, 5), // Mars
    createPlanet(1.121, 0xd2b48c, 7), // Jupiter
    createPlanet(0.945, 0xdaa520, 10), // Saturn
    createPlanet(0.401, 0x87ceeb, 12), // Uranus
    createPlanet(0.388, 0x00008b, 14), // Neptune
];

// Creating dwarf planets with their approximate sizes and distances from the sun
const dwarfPlanets = [
    createPlanet(0.0186, 0xb0c4de, 16), // Pluto
    createPlanet(0.0074, 0xdeb887, 2.77), // Ceres (in the asteroid belt)
    createPlanet(0.0115, 0xffe4c4, 17), // Haumea
    createPlanet(0.0121, 0xf5deb3, 19), // Makemake
    createPlanet(0.0233, 0x8b4513, 23), // Eris
];

// Adding moons
planets[2].userData.moons.push(createMoon(0.0273, 0xffffff, 0.3)); // Earth's moon
planets[3].userData.moons.push(createMoon(0.0067, 0x888888, 0.2)); // Phobos
planets[3].userData.moons.push(createMoon(0.0038, 0x888888, 0.3)); // Deimos
planets[4].userData.moons.push(createMoon(0.0413, 0x888888, 1.2)); // Ganymede
planets[4].userData.moons.push(createMoon(0.0286, 0xffff00, 1.5)); // Callisto
planets[4].userData.moons.push(createMoon(0.0245, 0xffa500, 1.8)); // Io
planets[4].userData.moons.push(createMoon(0.0245, 0x0000ff, 2.0)); // Europa
planets[5].userData.moons.push(createMoon(0.0404, 0xffd700, 1.0)); // Titan
planets[6].userData.moons.push(createMoon(0.0289, 0x8a2be2, 0.9)); // Titania
planets[7].userData.moons.push(createMoon(0.0273, 0x7fffd4, 1.1)); // Triton
dwarfPlanets[0].userData.moons.push(createMoon(0.0121, 0x8b0000, 0.3)); // Charon

// Adding planets and moons to the scene
planets.forEach(planet => {
    scene.add(planet);
    planet.userData.moons.forEach(moon => scene.add(moon));
});
dwarfPlanets.forEach(dwarfPlanet => {
    scene.add(dwarfPlanet);
    dwarfPlanet.userData.moons.forEach(moon => scene.add(moon));
});

// Setting the camera position
camera.position.z = 30;

// Handle window resize
window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    const currentTime = Date.now() * 0.0001;

    planets.concat(dwarfPlanets).forEach(planet => {
        planet.userData.angle += 0.01;
        planet.position.x = Math.cos(planet.userData.angle + currentTime) * planet.userData.distance;
        planet.position.z = Math.sin(planet.userData.angle + currentTime) * planet.userData.distance;

        planet.userData.moons.forEach((moon, index) => {
            moon.userData.angle += 0.03;
            moon.position.x = planet.position.x + Math.cos(moon.userData.angle + currentTime) * moon.userData.distance;
            moon.position.z = planet.position.z + Math.sin(moon.userData.angle + currentTime) * moon.userData.distance;
        });
    });

    renderer.render(scene, camera);
}

animate();

