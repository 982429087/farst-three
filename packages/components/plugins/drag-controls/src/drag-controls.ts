import type { DragControls } from 'three/examples/jsm/controls/DragControls'
import type { Scene } from 'three'
import type { ExtractPropTypes, PropType } from 'vue'
import type { ThreeOptions } from '@farst-three/utils'
import type DragControlsComponent from './drag-controls.vue'

export const dragControlsProps = {
  options: {
    type: Object as PropType<DragControlsOptions>,
    default: () => ({}),
  },
}
export const dragControlsEmits = {
  load: (e: DragControlsLoadEvent) => e,
}

export type DragControlsLoadEvent = {
  scene: Scene
  dragControls: DragControls
}
export type DragControlsEmits = typeof dragControlsEmits
export type DragControlsProps = ExtractPropTypes<typeof dragControlsProps>
export type DragControlsInstance = InstanceType<typeof DragControlsComponent>
export type DragControlsOptions = ThreeOptions<DragControls>
