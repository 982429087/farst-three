<template>
  <slot v-if="composer" />
</template>

<script lang="ts" setup>
import { onBeforeUnmount, provide, shallowRef, watch } from 'vue'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { debounce } from 'lodash'
import {
  useAnimationService,
  useScene,
  useSceneRef,
  useStoreService,
} from '@farst-three/hooks'
import { effectComposerInjectionKey } from '@farst-three/constants'
import { effectComposerEmits, effectComposerProps } from './effect-composer'

defineOptions({
  name: 'FtEffectComposer',
})

const props = defineProps(effectComposerProps)
const emit = defineEmits(effectComposerEmits)

// init here
let scene = useScene()
const container = useSceneRef()
const store = useStoreService()
const animationService = useAnimationService()
let composer = shallowRef<EffectComposer>()
provide(effectComposerInjectionKey, composer)
watch(
  () => store.renderer.value,
  (v) => {
    if (v) {
      composer.value = new EffectComposer(v, props.renderTarget)
      emit('load', { scene, composer: composer.value, renderer: v })
    }
  },
  {
    immediate: true,
  }
)
animationService.on('effectComposer', () => {
  composer.value?.render()
})

const resize = () => {
  if (composer.value) {
    composer.value.setSize(container.offsetWidth, container.offsetHeight)
  }
}
const dOb = debounce(() => resize(), 0)
const observer = new ResizeObserver(dOb)
observer.observe(container)

onBeforeUnmount(() => {
  composer.value?.dispose()
  ;(scene as any) = null
  ;(composer as any) = null
})
</script>
