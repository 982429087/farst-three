import type { ThreeOptions } from '@farst-three/utils'
import type { DiffusionWaveOptions } from './use-diffusion-wave'
import type { CircleGeometry, Mesh, Scene, ShaderMaterial } from 'three'
import type { ExtractPropTypes, PropType } from 'vue'
import type DiffusionWaveComponent from './diffusion-wave.vue'

export const diffusionWaveProps = {
  options: {
    type: Object as PropType<DiffusionWaveOptions>,
    default: () => ({}),
  },
  meshOptions: {
    type: Object as PropType<ThreeOptions<Mesh>>,
    default: () => ({}),
  },
}
export const diffusionWaveEmits = {
  load: (e: DiffusionWaveLoadEvent) => e,
}

export type DiffusionWaveLoadEvent = {
  scene: Scene
  mesh: Mesh
  geometry: CircleGeometry
  material: ShaderMaterial
}
export type DiffusionWaveEmits = typeof diffusionWaveEmits
export type DiffusionWaveProps = ExtractPropTypes<typeof diffusionWaveProps>
export type DiffusionWaveInstance = InstanceType<typeof DiffusionWaveComponent>
