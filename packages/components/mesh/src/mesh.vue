<template>
  <slot />
</template>

<script lang="ts" setup>
import { provide, shallowRef } from 'vue'
import { Mesh, type Scene } from 'three'
import { useInjection } from '@farst-three/hooks'
import {
  meshInjectionKey,
  sceneInjectionKey,
} from '@farst-three/constants/injection'
import { meshProps } from './mesh'

defineOptions({
  name: 'FtMesh',
})

const props = defineProps(meshProps)

// init here
const scene = useInjection<Scene>(sceneInjectionKey)
const mesh = new Mesh(props.geometry, props.material)

scene.add(mesh)
provide(meshInjectionKey, shallowRef(mesh))
</script>
