function animate(planets, dwarfPlanets, scene, camera, renderer, controls) {
    let lastTime = performance.now();
    const timeScale = 0.1; // Ajustez cette valeur pour contrôler la vitesse globale

    function animateFrame() {
        requestAnimationFrame(animateFrame);

        const currentTime = performance.now();
        const deltaTime = (currentTime - lastTime) * timeScale;
        lastTime = currentTime;

        planets.concat(dwarfPlanets).forEach(planet => {
            // Calcul des paramètres orbitaux
            const a = (planet.userData.distanceAph + planet.userData.distancePer) / 2; // demi-grand axe
            const c = (planet.userData.distanceAph - planet.userData.distancePer) / 2; // distance du centre au foyer
            const b = Math.sqrt(a * a - c * c); // demi-petit axe
            const eccentricity = c / a;

            // Mise à jour de l'angle de révolution
            planet.userData.angle += planet.userData.revolutionSpeed * deltaTime;

            // Calcul de la position sur l'orbite elliptique
            const x = a * Math.cos(planet.userData.angle);
            const z = b * Math.sin(planet.userData.angle);
            planet.position.set(x, 0, z);

            // Rotation sur l'axe
            planet.rotation.y += planet.userData.rotationSpeed * deltaTime;

            // Animation des lunes
            planet.userData.moons.forEach(moon => {
                moon.userData.angle += moon.userData.revolutionSpeed * deltaTime;
                
                // Position relative à la planète
                const moonX = Math.cos(moon.userData.angle) * moon.userData.distance;
                const moonZ = Math.sin(moon.userData.angle) * moon.userData.distance;
                
                // Position absolue dans l'espace
                moon.position.set(
                    planet.position.x + moonX,
                    0,
                    planet.position.z + moonZ
                );

                // Rotation de la lune sur son axe
                moon.rotation.y += moon.userData.rotationSpeed * deltaTime;
            });
        });

        // Mise à jour des contrôles et rendu
        controls.update();
        renderer.render(scene, camera);
    }

    animateFrame();
}

export { animate };

