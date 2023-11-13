<template>
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount, watch } from 'vue'
import { useAnimationService, useOptions, useScene } from '@farst-three/hooks'
import { diffusionWaveEmits, diffusionWaveProps } from './diffusion-wave'
import { useDiffusionWave } from './use-diffusion-wave'
import type { WatchStopHandle } from 'vue'
import type { Mesh } from 'three'
import type { AnyFun } from '@farst-three/utils'

defineOptions({
  name: 'FtDiffusionWave',
})

const props = defineProps(diffusionWaveProps)
const emit = defineEmits(diffusionWaveEmits)

const scene = useScene()
const animation = useAnimationService()

let destroy: AnyFun | undefined
let animationFn: AnyFun | undefined
let gmesh: Mesh | undefined
let stop: WatchStopHandle | undefined

watch(
  () => props.options,
  (v) => {
    destroy?.()
    stop?.()
    const { render, dispose, mesh, geometry, material } = useDiffusionWave(
      scene,
      v
    )
    destroy = dispose
    animationFn = render
    gmesh = mesh
    emit('load', { scene, mesh, geometry, material })
    const { watchStopHandle } = useOptions(props.meshOptions, gmesh, scene)
    stop = watchStopHandle
  },
  { deep: true, immediate: true }
)

animation.on('diffusion-wave', () => {
  animationFn?.()
})

onBeforeUnmount(() => {
  destroy?.()
  animation.off('diffusion-wave')
})
</script>
