<template>
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount } from 'vue'
import { AmbientLight } from 'three'
import { useGroup, useOptions, useScene } from '@farst-three/hooks'
import { ambientLightEmits, ambientLightProps } from './ambient-light'
import type { Group, Scene } from 'three'

defineOptions({
  name: 'FtAmbientLight',
})

const props = defineProps(ambientLightProps)
const emit = defineEmits(ambientLightEmits)

// init here
let scene: Scene | null = useScene()
let group: Group | null = useGroup()

let ambientLight: AmbientLight | null = new AmbientLight(
  props.color,
  props.intensity
)

emit('load', { scene, light: ambientLight })
useOptions(props.options, ambientLight, scene)
if (group === null) {
  scene.add(ambientLight)
} else {
  group.add(ambientLight)
}

onBeforeUnmount(() => {
  if (ambientLight) {
    if (group === null) {
      scene?.remove(ambientLight)
    } else {
      group.remove(ambientLight)
    }
  }
  ambientLight = null
  scene = null
  group = null
})
</script>
