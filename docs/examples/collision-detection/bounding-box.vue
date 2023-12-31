<template>
  <div ref="domRef" class="farst-three">
    <FtScene>
      <FtPerspectiveCamera
        :fov="75"
        :near="0.01"
        :far="100"
        :options="{
          position: {
            set: [0, 10, 20],
          },
        }"
      />

      <FtWebglRenderer
        :params="{ antialias: true }"
        :animation-fn="animationFn"
        :options="{
          shadowMap: {
            enabled: true,
          },
        }"
      >
        <FtMesh
          :dragabled="true"
          :options="{
            position: {
              x: -4,
              y: 3,
            },
            rotation: {
              y: 0.5,
            },
          }"
          @load="({ mesh }) => (box = mesh)"
        >
          <FtBoxGeometry :width="4" :height="4" :depth="4" />
          <FtMeshLambertMaterial>
            <FtTextureLoader
              :url="
                baseUrl +
                'textures/Warning_Sign_HighVoltage_001/Warning_Sign_HighVoltage_001_basecolor.jpg'
              "
            />
          </FtMeshLambertMaterial>
        </FtMesh>
        <FtMesh
          :options="{
            position: {
              x: 4,
              y: 3,
            },
          }"
          @load="({ mesh }) => (blueBox = mesh)"
        >
          <FtBoxGeometry :width="4" :height="4" :depth="4" />
          <FtMeshLambertMaterial :params="{ color: 0x1890ff }" />
        </FtMesh>
        <FtAmbientLight />
        <FtDirectionalLight />
        <FtGridHelper :divisions="20" :size="100" />
        <FtOrbitControls :options="orbitControls" />
      </FtWebglRenderer>
      <FtDragControls @load="dragControlsLoad" />
    </FtScene>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import {
  Box3,
  Box3Helper,
  Material,
  type Mesh,
  Raycaster,
  type Scene,
  Vector3,
} from 'three'
import {
  FtAmbientLight,
  FtBoxGeometry,
  FtDirectionalLight,
  FtDragControls,
  FtGridHelper,
  FtMesh,
  FtMeshLambertMaterial,
  FtOrbitControls,
  FtPerspectiveCamera,
  FtScene,
  FtTextureLoader,
  FtWebglRenderer,
} from 'farst-three'
import type {
  DragControlsLoadEvent,
  DragControlsOptions,
  WebGLRendererLoadEvent,
} from 'farst-three'

const domRef = ref<HTMLDivElement>()
let box: Mesh | null
// eslint-disable-next-line prefer-const
box = null
let blueBox: Mesh | null
// eslint-disable-next-line prefer-const
blueBox = null

const baseUrl = import.meta.env.VITE_BASE_URL

const orbitControls = reactive<DragControlsOptions>({
  enabled: () => true,
})

let flag = false
function calculate(scene: Scene) {
  if (box && blueBox) {
    const box3 = new Box3()

    box3.copy(box.geometry.boundingBox!).applyMatrix4(box.matrixWorld)
    const boxHelper = new Box3Helper(box3)
    scene.add(boxHelper)
    const blueBoxBB = new Box3().setFromObject(blueBox)
    if (box3.intersectsBox(blueBoxBB)) {
      flag = true
    }

    if (!flag) {
      box.position.x += 0.01
    } else {
      box.position.x -= 0.01
    }
    if (box.position.x <= -4) {
      flag = false
    }
  }
}

const animationFn = ({ scene }: WebGLRendererLoadEvent) => {
  calculate(scene)
}

function dragControlsLoad(e: DragControlsLoadEvent) {
  e.dragControls.addEventListener('dragstart', () => {
    orbitControls.enabled = false
  })
  e.dragControls.addEventListener('dragend', () => {
    orbitControls.enabled = true
  })
}
</script>

<style lang="scss" scoped>
.farst-three {
  height: 700px;
  width: 100%;
  position: relative;
}
</style>
