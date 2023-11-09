import { buildProps, definePropType } from '@farst-three/utils'
import type { MarkPoints } from './use-mark-point'
import type { Scene } from 'three'
import type { ExtractPropTypes } from 'vue'
import type MarkPointComponent from './mark-point.vue'

export const markPointProps = buildProps({
  points: {
    type: definePropType<MarkPoints[]>(Array),
    default: () => [],
  },
})
export const markPointEmits = {
  load: (e: MarkPointLoadEvent) => e,
}

export type MarkPointLoadEvent = {
  scene: Scene
}
export type MarkPointEmits = typeof markPointEmits
export type MarkPointProps = ExtractPropTypes<typeof markPointProps>
export type MarkPointInstance = InstanceType<typeof MarkPointComponent>
