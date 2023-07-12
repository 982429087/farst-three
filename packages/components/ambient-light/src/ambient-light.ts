import { buildProps, definePropType } from '@farst-three/utils'
import type { AmbientLight, ColorRepresentation, Scene } from 'three'

import type { ExtractPropTypes } from 'vue'
import type AmbientLightComponent from './ambient-light.vue'

export const ambientLightProps = buildProps({
  color: {
    type: definePropType<ColorRepresentation>([Object, String, Number]),
  },
  intensity: Number,
})
export const ambientLightEmits = {
  load: (e: AmbientLightLoadEvent) => e,
}

export type AmbientLightLoadEvent = {
  secne: Scene
  light: AmbientLight
}
export type AmbientLightEmits = typeof ambientLightEmits
export type AmbientLightProps = ExtractPropTypes<typeof ambientLightProps>
export type AmbientLightInstance = InstanceType<typeof AmbientLightComponent>
