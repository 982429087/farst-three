<template>
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount, provide } from 'vue'
import { RectAreaLight } from 'three'
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib'
import { useOptions, useScene } from '@farst-three/hooks'
import { rectAreaLightInjectionKey } from '@farst-three/constants'
import { rectAreaLightEmits, rectAreaLightProps } from './rect-area-light'

defineOptions({
  name: 'FtRectAreaLight',
})

const props = defineProps(rectAreaLightProps)
const emit = defineEmits(rectAreaLightEmits)

// init here
let scene = useScene()
let light = new RectAreaLight(
  props.color,
  props.intensity,
  props.width,
  props.height
)

if (props.uniforms) {
  RectAreaLightUniformsLib.init()
}

emit('load', { scene, light })
useOptions(props.options, light, scene)
provide(rectAreaLightInjectionKey, light)
scene.add(light)
onBeforeUnmount(() => {
  scene.remove(light)
  light.dispose()
  ;(scene as any) = null
  ;(light as any) = null
})
</script>
