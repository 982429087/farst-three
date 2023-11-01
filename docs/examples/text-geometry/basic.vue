<template>
  <div ref="domRef" class="farst-three">
    <FtScene @hover="sceneHover">
      <!-- 文字 -->
      <FtMesh>
        <FtTextGeometry
          :url="'/font/helvetikerRegularTypeface.json'"
          :text="'this is font text'"
          :params="{
            size: 10,
            height: 0.5,
          }"
          :center="true"
        />
        <FtMeshPhongMaterial />
      </FtMesh>
      <!-- 跟随小光图标 -->
      <FtInstancedMesh
        ref="instancedMeshRef"
        :count="NUM_INSTANCES"
        :options="{
          name: 'instancedMesh',
        }"
      >
        <FtBoxGeometry :width="2" :height="2" :depth="10" />
        <FtMeshStandardMaterial
          :options="{
            transparent: true,
            opacity: 0.9,
            metalness: 0.8,
            roughness: 0.5,
          }"
        />
      </FtInstancedMesh>
      <!-- 灯光 -->
      <FtPointLight
        :color="0xff6000"
        :intensity="0.85"
        :options="{ position: { x: 100 } }"
      />
      <FtPointLight
        :color="0x0000ff"
        :intensity="0.85"
        :options="{ position: { x: -100 } }"
      />
      <FtPointLight ref="lightRef" color="#0060ff" :intensity="0.5" />

      <FtAmbientLight :color="0x808080" />
      <!-- 相机 -->
      <FtPerspectiveCamera
        :fov="75"
        :near="0.01"
        :far="10000"
        :options="{
          position: {
            z: 200,
          },
        }"
      />
      <!-- 渲染器 -->
      <FtWebglRenderer
        ref="rendererRef"
        :params="{ antialias: true }"
        :animation-fn="animationFn"
        :options="{
          shadowMap: {
            enabled: true,
          },
        }"
      >
        <FtOrbitControls />
      </FtWebglRenderer>
    </FtScene>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { MathUtils, Object3D, Vector3 } from 'three'
import {
  FtAmbientLight,
  FtBoxGeometry,
  FtInstancedMesh,
  FtMesh,
  FtMeshPhongMaterial,
  FtMeshStandardMaterial,
  FtOrbitControls,
  FtPerspectiveCamera,
  FtPointLight,
  FtScene,
  FtTextGeometry,
  FtWebglRenderer,
} from '@farst-three/components'
import type { FunsEvent } from '@farst-three/hooks'
import type {
  InstancedMeshInstance,
  PointLightInstance,
  WebGLRendererInstance,
} from '@farst-three/components'
const { randFloat: rnd, randFloatSpread: rndFS } = MathUtils
const domRef = ref<HTMLDivElement>()
const NUM_INSTANCES = 2000
const instances: any[] = []
const target = new Vector3()
const dummyO = new Object3D()
const dummyV = new Vector3()
const instancedMeshRef = ref<InstancedMeshInstance>()
const rendererRef = ref<WebGLRendererInstance>()
const lightRef = ref<PointLightInstance>()
let positionV3 = new Vector3(0, 0, 0)

for (let i = 0; i < NUM_INSTANCES; i++) {
  instances.push({
    position: new Vector3(rndFS(200), rndFS(200), rndFS(200)),
    scale: rnd(0.2, 1),
    scaleZ: rnd(0.1, 1),
    velocity: new Vector3(rndFS(2), rndFS(2), rndFS(2)),
    attraction: 0.03 + rnd(-0.01, 0.01),
    vlimit: 1.2 + rnd(-0.1, 0.1),
  })
}

function init() {
  const imesh = instancedMeshRef.value?.mesh
  const renderer = rendererRef.value?.renderer
  if (!imesh || !renderer) return
  // init instanced mesh matrix
  for (let i = 0; i < NUM_INSTANCES; i++) {
    const { position, scale, scaleZ } = instances[i]
    dummyO.position.copy(position)
    dummyO.scale.set(scale, scale, scaleZ)
    dummyO.updateMatrix()
    imesh.setMatrixAt(i, dummyO.matrix)
  }
  imesh.instanceMatrix.needsUpdate = true
}

function animate() {
  const imesh = instancedMeshRef.value?.mesh
  const renderer = rendererRef.value?.renderer
  if (!imesh || !renderer) return
  target.copy(positionV3)
  lightRef.value?.light.position.copy(target)

  for (let i = 0; i < NUM_INSTANCES; i++) {
    const { position, scale, scaleZ, velocity, attraction, vlimit } =
      instances[i]

    dummyV.copy(target).sub(position).normalize().multiplyScalar(attraction)
    velocity.add(dummyV).clampScalar(-vlimit, vlimit)
    position.add(velocity)

    dummyO.position.copy(position)
    dummyO.scale.set(scale, scale, scaleZ)
    dummyO.lookAt(dummyV.copy(position).add(velocity))
    dummyO.updateMatrix()
    imesh.setMatrixAt(i, dummyO.matrix)
  }
  imesh.instanceMatrix.needsUpdate = true
}

const animationFn = () => {
  if (lightRef.value?.light) {
    animate()
  }
}

onMounted(() => {
  init()
})

function sceneHover(e: FunsEvent) {
  if (e.position) {
    positionV3 = e.position
  }
  console.log(e)
}
</script>

<style lang="scss" scoped>
.farst-three {
  height: 700px;
  width: 100%;
  position: relative;
}
</style>
