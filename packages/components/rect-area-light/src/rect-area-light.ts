import { buildProps, definePropType } from '@farst-three/utils'
import type { ColorRepresentation, RectAreaLight, Scene } from 'three'
import type { ExtractPropTypes } from 'vue'
import type { ThreeOptions } from '@farst-three/utils'
import type RectAreaLightComponent from './rect-area-light.vue'

export const rectAreaLightProps = buildProps({
  options: {
    type: definePropType<RectAreaLightOptions>(Object),
    default: () => ({}),
  },
  color: {
    type: definePropType<ColorRepresentation>([String, Number, Object]),
  },
  intensity: Number,
  width: Number,
  height: Number,
  uniforms: {
    type: Boolean,
    default: false,
  },
})
export const rectAreaLightEmits = {
  load: (e: RectAreaLightLoadEvent) => e,
}

export type RectAreaLightLoadEvent = {
  scene: Scene
  light: RectAreaLight
}
export type RectAreaLightEmits = typeof rectAreaLightEmits
export type RectAreaLightProps = ExtractPropTypes<typeof rectAreaLightProps>
export type RectAreaLightInstance = InstanceType<typeof RectAreaLightComponent>
export type RectAreaLightOptions = ThreeOptions<RectAreaLight>
