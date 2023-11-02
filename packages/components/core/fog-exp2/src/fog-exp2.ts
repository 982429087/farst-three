import { Color } from 'three'
import { buildProps, definePropType } from '@farst-three/utils'
import type { ColorRepresentation, FogExp2, Scene } from 'three'
import type { ExtractPropTypes } from 'vue'
import type { ThreeOptions } from '@farst-three/utils'
import type FogExp2Component from './fog-exp2.vue'

export const fogExp2Props = buildProps({
  options: {
    type: definePropType<FogExp2Options>(Object),
    default: () => ({}),
  },
  color: {
    type: definePropType<ColorRepresentation>([String, Number, Object]),
    default: new Color(),
    required: true,
  },
  density: {
    type: Number,
  },
})
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
