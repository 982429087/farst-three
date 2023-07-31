import { buildProps, definePropType } from '@farst-three/utils'
import type { ThreeOptions } from '@farst-three/utils'
import type { CylinderGeometry, Mesh, Object3D, Scene } from 'three'
import type { ExtractPropTypes } from 'vue'
import type CylinderGeometryComponent from './cylinder-geometry.vue'

export const cylinderGeometryProps = buildProps({
  radiusTop: Number,
  radiusBottom: Number,
  height: Number,
  radialSegments: Number,
  heightSegments: Number,
  openEnded: Boolean,
  thetaStart: Number,
  thetaLength: Number,
  options: {
    type: definePropType<ThreeOptions<CylinderGeometry>>(Object),
    default: () => ({}),
  },
})
export const cylinderGeometryEmits = {
  load: (e: CylinderGeometryLoadEvent) => e,
}

export type CylinderGeometryLoadEvent = {
  scene: Scene
  geometry: CylinderGeometry
  obj3d: Object3D
}
export type CylinderGeometryEmits = typeof cylinderGeometryEmits
export type CylinderGeometryProps = ExtractPropTypes<
  typeof cylinderGeometryProps
>
export type CylinderGeometryInstance = InstanceType<
  typeof CylinderGeometryComponent
>
export type CylinderGeometryOptions = ThreeOptions<CylinderGeometry>
