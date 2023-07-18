<template>
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount } from 'vue'
import { PointLight } from 'three'
import { useGroup, useScene } from '@farst-three/hooks'
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
