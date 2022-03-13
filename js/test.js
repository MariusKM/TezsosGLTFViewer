import * as THREE from 'https://cdn.skypack.dev/three@0.127.0/build/three.module.js';


import Stats from 'https://cdn.skypack.dev/three@0.127.0/examples/jsm/libs/stats.module.js';

import { GUI } from 'https://cdn.skypack.dev/three@0.127.0/examples/jsm/libs/dat.gui.module.js';

import { OrbitControls } from 'https://cdn.skypack.dev/three@0.127.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.127.0/examples/jsm/loaders/GLTFLoader.js';
import { EffectComposer } from 'https://cdn.skypack.dev/three@0.127.0/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'https://cdn.skypack.dev/three@0.127.0/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'https://cdn.skypack.dev/three@0.127.0/examples/jsm/postprocessing/ShaderPass.js';
import { EXRLoader } from 'https://cdn.skypack.dev/three@0.127.0/examples/jsm/loaders/EXRLoader.js';
import { ClearPass } from 'https://cdn.skypack.dev/three@0.127.0/examples/jsm/postprocessing/ClearPass.js';
import { CopyShader } from 'https://cdn.skypack.dev/three@0.127.0/examples/jsm/shaders/CopyShader.js';


let scene = new THREE.Scene();