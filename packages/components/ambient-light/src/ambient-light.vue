<template>
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount } from 'vue'
import { AmbientLight } from 'three'
import { useGroup, useScene } from '@farst-three/hooks'
import { ambientLightEmits, ambientLightProps } from './ambient-light'

defineOptions({
  name: 'FtAmbientLight',
})

const props = defineProps(ambientLightProps)
const emit = defineEmits(ambientLightEmits)

// init here
const scene = useScene()
const group = useGroup()

const ambientLight = new AmbientLight(props.color, props.intensity)

emit('load', { scene, light: ambientLight })
if (group === null) {
  scene.add(ambientLight)
} else {
  group.add(ambientLight)
}

onBeforeUnmount(() => {
  if (group === null) {
    scene.remove(ambientLight)
  } else {
    group.remove(ambientLight)
  }
})
</script>
