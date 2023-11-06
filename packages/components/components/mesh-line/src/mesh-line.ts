import { buildProps, definePropType } from '@farst-three/utils'
import type { MeshLine, Scene } from 'three'
import type { ExtractPropTypes } from 'vue'
import type { ThreeOptions } from '@farst-three/utils'
import type MeshLineComponent from './mesh-line.vue'

export const meshLineProps = buildProps({
  options: {
    type: definePropType<MeshLineOptions>(Object),
    default: () => ({}),
  },
})
export const meshLineEmits = {
  load: (e: MeshLineLoadEvent) => e,
}

export type MeshLineLoadEvent = {
  scene: Scene
}
export type MeshLineEmits = typeof meshLineEmits
export type MeshLineProps = ExtractPropTypes<typeof meshLineProps>
export type MeshLineInstance = InstanceType<typeof MeshLineComponent>
export type MeshLineOptions = ThreeOptions<MeshLine>
