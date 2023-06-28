import { buildProps, definePropType } from '@farst-three/utils'
import type { BufferGeometry, Mesh, NormalBufferAttributes } from 'three'
import type { ExtractPropTypes } from 'vue'
import type MeshComponent from './mesh.vue'

export const meshProps = buildProps({
  geometry: {
    type: definePropType<BufferGeometry<NormalBufferAttributes> | undefined>(
      Object
    ),
  },
  material: {
    type: definePropType<any>(Object),
  },
})

export const meshEmits = {
  load: (mesh: Mesh) => mesh,
}

export type MeshProps = ExtractPropTypes<typeof meshProps>
export type MeshInstance = InstanceType<typeof MeshComponent>
export type MeshEmits = typeof meshEmits
