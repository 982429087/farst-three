import type { ColorRepresentation } from 'three'
import type { ExtractPropTypes, PropType } from 'vue'
import type GridHelper from './grid-helper.vue'

export const gridHelperProps = {
  size: Number,
  divisions: Number,
  color1: {
    type: [String, Number, Object] as PropType<ColorRepresentation>,
  },
  color2: {
    type: [String, Number, Object] as PropType<ColorRepresentation>,
  },
}

export type GridHelperProps = ExtractPropTypes<typeof gridHelperProps>
export type GridHelperInstance = InstanceType<typeof GridHelper>
