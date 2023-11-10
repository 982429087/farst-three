<template>
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount, watch } from 'vue'
import { useAnimationService, useScene } from '@farst-three/hooks'
import { upParticleEmits, upParticleProps } from './up-particle'
import { useUpPatricle } from './use-up-particle'
import type { AnyFun } from '@farst-three/utils'

defineOptions({
  name: 'FtUpParticle',
})

const props = defineProps(upParticleProps)
const emit = defineEmits(upParticleEmits)

const scene = useScene()
const animationService = useAnimationService()

let animationFn: AnyFun
let destroy: AnyFun

watch(
  () => props.options,
  (v) => {
    destroy?.()
    const { render, dispose, particles } = useUpPatricle(scene, v)
    animationFn = render
    destroy = dispose
    emit('load', { scene, particles })
  },
  { deep: true, immediate: true }
)
animationService.on('up-particle', () => {
  animationFn()
})

onBeforeUnmount(() => {
  destroy()
  animationService.off('up-particle')
})
</script>
