import { buildProps } from '@farst-three/utils'

import type { ExtractPropTypes } from 'vue'
import type WebGLRenderer from './webGL-renderer.vue'

export const webGLRendererProps = buildProps({})

export type WebGLRendererProps = ExtractPropTypes<typeof webGLRendererProps>
export type WebGLRendererInstance = InstanceType<typeof WebGLRenderer>
