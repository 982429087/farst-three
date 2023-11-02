import { buildProps, definePropType } from '@farst-three/utils'
import type { ThreeOptions } from '@farst-three/utils'
import type { Object3D, PlaneGeometry, Scene } from 'three'

import type { ExtractPropTypes } from 'vue'
import type PlaneGeometryComponent from './plane-geometry.vue'

export const planeGeometryProps = buildProps({
  width: Number,
  height: Number,
  widthSegments: Number,
  heightSegments: Number,
  options: {
    type: definePropType<PlaneGeometryOptions>(Object),
    default: () => ({}),
  },
})
export const planeGeometryEmits = {
  load: (e: PlaneGeometryLoadEvent) => e,
}

export type PlaneGeometryLoadEvent = {
  geometry: PlaneGeometry
  obj3d: Object3D
  scene: Scene
}
export type PlaneGeometryEmits = typeof planeGeometryEmits
export type PlaneGeometryProps = ExtractPropTypes<typeof planeGeometryProps>
export type PlaneGeometryInstance = InstanceType<typeof PlaneGeometryComponent>
export type PlaneGeometryOptions = ThreeOptions<PlaneGeometry>
