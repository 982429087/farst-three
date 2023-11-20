<template>
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount } from 'vue'
import {
  useAnimationService,
  useContainer,
  useRenderCamera,
  useScene,
} from '@farst-three/hooks'
import { domMarkerRendererEmits } from './dom-marker-renderer'
import { useDomMarker } from './use-dom-marker'

defineOptions({
  name: 'FtDomMarkerRenderer',
})

const emit = defineEmits(domMarkerRendererEmits)
const scene = useScene()
const animation = useAnimationService()
const camera = useRenderCamera()
const container = useContainer()

const { dispose, render } = useDomMarker(scene, camera, container)
animation.on('dom-marker', () => {
  render()
})
emit('load', { scene })
onBeforeUnmount(() => {
  dispose()
  animation.off('dom-marker')
})
</script>
