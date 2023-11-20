import { buildProps, definePropType } from '@farst-three/utils'
import type { Outline, OutlineOptions } from '@farst-three/hooks'
import type { Object3D, Scene } from 'three'
import type { ExtractPropTypes } from 'vue'
import type OutlineComponent from './outline.vue'

export const outlineProps = buildProps({
  options: {
    type: definePropType<OutlineOptions>(Object),
    default: () => ({}),
  },
  selected: {
    type: definePropType<Object3D[]>(Object),
    default: () => [],
  },
})
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
