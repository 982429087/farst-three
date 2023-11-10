<template>
  <div ref="domRef" class="farst-three">
    <FtScene>
      <FtPerspectiveCamera :options="cameraOptions" />
      <FtWebglRenderer>
        <FtUpParticle :options="upParticleOptions" />
        <FtOrbitControls />
        <FtAxesHelper :size="60" />
      </FtWebglRenderer>
    </FtScene>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useGui } from '@farst-three/hooks'
import {
  FtAxesHelper,
  FtOrbitControls,
  FtPerspectiveCamera,
  FtScene,
  FtUpParticle,
  FtWebglRenderer,
} from '@farst-three/components'
import type { UpParticleOptions } from '@farst-three/components'
const domRef = ref<HTMLDivElement>()
const cameraOptions = reactive({
  position: {
    set: [3, 74, 100],
  },
})
const upParticleOptions = reactive<UpParticleOptions>({
  texture: '/geo/up-particle.png',
  count: 100,
  speed: 0.15,
  textureSpeed: 0.5,
  materialOptions: {
    color: 0x00ffff,
  },
  maxX: 60,
  minX: -60,
  maxY: 30,
  minY: -10,
  maxZ: 60,
  minZ: -60,
})
const { guiPromise } = useGui(domRef)
guiPromise.then((gui) => {
  gui.addColor(upParticleOptions.materialOptions!, 'color')
  gui.add(upParticleOptions, 'count', 0, 300).name('粒子数量')
  gui.add(upParticleOptions, 'minX', -200, 0).name('最小x距离')
  gui.add(upParticleOptions, 'maxX', 0, 200).name('最大x距离')
  gui.add(upParticleOptions, 'minY', -200, 0).name('最小y距离')
  gui.add(upParticleOptions, 'maxY', 0, 200).name('最大y距离')
  gui.add(upParticleOptions, 'minZ', -200, 0).name('最小z距离')
  gui.add(upParticleOptions, 'maxZ', 0, 200).name('最大z距离')
  gui.add(upParticleOptions, 'speed', 0, 2).name('粒子上升速度')
  gui.add(upParticleOptions, 'textureSpeed', 0, 2).name('数字滚动速度')
})
</script>

<style lang="scss" scoped>
.farst-three {
  height: 700px;
  width: 100%;
  position: relative;
}
</style>
