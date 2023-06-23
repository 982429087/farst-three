import { withInstall } from '@farst-three/utils'
import WebGLRenderer from './src/webgl-renderer.vue'

export const FtWebGLRenderer = withInstall(WebGLRenderer)
export default FtWebGLRenderer

export * from './src/webgl-renderer'
