import { buildProps } from '@farst-three/utils'

import type { ExtractPropTypes } from 'vue'
import type PerspectiveCameraComponent from './perspective-camera.vue'

export const perspectiveCameraProps = buildProps({})

export type PerspectiveCameraProps = ExtractPropTypes<
  typeof perspectiveCameraProps
>
export type PerspectiveCameraInstance = InstanceType<
  typeof PerspectiveCameraComponent
>
