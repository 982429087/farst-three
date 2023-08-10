import { buildProps, definePropType } from '@farst-three/utils'
import type { ColorRepresentation, Scene, SpotLight } from 'three'
import type { ExtractPropTypes } from 'vue'
import type { ThreeOptions } from '@farst-three/utils'
import type SpotLightComponent from './spot-light.vue'

export const spotLightProps = buildProps({
  options: {
    type: definePropType<SpotLightOptions>(Object),
    default: () => ({}),
  },
  color: {
    type: definePropType<ColorRepresentation>([String, Number, Object]),
  },
  intensity: Number,
  distance: Number,
  angle: Number,
  penumbra: Number,
  decay: Number,
})
export const spotLightEmits = {
  load: (e: SpotLightLoadEvent) => e,
}

export type SpotLightLoadEvent = {
  scene: Scene
  light: SpotLight
}
export type SpotLightEmits = typeof spotLightEmits
export type SpotLightProps = ExtractPropTypes<typeof spotLightProps>
export type SpotLightInstance = InstanceType<typeof SpotLightComponent>
export type SpotLightOptions = ThreeOptions<SpotLight>
