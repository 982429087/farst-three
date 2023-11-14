import { buildProps, definePropType } from '@farst-three/utils'
import type { EdgeMoveLineOptions } from './use-edge-move-line'
import type { Scene } from 'three'
import type { ExtractPropTypes } from 'vue'
import type EdgeMoveLineComponent from './edge-move-line.vue'

export const edgeMoveLineProps = buildProps({
  options: {
    type: definePropType<EdgeMoveLineOptions>(Object),
    default: () => ({}),
  },
})
export const edgeMoveLineEmits = {
  load: (e: EdgeMoveLineLoadEvent) => e,
}

export type EdgeMoveLineLoadEvent = {
  scene: Scene
}
export type EdgeMoveLineEmits = typeof edgeMoveLineEmits
export type EdgeMoveLineProps = ExtractPropTypes<typeof edgeMoveLineProps>
export type EdgeMoveLineInstance = InstanceType<typeof EdgeMoveLineComponent>
