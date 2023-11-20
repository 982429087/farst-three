<template>
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount, watch } from 'vue'
import {
  HighLight,
  useAnimationService,
  useRenderCamera,
  useRenderer,
  useScene,
} from '@farst-three/hooks'
import { highLightEmits, highLightProps } from './high-light'

defineOptions({
  name: 'FtHighLight',
})

const props = defineProps(highLightProps)
const emit = defineEmits(highLightEmits)

// init here
const scene = useScene()
const camera = useRenderCamera()
const renderer = useRenderer()
const animation = useAnimationService()
const highLight = new HighLight(scene, camera, renderer, props.options)
highLight.render()
emit('load', { scene, highLight })

watch(
  () => props.options,
  (v) => {
    if (highLight) highLight.options = v
  },
  { deep: true, immediate: true }
)

animation.noRender = true
animation.on('high-light', () => {
  highLight.loop()
})

onBeforeUnmount(() => {
  animation.noRender = false
  animation.off('high-light')
  highLight.dispose()
})
</script>
