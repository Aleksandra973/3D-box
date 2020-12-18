<template>
  <div class="container">
    <div class="row justify-content-center">
      <form class="col-md-5 justify-content-center">
        <h3>Create a a 3D object</h3>
        <div class="form-group">
          <label for="length">Insert length</label>
          <input type="text" class="form-control" id="length" v-model="length">
        </div>
        <div class="form-group">
          <label for="width">Insert width</label>
          <input type="text" class="form-control" id="width" v-model="width">
        </div>
        <div class="form-group">
          <label for="height">Insert height</label>
          <input type="text" class="form-control" id="height" v-model="height">
        </div>
        <button @click="calculate" type="button" class="btn btn-primary">Submit</button>
      </form>
    </div>
    <canvas id="c"></canvas>
  </div>
</template>

<script>
import * as THREE from 'three';
import {sceneInit, makeInstance, resizeRendererToDisplaySize} from '../helpers/3dHelper'
import axios from 'axios'

export default {
  name: 'Box',
  data() {
    return {
      scene: {},
      geometry: {},
      camera: {},
      renderer: {},
      length: null,
      width: null,
      height: null
    }
  },
  methods: {
    async calculate() {
      let result = await axios.post('http://localhost:3000/calculate', {
        "length": +this.length,
        "width": +this.width,
        "height": +this.height
      });
      if(this.scene.children[1]) {
         this.scene.children.pop()
      }
      this.cubeInit(this.height, this.width, this.length);
      this.renderScene()
    },
    cubeInit(height, width, length) {
      this.geometry = new THREE.Geometry();
      this.geometry.vertices.push(
          new THREE.Vector3(0, 0, 0),  // 0
          new THREE.Vector3(length, 0, 0),  // 1
          new THREE.Vector3(0, height, 0),  // 2
          new THREE.Vector3(length, height, 0),  // 3
          new THREE.Vector3(0, 0, width),  // 4
          new THREE.Vector3(length, 0, width),  // 5
          new THREE.Vector3(0, height, width),  // 6
          new THREE.Vector3(length, height, width),  // 7
      );

      /*
           6----7
          /|   /|
         2----3 |
         | |  | |
         | 4--|-5
         |/   |/
         0----1
      */

      this.geometry.faces.push(
          // front
          new THREE.Face3(0, 3, 2),
          new THREE.Face3(0, 1, 3),
          // right
          new THREE.Face3(1, 7, 3),
          new THREE.Face3(1, 5, 7),
          // back
          new THREE.Face3(5, 6, 7),
          new THREE.Face3(5, 4, 6),
          // left
          new THREE.Face3(4, 2, 6),
          new THREE.Face3(4, 0, 2),
          // top
          new THREE.Face3(2, 7, 6),
          new THREE.Face3(2, 3, 7),
          // bottom
          new THREE.Face3(4, 1, 0),
          new THREE.Face3(4, 5, 1),
      )
    },

    renderScene() {
      const cube = makeInstance(this.geometry, this.scene, 0x44FF44, 0);

      cube.rotation.x = 35;
      cube.rotation.y = 35;

      requestAnimationFrame(this.render);
    },
    render() {

      if (resizeRendererToDisplaySize(this.renderer)) {
        const canvas = this.renderer.domElement;
        this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
        this.camera.updateProjectionMatrix();
      }

      this.renderer.render(this.scene, this.camera);

      //requestAnimationFrame(render);
    }


  },
  mounted() {
    let {scene, camera, renderer} = sceneInit('c');
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;

  }
}
</script>


<style scoped>
#c{
  width: 100%;
  margin-top: 40px;
}
</style>
