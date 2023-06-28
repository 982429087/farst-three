import { buildProps } from '@farst-three/utils'
import type { PerspectiveCamera } from 'three'

import type { ExtractPropTypes } from 'vue'
import type PerspectiveCameraComponent from './perspective-camera.vue'

export type PerspectiveCameraParams = ConstructorParameters<
  typeof PerspectiveCamera
>

export const perspectiveCameraProps = buildProps({
  fov: {
    type: Number,
  },
  aspect: {
    type: Number,
  },
  near: {
    type: Number,
  },
  far: {
    type: Number,
  },
})
export const perspectiveCameraEmits = {
  load: (camera: PerspectiveCamera) => camera,
}
export type PerspectiveCameraProps = ExtractPropTypes<
  typeof perspectiveCameraProps
>
export type PerspectiveCameraInstance = InstanceType<
  typeof PerspectiveCameraComponent
>
export type PerspectiveCameraEmits = typeof perspectiveCameraEmits
