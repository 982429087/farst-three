<template>
  <slot />
</template>

<script lang="ts" setup>
import { useRenderer } from '@farst-three/hooks'
import { thumbnailEmits, thumbnailProps } from './thumbnail'
import type { WebGLRenderer } from 'three'

defineOptions({
  name: 'FtThumbnail',
})

const props = defineProps(thumbnailProps)
const emit = defineEmits(thumbnailEmits)

// init here
console.log(props, emit)
const renderer = useRenderer() as WebGLRenderer
console.log(renderer)
// renderer.setScissor()
</script>
