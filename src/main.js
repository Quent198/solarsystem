import { scene } from './scene.js';
import { camera } from './camera.js';
import { renderer } from './renderer.js';
import { controls } from './controls.js';
import { loadTextures } from './textures.js';
import { createPlanets, addPlanetsToScene } from './planets.js';
import { animate } from './animate.js';
import * as THREE from 'three';

// Charger les textures de manière asynchrone
loadTextures().then(textures => {
    console.log('All textures loaded successfully.'); // Confirmation dans la console
    
    // Créer les planètes et les planètes naines avec les textures chargées
    const { sun, planets, dwarfPlanets } = createPlanets(textures);

    // Ajouter les planètes à la scène
    addPlanetsToScene(scene, planets, dwarfPlanets);

    // Ajuster la position initiale de la caméra pour avoir une meilleure vue d'ensemble
    camera.position.set(0, 50, 200); // Ajuster ces valeurs pour la vue souhaitée
    controls.target.set(0, 0, 0); // Cibler le centre du système solaire (le Soleil)
    controls.update();

    // Animer la scène
    animate(planets, dwarfPlanets, scene, camera, renderer, controls);

    // Logique pour centrer la caméra sur un astre et afficher les informations
    function focusOnPlanet(planetName) {
        const target = scene.children.find(child => child.userData.name === planetName);
        if (target) {
            const targetPosition = new THREE.Vector3();
            target.getWorldPosition(targetPosition);
            controls.target.copy(targetPosition);
            // Ajuster la position de la caméra pour être en face de l'objet
            // Utiliser la taille stockée dans userData si disponible, sinon estimer
            const size = target.userData.size !== undefined ? target.userData.size : (target.geometry.boundingSphere ? target.geometry.boundingSphere.radius : 1);
            const distance = size * 3; // Distance basée sur la taille de l'objet
            const offset = new THREE.Vector3(distance, distance * 0.5, distance); // Ajuster l'offset si nécessaire
            camera.position.copy(targetPosition).add(offset);
            controls.update();

            // Afficher les informations sur l'astre sélectionné
            document.getElementById('info-panel').style.display = 'block';
            document.getElementById('info-name').innerText = `Nom: ${target.userData.name}`;
            
            // Afficher la taille en utilisant la taille stockée dans userData
            document.getElementById('info-size').innerText = `Taille (relative): ${size.toFixed(2)}`;

            // Note: Pour les distances et inclinaisons, les données sont dans userData
            if (target.userData.distanceAph !== undefined) {
                 const distanceUA = (target.userData.distanceAph + target.userData.distancePer) / 2;
                 document.getElementById('info-distance-sun').innerText = `Distance moyenne au Soleil: ${distanceUA.toFixed(2)} UA`;
            } else {
                 document.getElementById('info-distance-sun').innerText = `Distance moyenne au Soleil: N/A`;
            }
            if (target.userData.tilt !== undefined) {
                 document.getElementById('info-tilt').innerText = `Inclinaison axiale: ${target.userData.tilt.toFixed(2)}°`;
            } else {
                 document.getElementById('info-tilt').innerText = `Inclinaison axiale: N/A`;
            }

            // Ajoutez d'autres informations si disponibles dans userData

        } else {
            // Cacher le panneau si l'astre n'est pas trouvé
            document.getElementById('info-panel').style.display = 'none';
        }
    }

    // Ajouter les écouteurs d'événements pour le menu
    document.getElementById('menu').addEventListener('click', (event) => {
        if (event.target.tagName === 'LI') {
            const target = event.target.getAttribute('data-target');
            focusOnPlanet(target);
        }
    });

}).catch(error => {
    console.error('Error loading textures:', error);
    // Gérer l'erreur de chargement de texture (ex: afficher un message à l'utilisateur)
    const errorDiv = document.createElement('div');
    errorDiv.style.position = 'absolute';
    errorDiv.style.top = '50%';
    errorDiv.style.left = '50%';
    errorDiv.style.transform = 'translate(-50%, -50%)';
    errorDiv.style.color = 'red';
    errorDiv.style.fontSize = '1.5rem';
    errorDiv.innerText = 'Failed to load textures. Please check console for details.';
    document.body.appendChild(errorDiv);
});

// Mettre à jour la caméra et le renderer lors du redimensionnement de la fenêtre
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});





