import { buildProps, definePropType } from '@farst-three/utils'
import type { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls'
import type { Scene } from 'three'
import type { ExtractPropTypes } from 'vue'
import type { ThreeOptions } from '@farst-three/utils'
import type PointerLockControlsComponent from './pointer-lock-controls.vue'

export const pointerLockControlsProps = buildProps({
  options: {
    type: definePropType<PointerLockControlsOptions>(Object),
    default: () => ({}),
  },
})
export const pointerLockControlsEmits = {
  load: (e: PointerLockControlsLoadEvent) => e,
}

export type PointerLockControlsLoadEvent = {
  scene: Scene
  pointerLockControls: PointerLockControls
}
export type PointerLockControlsEmits = typeof pointerLockControlsEmits
export type PointerLockControlsProps = ExtractPropTypes<
  typeof pointerLockControlsProps
>
export type PointerLockControlsInstance = InstanceType<
  typeof PointerLockControlsComponent
>
export type PointerLockControlsOptions = ThreeOptions<PointerLockControls>
