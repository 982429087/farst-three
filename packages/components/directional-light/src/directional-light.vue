<template>
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount, provide } from 'vue'
import { DirectionalLight } from 'three'
import { useOptions, useScene } from '@farst-three/hooks'
import { directionalLightInjectionKey } from '@farst-three/constants'
import {
  directionalLightEmits,
  directionalLightProps,
} from './directional-light'

defineOptions({
  name: 'FtDirectionalLight',
})

const props = defineProps(directionalLightProps)
const emit = defineEmits(directionalLightEmits)

// init here
let scene = useScene()

let light = new DirectionalLight(props.color, props.intensity)
scene.add(light)
provide(directionalLightInjectionKey, light)
useOptions(props.options, light, scene)
emit('load', { light, scene })
onBeforeUnmount(() => {
  scene.remove(light)
  light.dispose()
  ;(light as any) = null
  ;(scene as any) = null
})
</script>
