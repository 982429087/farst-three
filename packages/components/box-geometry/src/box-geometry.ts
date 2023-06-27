import { buildProps } from '@farst-three/utils'

import type { ExtractPropTypes } from 'vue'
import type BoxGeometry from './box-geometry.vue'

export const boxGeometryProps = buildProps({})

export type BoxGeometryProps = ExtractPropTypes<typeof boxGeometryProps>
export type BoxGeometryInstance = InstanceType<typeof BoxGeometry>
