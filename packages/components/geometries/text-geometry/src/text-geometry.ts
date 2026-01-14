import type {
  TextGeometry,
  TextGeometryParameters,
} from 'three/examples/jsm/geometries/TextGeometry'
import type { Object3D, Scene } from 'three'
import type { ExtractPropTypes, PropType } from 'vue'
import type { ThreeOptions } from '@farst-three/utils'
import type TextGeometryComponent from './text-geometry.vue'

export const textGeometryProps = {
  options: {
    type: Object as PropType<TextGeometryOptions>,
    default: () => ({}),
  },
  text: {
    type: String as PropType<string>,
    default: 'text',
    required: true as const,
  },
  params: {
    type: Object as PropType<Omit<TextGeometryParameters, 'font'>>,
  },
  url: {
    type: String as PropType<string>,
    required: true as const,
  },
  center: {
    type: Boolean,
  },
}
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
