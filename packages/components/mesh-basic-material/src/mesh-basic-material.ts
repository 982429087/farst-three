import { buildProps } from '@farst-three/utils'

import type { ExtractPropTypes } from 'vue'
import type MeshBasicMaterial from './mesh-basic-material.vue'

export const meshBasicMaterialProps = buildProps({})

export type MeshBasicMaterialProps = ExtractPropTypes<
  typeof meshBasicMaterialProps
>
export type MeshBasicMaterialInstance = InstanceType<typeof MeshBasicMaterial>
