<template>
  <div ref="domRef" class="farst-three">
    <FtScene>
      <FtPerspectiveCamera :options="cameraOptions" />
      <FtWebglRenderer>
        <FtDiffusionWave :options="diffusionWaveOptions" />
        <FtOrbitControls />
      </FtWebglRenderer>
    </FtScene>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useGui } from '@farst-three/hooks'
import {
  FtDiffusionWave,
  FtOrbitControls,
  FtPerspectiveCamera,
  FtScene,
  FtWebglRenderer,
} from '@farst-three/components'
import type { DiffusionWaveOptions } from '@farst-three/components'
const domRef = ref<HTMLDivElement>()
const cameraOptions = reactive({
  position: {
    set: [0, 100, 70],
  },
})
const diffusionWaveOptions = reactive<DiffusionWaveOptions>({
  color: '#0066ff',
  damping: 0.3,
  laps: 2.0,
  geometryOptions: [100, 64],
  opacity: 1.0,
})

const { guiPromise } = useGui(domRef)
guiPromise.then((gui) => {
  gui.addColor(diffusionWaveOptions, 'color').name('颜色')
  gui.add(diffusionWaveOptions, 'damping', 0, 0.6, 0.01).name('阻尼')
  gui.add(diffusionWaveOptions, 'laps', 0, 5, 1).name('波数')
  gui.add(diffusionWaveOptions, 'opacity', 0, 1, 0.1).name('透明度')
  gui
    .add(diffusionWaveOptions.geometryOptions as any, 0, 50, 200, 10)
    .name('宽度')
  gui
    .add(diffusionWaveOptions.geometryOptions as any, 1, 0, 128, 2)
    .name('高度')
})
</script>

<style lang="scss" scoped>
.farst-three {
  height: 700px;
  width: 100%;
  position: relative;
}
</style>
