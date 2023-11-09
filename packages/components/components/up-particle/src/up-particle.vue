<template>
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount } from 'vue'
import { useAnimationService, useScene } from '@farst-three/hooks'
import { upParticleEmits, upParticleProps } from './up-particle'
import { useUpPatricle } from './use-up-particle'

defineOptions({
  name: 'FtUpParticle',
})

const props = defineProps(upParticleProps)
const emit = defineEmits(upParticleEmits)

// init here
const scene = useScene()
const animation = useAnimationService()
const { render, dispose } = useUpPatricle(scene, props.options)
animation.on('up-particle', () => {
  render()
})
emit('load', { scene })

onBeforeUnmount(() => {
  dispose()
  animation.off('up-particle')
})
</script>
