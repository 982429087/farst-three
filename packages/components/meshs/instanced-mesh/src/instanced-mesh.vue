<template>
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount, provide, watch } from 'vue'
import { InstancedMesh } from 'three'
import {
  materialServiceInjectionKey,
  object3dInjectionKey,
} from '@farst-three/constants'
import {
  CountService,
  uesEvent,
  useDragService,
  useGroup,
  useOptions,
  useScene,
} from '@farst-three/hooks'
import { instancedMeshEmits, instancedMeshProps } from './instanced-mesh'
import type { Material } from 'three'

defineOptions({
  name: 'FtInstancedMesh',
})

const props = defineProps(instancedMeshProps)
const emit = defineEmits(instancedMeshEmits)

// init here
let scene = useScene()
let group = useGroup()
const dragService = useDragService()
let materialService = new CountService<Material>()
let mesh = new InstancedMesh(props.geometry, props.material, props.count)

emit('load', { mesh, scene, group })

if (group === null) {
  scene.add(mesh)
} else {
  group.add(mesh)
}
provide(object3dInjectionKey, mesh)
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

watch(
  () => props.dragabled,
  (v) => {
    if (v) dragService.addCount(mesh)
    else dragService.subCount(mesh)
  },
  { immediate: true }
)

useOptions(props.options, mesh, scene)
uesEvent(props, emit, mesh)

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

defineExpose({
  mesh,
})
</script>
