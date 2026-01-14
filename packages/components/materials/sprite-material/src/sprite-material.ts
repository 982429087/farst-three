import type {
  Object3D,
  Scene,
  SpriteMaterial,
  SpriteMaterialParameters,
} from 'three'
import type { ExtractPropTypes, PropType } from 'vue'
import type { ThreeOptions } from '@farst-three/utils'
import type SpriteMaterialComponent from './sprite-material.vue'

export const spriteMaterialProps = {
  options: {
    type: Object as PropType<SpriteMaterialOptions>,
    default: () => ({}),
  },
  params: {
    type: Object as PropType<SpriteMaterialParameters>,
  },
}
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
