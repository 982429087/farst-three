<template>
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount, watch } from 'vue'
import { useOptions, useScene, useStoreService } from '@farst-three/hooks'
import { reflectorPlaneEmits, reflectorPlaneProps } from './reflector-plane'
import { useReflectorPlane } from './use-reflector-plane'
import type { AnyFun } from '@farst-three/utils'

defineOptions({
  name: 'FtReflectorPlane',
})
const props = defineProps(reflectorPlaneProps)
const emit = defineEmits(reflectorPlaneEmits)

const store = useStoreService()
const container = store.getSceneRef()
const scene = useScene()
let destroy: AnyFun | undefined
let stop: AnyFun | undefined
let stop1: AnyFun | undefined
let stop2: AnyFun | undefined

watch(
  () => props.options,
  (v) => {
    destroy?.()
    stop?.()
    stop1?.()
    stop2?.()
    const { dispose, circleMesh, floorMesh, mirror } = useReflectorPlane(
      scene,
      container!,
      v
    )
    emit('load', { scene, circleMesh, floorMesh, mirror })
    const { watchStopHandle: wsh } = useOptions(
      props.mirrorOptions,
      mirror,
      scene
    )
    stop = wsh
    const { watchStopHandle: wsh1 } = useOptions(
      props.circleMeshOptions,
      circleMesh,
      scene
    )
    stop1 = wsh1
    const { watchStopHandle: wsh2 } = useOptions(
      props.floorMeshOptions,
      floorMesh,
      scene
    )
    stop2 = wsh2
    destroy = dispose
  },
  { deep: true, immediate: true }
)

onBeforeUnmount(() => {
  destroy?.()
})
</script>
