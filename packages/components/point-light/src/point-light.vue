<template>
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount, provide } from 'vue'
import { PointLight } from 'three'
import { useOptions, useScene } from '@farst-three/hooks'
import { pointLightInjectionKey } from '@farst-three/constants'
import { pointLightEmits, pointLightProps } from './point-light'

defineOptions({
  name: 'FtPointLight',
})

const props = defineProps(pointLightProps)
const emit = defineEmits(pointLightEmits)

// init here
let scene = useScene()
let pointLight = new PointLight(
  props.color,
  props.intensity,
  props.distance,
  props.decay
)

emit('load', { scene, light: pointLight })
provide(pointLightInjectionKey, pointLight)
useOptions(props.options, pointLight, scene)
scene.add(pointLight)

onBeforeUnmount(() => {
  scene.remove(pointLight)
  pointLight.dispose()
  ;(scene as any) = null
  ;(pointLight as any) = null
})
</script>
