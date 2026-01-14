import type { HighLight, HighLightOptions } from '@farst-three/hooks'
import type { Scene } from 'three'
import type { ExtractPropTypes, PropType } from 'vue'
import type HighLightComponent from './high-light.vue'

export const highLightProps = {
  options: {
    type: Object as PropType<HighLightOptions>,
    default: () => ({}),
  },
}
export const highLightEmits = {
  load: (e: HighLightLoadEvent) => e,
}

export type HighLightLoadEvent = {
  scene: Scene
  highLight: HighLight
}
export type HighLightEmits = typeof highLightEmits
export type HighLightProps = ExtractPropTypes<typeof highLightProps>
export type HighLightInstance = InstanceType<typeof HighLightComponent>
