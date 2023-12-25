<template>
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount } from 'vue'
import {
  // useAnimationService,
  // useRenderCamera,
  // useRenderer,
  useScene,
} from '@farst-three/hooks'
import {
  quantumEmits,
  // quantumProps
} from './quantum'

defineOptions({
  name: 'FtQuantum',
})

// const props = defineProps(quantumProps)
const emit = defineEmits(quantumEmits)

const scene = useScene()
// const camera = useRenderCamera()
// const renderer = useRenderer()
// const animation = useAnimationService()
emit('load', { scene })
onBeforeUnmount(() => {
  //
})
</script>
