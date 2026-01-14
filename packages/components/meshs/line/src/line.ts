import type {
  BufferGeometry,
  Group,
  Line,
  Material,
  NormalBufferAttributes,
  Scene,
} from 'three'
import type { ExtractPropTypes, PropType } from 'vue'
import type { ThreeOptions } from '@farst-three/utils'
import type LineComponent from './line.vue'
/**
 * geometry?: BufferGeometry<NormalBufferAttributes> | undefined, material?: Material | ... 1 more ... | undefined
 */
export const lineProps = {
  geometry: {
    type: Object as PropType<BufferGeometry<NormalBufferAttributes>>,
  },
  material: {
    type: Object as PropType<Material>,
  },
  options: {
    type: Object as PropType<LineOptions>,
    default: () => ({}),
  },
}
export const lineEmits = {
  load: (e: LineLoadEvent) => e,
}

export type LineLoadEvent = {
  scene: Scene
  line: Line
  group: Group
}
export type LineEmits = typeof lineEmits
export type LineProps = ExtractPropTypes<typeof lineProps>
export type LineInstance = InstanceType<typeof LineComponent>
export type LineOptions = ThreeOptions<Line>
