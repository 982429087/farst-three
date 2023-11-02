<template>
  <slot />
</template>

<script lang="ts" setup>
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { Vector2 } from 'three'
import { useComposer, useOptions } from '@farst-three/hooks'
import { unrealBloomPassEmits, unrealBloomPassProps } from './unreal-bloom-pass'

defineOptions({
  name: 'FtUnrealBloomPass',
})
const props = defineProps(unrealBloomPassProps)
const emit = defineEmits(unrealBloomPassEmits)

useComposer(emit, (scene, camera, renderer) => {
  const size = renderer.getSize(new Vector2())

  const pass = new UnrealBloomPass(
    size,
    props.strength,
    props.radius,
    props.threshold
  )
  useOptions(props.options, pass, scene)
  return pass
})
</script>
