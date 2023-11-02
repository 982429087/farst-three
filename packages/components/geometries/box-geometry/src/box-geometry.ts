import { buildProps, definePropType } from '@farst-three/utils'
import type { ThreeOptions } from '@farst-three/utils'
import type { BoxGeometry, Object3D, Scene } from 'three'
import type { ExtractPropTypes } from 'vue'
import type BoxGeometryComponent from './box-geometry.vue'

export const boxGeometryProps = buildProps({
  width: Number,
  height: Number,
  depth: Number,
  widthSegments: Number,
  heightSegments: Number,
  depthSegments: Number,
  options: {
    type: definePropType<BoxGeometryOptions>(Object),
    default: () => ({}),
  },
})

export const boxGeometryEmits = {
  load: (e: BoxGeometryLoadEvent) => e,
}

export type BoxGeometryLoadEvent = {
  scene: Scene
  obj3d: Object3D
  geometry: BoxGeometry
}
export type BoxGeometryProps = ExtractPropTypes<typeof boxGeometryProps>
export type BoxGeometryInstance = InstanceType<typeof BoxGeometryComponent>
export type BoxGeometryEmits = typeof boxGeometryEmits
export type BoxGeometryOptions = ThreeOptions<BoxGeometry>
