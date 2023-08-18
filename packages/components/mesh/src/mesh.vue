<template>
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount, provide, watch } from 'vue'
import { Mesh } from 'three'
import {
  CountService,
  uesEvent,
  useEventService,
  useGroup,
  useOptions,
  useScene,
} from '@farst-three/hooks'
import {
  materialServiceInjectionKey,
  object3dInjectionKey,
} from '@farst-three/constants'
import { meshEmits, meshProps } from './mesh'
import type { Material } from 'three'

defineOptions({
  name: 'FtMesh',
})

const props = defineProps(meshProps)
const emit = defineEmits(meshEmits)

let scene = useScene()
let group = useGroup()
let materialService = new CountService<Material>()
let eventService = useEventService()
let name = props.options.name as string
let mesh = new Mesh(props.geometry, props.material)

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

useOptions(props.options, mesh, scene)
uesEvent(props, emit, name, mesh, eventService)

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
  ;(eventService as any) = null
  ;(name as any) = null
})
</script>
