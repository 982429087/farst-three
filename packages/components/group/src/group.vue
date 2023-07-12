<template>
  <slot />
</template>

<script lang="ts" setup>
import { provide } from 'vue'
import { Group } from 'three'
import { useScene } from '@farst-three/hooks'
import { groupInjectionKey } from '@farst-three/constants'
import { groupEmits, groupProps } from './group'

defineOptions({
  name: 'FtGroup',
})

defineProps(groupProps)
const emit = defineEmits(groupEmits)

// init here
const scene = useScene()
const group = new Group()
scene.add(group)

emit('load', { scene, group })
provide(groupInjectionKey, group)
</script>
