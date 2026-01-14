import type {
  ColorRepresentation,
  Scene,
  SpotLight,
  SpotLightHelper,
} from 'three'
import type { ExtractPropTypes, PropType } from 'vue'
import type { ThreeOptions } from '@farst-three/utils'
import type SpotLightHelperComponent from './spot-light-helper.vue'

export const spotLightHelperProps = {
  options: {
    type: Object as PropType<SpotLightHelperOptions>,
    default: () => ({}),
  },
  color: {
    type: [String, Number, Object] as PropType<ColorRepresentation>,
  },
}
export const spotLightHelperEmits = {
  load: (e: SpotLightHelperLoadEvent) => e,
}

export type SpotLightHelperLoadEvent = {
  scene: Scene
  light: SpotLight
  helper: SpotLightHelper
}
export type SpotLightHelperEmits = typeof spotLightHelperEmits
export type SpotLightHelperProps = ExtractPropTypes<typeof spotLightHelperProps>
export type SpotLightHelperInstance = InstanceType<
  typeof SpotLightHelperComponent
>
export type SpotLightHelperOptions = ThreeOptions<SpotLightHelper>
