import type { Object3D, Scene, TorusGeometry } from 'three'
import type { ExtractPropTypes, PropType } from 'vue'
import type { ThreeOptions } from '@farst-three/utils'
import type TorusGeometryComponent from './torus-geometry.vue'

export const torusGeometryProps = {
  radius: Number,
  tube: Number,
  radialSegments: Number,
  tubularSegments: Number,
  arc: Number,
  options: {
    type: Object as PropType<ThreeOptions<TorusGeometry>>,
    default: () => ({}),
  },
}
export const torusGeometryEmits = {
  load: (e: TorusGeometryLoadEvent) => e,
}

export type TorusGeometryLoadEvent = {
  scene: Scene
  geometry: TorusGeometry
  obj3d: Object3D
}
export type TorusGeometryEmits = typeof torusGeometryEmits
export type TorusGeometryProps = ExtractPropTypes<typeof torusGeometryProps>
export type TorusGeometryInstance = InstanceType<typeof TorusGeometryComponent>
export type TorusGeometryOptions = ThreeOptions<TorusGeometry>
