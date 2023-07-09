import { withInstall } from '@farst-three/utils'
import WebglRenderer from './src/webgl-renderer.vue'

export const FtWebglRenderer = withInstall(WebglRenderer)
export default FtWebglRenderer

export * from './src/webgl-renderer'
export * from './src/AnimationService'
