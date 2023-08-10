<template>
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount, provide } from 'vue'
import { HemisphereLight } from 'three'
import { useOptions, useScene } from '@farst-three/hooks'
import { hemisphereLightInjectionKey } from '@farst-three/constants'
import { hemisphereLightEmits, hemisphereLightProps } from './hemisphere-light'

defineOptions({
  name: 'FtHemisphereLight',
})

const props = defineProps(hemisphereLightProps)
const emit = defineEmits(hemisphereLightEmits)

// init here
let scene = useScene()
let light = new HemisphereLight(
  props.skyColor,
  props.groundColor,
  props.intensity
)
provide(hemisphereLightInjectionKey, light)

emit('load', { scene, light })
useOptions(props.options, light, scene)
scene.add(light)

onBeforeUnmount(() => {
  scene.remove(light)
  light.dispose()
  ;(scene as any) = null
  ;(light as any) = null
})
</script>
