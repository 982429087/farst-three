import { eventEmits, eventProps } from '@farst-three/hooks'
import type {
  BufferGeometry,
  Group,
  InstancedMesh,
  Material,
  NormalBufferAttributes,
  Scene,
} from 'three'
import type { ExtractPropTypes, PropType } from 'vue'
import type { ThreeOptions } from '@farst-three/utils'
import type InstancedMeshComponent from './instanced-mesh.vue'

export const instancedMeshProps = {
  options: {
    type: Object as PropType<InstancedMeshOptions>,
    default: () => ({}),
  },
  geometry: {
    type: Object as PropType<BufferGeometry<NormalBufferAttributes>>,
  },
  material: {
    type: Object as PropType<Material>,
  },
  count: {
    type: Number as PropType<number>,
    default: 1,
  },
  dragabled: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  ...eventProps,
}
export const instancedMeshEmits = {
  load: (e: InstancedMeshLoadEvent) => e,
  ...eventEmits,
}

export type InstancedMeshLoadEvent = {
  scene: Scene
  mesh: InstancedMesh
  group: Group
}
export type InstancedMeshEmits = typeof instancedMeshEmits
export type InstancedMeshProps = ExtractPropTypes<typeof instancedMeshProps>
export type InstancedMeshInstance = InstanceType<typeof InstancedMeshComponent>
export type InstancedMeshOptions = ThreeOptions<InstancedMesh>
