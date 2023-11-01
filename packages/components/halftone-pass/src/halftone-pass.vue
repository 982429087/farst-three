<template>
  <slot />
</template>

<script lang="ts" setup>
import { HalftonePass } from 'three/examples/jsm/postprocessing/HalftonePass'
import { Vector2 } from 'three'
import { useComposer, useOptions } from '@farst-three/hooks'
import { halftonePassEmits, halftonePassProps } from './halftone-pass'

defineOptions({
  name: 'FtHalftonePass',
})

const props = defineProps(halftonePassProps)
const emit = defineEmits(halftonePassEmits)

useComposer(emit, (scene, camera, renderer) => {
  const size = renderer.getSize(new Vector2())

  const pass = new HalftonePass(size.x, size.y, {})
  useOptions(props.options, pass, scene)
  return pass
})
</script>
