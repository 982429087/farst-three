<template>
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount, provide } from 'vue'
import { SpotLight } from 'three'
import { useOptions, useScene } from '@farst-three/hooks'
import { spotLightInjectionKey } from '@farst-three/constants'
import { spotLightEmits, spotLightProps } from './spot-light'

defineOptions({
  name: 'FtSpotLight',
})

const props = defineProps(spotLightProps)
const emit = defineEmits(spotLightEmits)

// init here
let scene = useScene()
let light = new SpotLight(
  props.color,
  props.intensity,
  props.distance,
  props.angle,
  props.penumbra,
  props.decay
)
emit('load', { scene, light })
useOptions(props.options, light, scene)
provide(spotLightInjectionKey, light)
scene.add(light)

onBeforeUnmount(() => {
  scene.remove(light)
  light.dispose()
  ;(scene as any) = null
  ;(light as any) = null
})
</script>
