import { buildProps } from '@farst-three/utils'

import type { ExtractPropTypes } from 'vue'
import type SceneComponent from './scene.vue'

export const sceneProps = buildProps({})

export type SceneProps = ExtractPropTypes<typeof sceneProps>
export type SceneInstance = InstanceType<typeof SceneComponent>
