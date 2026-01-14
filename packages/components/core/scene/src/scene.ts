import { eventEmits, eventProps } from '@farst-three/hooks'
import type { EventOptions } from '@farst-three/hooks'
import type { ThreeOptions } from '@farst-three/utils'
import type { Scene } from 'three'

import type { ExtractPropTypes, PropType } from 'vue'
import type SceneComponent from './scene.vue'

export const sceneEmits = {
  load: (e: SceneLoadEvent) => e,
  ...eventEmits,
}
export const sceneProps = {
  options: {
    type: Object as PropType<SceneOptions>,
    default: () => ({}),
  },
  eventOptions: {
    type: Object as PropType<EventOptions>,
    default: () => ({}),
  },
  ...eventProps,
}

export type SceneLoadEvent = {
  scene: Scene
}
export type SceneProps = ExtractPropTypes<typeof sceneProps>
export type SceneInstance = InstanceType<typeof SceneComponent>
export type SceneOptions = ThreeOptions<Scene>
