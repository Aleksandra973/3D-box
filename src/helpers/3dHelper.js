import * as THREE from "three";
import OrbitControls from 'orbit-controls-es6';

export function sceneInit(containerId) {
    const canvas = document.getElementById(containerId);
   const renderer = new THREE.WebGLRenderer({canvas});

    const fov = 75;
    const aspect = 2;  // the canvas default
    const near = 0.1;
    const far = 100;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

    camera.position.z = 6.2;

    const scene = new THREE.Scene();

    {
        const color = 0xFFFFFF;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(-1, 2, 4);
        scene.add(light);
    }

    function render() {
        renderer.render(scene, camera)
    }

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.addEventListener( 'change',  render);

    controls.update();

    return { renderer: renderer, scene: scene, camera: camera }
}

export function makeInstance(geometry,scene, color, x) {
    //const material = new THREE.MeshBasicMaterial({color});
    const material = new THREE.MeshBasicMaterial({vertexColors: THREE.FaceColors});
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    cube.position.x = x;
    return cube;
}

export function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
        renderer.setSize(width, height, false);
    }
    return needResize;
}

//export function render() {
//    this.renderer.render(this.scene, this.camera)
//}