import { buildProps, definePropType } from '@farst-three/utils'
import type { ColorRepresentation, PointLightHelper, Scene } from 'three'
import type { ExtractPropTypes } from 'vue'
import type { ThreeOptions } from '@farst-three/utils'
import type PointLightHelperComponent from './point-light-helper.vue'

/**
 * sphereSize?: number | undefined, color?: ColorRepresentation | undefined
 */
export const pointLightHelperProps = buildProps({
  options: {
    type: definePropType<PointLightHelperOptions>(Object),
    default: () => ({}),
  },
  sphereSize: Number,
  color: {
    type: definePropType<ColorRepresentation>([String, Number, Object]),
  },
})
export const pointLightHelperEmits = {
  load: (e: PointLightHelperLoadEvent) => e,
}

export type PointLightHelperLoadEvent = {
  scene: Scene
  helper: PointLightHelper
}
export type PointLightHelperEmits = typeof pointLightHelperEmits
export type PointLightHelperProps = ExtractPropTypes<
  typeof pointLightHelperProps
>
export type PointLightHelperInstance = InstanceType<
  typeof PointLightHelperComponent
>
export type PointLightHelperOptions = ThreeOptions<PointLightHelper>
