import { buildProps, definePropType } from '@farst-three/utils'
import type { ThreeOptions } from '@farst-three/utils'
import type { PillarOptions } from './use-pillar'
import type { Group, Scene } from 'three'
import type { ExtractPropTypes } from 'vue'
import type PillarComponent from './pillar.vue'

export const pillarProps = buildProps({
  options: {
    type: definePropType<PillarOptions>(Object),
    default: () => ({}),
  },
  groupOptions: {
    type: definePropType<ThreeOptions<Group>>(Object),
    default: () => ({}),
  },
})
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
