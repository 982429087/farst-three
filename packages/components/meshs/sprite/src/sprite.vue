<template>
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount, provide, watch } from 'vue'
import { Sprite } from 'three'
import {
  CountService,
  useGroup,
  useOptions,
  useScene,
} from '@farst-three/hooks'
import {
  materialServiceInjectionKey,
  object3dInjectionKey,
} from '@farst-three/constants'
import { spriteEmits, spriteProps } from './sprite'
import type { Material, SpriteMaterial } from 'three'

defineOptions({
  name: 'FtSprite',
})

const props = defineProps(spriteProps)
const emit = defineEmits(spriteEmits)

// init here
let scene = useScene()
let group = useGroup()
let materialService = new CountService<Material>()
let sprite = new Sprite(props.material)
emit('load', { scene, sprite })
useOptions(props.options, sprite, scene)
scene.add(sprite)
provide(object3dInjectionKey, sprite)
provide(materialServiceInjectionKey, materialService)
watch(
  () => materialService.aollections,
  (v) => {
    if (sprite) {
      if (v.length === 1) {
        sprite.material = v[0] as SpriteMaterial
      } else if (v.length > 1) {
        sprite.material = v as any
      }
    }
  },
  { deep: true }
)
onBeforeUnmount(() => {
  if (group === null) {
    scene?.remove(sprite)
  } else {
    group.remove(sprite)
  }
  sprite.remove(...sprite.children)
  ;(sprite as any) = null
  ;(materialService as any) = null
  ;(scene as any) = null
  ;(group as any) = null
})
</script>
