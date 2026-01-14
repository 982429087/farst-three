import type { ColorRepresentation, DirectionalLightHelper, Scene } from 'three'
import type { ExtractPropTypes, PropType } from 'vue'
import type { ThreeOptions } from '@farst-three/utils'
import type DirectionalLightHelperComponent from './directional-light-helper.vue'

export const directionalLightHelperProps = {
  options: {
    type: Object as PropType<DirectionalLightHelperOptions>,
    default: () => ({}),
  },
  size: Number,
  color: {
    type: [String, Number, Object] as PropType<ColorRepresentation>,
  },
}
export const directionalLightHelperEmits = {
  load: (e: DirectionalLightHelperLoadEvent) => e,
}

export type DirectionalLightHelperLoadEvent = {
  scene: Scene
  helper: DirectionalLightHelper
}
export type DirectionalLightHelperEmits = typeof directionalLightHelperEmits
export type DirectionalLightHelperProps = ExtractPropTypes<
  typeof directionalLightHelperProps
>
export type DirectionalLightHelperInstance = InstanceType<
  typeof DirectionalLightHelperComponent
>
export type DirectionalLightHelperOptions = ThreeOptions<DirectionalLightHelper>
