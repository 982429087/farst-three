import { buildProps } from '@farst-three/utils'
import type { OrthographicCamera, Scene } from 'three'

import type { ExtractPropTypes } from 'vue'
import type OrthographicCameraComponent from './orthographic-camera.vue'

export const orthographicCameraProps = buildProps({
  left: Number,
  right: Number,
  top: Number,
  bottom: Number,
  near: Number,
  far: Number,
  isRenderCamera: {
    type: Boolean,
    default: true,
  },
  autoAddToScene: {
    type: Boolean,
    default: true,
  },
})
export const orthographicCameraEmits = {
  load: (e: OrthographicCameraLoadEvent) => e,
}

export type OrthographicCameraLoadEvent = {
  camera: OrthographicCamera
  scene: Scene
}

export type OrthographicCameraProps = ExtractPropTypes<
  typeof orthographicCameraProps
>
export type OrthographicCameraInstance = InstanceType<
  typeof OrthographicCameraComponent
>
export type OrthographicCameraEmits = typeof orthographicCameraEmits
