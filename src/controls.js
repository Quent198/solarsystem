import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { camera } from './camera.js';
import { renderer } from './renderer.js';

const controls = new OrbitControls(camera, renderer.domElement);

export { controls };

