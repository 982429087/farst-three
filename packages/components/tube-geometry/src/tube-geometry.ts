import { buildProps, definePropType } from '@farst-three/utils'
import type { Curve, Mesh, Scene, TubeGeometry, Vector3 } from 'three'

import type { ExtractPropTypes } from 'vue'
import type TubeGeometryComponent from './tube-geometry.vue'

export const tubeGeometryProps = buildProps({
  path: {
    type: definePropType<Curve<Vector3>>(Object),
  },
  tubularSegments: Number,
  radius: Number,
  radialSegments: Number,
  closed: Boolean,
})
export const tubeGeometryEmits = {
  load: (e: TubeGeometryLoadEvents) => e,
}

export type TubeGeometryLoadEvents = {
  scene: Scene
  mesh: Mesh
  geometry: TubeGeometry
}
export type TubeGeometryEmits = typeof tubeGeometryEmits
export type TubeGeometryProps = ExtractPropTypes<typeof tubeGeometryProps>
export type TubeGeometryInstance = InstanceType<typeof TubeGeometryComponent>
