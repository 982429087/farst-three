import { buildProps, definePropType } from '@farst-three/utils'
import type {
  TextGeometry,
  TextGeometryParameters,
} from 'three/examples/jsm/geometries/TextGeometry'
import type { Object3D, Scene } from 'three'
import type { ExtractPropTypes } from 'vue'
import type { ThreeOptions } from '@farst-three/utils'
import type TextGeometryComponent from './text-geometry.vue'

export const textGeometryProps = buildProps({
  options: {
    type: definePropType<TextGeometryOptions>(Object),
    default: () => ({}),
  },
  text: {
    type: definePropType<string>(String),
    default: 'text',
    required: true as const,
  },
  params: {
    type: definePropType<Omit<TextGeometryParameters, 'font'>>(Object),
  },
  url: {
    type: definePropType<string>(String),
    required: true as const,
  },
  center: {
    type: Boolean,
  },
})
export const textGeometryEmits = {
  load: (e: TextGeometryLoadEvent) => e,
}

export type TextGeometryLoadEvent = {
  scene: Scene
  geometry: TextGeometry
  obj3d: Object3D
}
export type TextGeometryEmits = typeof textGeometryEmits
export type TextGeometryProps = ExtractPropTypes<typeof textGeometryProps>
export type TextGeometryInstance = InstanceType<typeof TextGeometryComponent>
export type TextGeometryOptions = ThreeOptions<TextGeometry>
