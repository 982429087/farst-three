<template>
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount, provide } from 'vue'
import { Sprite } from 'three'
import { useOptions, useScene } from '@farst-three/hooks'
import { object3dInjectionKey } from '@farst-three/constants'
import { spriteEmits, spriteProps } from './sprite'

defineOptions({
  name: 'FtSprite',
})

const props = defineProps(spriteProps)
const emit = defineEmits(spriteEmits)

// init here
let scene = useScene()
let sprite = new Sprite(props.material)
emit('load', { scene, sprite })
useOptions(props.options, sprite, scene)
scene.add(sprite)
provide(object3dInjectionKey, sprite)
onBeforeUnmount(() => {
  scene.remove(sprite)
  ;(sprite as any) = null
  ;(scene as any) = null
})
</script>
