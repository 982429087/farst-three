import { Color } from 'three'
import { buildProps, definePropType } from '@farst-three/utils'
import type { ColorRepresentation, Fog, Scene } from 'three'
import type { ExtractPropTypes } from 'vue'
import type { ThreeOptions } from '@farst-three/utils'
import type FogComponent from './fog.vue'

export const fogProps = buildProps({
  options: {
    type: definePropType<FogOptions>(Object),
    default: () => ({}),
  },
  color: {
    type: definePropType<ColorRepresentation>([Number, String, Object]),
    default: new Color(),
    required: true,
  },
  near: Number,
  far: Number,
})
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
