<template>
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount } from 'vue'
import { useScene } from '@farst-three/hooks'
import { edgeMoveLineEmits, edgeMoveLineProps } from './edge-move-line'

defineOptions({
  name: 'FtEdgeMoveLine',
})

defineProps(edgeMoveLineProps)
const emit = defineEmits(edgeMoveLineEmits)

// init here
let scene = useScene()
emit('load', { scene })

onBeforeUnmount(() => {
  ;(scene as any) = null
})
</script>
