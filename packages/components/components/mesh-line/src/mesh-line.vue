<template>
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount } from 'vue'
import { useScene } from '@farst-three/hooks'
import { meshLineEmits, meshLineProps } from './mesh-line'

defineOptions({
  name: 'FtMeshLine',
})

defineProps(meshLineProps)
const emit = defineEmits(meshLineEmits)

// init here
let scene = useScene()
emit('load', { scene })

onBeforeUnmount(() => {
  ;(scene as any) = null
})
</script>
