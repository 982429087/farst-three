<template>
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount, watch } from 'vue'
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

const name = `rotation-plane${Math.random()}`
let destory: any | undefined
let animationFn: any | undefined
watch(
  () => props.options,
  () => {
    if (destory) destory()
    const { render, dispose, mesh } = useRotationPlane(scene, props.options)
    destory = dispose
    animationFn = render
    useOptions(props.meshOptions, mesh, scene)
    emit('load', { scene, mesh })
  },
  { immediate: true, deep: true }
)
animation.on(name, () => {
  if (animationFn) animationFn()
})
onBeforeUnmount(() => {
  destory()
  animation.off(name)
})
</script>
