<template>
  <div>
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { webGLRendererProps } from './webgl-renderer'

defineOptions({
  name: 'FtWebGLRenderer',
})

const props = defineProps(webGLRendererProps)

// init here
console.log(props)
</script>
