import type { Curve, Object3D, Scene, TubeGeometry, Vector3 } from 'three'

import type { ExtractPropTypes, PropType } from 'vue'
import type TubeGeometryComponent from './tube-geometry.vue'

export const tubeGeometryProps = {
  path: {
    type: Object as PropType<Curve<Vector3>>,
  },
  tubularSegments: Number,
  radius: Number,
  radialSegments: Number,
  closed: Boolean,
}
export const tubeGeometryEmits = {
  load: (e: TubeGeometryLoadEvents) => e,
}

export type TubeGeometryLoadEvents = {
  scene: Scene
  obj3d: Object3D
  geometry: TubeGeometry
}
export type TubeGeometryEmits = typeof tubeGeometryEmits
export type TubeGeometryProps = ExtractPropTypes<typeof tubeGeometryProps>
export type TubeGeometryInstance = InstanceType<typeof TubeGeometryComponent>
