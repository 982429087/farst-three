import { buildProps, definePropType } from '@farst-three/utils'
import type { ThreeOptions } from '@farst-three/utils'
import type { DiffusionWaveOptions } from './use-diffusion-wave'
import type { CircleGeometry, Mesh, Scene, ShaderMaterial } from 'three'
import type { ExtractPropTypes } from 'vue'
import type DiffusionWaveComponent from './diffusion-wave.vue'

export const diffusionWaveProps = buildProps({
  options: {
    type: definePropType<DiffusionWaveOptions>(Object),
    default: () => ({}),
  },
  meshOptions: {
    type: definePropType<ThreeOptions<Mesh>>(Object),
    default: () => ({}),
  },
})
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
