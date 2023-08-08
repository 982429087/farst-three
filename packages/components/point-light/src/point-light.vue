<template>
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount, provide } from 'vue'
import { PointLight } from 'three'
import { useGroup, useOptions, useScene } from '@farst-three/hooks'
import { pointLightInjectionKey } from '@farst-three/constants'
import { pointLightEmits, pointLightProps } from './point-light'

defineOptions({
  name: 'FtPointLight',
})

const props = defineProps(pointLightProps)
const emit = defineEmits(pointLightEmits)

// init here
let scene = useScene()
let group = useGroup()
let pointLight = new PointLight(
  props.color,
  props.intensity,
  props.distance,
  props.decay
)

emit('load', { scene, light: pointLight })
provide(pointLightInjectionKey, pointLight)
useOptions(props.options, pointLight, scene)
if (group === null) {
  scene.add(pointLight)
} else {
  group.add(pointLight)
}
onBeforeUnmount(() => {
  if (group === null) {
    scene.remove(pointLight)
  } else {
    group.remove(pointLight)
  }
  pointLight.dispose()
  ;(scene as any) = null
  ;(group as any) = null
  ;(pointLight as any) = null
})
</script>
