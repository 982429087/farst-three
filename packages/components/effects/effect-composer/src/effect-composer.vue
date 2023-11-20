<template>
  <slot v-if="composer" />
</template>

<script lang="ts" setup>
import { onBeforeUnmount, provide, shallowRef, watch } from 'vue'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { debounce } from 'lodash'
import { Vector2 } from 'three'
import {
  useAnimationService,
  useContainer,
  useScene,
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
const container = useContainer()
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

// effect render 执行的时候是，不能执行 webglrenderer的render方法
animationService.noRender = true
animationService.on('effect-composer', () => {
  composer.value?.render()
})

const resize = () => {
  const renderer = store.getRenderer()

  if (composer.value && renderer) {
    const size = renderer.getSize(new Vector2())
    composer.value?.setSize(size.x, size.y)
  }
}
const dOb = debounce(() => resize(), 0)
const observer = new ResizeObserver(dOb)
observer.observe(container)

onBeforeUnmount(() => {
  composer.value?.dispose()
  animationService.noRender = false
  animationService.off('effect-composer')
  ;(scene as any) = null
  ;(composer as any) = null
})
</script>
