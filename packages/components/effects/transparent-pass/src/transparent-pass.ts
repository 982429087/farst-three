import { buildProps } from '@farst-three/utils'
import type { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import type { Scene } from 'three'
import type { ExtractPropTypes } from 'vue'
import type TransparentPassComponent from './transparent-pass.vue'

export const transparentPassProps = buildProps({
  value: {
    type: Boolean,
    default: true,
  },
})
export const transparentPassEmits = {
  load: (e: TransparentPassLoadEvent) => e,
}

export type TransparentPassLoadEvent = {
  scene: Scene
  finalPass: ShaderPass
}
export type TransparentPassEmits = typeof transparentPassEmits
export type TransparentPassProps = ExtractPropTypes<typeof transparentPassProps>
export type TransparentPassInstance = InstanceType<
  typeof TransparentPassComponent
>
