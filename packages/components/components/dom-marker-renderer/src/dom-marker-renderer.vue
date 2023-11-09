<template>
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount } from 'vue'
import {
  useAnimationService,
  useScene,
  useStoreService,
} from '@farst-three/hooks'
import { domMarkerRendererEmits } from './dom-marker-renderer'
import { useDomMarker } from './use-dom-marker'

defineOptions({
  name: 'FtDomMarkerRenderer',
})

const emit = defineEmits(domMarkerRendererEmits)

// init here
const scene = useScene()
const store = useStoreService()
const animation = useAnimationService()
const camera = store.getRenderCamera()!
const container = store.getSceneRef()!

const { dispose, render } = useDomMarker(scene, camera, container)
animation.on('dom-marker', () => {
  render()
})
emit('load', { scene })
onBeforeUnmount(() => {
  dispose()
})
</script>
