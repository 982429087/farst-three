<template>
  <div ref="domRef" class="farst-three">
    <FtScene
      :options="{
        background: () => new Color(0xffffff),
      }"
    >
      <FtPerspectiveCamera
        :fov="75"
        :near="0.01"
        :far="100"
        :options="{
          position: {
            set: [0.1, 4, 20],
          },
        }"
      />

      <FtWebglRenderer
        :params="{ antialias: true, logarithmicDepthBuffer: true }"
        :animation-fn="animationFn"
        :options="{
          shadowMap: {
            enabled: true,
          },
        }"
      >
        <FtGLTFLoader :url="url" :load="glbLoad" @load="gltfLoader" />
        <FtAmbientLight />
        <FtOrbitControls :options="{ enableZoom: false }" />
        <FtAxesHelper />
        <FtGridHelper />
      </FtWebglRenderer>
    </FtScene>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, reactive, ref, shallowRef } from 'vue'
import { Color } from 'three'
import {
  FtAmbientLight,
  FtAxesHelper,
  FtGLTFLoader,
  FtGridHelper,
  FtOrbitControls,
  FtPerspectiveCamera,
  FtScene,
  FtWebglRenderer,
} from '@farst-three/components'
import type { GLTFLoaderLoadEvent } from '@farst-three/components'
import type { Mesh, MeshBasicMaterial, Scene } from 'three'
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
const domRef = ref<HTMLDivElement>()
const baseUrl = import.meta.env.VITE_BASE_URL

const url = `${baseUrl}models/2CylinderEngine_blender.gltf`

const animationFn = () => {
  //
}
const gscene = shallowRef<Scene>()
let modelLoaded = false
function gltfLoader({ scene }: GLTFLoaderLoadEvent) {
  gscene.value = scene
}

function glbLoad(gltf: GLTF) {
  modelLoaded = true
  gltf.scene.scale.set(0.02, 0.02, 0.02)
  gltf.scene.traverse((obj) => {
    const material = (obj as Mesh).material as MeshBasicMaterial
    if (obj.name === 'body_1') {
      material.transparent = true
      material.opacity = 0.5
    } else if (obj.name === 'body_21' || obj.name === 'body_23') {
      material.color = new Color(0xf39c12)
    } else if (obj.name === 'body_2001' || obj.name === 'body_2002') {
      material.color = new Color(0x8e44ad)
      material.transparent = true
    }
  })
}

function handleWheel(e: WheelEvent) {
  e.stopPropagation()
  e.preventDefault()
  if (modelLoaded) {
    let body2001: any
    let body3001: any
    let body4001: any
    let body2002: any
    let body3002: any
    let body4002: any
    gscene.value?.traverse((obj: any) => {
      if (obj.name === 'body_2001') {
        body2001 = obj
      } else if (obj.name === 'body_3001') {
        body3001 = obj
      } else if (obj.name === 'body_4001') {
        body4001 = obj
      } else if (obj.name === 'body_2002') {
        body2002 = obj
      } else if (obj.name === 'body_3002') {
        body3002 = obj
      } else if (obj.name === 'body_4002') {
        body4002 = obj
      }
    })
    body2001.position.x += e.deltaY / 4
    body3001.position.x += e.deltaY / 2
    body4001.position.x += e.deltaY
    body2002.position.y += e.deltaY / 4
    body3002.position.y += e.deltaY / 2
    body4002.position.y += e.deltaY
  }
}
onMounted(() => {
  window.addEventListener('wheel', handleWheel, { passive: false })
})
onBeforeUnmount(() => {
  window.removeEventListener('wheel', handleWheel)
})
</script>

<style lang="scss" scoped>
.farst-three {
  height: 700px;
  width: 100%;
  position: relative;
}
</style>
