import { buildProps, definePropType } from '@farst-three/utils'
import type { ThreeOptions } from '@farst-three/utils'
import type { ColorRepresentation, DirectionalLight, Scene } from 'three'

import type { ExtractPropTypes } from 'vue'
import type DirectionalLightComponent from './directional-light.vue'

/**
 * color?: ColorRepresentation | undefined, intensity?: number | undefined
 */
export const directionalLightProps = buildProps({
  color: {
    type: definePropType<ColorRepresentation>([String, Number, Object]),
  },
  intensity: Number,
  options: {
    type: definePropType<DirectionalLightOptions>(Object),
    default: () => ({}),
  },
})
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
