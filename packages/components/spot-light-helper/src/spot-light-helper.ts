import { buildProps, definePropType } from '@farst-three/utils'
import type {
  ColorRepresentation,
  Scene,
  SpotLight,
  SpotLightHelper,
} from 'three'
import type { ExtractPropTypes } from 'vue'
import type { ThreeOptions } from '@farst-three/utils'
import type SpotLightHelperComponent from './spot-light-helper.vue'

export const spotLightHelperProps = buildProps({
  options: {
    type: definePropType<SpotLightHelperOptions>(Object),
    default: () => ({}),
  },
  color: {
    type: definePropType<ColorRepresentation>([String, Number, Object]),
  },
})
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
