import { buildProps, definePropType } from '@farst-three/utils'
import type {
  Object3D,
  Scene,
  SpriteMaterial,
  SpriteMaterialParameters,
} from 'three'
import type { ExtractPropTypes } from 'vue'
import type { ThreeOptions } from '@farst-three/utils'
import type SpriteMaterialComponent from './sprite-material.vue'

export const spriteMaterialProps = buildProps({
  options: {
    type: definePropType<SpriteMaterialOptions>(Object),
    default: () => ({}),
  },
  params: {
    type: definePropType<SpriteMaterialParameters>(Object),
  },
})
export const spriteMaterialEmits = {
  load: (e: SpriteMaterialLoadEvent) => e,
}

export type SpriteMaterialLoadEvent = {
  scene: Scene
  obj3d: Object3D
  material: SpriteMaterial
}
export type SpriteMaterialEmits = typeof spriteMaterialEmits
export type SpriteMaterialProps = ExtractPropTypes<typeof spriteMaterialProps>
export type SpriteMaterialInstance = InstanceType<
  typeof SpriteMaterialComponent
>
export type SpriteMaterialOptions = ThreeOptions<SpriteMaterial>
