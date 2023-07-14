<template>
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount, provide } from 'vue'
import { Mesh } from 'three'
import { useGroup, useOptions, useScene } from '@farst-three/hooks'
import { meshInjectionKey } from '@farst-three/constants/injection'
import { meshEmits, meshProps } from './mesh'

defineOptions({
  name: 'FtMesh',
})

const props = defineProps(meshProps)
const emit = defineEmits(meshEmits)

// init here
const scene = useScene()
const group = useGroup()
const mesh = new Mesh(props.geometry, props.material)
emit('load', { mesh, scene, group })
if (group === null) {
  scene.add(mesh)
} else {
  group.add(mesh)
}
provide(meshInjectionKey, mesh)

useOptions(props.options, mesh, scene)

onBeforeUnmount(() => {
  if (group === null) {
    scene.remove(mesh)
  } else {
    group.remove(mesh)
  }
})
</script>
