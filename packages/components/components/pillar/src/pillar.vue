<template>
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount, watch } from 'vue'
import {
  useGroup,
  useOptions,
  useProjection,
  useScene,
} from '@farst-three/hooks'
import { pillarEmits, pillarProps } from './pillar'
import { usePillar } from './use-pillar'
import type { AnyFun } from '@farst-three/utils'

defineOptions({
  name: 'FtPillar',
})

const props = defineProps(pillarProps)
const emit = defineEmits(pillarEmits)

// init here
const scene = useScene()
const group = useGroup()
const projection = useProjection()
const o3d = group || scene
let destory: AnyFun | undefined
let stop: AnyFun | undefined
watch(
  () => props.options,
  (v) => {
    destory?.()
    stop?.()
    const { dispose, group } = usePillar(o3d, v, projection)
    destory = dispose
    const { watchStopHandle } = useOptions(props.groupOptions, group, scene)
    stop = watchStopHandle
    emit('load', { scene, group })
  },
  { deep: true, immediate: true }
)

onBeforeUnmount(() => {
  destory?.()
})
</script>
