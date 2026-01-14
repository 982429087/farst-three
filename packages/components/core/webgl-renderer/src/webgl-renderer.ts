import type { ThreeOptions } from '@farst-three/utils'
import type {
  Camera,
  Scene,
  WebGLRenderer,
  WebGLRendererParameters,
} from 'three'

import type { ExtractPropTypes, PropType } from 'vue'
import type WebglRendererComponent from './webgl-renderer.vue'

export const webGLRendererProps = {
  animationFn: {
    type: Function as PropType<(e: WebGLRendererLoadEvent) => any>,
  },
  params: {
    type: Object as PropType<WebGLRendererParameters>,
    default: () => ({
      antialias: true,
      logarithmicDepthBuffer: true, // 就是两个面间距比较小的时候，让threejs更容易区分两个面，谁在前，谁在后
    }),
  },
  options: {
    type: Object as PropType<WebglRendererOptions>,
    default: () => ({
      shadowMap: {
        enabled: true,
      },
    }),
  },
}
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
