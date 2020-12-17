<template>
  <div>

  </div>
</template>

<script>
import * as THREE from 'three';

export default {
  name: 'Box',
  methods: {
    paintBox() {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
      
    }
  }
}
</script>


<style scoped>

</style>
