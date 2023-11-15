<template>
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount } from 'vue'
import {
  effectComposer,
  useAnimationService,
  useScene,
  useStoreService,
} from '@farst-three/hooks'
import { highLightEmits, highLightProps } from './high-light'
import { useHighLight } from './use-high-light'

defineOptions({
  name: 'FtHighLight',
})

defineProps(highLightProps)
const emit = defineEmits(highLightEmits)

// init here
const scene = useScene()
const store = useStoreService()
const camera = store.getRenderCamera()!
const renderer = store.getRenderer()!
const animation = useAnimationService()
const { render } = useHighLight(scene, camera, renderer)

animation.on(effectComposer, () => {
  render()
})
emit('load', { scene })
// useOptions(props.options, , scene)

onBeforeUnmount(() => {
  //
})
</script>
