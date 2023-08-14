import { buildProps, definePropType } from '@farst-three/utils'
import type { ThreeOptions } from '@farst-three/utils'
import type { Object3D, Scene, SphereGeometry } from 'three'

import type { ExtractPropTypes } from 'vue'
import type SphereGeometryComponent from './sphere-geometry.vue'

export const sphereGeometryProps = buildProps({
  options: {
    type: definePropType<SphereGeometryOptions>(Object),
    default: () => ({}),
  },
  radius: Number,
  widthSegments: Number,
  heightSegments: Number,
  phiStart: Number,
  phiLength: Number,
  thetaStart: Number,
  thetaLength: Number,
})
export const sphereGeometryEmits = {
  load: (e: SphereGeometryLoadEvents) => e,
}

export type SphereGeometryLoadEvents = {
  scene: Scene
  obj3d: Object3D
  geometry: SphereGeometry
}
export type SphereGeometryEmits = typeof sphereGeometryEmits
export type SphereGeometryProps = ExtractPropTypes<typeof sphereGeometryProps>
export type SphereGeometryInstance = InstanceType<
  typeof SphereGeometryComponent
>
export type SphereGeometryOptions = ThreeOptions<SphereGeometry>
