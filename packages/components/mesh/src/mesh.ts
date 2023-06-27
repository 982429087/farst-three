import { buildProps, definePropType } from '@farst-three/utils'
import type { BufferGeometry, NormalBufferAttributes } from 'three'
import type { ExtractPropTypes } from 'vue'
import type Mesh from './mesh.vue'

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

export type MeshProps = ExtractPropTypes<typeof meshProps>
export type MeshInstance = InstanceType<typeof Mesh>
