<template>
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount, provide, watch } from 'vue'
import { Line } from 'three'
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
import { lineEmits, lineProps } from './line'
import type { Material } from 'three'

defineOptions({
  name: 'FtLine',
})

const props = defineProps(lineProps)
const emit = defineEmits(lineEmits)

// init here
let scene = useScene()
let group = useGroup()
let materialService = new CountService<Material>()
let line = new Line(props.geometry, props.material)

emit('load', { line, scene, group })
if (group === null) {
  scene.add(line)
} else {
  group.add(line)
}
provide(object3dInjectionKey, line)
provide(materialServiceInjectionKey, materialService)

watch(
  () => materialService.aollections,
  (v) => {
    if (line) {
      if (v.length === 1) {
        line.material = v[0]
      } else if (v.length > 1) {
        line.material = v as any
      }
    }
  },
  { deep: true }
)
useOptions(props.options, line, scene)
onBeforeUnmount(() => {
  if (group === null) {
    scene?.remove(line)
  } else {
    group.remove(line)
  }
  line.remove(...line.children)
  ;(scene as any) = null
  ;(group as any) = null
  ;(line as any) = null
  ;(materialService as any) = null
})
</script>
