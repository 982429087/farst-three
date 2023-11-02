<template>
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount } from 'vue'
import { FogExp2 } from 'three'
import { useOptions, useScene } from '@farst-three/hooks'
import { fogExp2Emits, fogExp2Props } from './fog-exp2'

defineOptions({
  name: 'FtFogExp2',
})

const props = defineProps(fogExp2Props)
const emit = defineEmits(fogExp2Emits)

// init here
let scene = useScene()
let fog = new FogExp2(props.color, props.density)
emit('load', { scene, fog })
useOptions(props.options, fog, scene)
scene.fog = fog
onBeforeUnmount(() => {
  scene.fog = null
  ;(scene as any) = null
  ;(fog as any) = null
})
</script>
