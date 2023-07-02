import { buildProps, definePropType } from '@farst-three/utils'
import type { ColorRepresentation } from 'three'
import type { ExtractPropTypes } from 'vue'
import type GridHelper from './grid-helper.vue'

export const gridHelperProps = buildProps({
  size: Number,
  divisions: Number,
  color1: {
    type: definePropType<ColorRepresentation>([String, Number, Object]),
  },
  color2: {
    type: definePropType<ColorRepresentation>([String, Number, Object]),
  },
})

export type GridHelperProps = ExtractPropTypes<typeof gridHelperProps>
export type GridHelperInstance = InstanceType<typeof GridHelper>
