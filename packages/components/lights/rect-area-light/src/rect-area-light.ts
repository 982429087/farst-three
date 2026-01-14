import type { ColorRepresentation, RectAreaLight, Scene } from 'three'
import type { ExtractPropTypes, PropType } from 'vue'
import type { ThreeOptions } from '@farst-three/utils'
import type RectAreaLightComponent from './rect-area-light.vue'

export const rectAreaLightProps = {
  options: {
    type: Object as PropType<RectAreaLightOptions>,
    default: () => ({}),
  },
  color: {
    type: [String, Number, Object] as PropType<ColorRepresentation>,
  },
  intensity: Number,
  width: Number,
  height: Number,
  uniforms: {
    type: Boolean,
    default: false,
  },
}
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
