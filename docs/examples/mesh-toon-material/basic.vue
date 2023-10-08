<template>
  <div ref="domRef" class="farst-three">
    <FtScene @load="sceneLoad">
      <FtMesh @load="meshLoad">
        <FtSphereGeometry
          :radius="0.5"
          :width-segments="64"
          :height-segments="64"
        />
        <FtMeshToonMaterial :options="materialOpts">
          <FtTextureLoader
            url="\textures\Glass_Vintage_001\Glass_Vintage_001_basecolor.jpg"
            :type="'map'"
          />
          <FtTextureLoader
            v-if="whoIsShow === 'three'"
            :options="threeTonOps"
            url="\textures\threeTone.jpg"
            :type="'gradientMap'"
          />
          <FtTextureLoader
            v-if="whoIsShow === 'five'"
            :options="fiveTonOps"
            url="\textures\fiveTone.jpg"
            :type="'gradientMap'"
          />
        </FtMeshToonMaterial>
      </FtMesh>
      <FtDirectionalLight
        :color="0xffffff"
        :intensity="1"
        :options="{ position: { set: [1, 1, 1] } }"
      />

      <FtAmbientLight :color="0xffffff" :intensity="1" />
      <FtPerspectiveCamera
        :fov="75"
        :near="0.01"
        :far="100"
        :options="caneraOps"
      />
      <FtWebglRenderer :animation-fn="animationFn">
        <FtOrbitControls />
      </FtWebglRenderer>
    </FtScene>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, shallowRef } from 'vue'
import { DoubleSide, NearestFilter } from 'three'
import {
  FtAmbientLight,
  FtDirectionalLight,
  FtMesh,
  FtMeshToonMaterial,
  FtOrbitControls,
  FtPerspectiveCamera,
  FtScene,
  FtSphereGeometry,
  FtTextureLoader,
  FtWebglRenderer,
} from '@farst-three/components'
import { useGui } from '@farst-three/hooks'
import type {
  MeshLoadEvent,
  MeshToonMaterialOptions,
  PerspectiveCameraOptions,
  SceneLoadEvent,
  TextureLoaderOptions,
} from '@farst-three/components'

const domRef = ref<HTMLDivElement>()
const caneraOps = reactive<PerspectiveCameraOptions>({
  position: {
    set: [0.1, 1, 3.5],
    z: 3.5,
  },
})

const whoIsShow = ref<'three' | 'five'>('three')
const threeTonOps = reactive<TextureLoaderOptions>({
  magFilter: NearestFilter,
  minFilter: NearestFilter,
})
const fiveTonOps = reactive<TextureLoaderOptions>({
  magFilter: NearestFilter,
  minFilter: NearestFilter,
})

const materialOpts = reactive<MeshToonMaterialOptions>({
  transparent: true,
  side: DoubleSide,
  gradientMap: null,
})
const mesh = shallowRef()
const scene = shallowRef()

function meshLoad(e: MeshLoadEvent) {
  mesh.value = e.mesh
}

function sceneLoad(e: SceneLoadEvent) {
  scene.value = e.scene
  //   const loader = new TextureLoader()

  //   let three = loader.load('/textures/threeTone.jpg')
  //   let five = loader.load('/textures/fiveTone.jpg')
  //   three.magFilter = NearestFilter
  //   const base = loader.load(
  //     '/textures/Glass_Vintage_001/Glass_Vintage_001_basecolor.jpg'
  //   )
  //   const geometry = new SphereGeometry(1, 64, 64)
  //   const material = new MeshToonMaterial({
  //     transparent: true,
  //     side: DoubleSide,
  //     map: base,
  //     gradientMap: three,
  //   })
  //   const mesha = new Mesh(geometry, material)

  //   scene.value?.add(mesha)
  //   gui
  //     .add(mesha.material, 'gradientMap', ['none', 'three', 'five'])
  //     .onChange((val) => {
  //       if (val === 'none') {
  //         // mesha.material.gradientMap?.dispose()
  //         mesha.material.gradientMap = null
  //       } else if (val === 'three') {
  //         three.dispose()
  //         three = loader.load('/textures/threeTone.jpg')
  //         three.magFilter = NearestFilter

  //         mesha.material.gradientMap = three
  //       } else if (val === 'five') {
  //         five.dispose()
  //         five = loader.load('/textures/fiveTone.jpg')
  //         five.magFilter = NearestFilter
  //         mesha.material.gradientMap = five
  //       }

  //       // mesha.material.needsUpdate = true
  //       console.log(mesha.material.gradientMap)
  //     })
}

const { guiPromise } = useGui(domRef)
guiPromise.then((gui) => {
  gui
    .add({ gradientMap: 'three' }, 'gradientMap', ['three', 'five'])
    .onChange((val) => {
      whoIsShow.value = val
    })
})
const animationFn = () => {
  //
}
</script>

<style lang="scss" scoped>
.farst-three {
  height: 700px;
  width: 100%;
  position: relative;
}
</style>
