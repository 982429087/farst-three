import { buildProps, definePropType } from '@farst-three/utils'
import { eventEmits, eventProps } from '@farst-three/hooks'
import type { EventOptions } from '@farst-three/hooks'
import type { ThreeOptions } from '@farst-three/utils'
import type { Scene } from 'three'

import type { ExtractPropTypes } from 'vue'
import type SceneComponent from './scene.vue'

export const sceneEmits = {
  load: (e: SceneLoadEvent) => e,
  ...eventEmits,
}
export const sceneProps = buildProps({
  options: {
    type: definePropType<SceneOptions>(Object),
    default: () => ({}),
  },
  eventOptions: {
    type: definePropType<EventOptions>(Object),
    default: () => ({}),
  },
  ...eventProps,
})

export type SceneLoadEvent = {
  scene: Scene
}
export type SceneProps = ExtractPropTypes<typeof sceneProps>
export type SceneInstance = InstanceType<typeof SceneComponent>
export type SceneOptions = ThreeOptions<Scene>
