import { buildProps, definePropType } from '@farst-three/utils'
import type {
  MeshToonMaterial,
  MeshToonMaterialParameters,
  Object3D,
  Scene,
} from 'three'
import type { ExtractPropTypes } from 'vue'
import type { ThreeOptions } from '@farst-three/utils'
import type MeshToonMaterialComponent from './mesh-toon-material.vue'

export const meshToonMaterialProps = buildProps({
  params: {
    type: definePropType<MeshToonMaterialParameters>(Object),
  },
  options: {
    type: definePropType<MeshToonMaterialOptions>(Object),
    default: () => ({}),
  },
})
export const meshToonMaterialEmits = {
  load: (e: MeshToonMaterialLoadEvent) => e,
}

export type MeshToonMaterialLoadEvent = {
  scene: Scene
  material: MeshToonMaterial
  obj3d: Object3D
}
export type MeshToonMaterialEmits = typeof meshToonMaterialEmits
export type MeshToonMaterialProps = ExtractPropTypes<
  typeof meshToonMaterialProps
>
export type MeshToonMaterialInstance = InstanceType<
  typeof MeshToonMaterialComponent
>
export type MeshToonMaterialOptions = ThreeOptions<MeshToonMaterial>
