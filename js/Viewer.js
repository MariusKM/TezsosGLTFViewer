import * as THREE from 'https://cdn.skypack.dev/three@0.127.0/build/three.module.js';




import { GUI } from 'https://cdn.skypack.dev/three@0.127.0/examples/jsm/libs/dat.gui.module.js';

import { OrbitControls } from 'https://cdn.skypack.dev/three@0.127.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.127.0/examples/jsm/loaders/GLTFLoader.js';
import { EffectComposer } from 'https://cdn.skypack.dev/three@0.127.0/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'https://cdn.skypack.dev/three@0.127.0/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'https://cdn.skypack.dev/three@0.127.0/examples/jsm/postprocessing/ShaderPass.js';
import { EXRLoader } from 'https://cdn.skypack.dev/three@0.127.0/examples/jsm/loaders/EXRLoader.js';
import { ClearPass } from 'https://cdn.skypack.dev/three@0.127.0/examples/jsm/postprocessing/ClearPass.js';
import { CopyShader } from 'https://cdn.skypack.dev/three@0.127.0/examples/jsm/shaders/CopyShader.js';


let scene, renderer, composer, light, light2, light3, model, AmbientLight;
let clearPass, renderPass, exrCubeRenderTarget;
let cameraP;
let gui;


const params = {

    clearPass: true,
    clearColor: 'white',

    Metalness: 0.5,
    Roughness: 0.5,
    EnvMapIntensity: 0.5,
    SceneLightStrength: 1,
    exposure: 1,
    renderPass: true
};

init();
animate();

clearGui();

function clearGui() {

    if (gui) gui.destroy();

    gui = new GUI();

    gui.add(params, 'clearColor', ['black', 'white']);//,'red', 'green', 'blue' ] );


    gui.add(params, 'exposure', 0.1, 2).onChange(function (value) {

        renderer.toneMappingExposure = Math.pow(value, 4.0);

    });

    gui.add(params, 'Metalness', 0, 1).onChange(function (value) {

        model.traverse((child) => {
            if (child.isMesh) {

                let material = child.material;

                material.metalness = value;

            }
        });

    });
    gui.add(params, 'Roughness', 0, 1).onChange(function (value) {

        model.traverse((child) => {
            if (child.isMesh) {

                let material = child.material;

                material.roughness = value;

            }
        });

    });
    gui.add(params, 'SceneLightStrength', 0.1, 5).onChange(function (value) {

        light.intensity = value;
        light2.intensity = value;
        light3.intensity = value;
    });

    gui.add(params, 'EnvMapIntensity', 0,1).onChange(function (value) {

        model.traverse((child) => {
            if (child.isMesh) {
                let material = child.material;
                material.envMapIntensity = value*14;
            }
        });

    });
    gui.open();

}

function init() {

    const container = document.getElementById('container');

    const width = window.innerWidth || 1;
    const height = window.innerHeight || 1;
    const aspect = width / height;
    const devicePixelRatio = window.devicePixelRatio || 1;

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(devicePixelRatio);
    renderer.setSize(width, height);
    //renderer.physicallyCorrectLights = true;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    //renderer.toneMapping = THREE.ReinhardToneMapping;
    renderer.toneMappingExposure = Math.pow(1, 4.0);
    document.body.appendChild(renderer.domElement);





    cameraP = new THREE.PerspectiveCamera(65, aspect, 1, 10);
    cameraP.position.z = 2;
    cameraP.position.z = 2;

    scene = new THREE.Scene();


    const group = new THREE.Group();
    scene.add(group);

    light = new THREE.PointLight(0xddffdd, 1.0);
    light.position.z = 0;
    light.position.y = 10;
    light.position.x = 0;
    scene.add(light);



    light3 = new THREE.PointLight(0xddddff, 1.0);
    light3.position.z = 0;
    light3.position.y = 25;
    light3.position.x = 25;

    scene.add(light3);

    THREE.DefaultLoadingManager.onLoad = function () {

        pmremGenerator.dispose();

    };
    new EXRLoader()
        .load('textures/piz_compressed.exr', function (texture) {

            exrCubeRenderTarget = pmremGenerator.fromEquirectangular(texture);

            texture.dispose();

        });

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    new GLTFLoader().load('models/GLB/bodyscan.glb', function (gltf) {

        model = gltf.scene;

        model.traverse((child) => {
            if (child.isMesh) {

                let material = child.material;
                material.envMap = exrCubeRenderTarget.texture;
                material.envMapIntensity = params.EnvMapIntensity*14;
                material.metalness = params.metalness;

            }
        });
        model.position.y = -1;
        scene.add(model);
    });


    composer = new EffectComposer(renderer);

    clearPass = new ClearPass(params.clearColor, 1.0);
    composer.addPass(clearPass);

    renderPass = new RenderPass(scene, cameraP);
    renderPass.clear = false;
    composer.addPass(renderPass);

    const copyPass = new ShaderPass(CopyShader);
    composer.addPass(copyPass);

    const controls = new OrbitControls(cameraP, renderer.domElement);
    controls.maxPolarAngle = Math.PI * 0.5;
    controls.minDistance = 1.5;
    controls.maxDistance = 10;

    window.addEventListener('resize', onWindowResize);

}

function onWindowResize() {

    const width = window.innerWidth;
    const height = window.innerHeight;
    const aspect = width / height;

    cameraP.aspect = aspect;
    cameraP.updateProjectionMatrix();

    renderer.setSize(width, height);
    composer.setSize(width, height);

}

function animate() {

    requestAnimationFrame(animate);

 

    cameraP.updateMatrixWorld(true);

    let newColor = clearPass.clearColor;

    switch (params.clearColor) {


        /*   case 'blue': newColor = 0x0000ff; break;
           case 'red': newColor = 0xff0000; break;
           case 'green': newColor = 0x00ff00; break;*/
        case 'white': newColor = 0xffffff; break;
        case 'black': newColor = 0x000000; break;

    }




    clearPass.enabled = params.clearPass;
    clearPass.clearColor = newColor;




    renderPass.enabled = true;

    composer.render();



}