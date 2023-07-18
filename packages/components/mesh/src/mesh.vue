<template>
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount, provide, watch } from 'vue'
import { Mesh } from 'three'
import {
  CountService,
  useGroup,
  useOptions,
  useScene,
} from '@farst-three/hooks'
import {
  materialServiceInjectionKey,
  meshInjectionKey,
} from '@farst-three/constants/injection'
import { meshEmits, meshProps } from './mesh'
import type { Material } from 'three'

defineOptions({
  name: 'FtMesh',
})

const props = defineProps(meshProps)
const emit = defineEmits(meshEmits)

// init here
let scene = useScene()
let group = useGroup()
let mesh = new Mesh(props.geometry, props.material)
let materialService = new CountService<Material>()

emit('load', { mesh, scene, group })
if (group === null) {
  scene.add(mesh)
} else {
  group.add(mesh)
}
provide(meshInjectionKey, mesh)
provide(materialServiceInjectionKey, materialService)

watch(
  () => materialService.aollections,
  (v) => {
    if (mesh) {
      if (v.length === 1) {
        mesh.material = v[0]
      } else if (v.length > 1) {
        mesh.material = v as any
      }
    }
  },
  { deep: true }
)

useOptions(props.options, mesh, scene)

onBeforeUnmount(() => {
  if (group === null) {
    scene?.remove(mesh)
  } else {
    group.remove(mesh)
  }
  mesh.remove(...mesh.children)
  ;(scene as any) = null
  ;(group as any) = null
  ;(mesh as any) = null
  ;(materialService as any) = null
})
</script>
