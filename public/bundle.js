/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./app.js":
/*!****************!*\
  !*** ./app.js ***!
  \****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\n\n\n// Creating a scene\nvar scene = new three__WEBPACK_IMPORTED_MODULE_0__.Scene();\n\n// Creating a camera\nvar camera = new three__WEBPACK_IMPORTED_MODULE_0__.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);\n\n// Creating a renderer and adding it to the DOM\nvar renderer = new three__WEBPACK_IMPORTED_MODULE_0__.WebGLRenderer();\nrenderer.setSize(window.innerWidth, window.innerHeight);\ndocument.body.appendChild(renderer.domElement);\n\n// Creating the sun\nvar sunGeometry = new three__WEBPACK_IMPORTED_MODULE_0__.SphereGeometry(1, 32, 32);\nvar sunMaterial = new three__WEBPACK_IMPORTED_MODULE_0__.MeshBasicMaterial({\n  color: 0xffff00\n});\nvar sun = new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(sunGeometry, sunMaterial);\nscene.add(sun);\n\n// Function to create planets and dwarf planets\nfunction createPlanet(size, color, distance) {\n  var planetGeometry = new three__WEBPACK_IMPORTED_MODULE_0__.SphereGeometry(size, 32, 32);\n  var planetMaterial = new three__WEBPACK_IMPORTED_MODULE_0__.MeshBasicMaterial({\n    color: color\n  });\n  var planet = new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(planetGeometry, planetMaterial);\n  planet.userData = {\n    distance: distance,\n    angle: 0,\n    moons: []\n  };\n  return planet;\n}\n\n// Function to create moons\nfunction createMoon(size, color, distance) {\n  var moonGeometry = new three__WEBPACK_IMPORTED_MODULE_0__.SphereGeometry(size, 32, 32);\n  var moonMaterial = new three__WEBPACK_IMPORTED_MODULE_0__.MeshBasicMaterial({\n    color: color\n  });\n  var moon = new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(moonGeometry, moonMaterial);\n  moon.userData = {\n    distance: distance,\n    angle: 0\n  };\n  return moon;\n}\n\n// Creating planets with their approximate sizes and distances from the sun\nvar planets = [createPlanet(0.038, 0xa9a9a9, 2),\n// Mercury\ncreatePlanet(0.094, 0xffa500, 3),\n// Venus\ncreatePlanet(0.1, 0x0000ff, 4),\n// Earth\ncreatePlanet(0.053, 0xff4500, 5),\n// Mars\ncreatePlanet(1.121, 0xd2b48c, 7),\n// Jupiter\ncreatePlanet(0.945, 0xdaa520, 10),\n// Saturn\ncreatePlanet(0.401, 0x87ceeb, 12),\n// Uranus\ncreatePlanet(0.388, 0x00008b, 14) // Neptune\n];\n\n// Creating dwarf planets with their approximate sizes and distances from the sun\nvar dwarfPlanets = [createPlanet(0.0186, 0xb0c4de, 16),\n// Pluto\ncreatePlanet(0.0074, 0xdeb887, 2.77),\n// Ceres (in the asteroid belt)\ncreatePlanet(0.0115, 0xffe4c4, 17),\n// Haumea\ncreatePlanet(0.0121, 0xf5deb3, 19),\n// Makemake\ncreatePlanet(0.0233, 0x8b4513, 23) // Eris\n];\n\n// Adding moons\nplanets[2].userData.moons.push(createMoon(0.0273, 0xffffff, 0.3)); // Earth's moon\nplanets[3].userData.moons.push(createMoon(0.0067, 0x888888, 0.2)); // Phobos\nplanets[3].userData.moons.push(createMoon(0.0038, 0x888888, 0.3)); // Deimos\nplanets[4].userData.moons.push(createMoon(0.0413, 0x888888, 1.2)); // Ganymede\nplanets[4].userData.moons.push(createMoon(0.0286, 0xffff00, 1.5)); // Callisto\nplanets[4].userData.moons.push(createMoon(0.0245, 0xffa500, 1.8)); // Io\nplanets[4].userData.moons.push(createMoon(0.0245, 0x0000ff, 2.0)); // Europa\nplanets[5].userData.moons.push(createMoon(0.0404, 0xffd700, 1.0)); // Titan\nplanets[6].userData.moons.push(createMoon(0.0289, 0x8a2be2, 0.9)); // Titania\nplanets[7].userData.moons.push(createMoon(0.0273, 0x7fffd4, 1.1)); // Triton\ndwarfPlanets[0].userData.moons.push(createMoon(0.0121, 0x8b0000, 0.3)); // Charon\n\n// Adding planets and moons to the scene\nplanets.forEach(function (planet) {\n  scene.add(planet);\n  planet.userData.moons.forEach(function (moon) {\n    return scene.add(moon);\n  });\n});\ndwarfPlanets.forEach(function (dwarfPlanet) {\n  scene.add(dwarfPlanet);\n  dwarfPlanet.userData.moons.forEach(function (moon) {\n    return scene.add(moon);\n  });\n});\n\n// Setting the camera position\ncamera.position.z = 30;\n\n// Handle window resize\nwindow.addEventListener('resize', onWindowResize, false);\nfunction onWindowResize() {\n  camera.aspect = window.innerWidth / window.innerHeight;\n  camera.updateProjectionMatrix();\n  renderer.setSize(window.innerWidth, window.innerHeight);\n}\n\n// Animation loop\nfunction animate() {\n  requestAnimationFrame(animate);\n  var currentTime = Date.now() * 0.0001;\n  planets.concat(dwarfPlanets).forEach(function (planet) {\n    planet.userData.angle += 0.01;\n    planet.position.x = Math.cos(planet.userData.angle + currentTime) * planet.userData.distance;\n    planet.position.z = Math.sin(planet.userData.angle + currentTime) * planet.userData.distance;\n    planet.userData.moons.forEach(function (moon, index) {\n      moon.userData.angle += 0.03;\n      moon.position.x = planet.position.x + Math.cos(moon.userData.angle + currentTime) * moon.userData.distance;\n      moon.position.z = planet.position.z + Math.sin(moon.userData.angle + currentTime) * moon.userData.distance;\n    });\n  });\n  renderer.render(scene, camera);\n}\nanimate();\n\n//# sourceURL=webpack://threejs-solar-system/./app.js?");

/***/ }),

/***/ "./node_modules/three/build/three.module.js":
/*!**************************************************!*\
  !*** ./node_modules/three/build/three.module.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./app.js");
/******/ 	
/******/ })()
;