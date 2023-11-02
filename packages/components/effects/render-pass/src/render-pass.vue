<template>
  <slot />
</template>

<script lang="ts" setup>
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { useComposer } from '@farst-three/hooks'
import { renderPassEmits } from './render-pass'

defineOptions({
  name: 'FtRenderPass',
})
const emit = defineEmits(renderPassEmits)
// init here
useComposer(emit, (scene, camera) => {
  return new RenderPass(scene, camera)
})
</script>
