<template>
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount, provide } from 'vue'
import { Mesh } from 'three'
import { useScene } from '@farst-three/hooks'
import { meshInjectionKey } from '@farst-three/constants/injection'
import { meshEmits, meshProps } from './mesh'

defineOptions({
  name: 'FtMesh',
})

const props = defineProps(meshProps)
const emit = defineEmits(meshEmits)

// init here
const scene = useScene()
const mesh = new Mesh(props.geometry, props.material)
emit('load', { mesh, scene })
scene.add(mesh)
provide(meshInjectionKey, mesh)

onBeforeUnmount(() => {
  scene.remove(mesh)
})
</script>
