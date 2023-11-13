<template>
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount, watch } from 'vue'
import {
  useAnimationService,
  useGroup,
  useOptions,
  useProjection,
  useScene,
} from '@farst-three/hooks'
import { pointMarkerEmits, pointMarkerProps } from './point-marker'
import { usePointMarker } from './use-point-marker'
import type { AnyFun } from '@farst-three/utils'

defineOptions({
  name: 'FtPointMarker',
})

const props = defineProps(pointMarkerProps)
const emit = defineEmits(pointMarkerEmits)

const name = `point-marker${Math.random()}`

const scene = useScene()
const group = useGroup()
const projection = useProjection()
const animation = useAnimationService()
const o3d = group || scene
let destroy: AnyFun | undefined
let animationFn: AnyFun | undefined
let stop: AnyFun | undefined
watch(
  () => props.options,
  (v) => {
    stop?.()
    destroy?.()
    const { render, dispose, haloMesh, waveMesh } = usePointMarker(
      o3d,
      v,
      projection
    )
    destroy = dispose
    animationFn = render
    emit('load', { scene, haloMesh, waveMesh, group })
    const { watchStopHandle } = useOptions(props.groupOptions, group, scene)
    stop = watchStopHandle
  },
  { deep: true, immediate: true }
)
animation.on(name, () => {
  animationFn?.()
})
onBeforeUnmount(() => {
  animation.off(name)
  destroy?.()
})
</script>
