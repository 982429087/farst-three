import type { ThreeOptions } from '@farst-three/utils'
import type { ColorRepresentation, DirectionalLight, Scene } from 'three'

import type { ExtractPropTypes, PropType } from 'vue'
import type DirectionalLightComponent from './directional-light.vue'

/**
 * color?: ColorRepresentation | undefined, intensity?: number | undefined
 */
export const directionalLightProps = {
  color: {
    type: [String, Number, Object] as PropType<ColorRepresentation>,
  },
  intensity: Number,
  options: {
    type: Object as PropType<DirectionalLightOptions>,
    default: () => ({}),
  },
}
export const directionalLightEmits = {
  load: (e: DirectionalLightLoadEvent) => e,
}

export type DirectionalLightLoadEvent = {
  scene: Scene
  light: DirectionalLight
}
export type DirectionalLightEmits = typeof directionalLightEmits
export type DirectionalLightProps = ExtractPropTypes<
  typeof directionalLightProps
>
export type DirectionalLightInstance = InstanceType<
  typeof DirectionalLightComponent
>
export type DirectionalLightOptions = ThreeOptions<DirectionalLight>
