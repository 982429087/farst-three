import { Color } from 'three'
import type { ColorRepresentation, FogExp2, Scene } from 'three'
import type { ExtractPropTypes, PropType } from 'vue'
import type { ThreeOptions } from '@farst-three/utils'
import type FogExp2Component from './fog-exp2.vue'

export const fogExp2Props = {
  options: {
    type: Object as PropType<FogExp2Options>,
    default: () => ({}),
  },
  color: {
    type: [String, Number, Object] as PropType<ColorRepresentation>,
    default: new Color(),
    required: true,
  },
  density: {
    type: Number,
  },
}
export const fogExp2Emits = {
  load: (e: FogExp2LoadEvent) => e,
}

export type FogExp2LoadEvent = {
  scene: Scene
  fog: FogExp2
}
export type FogExp2Emits = typeof fogExp2Emits
export type FogExp2Props = ExtractPropTypes<typeof fogExp2Props>
export type FogExp2Instance = InstanceType<typeof FogExp2Component>
export type FogExp2Options = ThreeOptions<FogExp2>
