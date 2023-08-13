<template>
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount } from 'vue'
import { Fog } from 'three'
import { useOptions, useScene } from '@farst-three/hooks'
import { fogEmits, fogProps } from './fog'

defineOptions({
  name: 'FtFog',
})

const props = defineProps(fogProps)
const emit = defineEmits(fogEmits)

// init here
let scene = useScene()
let fog = new Fog(props.color, props.near, props.far)
emit('load', { scene, fog })
useOptions(props.options, fog, scene)
scene.fog = fog
onBeforeUnmount(() => {
  scene.fog = null
  ;(fog as any) = null
  ;(scene as any) = null
})
</script>
