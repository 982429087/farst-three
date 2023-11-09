<template>
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount } from 'vue'
import { useAnimationService, useScene } from '@farst-three/hooks'
import { diffusionWaveEmits, diffusionWaveProps } from './diffusion-wave'
import { useDiffusionWave } from './use-diffusion-wave'

defineOptions({
  name: 'FtDiffusionWave',
})

defineProps(diffusionWaveProps)
const emit = defineEmits(diffusionWaveEmits)

const scene = useScene()
const animation = useAnimationService()
const { render, dispose } = useDiffusionWave(scene)
animation.on('diffusion-wave', () => {
  render()
})
emit('load', { scene })

onBeforeUnmount(() => {
  dispose()
  animation.off('diffusion-wave')
})
</script>
