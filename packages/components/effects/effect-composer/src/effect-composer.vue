<template>
  <slot v-if="composer" />
</template>

<script lang="ts" setup>
import { onBeforeUnmount, provide } from 'vue'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { Vector2 } from 'three'
import {
  useAnimationService,
  useContainer,
  useRenderer,
  useScene,
} from '@farst-three/hooks'
import { effectComposerInjectionKey } from '@farst-three/constants'
import { effectComposerEmits, effectComposerProps } from './effect-composer'

defineOptions({
  name: 'FtEffectComposer',
})

const props = defineProps(effectComposerProps)
const emit = defineEmits(effectComposerEmits)

const scene = useScene()
const container = useContainer()
const renderer = useRenderer()
const animationService = useAnimationService()
const composer = new EffectComposer(renderer, props.renderTarget)
emit('load', { scene, composer, renderer })
provide(effectComposerInjectionKey, composer)

animationService.noRender = true
animationService.on('ft-effect-composer', () => {
  composer.render()
})

const resize = () => {
  const size = renderer.getSize(new Vector2())
  composer.setSize(size.x, size.y)
}
const observer = new ResizeObserver(resize)
observer.observe(container)

onBeforeUnmount(() => {
  composer.dispose()
  animationService.noRender = false
  animationService.off('ft-effect-composer')
})
</script>
