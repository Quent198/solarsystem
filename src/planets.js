import * as THREE from 'three';
import { scene } from './scene.js';

function createEllipsoid(name, size, texture, distanceAph, distancePer, tilt, rotationSpeed, revolutionSpeed, flattening) {
    const widthSegments = 32;
    const heightSegments = 32;
    const radius = size;

    const ellipsoidGeometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
    ellipsoidGeometry.scale(1, 1 - flattening, 1);

    const planetMaterial = new THREE.MeshStandardMaterial({ 
        map: texture,
        metalness: 0.1,
        roughness: 0.7,
        emissive: 0x111111
    });
    const planet = new THREE.Mesh(ellipsoidGeometry, planetMaterial);
    planet.userData = { name, distanceAph, distancePer, angle: 0, moons: [], rotationSpeed, revolutionSpeed };
    planet.rotation.z = THREE.MathUtils.degToRad(tilt); // Apply axial tilt
    return planet;
}

function createMoon(name, size, texture, distance, tilt, rotationSpeed, revolutionSpeed) {
    const moonGeometry = new THREE.SphereGeometry(size, 32, 32);
    const moonMaterial = new THREE.MeshStandardMaterial({ 
        map: texture,
        metalness: 0.1,
        roughness: 0.7,
        emissive: 0x111111
    });
    const moon = new THREE.Mesh(moonGeometry, moonMaterial);
    moon.userData = { name, distance, angle: 0, rotationSpeed, revolutionSpeed };
    moon.rotation.z = THREE.MathUtils.degToRad(tilt); // Apply axial tilt
    return moon;
}

function createRings(texture) {
    const ringGeometry = new THREE.RingGeometry(1, 1, 64);
    const ringMaterial = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.DoubleSide,
        transparent: true,
    });
    const rings = new THREE.Mesh(ringGeometry, ringMaterial);
    rings.rotation.x = Math.PI / 2;
    return rings;
}

function createAsteroidBelt(distanceScaleFactor, sizeScaleFactor) {
    const asteroidCount = 20000; // Augmenter le nombre pour une ceinture plus dense
    const innerRadiusAU = 2.2; // Début de la ceinture en UA
    const outerRadiusAU = 3.2; // Fin de la ceinture en UA
    const beltHeightAU = 0.1; // Épaisseur de la ceinture en UA

    const innerRadiusScaled = innerRadiusAU * distanceScaleFactor;
    const outerRadiusScaled = outerRadiusAU * distanceScaleFactor;
    const beltHeightScaled = beltHeightAU * distanceScaleFactor;

    const asteroids = new THREE.Group();

    // Taille moyenne d'un astéroïde typique est très petite (quelques km)
    // Le rayon de la Terre est ~6371 km. Un astéroïde de 10km de diamètre a un rayon de 5km (~0.0008 Terre)
    // Utilisons une taille de base pour la visibilité, ajustée avec sizeScaleFactor si besoin
    const baseAsteroidSize = 0.005; // Taille de base relative à la Terre (ajustée pour visibilité)
    const asteroidSize = baseAsteroidSize * sizeScaleFactor;

    const tempGeometry = new THREE.SphereGeometry(asteroidSize, 4, 4); // Géométrie de base
    const tempMaterial = new THREE.MeshStandardMaterial({ color: 0x888888, roughness: 0.8 });

    for (let i = 0; i < asteroidCount; i++) {
        const asteroid = new THREE.Mesh(tempGeometry, tempMaterial);

        const distance = innerRadiusScaled + Math.random() * (outerRadiusScaled - innerRadiusScaled);
        const angle = Math.random() * Math.PI * 2;
        const x = Math.cos(angle) * distance;
        const z = Math.sin(angle) * distance;
        const y = (Math.random() - 0.5) * beltHeightScaled;

        asteroid.position.set(x, y, z);

        asteroid.rotation.x = Math.random() * Math.PI * 2;
        asteroid.rotation.y = Math.random() * Math.PI * 2;
        asteroid.rotation.z = Math.random() * Math.PI * 2;

        // Petite variation de taille
        const scale = 0.5 + Math.random() * 1.0; // Taille entre 0.5 et 1.5 fois la taille de base
        asteroid.scale.set(scale, scale, scale);

        asteroids.add(asteroid);
    }

    console.log(`Created ${asteroidCount} asteroids.`);
    return asteroids;
}

function createSun(size, texture) {
    const sunGeometry = new THREE.SphereGeometry(size, 32, 32);
    const sunMaterial = new THREE.MeshBasicMaterial({ 
        map: texture,
        emissive: 0xffff00,
        emissiveIntensity: 1
    });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    sun.userData = { name: 'Sun', size: size };

    // Lumière principale du soleil
    // Assurez-vous que l'intensité et la distance sont suffisantes pour la nouvelle échelle
    const mainLight = new THREE.PointLight(0xffffff, 10, 5000); // Augmenter intensité et portée
    mainLight.position.set(0, 0, 0);
    scene.add(mainLight);

    // Lumière ambiante pour éclairer les zones ombragées
    const ambientLight = new THREE.AmbientLight(0x404040, 2); // Augmenter légèrement
    scene.add(ambientLight);

    // Effet de lueur autour du soleil
    const sunGlow = new THREE.Sprite(
        new THREE.SpriteMaterial({
            map: texture,
            color: 0xffff00,
            transparent: true,
            blending: THREE.AdditiveBlending
        })
    );
    // Ajuster la taille du glow en fonction de la nouvelle taille du soleil
    sunGlow.scale.set(size * 1.5, size * 1.5, 1); 
    sun.add(sunGlow);

    return sun;
}

function createOrbit(distanceAph, distancePer) {
    const segments = 128;
    const points = [];
    const a = (distanceAph + distancePer) / 2; // semi-major axis
    const c = (distanceAph - distancePer) / 2; // distance from center to focus
    const b = Math.sqrt(a * a - c * c); // semi-minor axis

    for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        const x = a * Math.cos(theta);
        const z = b * Math.sin(theta);
        points.push(new THREE.Vector3(x, 0, z));
    }

    const orbitGeometry = new THREE.BufferGeometry().setFromPoints(points);
    const orbitMaterial = new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.3
    });

    return new THREE.Line(orbitGeometry, orbitMaterial);
}

function createPlanets(textures) {
    // Ajuster la taille du Soleil par rapport à la Terre (rayon du Soleil ~ 109 * rayon Terre)
    const sunRealSizeRelativeToEarth = 109; 
    
    // Distances réelles en UA (Unité Astronomique) : 1 UA = distance Terre-Soleil
    // Augmenter le facteur d'échelle pour mieux visualiser les distances
    const distanceScaleFactor = 15; // Nouveau facteur d'échelle pour les distances (augmente l'éloignement)
    
    // Les tailles sont basées sur le rayon de la Terre = 1
    // Réduire ce facteur pour rendre les astres plus petits par rapport aux distances (pour une meilleure visualisation)
    const sizeScaleFactor = 0.1; // Déplacé ici pour être défini avant utilisation

    // Calcul de la taille du Soleil
    const sunSize = sunRealSizeRelativeToEarth * sizeScaleFactor; 

    const sun = createSun(sunSize, textures.sun);
    scene.add(sun);

    const planets = [
        // Mercure : rayon ~ 0.38 * rayon Terre
        createEllipsoid('Mercury', 0.38 * sizeScaleFactor, textures.mercury, 0.387 * distanceScaleFactor, 0.387 * distanceScaleFactor, 0.034, 0.000017, 0.0002, 0),
        // Vénus : rayon ~ 0.95 * rayon Terre
        createEllipsoid('Venus', 0.95 * sizeScaleFactor, textures.venus, 0.723 * distanceScaleFactor, 0.723 * distanceScaleFactor, 177.4, 0.000002, 0.0001, 0),
        // Terre : rayon = 1 * rayon Terre
        createEllipsoid('Earth', 1 * sizeScaleFactor, textures.earth, 1 * distanceScaleFactor, 1 * distanceScaleFactor, 23.44, 0.0000727, 0.0001, 0.00335),
        // Mars : rayon ~ 0.53 * rayon Terre
        createEllipsoid('Mars', 0.53 * sizeScaleFactor, textures.mars, 1.524 * distanceScaleFactor, 1.524 * distanceScaleFactor, 25.19, 0.0000709, 0.00005, 0.00589),
        // Jupiter : rayon ~ 11.21 * rayon Terre
        createEllipsoid('Jupiter', 11.21 * sizeScaleFactor, textures.jupiter, 5.203 * distanceScaleFactor, 5.203 * distanceScaleFactor, 3.13, 0.000174, 0.00001, 0.06487),
        // Saturne : rayon ~ 9.45 * rayon Terre
        createEllipsoid('Saturn', 9.45 * sizeScaleFactor, textures.saturn, 9.537 * distanceScaleFactor, 9.537 * distanceScaleFactor, 26.73, 0.000162, 0.000005, 0.09796),
        // Uranus : rayon ~ 4.01 * rayon Terre
        createEllipsoid('Uranus', 4.01 * sizeScaleFactor, textures.uranus, 19.191 * distanceScaleFactor, 19.191 * distanceScaleFactor, 97.77, 0.000100, 0.000002, 0.02293),
        // Neptune : rayon ~ 3.88 * rayon Terre
        createEllipsoid('Neptune', 3.88 * sizeScaleFactor, textures.neptune, 30.069 * distanceScaleFactor, 30.069 * distanceScaleFactor, 28.32, 0.000108, 0.000001, 0.0171),
    ];

    const dwarfPlanets = [
        // Pluton : rayon ~ 0.18 * rayon Terre
        createEllipsoid('Pluto', 0.18 * sizeScaleFactor, textures.pluto, 39.482 * distanceScaleFactor, 39.482 * distanceScaleFactor, 122.53, 0.000064, 0.0000004, 0),
        // Cérès : rayon ~ 0.07 * rayon Terre
        createEllipsoid('Ceres', 0.07 * sizeScaleFactor, textures.ceres, 2.766 * distanceScaleFactor, 2.766 * distanceScaleFactor, 4, 0.0001, 0.0004, 0),
        // Haumea : rayon ~ 0.12 * rayon Terre
        createEllipsoid('Haumea', 0.12 * sizeScaleFactor, textures.haumea, 43.335 * distanceScaleFactor, 43.335 * distanceScaleFactor, 28, 0.0002, 0.0000002, 0),
        // Makemake : rayon ~ 0.11 * rayon Terre
        createEllipsoid('Makemake', 0.11 * sizeScaleFactor, textures.makemake, 45.792 * distanceScaleFactor, 45.792 * distanceScaleFactor, 29, 0.0001, 0.0000001, 0),
        // Éris : rayon ~ 0.2 * rayon Terre
        createEllipsoid('Eris', 0.2 * sizeScaleFactor, textures.eris, 67.668 * distanceScaleFactor, 67.668 * distanceScaleFactor, 78, 0.0001, 0.00000005, 0),
    ];

    // Lunes (tailles relatives au rayon de la Terre. Distance de la lune à sa planète en AU * distanceScaleFactor)
    // Lune (Terre) : rayon ~ 0.27 * rayon Terre. Distance ~0.00257 UA
    planets[2].userData.moons.push(createMoon('Moon', 0.27 * sizeScaleFactor, textures.moon, 0.00257 * distanceScaleFactor, 6.68, 0.0000727, 0.0001)); 
    // Phobos (Mars) : rayon ~ 0.0017 * rayon Terre. Distance ~0.00006 UA. Appliquer un multiplicateur pour la visibilité.
    planets[3].userData.moons.push(createMoon('Phobos', 0.0017 * sizeScaleFactor * 200, textures.phobos, 0.00006 * distanceScaleFactor, 0.01, 0.0001, 0.0005)); 
    // Deimos (Mars) : rayon ~ 0.00096 * rayon Terre. Distance ~0.00015 UA. Appliquer un multiplicateur pour la visibilité.
    planets[3].userData.moons.push(createMoon('Deimos', 0.00096 * sizeScaleFactor * 200, textures.deimos, 0.00015 * distanceScaleFactor, 0.93, 0.0001, 0.0004)); 
    // Ganymede (Jupiter) : rayon ~ 0.038 * rayon Terre. Distance ~0.00716 UA
    planets[4].userData.moons.push(createMoon('Ganymede', 0.038 * sizeScaleFactor, textures.ganymede, 0.00716 * distanceScaleFactor, 0.2, 0.0001, 0.00005));
    // Callisto (Jupiter) : rayon ~ 0.034 * rayon Terre. Distance ~0.01259 UA
    planets[4].userData.moons.push(createMoon('Callisto', 0.034 * sizeScaleFactor, textures.callisto, 0.01259 * distanceScaleFactor, 0.28, 0.0001, 0.00006));
    // Io (Jupiter) : rayon ~ 0.028 * rayon Terre. Distance ~0.00282 UA
    planets[4].userData.moons.push(createMoon('Io', 0.028 * sizeScaleFactor, textures.io, 0.00282 * distanceScaleFactor, 0.05, 0.0001, 0.00007));
    // Europa (Jupiter) : rayon ~ 0.025 * rayon Terre. Distance ~0.00448 UA
    planets[4].userData.moons.push(createMoon('Europa', 0.025 * sizeScaleFactor, textures.europa, 0.00448 * distanceScaleFactor, 0.1, 0.0001, 0.00008));
    // Titan (Saturne) : rayon ~ 0.04 * rayon Terre. Distance ~0.00817 UA
    planets[5].userData.moons.push(createMoon('Titan', 0.04 * sizeScaleFactor, textures.titan, 0.00817 * distanceScaleFactor, 0.3, 0.0001, 0.00009));
    // Titania (Uranus) : rayon ~ 0.012 * rayon Terre. Distance ~0.00436 UA. Appliquer un multiplicateur pour la visibilité.
    planets[6].userData.moons.push(createMoon('Titania', 0.012 * sizeScaleFactor * 5, textures.titania, 0.00436 * distanceScaleFactor, 0.3, 0.0001, 0.0001)); 
    // Triton (Neptune) : rayon ~ 0.021 * rayon Terre. Distance ~0.00237 UA
    planets[7].userData.moons.push(createMoon('Triton', 0.021 * sizeScaleFactor, textures.triton, 0.00237 * distanceScaleFactor, 157, 0.0001, 0.00011));
     // Charon (Pluton) : rayon ~ 0.09 * rayon Terre. Distance ~0.00019 UA.
    dwarfPlanets[0].userData.moons.push(createMoon('Charon', 0.09 * sizeScaleFactor, textures.charon, 0.00019 * distanceScaleFactor, 119.6, 0.0001, 0.00012)); 

    // Adding rings to Saturn - Adjust inner and outer radius based on new Saturn size
    // Rayon de Saturne ~9.45 * Rayon Terre. Anneaux internes ~1.1 * Rayon Saturne, Externes ~2.2 * Rayon Saturne
    const saturnRadius = 9.45 * sizeScaleFactor;
    const ringInnerRadius = saturnRadius * 1.1;
    const ringOuterRadius = saturnRadius * 2.2;
    // Recreate rings with adjusted size
    const ringGeometry = new THREE.RingGeometry(ringInnerRadius, ringOuterRadius, 64);
    const ringMaterial = new THREE.MeshBasicMaterial({
        map: textures.saturnRing,
        side: THREE.DoubleSide,
        transparent: true,
        // blending: THREE.AdditiveBlending
    });
    const rings = new THREE.Mesh(ringGeometry, ringMaterial);
    rings.rotation.x = Math.PI / 2;
    planets[5].add(rings);

    // Adding orbits with proper elliptical paths
    planets.forEach(planet => {
        const orbit = createOrbit(planet.userData.distanceAph, planet.userData.distancePer);
        scene.add(orbit);
    });

    dwarfPlanets.forEach(dwarfPlanet => {
        const orbit = createOrbit(dwarfPlanet.userData.distanceAph, dwarfPlanet.userData.distancePer);
        scene.add(orbit);
    });

    // Ajouter le champ d'astéroïdes à la scène
     const asteroidBelt = createAsteroidBelt(distanceScaleFactor, sizeScaleFactor); // Passer les facteurs d'échelle
     scene.add(asteroidBelt);

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





