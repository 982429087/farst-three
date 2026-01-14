import type { ThreeOptions } from '@farst-three/utils'
import type { Group, Scene } from 'three'

import type { ExtractPropTypes, PropType } from 'vue'
import type GroupComponent from './group.vue'

export const groupProps = {
  options: {
    type: Object as PropType<GroupOptions>,
    default: () => ({}),
  },
}
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
export type GroupOptions = ThreeOptions<Group>
