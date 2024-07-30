import * as THREE from 'three';
import { scene } from './scene.js';

function createEllipsoid(name, size, texture, distanceAph, distancePer, tilt, rotationSpeed, revolutionSpeed, flattening) {
    const widthSegments = 32;
    const heightSegments = 32;
    const radius = size;

    const ellipsoidGeometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
    ellipsoidGeometry.scale(1, 1 - flattening, 1);

    const planetMaterial = new THREE.MeshStandardMaterial({ map: texture });
    const planet = new THREE.Mesh(ellipsoidGeometry, planetMaterial);
    planet.userData = { name, distanceAph, distancePer, angle: 0, moons: [], rotationSpeed, revolutionSpeed };
    planet.rotation.z = THREE.Math.degToRad(tilt); // Apply axial tilt
    return planet;
}

function createMoon(name, size, texture, distance, tilt, rotationSpeed, revolutionSpeed) {
    const moonGeometry = new THREE.SphereGeometry(size, 32, 32);
    const moonMaterial = new THREE.MeshStandardMaterial({ map: texture });
    const moon = new THREE.Mesh(moonGeometry, moonMaterial);
    moon.userData = { name, distance, angle: 0, rotationSpeed, revolutionSpeed };
    moon.rotation.z = THREE.Math.degToRad(tilt); // Apply axial tilt
    return moon;
}

function createRings(texture) {
    const ringGeometry = new THREE.RingGeometry(11, 15, 64);
    const ringMaterial = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.DoubleSide,
        transparent: true
    });
    const rings = new THREE.Mesh(ringGeometry, ringMaterial);
    rings.rotation.x = Math.PI / 2;
    return rings;
}

function createSun(size, texture) {
    const sunGeometry = new THREE.SphereGeometry(size, 32, 32);
    const sunMaterial = new THREE.MeshBasicMaterial({ map: texture, emissive: 0xffff00 });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    sun.userData = { name: 'Sun' };

    // Ajouter une lumière ponctuelle pour éclairer les planètes
    const light = new THREE.PointLight(0xffffff, 2, 1000);
    light.position.set(0, 0, 0);
    scene.add(light);

    return sun;
}

function createOrbit(distance) {
    const orbitGeometry = new THREE.RingGeometry(distance - 0.01, distance + 0.01, 64);
    const orbitMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.5
    });
    const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
    orbit.rotation.x = Math.PI / 2;
    return orbit;
}

function createPlanets(textures) {
    const sun = createSun(10, textures.sun);
    scene.add(sun);

    const planets = [
        createEllipsoid('Mercury', 0.38, textures.mercury, 0.467, 0.307, 0.034, 0.000017, 0.0002, 0),
        createEllipsoid('Venus', 0.95, textures.venus, 0.728, 0.718, 177.4, 0.000002, 0.0001, 0),
        createEllipsoid('Earth', 1, textures.earth, 1.017, 0.983, 23.44, 0.0000727, 0.0001, 0.00335),
        createEllipsoid('Mars', 0.53, textures.mars, 1.666, 1.382, 25.19, 0.0000709, 0.00005, 0.00589),
        createEllipsoid('Jupiter', 11.21, textures.jupiter, 5.454, 4.950, 3.13, 0.000174, 0.00001, 0.06487),
        createEllipsoid('Saturn', 9.45, textures.saturn, 10.123, 9.042, 26.73, 0.000162, 0.000005, 0.09796),
        createEllipsoid('Uranus', 4.01, textures.uranus, 20.11, 18.33, 97.77, 0.000100, 0.000002, 0.02293),
        createEllipsoid('Neptune', 3.88, textures.neptune, 30.33, 29.81, 28.32, 0.000108, 0.000001, 0.0171),
    ];

    const dwarfPlanets = [
        createEllipsoid('Pluto', 0.186, textures.pluto, 49.31, 29.66, 122.53, 0.000064, 0.0000004, 0),
        createEllipsoid('Ceres', 0.074, textures.ceres, 2.98, 2.55, 4, 0.0001, 0.00004, 0),
        createEllipsoid('Haumea', 0.115, textures.haumea, 51.48, 34.87, 28, 0.0002, 0.0000002, 0),
        createEllipsoid('Makemake', 0.121, textures.makemake, 52.83, 38.50, 29, 0.0001, 0.0000001, 0),
        createEllipsoid('Eris', 0.233, textures.eris, 97.65, 37.91, 78, 0.0001, 0.00000005, 0),
    ];

    planets[2].userData.moons.push(createMoon('Moon', 0.27, textures.moon, 1.5, 6.68, 0.0000727, 0.0001)); // Earth's moon
    planets[3].userData.moons.push(createMoon('Phobos', 0.067, textures.phobos, 1, 0.01, 0.0001, 0.0005)); // Phobos
    planets[3].userData.moons.push(createMoon('Deimos', 0.038, textures.deimos, 1.2, 0.93, 0.0001, 0.0004)); // Deimos
    planets[4].userData.moons.push(createMoon('Ganymede', 0.41, textures.ganymede, 3, 0.2, 0.0001, 0.00005)); // Ganymede
    planets[4].userData.moons.push(createMoon('Callisto', 0.286, textures.callisto, 3.5, 0.28, 0.0001, 0.00006)); // Callisto
    planets[4].userData.moons.push(createMoon('Io', 0.245, textures.io, 4, 0.05, 0.0001, 0.00007)); // Io
    planets[4].userData.moons.push(createMoon('Europa', 0.245, textures.europa, 4.5, 0.1, 0.0001, 0.00008)); // Europa
    planets[5].userData.moons.push(createMoon('Titan', 0.404, textures.titan, 2.5, 0.3, 0.0001, 0.00009)); // Titan
    planets[6].userData.moons.push(createMoon('Titania', 0.289, textures.titania, 2, 0.3, 0.0001, 0.0001)); // Titania
    planets[7].userData.moons.push(createMoon('Triton', 0.273, textures.triton, 2.5, 157, 0.0001, 0.00011)); // Triton
    dwarfPlanets[0].userData.moons.push(createMoon('Charon', 0.121, textures.charon, 0.5, 119.6, 0.0001, 0.00012)); // Charon

    // Adding rings to Saturn
    const saturnRings = createRings(textures.saturnRing);
    planets[5].add(saturnRings);

    // Adding orbits
    planets.forEach(planet => {
        const orbit = createOrbit(planet.userData.distanceAph);
        scene.add(orbit);
    });

    dwarfPlanets.forEach(dwarfPlanet => {
        const orbit = createOrbit(dwarfPlanet.userData.distanceAph);
        scene.add(orbit);
    });

    return { sun, planets, dwarfPlanets };
}

function addPlanetsToScene(scene, planets, dwarfPlanets) {
    planets.forEach(planet => {
        scene.add(planet);
        planet.userData.moons.forEach(moon => scene.add(moon));
    });

    dwarfPlanets.forEach(dwarfPlanet => {
        scene.add(dwarfPlanet);
        dwarfPlanet.userData.moons.forEach(moon => scene.add(moon));
    });
}

export { createPlanets, addPlanetsToScene };





