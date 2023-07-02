import { buildProps } from '@farst-three/utils'
import type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import type { ExtractPropTypes } from 'vue'
import type OrbitControlsComponent from './orbit-controls.vue'
import type { Camera, Renderer } from 'three'

export const orbitControlsProps = buildProps({})
export const orbitControlsEmits = {
  load: (e: OrbitControlsLoadEvent) => e,
}

export type OrbitControlsEmits = typeof orbitControlsEmits
export type OrbitControlsProps = ExtractPropTypes<typeof orbitControlsProps>
export type OrbitControlsInstance = InstanceType<typeof OrbitControlsComponent>
export type OrbitControlsLoadEvent = {
  controls: OrbitControls
  camera: Camera
  renderer: Renderer
}
