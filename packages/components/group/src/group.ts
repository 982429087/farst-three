import { buildProps } from '@farst-three/utils'
import type { Group, Scene } from 'three'

import type { ExtractPropTypes } from 'vue'
import type GroupComponent from './group.vue'

export const groupProps = buildProps({
  e: String,
})
export const groupEmits = {
  load: (e: GroupLoadEvent) => e,
}

export type GroupLoadEvent = {
  scene: Scene
  group: Group
}
export type GroupEmits = typeof groupEmits
export type GroupProps = ExtractPropTypes<typeof groupProps>
export type GroupInstance = InstanceType<typeof GroupComponent>
