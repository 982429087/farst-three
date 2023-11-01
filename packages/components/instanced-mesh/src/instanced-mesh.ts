import { buildProps, definePropType } from '@farst-three/utils'
import { eventEmits, eventProps } from '@farst-three/hooks'
import type { FunsEvent } from '@farst-three/hooks'
import type {
  BufferGeometry,
  Group,
  InstancedMesh,
  Material,
  NormalBufferAttributes,
  Scene,
} from 'three'
import type { ExtractPropTypes } from 'vue'
import type { ThreeOptions } from '@farst-three/utils'
import type InstancedMeshComponent from './instanced-mesh.vue'

export const instancedMeshProps = buildProps({
  options: {
    type: definePropType<InstancedMeshOptions>(Object),
    default: () => ({}),
  },
  geometry: {
    type: definePropType<BufferGeometry<NormalBufferAttributes>>(Object),
  },
  material: {
    type: definePropType<Material>(Object),
  },
  count: {
    type: definePropType<number>(Number),
    default: 1,
  },
  dragabled: {
    type: definePropType<boolean>(Boolean),
    default: false,
  },
  ...eventProps,
})
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
