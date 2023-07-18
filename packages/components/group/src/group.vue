<template>
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount, provide } from 'vue'
import { Group } from 'three'
import { useOptions, useScene } from '@farst-three/hooks'
import { groupInjectionKey } from '@farst-three/constants'
import { groupEmits, groupProps } from './group'
import type { Scene } from 'three'

defineOptions({
  name: 'FtGroup',
})

const props = defineProps(groupProps)
const emit = defineEmits(groupEmits)

// init here
let scene: Scene | null = useScene()
let group: Group | null = new Group()
scene.add(group)

emit('load', { scene, group })
provide(groupInjectionKey, group)
useOptions(props.options, group, scene)

onBeforeUnmount(() => {
  if (group) {
    scene?.remove(group)
    group.remove(...group.children)
  }
  group = null
  scene = null
})
</script>
