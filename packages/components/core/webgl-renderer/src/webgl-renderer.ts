import { buildProps, definePropType } from '@farst-three/utils'
import type { ThreeOptions } from '@farst-three/utils'
import type {
  Camera,
  Scene,
  WebGLRenderer,
  WebGLRendererParameters,
} from 'three'

import type { ExtractPropTypes } from 'vue'
import type WebglRendererComponent from './webgl-renderer.vue'

export const webGLRendererProps = buildProps({
  animationFn: {
    type: definePropType<(e: WebGLRendererLoadEvent) => any>(Function),
  },
  params: {
    type: definePropType<WebGLRendererParameters>(Object),
    default: () => ({
      antialias: true,
      logarithmicDepthBuffer: true, // 就是两个面间距比较小的时候，让threejs更容易区分两个面，谁在前，谁在后
    }),
  },
  scissor: {
    type: Boolean,
    default: false,
  },
  scissorClearColor: {
    type: String,
    default: '#999999',
  },
  scissorClearColorAlpha: {
    type: Number,
    default: 1,
  },
  options: {
    type: definePropType<WebglRendererOptions>(Object),
    default: () => ({
      shadowMap: {
        enabled: true,
      },
    }),
  },
})
export const webglRendererEmits = {
  load: (e: WebGLRendererLoadEvent) => e,
}
export type WebGLRendererLoadEvent = {
  renderer: WebGLRenderer
  scene: Scene
  camera: Camera
}

export type WebGLRendererProps = ExtractPropTypes<typeof webGLRendererProps>
export type WebGLRendererInstance = InstanceType<typeof WebglRendererComponent>
export type WebglRendererEmits = typeof webglRendererEmits
export type WebglRendererOptions = ThreeOptions<WebGLRenderer>
