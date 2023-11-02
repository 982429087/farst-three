import { buildProps, definePropType } from '@farst-three/utils'
import type {
  HalftonePass,
  HalftonePassParameters,
} from 'three/examples/jsm/postprocessing/HalftonePass'
import type { Scene } from 'three'
import type { ExtractPropTypes } from 'vue'
import type { ThreeOptions } from '@farst-three/utils'
import type HalftonePassComponent from './halftone-pass.vue'

export const halftonePassProps = buildProps({
  params: {
    type: definePropType<HalftonePassParameters>(Object),
    default: () => ({}),
  },
})
export const halftonePassEmits = {
  load: (e: HalftonePassLoadEvent) => e,
}

export type HalftonePassLoadEvent = {
  scene: Scene
  pass: HalftonePass
}
export type HalftonePassEmits = typeof halftonePassEmits
export type HalftonePassProps = ExtractPropTypes<typeof halftonePassProps>
export type HalftonePassInstance = InstanceType<typeof HalftonePassComponent>
export type HalftonePassOptions = ThreeOptions<HalftonePass>
