<template>
  <div ref="domRef" class="farst-three">
    <FtScene>
      <FtMesh
        :dragabled="true"
        :options="{
          position: {
            x: -4,
            y: 3,
          },
        }"
        @load="({ mesh }) => (box = mesh)"
      >
        <FtBoxGeometry :width="4" :height="4" :depth="4" />
        <FtMeshLambertMaterial>
          <FtTextureLoader
            url="\textures\Warning_Sign_HighVoltage_001\Warning_Sign_HighVoltage_001_basecolor.jpg"
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
      <FtAmbientLight />
      <FtDirectionalLight />
      <FtGridHelper :divisions="20" :size="100" />
      <FtWebglRenderer
        :params="{ antialias: true }"
        :animation-fn="animationFn"
        :options="{
          shadowMap: {
            enabled: true,
          },
        }"
      >
        <FtOrbitControls :options="orbitControls" />
      </FtWebglRenderer>
      <FtDragControls @load="dragControlsLoad" />
    </FtScene>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { Material, type Mesh, Raycaster, Vector3 } from 'three'
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
} from '@farst-three/components'
import type {
  DragControlsLoadEvent,
  DragControlsOptions,
} from '@farst-three/components'

const domRef = ref<HTMLDivElement>()
let box: Mesh | null
// eslint-disable-next-line prefer-const
box = null
let blueBox: Mesh | null
// eslint-disable-next-line prefer-const
blueBox = null

const orbitControls = reactive<DragControlsOptions>({
  enabled: () => true,
})

let flag = false
function calculate() {
  if (box && blueBox) {
    //网格中心
    const centerCoord = box.position.clone()
    //顶点坐标
    const { position } = box.geometry.attributes
    //顶点向量
    const vertices: Vector3[] = []
    for (let i = 0; i < position.count; i++) {
      vertices.push(
        new Vector3(position.getX(i), position.getY(i), position.getZ(i))
      )
    }

    for (const vertex of vertices) {
      //获取网格在应用变换以后的世界坐标
      const worldCoord = vertex.clone().applyMatrix4(box.matrixWorld)
      //获取由中心指向顶点的向量
      const dir = worldCoord.clone().sub(centerCoord)
      //发射射线
      const raycaster = new Raycaster(centerCoord, dir.clone().normalize())
      const intersects = raycaster.intersectObjects([blueBox], true)
      if (intersects.length) {
        if (intersects[0].distance <= dir.length()) {
          flag = true
        } else {
          flag = false
        }
      }
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

const animationFn = () => {
  calculate()
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
