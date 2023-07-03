import { buildProps } from '@farst-three/utils'
import type { Camera, CameraHelper, Scene } from 'three'

import type { ExtractPropTypes } from 'vue'
import type CameraHelperComponent from './camera-helper.vue'

export const cameraHelperProps = buildProps({
  modelValue: Object,
})
export const cameraHelperEmits = {
  load: (e: CameraHelperLoadEvent) => e,
}

export type CameraHelperLoadEvent = {
  helper: CameraHelper
  scene: Scene
  camera: Camera
}
export type CameraHelperEmits = typeof cameraHelperEmits
export type CameraHelperProps = ExtractPropTypes<typeof cameraHelperProps>
export type CameraHelperInstance = InstanceType<typeof CameraHelperComponent>
