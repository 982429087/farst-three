<template>
  <div ref="domRef" class="farst-three">
    <FtScene @mouse-move-position="sceneHover">
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
        :params="{ antialias: true, alpha: true }"
        :animation-fn="animationFn"
        :options="{
          shadowMap: {
            enabled: true,
          },
        }"
      >
        <!-- 文字 -->
        <FtMesh>
          <FtTextGeometry
            :url="baseUrl + 'font/helvetikerRegularTypeface.json'"
            :text="'Farst Three'"
            :params="{
              size: 70,
              height: 20,
            }"
            :center="true"
          />
          <FtMeshPhongMaterial
            :options="{
              color: () => new Color(0x00f0f0),
            }"
          />
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
            :params="{
              color: 0xcc00ff,
            }"
            :options="{
              transparent: true,
              opacity: 1,
              metalness: 0.8,
              roughness: 0.5,
            }"
          />
        </FtInstancedMesh>
        <!-- 灯光 -->
        <FtPointLight
          :decay="0"
          :intensity="10"
          :distance="150"
          :color="0xff6600"
        />
        <FtPointLight
          :color="0xff6600"
          :decay="0"
          :intensity="10"
          :distance="100"
          :options="{ position: { x: 300 } }"
        />
        <FtPointLight
          :color="0x0060ff"
          :decay="0"
          :intensity="10"
          :distance="100"
          :options="{ position: { x: -300 } }"
        />
        <FtPointLight
          ref="lightRef"
          :color="0xccff00"
          :decay="0"
          :intensity="10"
          :distance="100"
        />
        <FtAmbientLight :color="0xffffcc" />
        <FtOrbitControls />
        <FtEffectComposer>
          <FtRenderPass />

          <FtUnrealBloomPass :strength="0.7" />
          <!-- <FtHalftonePass
            :params="{
              radius: 1,
              scatter: 0,
            }"
          /> -->
          <FtTransparentPass />

          <FtOutputPass />
        </FtEffectComposer>
      </FtWebglRenderer>
    </FtScene>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Color, MathUtils, Object3D, Vector3 } from 'three'
import {
  FtAmbientLight,
  FtAxesHelper,
  FtBoxGeometry,
  FtEffectComposer,
  FtHalftonePass,
  FtInstancedMesh,
  FtMesh,
  FtMeshPhongMaterial,
  FtMeshStandardMaterial,
  FtOrbitControls,
  FtOutputPass,
  FtPerspectiveCamera,
  FtPointLight,
  FtRenderPass,
  FtScene,
  FtTextGeometry,
  FtTransparentPass,
  FtUnrealBloomPass,
  FtWebglRenderer,
} from 'farst-three'
import type {
  FunsEvent,
  InstancedMeshInstance,
  PointLightInstance,
  WebGLRendererInstance,
} from 'farst-three'
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
const baseUrl = import.meta.env.VITE_BASE_URL

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
}
</script>

<style lang="scss" scoped>
.farst-three {
  height: calc(100vh - 55px - 55px - 90px - 70px);
  width: 100%;
  position: relative;
}
</style>
