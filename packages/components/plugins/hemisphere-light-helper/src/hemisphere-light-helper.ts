import type { ColorRepresentation, HemisphereLightHelper, Scene } from 'three'
import type { ExtractPropTypes, PropType } from 'vue'
import type { ThreeOptions } from '@farst-three/utils'
import type HemisphereLightHelperComponent from './hemisphere-light-helper.vue'

export const hemisphereLightHelperProps = {
  options: {
    type: Object as PropType<HemisphereLightHelperOptions>,
    default: () => ({}),
  },
  size: {
    type: Number,
    default: 1,
    required: true,
  },
  color: {
    type: [String, Number, Object] as PropType<ColorRepresentation>,
  },
}
export const hemisphereLightHelperEmits = {
  load: (e: HemisphereLightHelperLoadEvent) => e,
}

export type HemisphereLightHelperLoadEvent = {
  scene: Scene
  helper: HemisphereLightHelper
}
export type HemisphereLightHelperEmits = typeof hemisphereLightHelperEmits
export type HemisphereLightHelperProps = ExtractPropTypes<
  typeof hemisphereLightHelperProps
>
export type HemisphereLightHelperInstance = InstanceType<
  typeof HemisphereLightHelperComponent
>
export type HemisphereLightHelperOptions = ThreeOptions<HemisphereLightHelper>
