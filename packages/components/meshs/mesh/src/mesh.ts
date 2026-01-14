import { eventEmits, eventProps } from '@farst-three/hooks'
import type { OnEventOptions } from '@farst-three/hooks'
import type { ThreeOptions } from '@farst-three/utils'
import type {
  BufferGeometry,
  Group,
  Material,
  Mesh,
  NormalBufferAttributes,
  Scene,
} from 'three'
import type { ExtractPropTypes, PropType } from 'vue'
import type MeshComponent from './mesh.vue'

export const meshProps = {
  geometry: {
    type: Object as PropType<BufferGeometry<NormalBufferAttributes>>,
  },
  material: {
    type: Object as PropType<Material>,
  },
  options: {
    type: Object as PropType<MeshOptions>,
    default: () => ({}),
  },
  eventOptons: {
    type: Object as PropType<OnEventOptions>,
    default: () => ({}),
  },
  dragabled: {
    type: Boolean,
    default: false,
  },
  ...eventProps,
}

export const meshEmits = {
  load: (e: MeshLoadEvent) => e,
  ...eventEmits,
}

export type MeshLoadEvent = {
  mesh: Mesh
  scene: Scene
  group: Group | null
}
export type MeshProps = ExtractPropTypes<typeof meshProps>
export type MeshInstance = InstanceType<typeof MeshComponent>
export type MeshEmits = typeof meshEmits
export type MeshOptions = ThreeOptions<Mesh>
