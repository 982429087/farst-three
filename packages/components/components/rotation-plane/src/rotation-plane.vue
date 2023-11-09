<template>
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount } from 'vue'
import { useAnimationService, useOptions, useScene } from '@farst-three/hooks'
import { rotationPlaneEmits, rotationPlaneProps } from './rotation-plane'
import { useRotationPlane } from './use-rotation-plane'

defineOptions({
  name: 'FtRotationPlane',
})

const props = defineProps(rotationPlaneProps)
const emit = defineEmits(rotationPlaneEmits)

// init here
const scene = useScene()
const animation = useAnimationService()
emit('load', { scene })
const { render, dispose, mesh } = useRotationPlane(scene, props.options)
const name = `rotation-plane${Math.random()}`
animation.on(name, () => {
  render()
})
useOptions(props.meshOptions, mesh, scene)

onBeforeUnmount(() => {
  dispose()
  animation.off(name)
})
</script>
