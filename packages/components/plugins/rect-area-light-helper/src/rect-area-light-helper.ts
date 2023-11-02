import { buildProps, definePropType } from '@farst-three/utils'
import type { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper'
import type { ColorRepresentation, Scene } from 'three'
import type { ExtractPropTypes } from 'vue'
import type { ThreeOptions } from '@farst-three/utils'
import type RectAreaLightHelperComponent from './rect-area-light-helper.vue'

export const rectAreaLightHelperProps = buildProps({
  options: {
    type: definePropType<RectAreaLightHelperOptions>(Object),
    default: () => ({}),
  },
  color: {
    type: definePropType<ColorRepresentation>([String, Number, Object]),
  },
})
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
