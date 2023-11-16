import { buildProps, definePropType } from '@farst-three/utils'
import type { HighLightOptions } from './HighLight'
import type { Scene } from 'three'
import type { ExtractPropTypes } from 'vue'
import type HighLightComponent from './high-light.vue'

export const highLightProps = buildProps({
  options: {
    type: definePropType<HighLightOptions>(Object),
    default: () => ({}),
  },
})
export const highLightEmits = {
  load: (e: HighLightLoadEvent) => e,
}

export type HighLightLoadEvent = {
  scene: Scene
}
export type HighLightEmits = typeof highLightEmits
export type HighLightProps = ExtractPropTypes<typeof highLightProps>
export type HighLightInstance = InstanceType<typeof HighLightComponent>
