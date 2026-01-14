import { eventEmits, eventProps } from '@farst-three/hooks'
import type { ThreeOptions } from '@farst-three/utils'
import type { EventOptions } from '@farst-three/hooks'
import type LiquidEffect from './liquid-effect'
import type {
  MeshPhysicalMaterial,
  MeshPhysicalMaterialParameters,
  Scene,
} from 'three'
import type { ExtractPropTypes, PropType } from 'vue'
import type LiquidComponent from './liquid-plane.vue'

export const liquidProps = {
  params: {
    type: Object as PropType<MeshPhysicalMaterialParameters>,
  },
  eventOptions: {
    type: Object as PropType<EventOptions>,
    default: () => ({}),
  },
  options: {
    type: Object as PropType<LiquidMaterialOptions>,
    default: () => ({}),
  },
  ...eventProps,
}
export const liquidEmits = {
  load: (e: LiquidLoadEvent) => e,
  ...eventEmits,
}

export type LiquidLoadEvent = {
  scene: Scene
  liquidEffect: LiquidEffect
}
export type LiquidEmits = typeof liquidEmits
export type LiquidProps = ExtractPropTypes<typeof liquidProps>
export type LiquidInstance = InstanceType<typeof LiquidComponent>
export type LiquidMaterialOptions = ThreeOptions<MeshPhysicalMaterial>
