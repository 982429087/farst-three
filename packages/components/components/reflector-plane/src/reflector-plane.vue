<template>
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount } from 'vue'
import { useScene } from '@farst-three/hooks'
import { reflectorPlaneEmits, reflectorPlaneProps } from './reflector-plane'
import { useReflectorPlane } from './use-reflector-plane'

defineOptions({
  name: 'FtReflectorPlane',
})
const props = defineProps(reflectorPlaneProps)
const emit = defineEmits(reflectorPlaneEmits)

const scene = useScene()
const { dispose } = useReflectorPlane(scene, props.options)

emit('load', { scene })

onBeforeUnmount(() => {
  dispose()
})
</script>
