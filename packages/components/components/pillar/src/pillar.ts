import type { ThreeOptions } from '@farst-three/utils'
import type { PillarOptions } from './use-pillar'
import type { Group, Scene } from 'three'
import type { ExtractPropTypes, PropType } from 'vue'
import type PillarComponent from './pillar.vue'

export const pillarProps = {
  options: {
    type: Object as PropType<PillarOptions>,
    default: () => ({}),
  },
  groupOptions: {
    type: Object as PropType<ThreeOptions<Group>>,
    default: () => ({}),
  },
}
export const pillarEmits = {
  load: (e: PillarLoadEvent) => e,
}

export type PillarLoadEvent = {
  scene: Scene
  group: Group
}
export type PillarEmits = typeof pillarEmits
export type PillarProps = ExtractPropTypes<typeof pillarProps>
export type PillarInstance = InstanceType<typeof PillarComponent>
