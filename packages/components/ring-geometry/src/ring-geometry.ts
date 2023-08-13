import { buildProps, definePropType } from '@farst-three/utils'
import type { Object3D, RingGeometry, Scene } from 'three'
import type { ExtractPropTypes } from 'vue'
import type { ThreeOptions } from '@farst-three/utils'
import type RingGeometryComponent from './ring-geometry.vue'

export const ringGeometryProps = buildProps({
  options: {
    type: definePropType<RingGeometryOptions>(Object),
    default: () => ({}),
  },
  innerRadius: Number,
  outerRadius: Number,
  thetaSegments: Number,
  phiSegments: Number,
  thetaStart: Number,
  thetaLength: Number,
})
export const ringGeometryEmits = {
  load: (e: RingGeometryLoadEvent) => e,
}

export type RingGeometryLoadEvent = {
  scene: Scene
  geometry: RingGeometry
  obj3d: Object3D
}
export type RingGeometryEmits = typeof ringGeometryEmits
export type RingGeometryProps = ExtractPropTypes<typeof ringGeometryProps>
export type RingGeometryInstance = InstanceType<typeof RingGeometryComponent>
export type RingGeometryOptions = ThreeOptions<RingGeometry>
