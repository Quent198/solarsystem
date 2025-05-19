import * as THREE from 'three';

function loadTextures() {
    const textureLoader = new THREE.TextureLoader();
    const texturesToLoad = {
        sun: 'textures/2k_sun.jpg',
        mercury: 'textures/2k_mercury.jpg',
        venus: 'textures/2k_venus_surface.jpg',
        earth: 'textures/2k_earth_daymap.jpg',
        moon: 'textures/2k_moon.jpg',
        mars: 'textures/2k_mars.jpg',
        jupiter: 'textures/2k_jupiter.jpg',
        saturn: 'textures/2k_saturn.jpg',
        uranus: 'textures/2k_uranus.jpg',
        neptune: 'textures/2k_neptune.jpg',
        pluto: 'textures/2k_pluto.jpg',
        ceres: 'textures/2k_ceres.jpg',
        haumea: 'textures/2k_haumea.jpg',
        makemake: 'textures/2k_makemake.jpg',
        eris: 'textures/2k_eris.jpg',
        ganymede: 'textures/Ganymede.jpg',
        callisto: 'textures/Callisto.jpg',
        io: 'textures/Io.jpg',
        europa: 'textures/Europa.jpg',
        titan: 'textures/2k_titan.jpg',
        titania: 'textures/2k_titania.jpg',
        triton: 'textures/2k_triton.jpg',
        charon: 'textures/2k_charon.jpg',
        phobos: 'textures/2k_phobos.jpg',
        deimos: 'textures/2k_deimos.jpg',
        starrySky: 'textures/8k_stars_milky_way.jpg',
        saturnRing: 'textures/saturnring.jpg'
    };

    const loadedTextures = {};
    const promises = [];

    for (const key in texturesToLoad) {
        const promise = new Promise((resolve, reject) => {
            textureLoader.load(
                texturesToLoad[key],
                (texture) => {
                    loadedTextures[key] = texture;
                    console.log(`Texture loaded successfully: ${texturesToLoad[key]}`);
                    resolve();
                },
                undefined, // onProgress not needed for this use case
                (err) => {
                    console.error('An error occurred loading texture:', texturesToLoad[key], err);
                    reject(err);
                }
            );
        });
        promises.push(promise);
    }

    return Promise.all(promises).then(() => loadedTextures);
}

export { loadTextures };


