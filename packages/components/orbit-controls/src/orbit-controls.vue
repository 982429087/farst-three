<template>
  <div>
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { useCamera, useRenderer } from '@farst-three/hooks'
import { orbitControlsEmits, orbitControlsProps } from './orbit-controls'
defineOptions({
  name: 'FtOrbitControls',
})

const props = defineProps(orbitControlsProps)
const emit = defineEmits(orbitControlsEmits)

// init here
const renderer = useRenderer()
const camera = useCamera()
const controls = new OrbitControls(camera, renderer.domElement)
emit('load', { controls, camera, renderer })
</script>
