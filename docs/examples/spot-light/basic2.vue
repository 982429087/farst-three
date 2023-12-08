<template>
  <div ref="domRef" class="farst-three">
    <FtScene>
      <FtPerspectiveCamera
        :fov="75"
        :near="0.01"
        :far="10000"
        :options="{
          position: {
            set: [100, 100, 0],
          },
        }"
      />
      <FtWebglRenderer
        :options="{
          shadowMap: {
            enabled: true,
          },
        }"
      >
        <FtSpotLight
          :color="0xffffff"
          :intensity="0.5"
          :options="{
            position: { y: 150, z: 0 },
            castShadow: true,
          }"
        />
        <FtSpotLight
          :color="0xff0000"
          :intensity="0.5"
          :options="{
            position: { y: -150, z: 0 },
            castShadow: true,
          }"
        />
        <FtInstancedMesh
          ref="imeshRef"
          :count="NUM_INSTANCES"
          :options="{
            castShadow: true,
            receiveShadow: true,
          }"
        >
          <FtSphereGeometry :radius="5" />
          <FtMeshPhongMaterial />
        </FtInstancedMesh>
        <FtOrbitControls
          :options="{
            autoRotate: true,
            enableDamping: true,
            dampingFactor: 0.05,
          }"
        />
        <FtEffectComposer>
          <FtRenderPass />
          <FtUnrealBloomPass />
          <FtOutputPass />
        </FtEffectComposer>
      </FtWebglRenderer>
    </FtScene>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'
import { MathUtils, Object3D } from 'three'
import {
  FtEffectComposer,
  FtInstancedMesh,
  FtMeshPhongMaterial,
  FtOrbitControls,
  FtOutputPass,
  FtPerspectiveCamera,
  FtRenderPass,
  FtScene,
  FtSphereGeometry,
  FtSpotLight,
  FtUnrealBloomPass,
  FtWebglRenderer,
} from 'farst-three'
import type { InstancedMeshInstance } from 'farst-three'
const imeshRef = ref<InstancedMeshInstance>()
const NUM_INSTANCES = 2000
onMounted(async () => {
  await nextTick()
  const imesh = imeshRef.value!.mesh
  const dummy = new Object3D()
  const { randFloat: rnd, randFloatSpread: rndFS } = MathUtils
  for (let i = 0; i < NUM_INSTANCES; i++) {
    dummy.position.set(rndFS(200), rndFS(200), rndFS(200))
    const scale = rnd(0.2, 1)
    dummy.scale.set(scale, scale, scale)
    dummy.updateMatrix()
    imesh.setMatrixAt(i, dummy.matrix)
  }
  imesh.instanceMatrix.needsUpdate = true
})
</script>

<style lang="scss" scoped>
.farst-three {
  height: 700px;
  width: 100%;
  position: relative;
}
</style>
