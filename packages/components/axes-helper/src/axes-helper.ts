import { buildProps } from '@farst-three/utils'

import type { ExtractPropTypes } from 'vue'
import type AxesHelper from './axes-helper.vue'

export const axesHelperProps = buildProps({
  size: Number,
})

export type AxesHelperProps = ExtractPropTypes<typeof axesHelperProps>
export type AxesHelperInstance = InstanceType<typeof AxesHelper>
