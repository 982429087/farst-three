<template>
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount, provide, shallowRef } from 'vue'
import { Mesh, type Scene } from 'three'
import { useInjection } from '@farst-three/hooks'
import {
  meshInjectionKey,
  sceneInjectionKey,
} from '@farst-three/constants/injection'
import { meshEmits, meshProps } from './mesh'

defineOptions({
  name: 'FtMesh',
})

const props = defineProps(meshProps)
const emit = defineEmits(meshEmits)

// init here
const scene = useInjection<Scene>(sceneInjectionKey)
const mesh = new Mesh(props.geometry, props.material)
emit('load', mesh)
scene.add(mesh)
provide(meshInjectionKey, shallowRef(mesh))

onBeforeUnmount(() => {
  scene.remove(mesh)
})
</script>
