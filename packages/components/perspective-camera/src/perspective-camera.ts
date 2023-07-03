import { buildProps } from '@farst-three/utils'
import type { PerspectiveCamera, Scene } from 'three'

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
  isRenderCamera: {
    type: Boolean,
    default: false,
  },
})
export const perspectiveCameraEmits = {
  load: (e: PerspectiveCameraLoadEvent) => e,
}

export type PerspectiveCameraLoadEvent = {
  camera: PerspectiveCamera
  scene: Scene
}
export type PerspectiveCameraProps = ExtractPropTypes<
  typeof perspectiveCameraProps
>
export type PerspectiveCameraInstance = InstanceType<
  typeof PerspectiveCameraComponent
>
export type PerspectiveCameraEmits = typeof perspectiveCameraEmits
