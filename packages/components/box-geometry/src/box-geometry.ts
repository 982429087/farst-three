import { buildProps } from '@farst-three/utils'
import type { BoxGeometry, Mesh, Scene } from 'three'
import type { ExtractPropTypes } from 'vue'
import type BoxGeometryComponent from './box-geometry.vue'

export const boxGeometryProps = buildProps({
  width: Number,
  height: Number,
  depth: Number,
  widthSegments: Number,
  heightSegments: Number,
  depthSegments: Number,
})

export const boxGeometryEmits = {
  load: (e: BoxGeometryLoadEvent) => e,
}

export type BoxGeometryLoadEvent = {
  scene: Scene
  mesh: Mesh
  geometry: BoxGeometry
}
export type BoxGeometryProps = ExtractPropTypes<typeof boxGeometryProps>
export type BoxGeometryInstance = InstanceType<typeof BoxGeometryComponent>
export type BoxGeometryEmits = typeof boxGeometryEmits
