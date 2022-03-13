import * as THREE from 'https://unpkg.com/three@0.138.3/build/three.module.js';


import Stats from 'https://unpkg.com/browse/three@0.138.3/examples/jsm/libs/stats.module.js';

import { GUI } from 'https://unpkg.com/browse/three@0.138.3/examples/jsm/libs/lil-gui.module.min.js';

import { OrbitControls } from 'https://unpkg.com/browse/three@0.138.3/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://unpkg.com/browse/three@0.138.3/examples/jsm/loaders/GLTFLoader.js';
import { EffectComposer } from 'https://unpkg.com/browse/three@0.138.3/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'https://unpkg.com/browse/three@0.138.3/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'https://unpkg.com/browse/three@0.138.3/examples/jsm/postprocessing/ShaderPass.js';
import { EXRLoader } from 'https://unpkg.com/browse/three@0.138.3/examples/jsm/loaders/EXRLoader.js';
import { ClearPass } from 'https://unpkg.com/browse/three@0.138.3/examples/jsm/postprocessing/ClearPass.js';
import { CopyShader } from 'https://unpkg.com/browse/three@0.138.3/examples/jsm/shaders/CopyShader.js';



let scene = new THREE.Scene();