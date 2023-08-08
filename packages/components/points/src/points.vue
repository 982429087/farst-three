<template>
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount, provide, watch } from 'vue'
import { Points } from 'three'
import {
  CountService,
  useGroup,
  useOptions,
  useScene,
} from '@farst-three/hooks'
import {
  materialServiceInjectionKey,
  object3dInjectionKey,
} from '@farst-three/constants'
import { pointsEmits, pointsProps } from './points'
import type { Material } from 'three'
defineOptions({
  name: 'FtPoints',
})

const props = defineProps(pointsProps)
const emit = defineEmits(pointsEmits)

let scene = useScene()
let group = useGroup()
let materialService = new CountService<Material>()
let points = new Points(props.geometry, props.material)
emit('load', { obj3d: points, scene, group })
if (group === null) {
  scene.add(points)
} else {
  group.add(points)
}
provide(object3dInjectionKey, points)
provide(materialServiceInjectionKey, materialService)

watch(
  () => materialService.aollections,
  (v) => {
    if (points) {
      if (v.length === 1) {
        points.material = v[0]
      } else if (v.length > 1) {
        points.material = v as any
      }
    }
  },
  { deep: true }
)
useOptions(props.options, points, scene)

onBeforeUnmount(() => {
  if (group === null) {
    scene?.remove(points)
  } else {
    group.remove(points)
  }
  points.remove(...points.children)
  ;(scene as any) = null
  ;(group as any) = null
  ;(points as any) = null
  ;(materialService as any) = null
})
</script>
