function animate(planets, dwarfPlanets, scene, camera, renderer, controls) {
    function animateFrame() {
        requestAnimationFrame(animateFrame);

        const currentTime = Date.now() * 0.0001;

        planets.concat(dwarfPlanets).forEach(planet => {
            const distance = (planet.userData.distanceAph + planet.userData.distancePer) / 2;
            const eccentricity = (planet.userData.distanceAph - planet.userData.distancePer) / (planet.userData.distanceAph + planet.userData.distancePer);
            const a = distance; // semi-major axis
            const b = a * Math.sqrt(1 - eccentricity ** 2); // semi-minor axis

            planet.userData.angle += planet.userData.revolutionSpeed;
            planet.position.x = a * Math.cos(planet.userData.angle + currentTime);
            planet.position.z = b * Math.sin(planet.userData.angle + currentTime);

            // Rotate the planet on its axis
            planet.rotation.y += planet.userData.rotationSpeed;

            planet.userData.moons.forEach((moon, index) => {
                moon.userData.angle += moon.userData.revolutionSpeed;
                moon.position.x = planet.position.x + Math.cos(moon.userData.angle + currentTime) * moon.userData.distance;
                moon.position.z = planet.position.z + Math.sin(moon.userData.angle + currentTime) * moon.userData.distance;

                // Rotate the moon on its axis
                moon.rotation.y += moon.userData.rotationSpeed;
            });
        });

        controls.update();
        renderer.render(scene, camera);
    }

    animateFrame();
}

export { animate };

