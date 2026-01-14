import type { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper'
import type { ColorRepresentation, Scene } from 'three'
import type { ExtractPropTypes, PropType } from 'vue'
import type { ThreeOptions } from '@farst-three/utils'
import type RectAreaLightHelperComponent from './rect-area-light-helper.vue'

export const rectAreaLightHelperProps = {
  options: {
    type: Object as PropType<RectAreaLightHelperOptions>,
    default: () => ({}),
  },
  color: {
    type: [String, Number, Object] as PropType<ColorRepresentation>,
  },
}
export const rectAreaLightHelperEmits = {
  load: (e: RectAreaLightHelperLoadEvent) => e,
}

export type RectAreaLightHelperLoadEvent = {
  scene: Scene
}
export type RectAreaLightHelperEmits = typeof rectAreaLightHelperEmits
export type RectAreaLightHelperProps = ExtractPropTypes<
  typeof rectAreaLightHelperProps
>
export type RectAreaLightHelperInstance = InstanceType<
  typeof RectAreaLightHelperComponent
>
export type RectAreaLightHelperOptions = ThreeOptions<RectAreaLightHelper>
