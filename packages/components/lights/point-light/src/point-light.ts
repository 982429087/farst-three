import { buildProps, definePropType } from '@farst-three/utils'
import type { ThreeOptions } from '@farst-three/utils'
import type { ColorRepresentation, PointLight, Scene } from 'three'

import type { ExtractPropTypes } from 'vue'
import type PointLightComponent from './point-light.vue'

export const pointLightProps = buildProps({
  color: {
    type: definePropType<ColorRepresentation>([String, Number, Object]),
  },
  intensity: Number,
  distance: Number,
  decay: Number,
  options: {
    type: definePropType<PointLightOptions>(Object),
    default: () => ({}),
  },
})
export const pointLightEmits = {
  load: (e: PointLightLoadEvent) => e,
}

export type PointLightLoadEvent = {
  scene: Scene
  light: PointLight
}
export type PointLightEmits = typeof pointLightEmits
export type PointLightProps = ExtractPropTypes<typeof pointLightProps>
export type PointLightInstance = InstanceType<typeof PointLightComponent>
export type PointLightOptions = ThreeOptions<PointLight>
