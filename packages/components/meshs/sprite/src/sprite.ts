import { buildProps, definePropType } from '@farst-three/utils'
import type { Scene, Sprite, SpriteMaterial } from 'three'
import type { ExtractPropTypes } from 'vue'
import type { ThreeOptions } from '@farst-three/utils'
import type SpriteComponent from './sprite.vue'

export const spriteProps = buildProps({
  options: {
    type: definePropType<SpriteOptions>(Object),
    default: () => ({}),
  },
  material: {
    type: definePropType<SpriteMaterial>(Object),
  },
})
export const spriteEmits = {
  load: (e: SpriteLoadEvent) => e,
}

export type SpriteLoadEvent = {
  scene: Scene
  sprite: Sprite
}
export type SpriteEmits = typeof spriteEmits
export type SpriteProps = ExtractPropTypes<typeof spriteProps>
export type SpriteInstance = InstanceType<typeof SpriteComponent>
export type SpriteOptions = ThreeOptions<Sprite>
