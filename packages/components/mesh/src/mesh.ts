import { buildProps, definePropType } from '@farst-three/utils'
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
    type: definePropType<BufferGeometry<NormalBufferAttributes> | undefined>(
      Object
    ),
  },
  material: {
    type: definePropType<Material>(Object),
  },
  options: {
    type: definePropType<MeshOptions>(Object),
    default: () => ({}),
  },
})

export const meshEmits = {
  load: (e: MeshLoadEvent) => e,
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
