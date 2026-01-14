import type { Outline, OutlineOptions } from '@farst-three/hooks'
import type { Object3D, Scene } from 'three'
import type { ExtractPropTypes, PropType } from 'vue'
import type OutlineComponent from './outline.vue'

export const outlineProps = {
  options: {
    type: Object as PropType<OutlineOptions>,
    default: () => ({}),
  },
  selected: {
    type: Object as PropType<Object3D[]>,
    default: () => [],
  },
}
export const outlineEmits = {
  load: (e: OutlineLoadEvent) => e,
}

export type OutlineLoadEvent = {
  scene: Scene
  outline: Outline
}
export type OutlineEmits = typeof outlineEmits
export type OutlineProps = ExtractPropTypes<typeof outlineProps>
export type OutlineInstance = InstanceType<typeof OutlineComponent>
