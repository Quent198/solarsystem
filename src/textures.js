import * as THREE from 'three';

function loadTextures() {
    const textureLoader = new THREE.TextureLoader();

    const textures = {
        sun: textureLoader.load('textures/2k_sun.jpg'),
        mercury: textureLoader.load('textures/2k_mercury.jpg'),
        venus: textureLoader.load('textures/2k_venus_surface.jpg'),
        earth: textureLoader.load('textures/2k_earth_daymap.jpg'),
        moon: textureLoader.load('textures/2k_moon.jpg'),
        mars: textureLoader.load('textures/2k_mars.jpg'),
        jupiter: textureLoader.load('textures/2k_jupiter.jpg'),
        saturn: textureLoader.load('textures/2k_saturn.jpg'),
        uranus: textureLoader.load('textures/2k_uranus.jpg'),
        neptune: textureLoader.load('textures/2k_neptune.jpg'),
        pluto: textureLoader.load('textures/2k_pluto.jpg'),
        ceres: textureLoader.load('textures/2k_ceres.jpg'),
        haumea: textureLoader.load('textures/2k_haumea.jpg'),
        makemake: textureLoader.load('textures/2k_makemake.jpg'),
        eris: textureLoader.load('textures/2k_eris.jpg'),
        ganymede: textureLoader.load('textures/Ganymede.jpg'),
        callisto: textureLoader.load('textures/Callisto.jpg'),
        io: textureLoader.load('textures/Io.jpg'),
        europa: textureLoader.load('textures/Europa.jpg'),
        titan: textureLoader.load('textures/2k_titan.jpg'),
        titania: textureLoader.load('textures/2k_titania.jpg'),
        triton: textureLoader.load('textures/2k_triton.jpg'),
        charon: textureLoader.load('textures/2k_charon.jpg'),
        phobos: textureLoader.load('textures/2k_phobos.jpg'),
        deimos: textureLoader.load('textures/2k_deimos.jpg'),
        starrySky: textureLoader.load('textures/8k_stars_milky_way.jpg'),
        saturnRing: textureLoader.load('textures/saturn_ring.png') // Load the ring texture
    };

    return textures;
}

export { loadTextures };


