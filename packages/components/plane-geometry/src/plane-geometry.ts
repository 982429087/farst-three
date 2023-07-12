import { buildProps } from '@farst-three/utils'
import type { Mesh, PlaneGeometry, Scene } from 'three'

import type { ExtractPropTypes } from 'vue'
import type PlaneGeometryComponent from './plane-geometry.vue'

export const planeGeometryProps = buildProps({
  width: Number,
  height: Number,
  widthSegments: Number,
  heightSegments: Number,
})
export const planeGeometryEmits = {
  load: (e: PlaneGeometryLoadEvent) => e,
}

export type PlaneGeometryLoadEvent = {
  geometry: PlaneGeometry
  mesh: Mesh
  scene: Scene
}
export type PlaneGeometryEmits = typeof planeGeometryEmits
export type PlaneGeometryProps = ExtractPropTypes<typeof planeGeometryProps>
export type PlaneGeometryInstance = InstanceType<typeof PlaneGeometryComponent>
