import { buildProps } from '@farst-three/utils'
import type { Scene } from 'three'
import type { ExtractPropTypes } from 'vue'
import type MeshLineComponent from './mesh-line.vue'

export const meshLineProps = buildProps({
  options: {
    type: undefined,
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
