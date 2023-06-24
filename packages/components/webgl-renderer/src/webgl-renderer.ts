import { buildProps } from '@farst-three/utils'
import type { WebGLRenderer } from 'three'

import type { ExtractPropTypes } from 'vue'
import type WebglRendererComponent from './webgl-renderer.vue'

export const webGLRendererProps = buildProps({})

export type WebGLRendererProps = ExtractPropTypes<typeof webGLRendererProps>
export type WebGLRendererInstance = InstanceType<typeof WebglRendererComponent>

export const webglRendererEmits = {
  load: (renderer: WebGLRenderer) => renderer,
}

export type WebglRendererEmits = typeof webglRendererEmits
