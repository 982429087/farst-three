<template>
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount, watch } from 'vue'
import {
  effectComposer,
  useAnimationService,
  useScene,
  useStoreService,
} from '@farst-three/hooks'
import { highLightEmits, highLightProps } from './high-light'
import { HighLight } from './HighLight'

defineOptions({
  name: 'FtHighLight',
})

const props = defineProps(highLightProps)
const emit = defineEmits(highLightEmits)

// init here
const scene = useScene()
const store = useStoreService()
const camera = store.getRenderCamera()!
const renderer = store.getRenderer()!
const animation = useAnimationService()
const highLight = new HighLight(scene, camera, renderer, props.options)
highLight.render()
watch(
  () => props.options,
  (v) => {
    if (highLight) highLight.options = v
  },
  { deep: true, immediate: true }
)

animation.on(effectComposer, () => {
  highLight.loop()
})
emit('load', { scene })
// useOptions(props.options, , scene)

onBeforeUnmount(() => {
  //
})
</script>
