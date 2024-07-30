import { scene } from './scene.js';
import { camera } from './camera.js';
import { renderer } from './renderer.js';
import { controls } from './controls.js';
import { loadTextures } from './textures.js';
import { createPlanets, addPlanetsToScene } from './planets.js';
import { animate } from './animate.js';
import * as THREE from 'three';

// Charger les textures
const textures = loadTextures();

// Créer les planètes et les planètes naines
const { sun, planets, dwarfPlanets } = createPlanets(textures);

// Ajouter les planètes à la scène
addPlanetsToScene(scene, planets, dwarfPlanets);

// Animer la scène
animate(planets, dwarfPlanets, scene, camera, renderer, controls);

// Mettre à jour la caméra et le renderer lors du redimensionnement de la fenêtre
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Logique pour centrer la caméra sur un astre
function focusOnPlanet(planetName) {
    const target = scene.children.find(child => child.userData.name === planetName);
    if (target) {
        const targetPosition = new THREE.Vector3();
        target.getWorldPosition(targetPosition);
        controls.target.copy(targetPosition);
        camera.position.copy(targetPosition).add(new THREE.Vector3(0, 10, 20));
        controls.update();
    }
}

document.getElementById('menu').addEventListener('click', (event) => {
    if (event.target.tagName === 'LI') {
        const target = event.target.getAttribute('data-target');
        focusOnPlanet(target);
    }
});





