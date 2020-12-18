<template>
  <div class="container">
    <div class="row justify-content-center">
      <form class="col-md-5 justify-content-center">
        <h3>Create 3D object</h3>
        <div class="form-group">
          <label for="length">Insert length</label>
          <input type="text" class="form-control" id="length" v-model="length">
          <div class="error" v-if="$v.length.$invalid">
            Enter value between 0.5 and 3.0
          </div>
        </div>
        <div class="form-group">
          <label for="width">Insert width</label>
          <input type="text" class="form-control" id="width" v-model="width">
          <div class="error" v-if="$v.width.$invalid">
            Enter value between 0.5 and 3.0
          </div>
        </div>
        <div class="form-group">
          <label for="height">Insert height</label>
          <input type="text" class="form-control" id="height" v-model="height">
          <div class="error" v-if="$v.height.$invalid">
            Enter value between 0.5 and 3.0
          </div>
        </div>
        <button :disabled="$v.$invalid" @click="calculate" type="button" class="btn btn-primary">Submit</button>
      </form>
    </div>
    <canvas id="c"></canvas>
  </div>
</template>

<script>
import * as THREE from 'three';
import {sceneInit, makeInstance, resizeRendererToDisplaySize} from '../helpers/3dHelper'
import axios from 'axios'
import {required, between} from "vuelidate/lib/validators";

export default {
  name: 'Box',
  data() {
    return {
      scene: {},
      geometry: {},
      camera: {},
      renderer: {},
      length: 1,
      width: 1,
      height: 1
    }
  },
  validations: {
    length: {
      required,
      between: between(0.5, 3),
      validFormat: val =>  /[0-9.]/.test(val),
    },
    width: {
      required,
      between: between(0.5, 3),
      validFormat: val =>  /[0-9.]/.test(val),
    },
    height: {
      required,
      between: between(0.5, 3),
      validFormat: val =>  /[0-9.]/.test(val),
    }
  },
  methods: {
    async calculate() {
      this.geometry = new THREE.Geometry();
      let response = await axios.post('http://localhost:3000/calculate', {
        "length": +this.length,
        "width": +this.width,
        "height": +this.height
      })

      let vertices = response.data.vertices
      vertices.forEach((item) => {
        let [x, y, z] = item
        this.geometry.vertices.push(
          new THREE.Vector3(x, y, z))
      })

      let faces = response.data.faces
      faces.forEach((item) => {
        let [a, b, c] = item
        this.geometry.faces.push(
            new THREE.Face3(a, b, c))
      })
      this.geometry.faces[0].color = this.geometry.faces[1].color = new THREE.Color('red');
      this.geometry.faces[2].color = this.geometry.faces[3].color = new THREE.Color('yellow');
      this.geometry.faces[4].color = this.geometry.faces[5].color = new THREE.Color('green');
      this.geometry.faces[6].color = this.geometry.faces[7].color = new THREE.Color('cyan');
      this.geometry.faces[8].color = this.geometry.faces[9].color = new THREE.Color('blue');
      this.geometry.faces[10].color = this.geometry.faces[11].color = new THREE.Color('magenta');

      if(this.scene.children[1]) {
         this.scene.children.pop()
      }
      this.renderScene()
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
.error {
  color: red;
}
</style>
