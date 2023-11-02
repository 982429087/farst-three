import { buildProps, definePropType } from '@farst-three/utils'
import type { ColorRepresentation, DirectionalLightHelper, Scene } from 'three'
import type { ExtractPropTypes } from 'vue'
import type { ThreeOptions } from '@farst-three/utils'
import type DirectionalLightHelperComponent from './directional-light-helper.vue'

export const directionalLightHelperProps = buildProps({
  options: {
    type: definePropType<DirectionalLightHelperOptions>(Object),
    default: () => ({}),
  },
  size: Number,
  color: {
    type: definePropType<ColorRepresentation>([String, Number, Object]),
  },
})
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
