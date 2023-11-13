<template>
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount } from 'vue'
import { useScene, useStoreService } from '@farst-three/hooks'
import { reflectorPlaneEmits, reflectorPlaneProps } from './reflector-plane'
import { useReflectorPlane } from './use-reflector-plane'

defineOptions({
  name: 'FtReflectorPlane',
})
const props = defineProps(reflectorPlaneProps)
const emit = defineEmits(reflectorPlaneEmits)

const store = useStoreService()
const container = store.getSceneRef()
const scene = useScene()
const { dispose } = useReflectorPlane(scene, container!, props.options)

emit('load', { scene })

onBeforeUnmount(() => {
  dispose()
})
</script>
