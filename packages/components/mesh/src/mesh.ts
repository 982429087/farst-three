import { buildProps, definePropType } from '@farst-three/utils'
import type { FunsEvent, OnEventOptions } from '@farst-three/hooks'
import type { ThreeOptions } from '@farst-three/utils'
import type {
  BufferGeometry,
  Group,
  Material,
  Mesh,
  NormalBufferAttributes,
  Scene,
} from 'three'
import type { ExtractPropTypes } from 'vue'
import type MeshComponent from './mesh.vue'

export const meshProps = buildProps({
  geometry: {
    type: definePropType<BufferGeometry<NormalBufferAttributes>>(Object),
  },
  material: {
    type: definePropType<Material>(Object),
  },
  options: {
    type: definePropType<MeshOptions>(Object),
    default: () => ({}),
  },
  eventOptons: {
    type: definePropType<OnEventOptions>(Object),
    default: () => ({}),
  },
  onHover: {
    type: definePropType<FunsEvent>(Function),
  },
  onClick: {
    type: definePropType<FunsEvent>(Function),
  },
})

export const meshEmits = {
  load: (e: MeshLoadEvent) => e,
  hover: (e: FunsEvent) => e,
  click: (e: FunsEvent) => e,
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
