import { buildProps } from '@farst-three/utils'
import type { BoxGeometry } from 'three'
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
  load: (geometry: BoxGeometry) => geometry,
}

export type BoxGeometryProps = ExtractPropTypes<typeof boxGeometryProps>
export type BoxGeometryInstance = InstanceType<typeof BoxGeometryComponent>
export type BoxGeometryEmits = typeof boxGeometryEmits
