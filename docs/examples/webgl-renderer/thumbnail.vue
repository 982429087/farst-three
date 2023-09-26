<template>
  <div class="farst-three">
    <FtScene>
      <FtMesh>
        <FtBoxGeometry>
          <FtMeshBasicMaterial :params="meshBasicParams" />
        </FtBoxGeometry>
      </FtMesh>
      <FtOrthographicCamera
        :left="-aspect * frustumSize"
        :right="aspect * frustumSize"
        :top="frustumSize"
        :bottom="-frustumSize"
        :near="0.001"
        :far="1000"
        :options="caneraOptions"
      >
        <FtWebglRenderer :scissor="true">
          <FtOrbitControls />
          <FtThumbnail :is-render-camera="false" @load="thumbnailCameraLoad" />
        </FtWebglRenderer>
      </FtOrthographicCamera>
    </FtScene>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { Color } from 'three'
import { isClient } from '@vueuse/core'
import {
  FtBoxGeometry,
  FtMesh,
  FtMeshBasicMaterial,
  FtOrbitControls,
  FtOrthographicCamera,
  FtScene,
  FtThumbnail,
  FtWebglRenderer,
} from '@farst-three/components'
import type { Scene } from 'three'
import type {
  OrthographicCameraLoadEvent,
  OrthographicCameraOptions,
} from '@farst-three/components'

const frustumSize = 4
const aspect = isClient ? window.innerWidth / window.innerHeight : 1

const meshBasicParams = {
  color: new Color(Math.random() * 0x00ffff),
}

const caneraOptions = reactive<OrthographicCameraOptions>({
  position: {
    set: [1, 0.5, 2],
  },
  lookAt: (scene: Scene) => scene.position,
})

function thumbnailCameraLoad({ camera, scene }: OrthographicCameraLoadEvent) {
  camera.position.set(1, 0.5, 2)
  camera.lookAt(scene.position)
}
</script>

<style lang="scss" scoped>
.farst-three {
  height: 500px;
  width: 100%;
  position: relative;
}
</style>
