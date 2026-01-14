import type { ColorRepresentation, HemisphereLight, Scene } from 'three'
import type { ExtractPropTypes, PropType } from 'vue'
import type { ThreeOptions } from '@farst-three/utils'
import type HemisphereLightComponent from './hemisphere-light.vue'

/**
 * skyColor?: ColorRepresentation | undefined, groundColor?: ColorRepresentation | undefined, intensity?: number | undefined
 */
export const hemisphereLightProps = {
  options: {
    type: Object as PropType<HemisphereLightOptions>,
    default: () => ({}),
  },
  skyColor: {
    type: [String, Number, Object] as PropType<ColorRepresentation>,
  },
  groundColor: {
    type: [String, Number, Object] as PropType<ColorRepresentation>,
  },
  intensity: Number,
}
export const hemisphereLightEmits = {
  load: (e: HemisphereLightLoadEvent) => e,
}

export type HemisphereLightLoadEvent = {
  scene: Scene
  light: HemisphereLight
}
export type HemisphereLightEmits = typeof hemisphereLightEmits
export type HemisphereLightProps = ExtractPropTypes<typeof hemisphereLightProps>
export type HemisphereLightInstance = InstanceType<
  typeof HemisphereLightComponent
>
export type HemisphereLightOptions = ThreeOptions<HemisphereLight>
