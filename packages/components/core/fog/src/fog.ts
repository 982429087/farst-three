import { Color } from 'three'
import type { ColorRepresentation, Fog, Scene } from 'three'
import type { ExtractPropTypes, PropType } from 'vue'
import type { ThreeOptions } from '@farst-three/utils'
import type FogComponent from './fog.vue'

export const fogProps = {
  options: {
    type: Object as PropType<FogOptions>,
    default: () => ({}),
  },
  color: {
    type: [Number, String, Object] as PropType<ColorRepresentation>,
    default: new Color(),
    required: true,
  },
  near: Number,
  far: Number,
}
export const fogEmits = {
  load: (e: FogLoadEvent) => e,
}

export type FogLoadEvent = {
  scene: Scene
  fog: Fog
}
export type FogEmits = typeof fogEmits
export type FogProps = ExtractPropTypes<typeof fogProps>
export type FogInstance = InstanceType<typeof FogComponent>
export type FogOptions = ThreeOptions<Fog>
