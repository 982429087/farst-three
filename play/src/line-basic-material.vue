<template>
  <div class="farst-three">
    <FtScene @load="sceneLoad">
      <FtPerspectiveCamera
        :fov="75"
        :near="0.01"
        :far="100"
        :options="{
          position: {
            set: [0.1, 1, 3],
          },
        }"
      />
      <FtDirectionalLight
        :color="0xffffff"
        :intensity="0.7"
        :options="{ position: { set: [1, 2, 4] } }"
      />
      <FtAmbientLight :color="0xffffff" :intensity="0.5" />
      <FtWebglRenderer :params="{ antialias: true }" :animationFn="animationFn">
        <FtOrbitControls />
      </FtWebglRenderer>
    </FtScene>
  </div>
</template>

<script setup lang="ts">
import { SceneLoadEvent, WebGLRendererLoadEvent } from '@farst-three/components'
import {
  BufferGeometry,
  Float32BufferAttribute,
  Line,
  LineBasicMaterial,
} from 'three'

const animationFn = ({}: WebGLRendererLoadEvent) => {}

function sceneLoad({ scene }: SceneLoadEvent) {
  const gemotry = new BufferGeometry()
  const material = new LineBasicMaterial({ vertexColors: true })
  const position = []
  const colors = []
  const numbers = 100000
  const r = 4
  for (let i = 0; i < numbers; i++) {
    const x = Math.random() * r - r / 2
    const y = Math.random() * r - r / 2
    const z = Math.random() * r - r / 2
    position.push(x, y, z)
    colors.push(x / r + 0.5, y / r + 0.5, z / r + 0.5)
  }
  gemotry.setAttribute('position', new Float32BufferAttribute(position, 3))
  gemotry.setAttribute('color', new Float32BufferAttribute(colors, 3))
  const line = new Line(gemotry, material)
  scene.add(line)
}
</script>

<style lang="scss" scoped>
.farst-three {
  height: 100vh;
  width: 100vw;
}
</style>
<style>
* {
  margin: 0;
  padding: 0;
}
</style>
