import { buildProps, definePropType } from '@farst-three/utils'
import type { MeshBasicMaterialParameters } from 'three'

import type { ExtractPropTypes } from 'vue'
import type MeshBasicMaterial from './mesh-basic-material.vue'

export const meshBasicMaterialProps = buildProps({
  params: {
    type: definePropType<MeshBasicMaterialParameters>(Object),
  },
})

export type MeshBasicMaterialProps = ExtractPropTypes<
  typeof meshBasicMaterialProps
>
export type MeshBasicMaterialInstance = InstanceType<typeof MeshBasicMaterial>
