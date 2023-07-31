import { buildProps } from '@farst-three/utils'
import type { Object3D, Scene, SphereGeometry } from 'three'

import type { ExtractPropTypes } from 'vue'
import type SphereGeometryComponent from './sphere-geometry.vue'

/**
 * radius?: number | undefined, widthSegments?: number | undefined, heightSegments?: number | undefined, phiStart?: number | undefined, phiLength?: number | undefined, thetaStart?: number | undefined, thetaLength?: number | undefined
 */
export const sphereGeometryProps = buildProps({
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
