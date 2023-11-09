import { buildProps } from '@farst-three/utils'
import type { Scene } from 'three'
import type { ExtractPropTypes } from 'vue'
import type DiffusionWaveComponent from './diffusion-wave.vue'

export const diffusionWaveProps = buildProps({
  value: {
    type: Boolean,
    default: true,
  },
})
export const diffusionWaveEmits = {
  load: (e: DiffusionWaveLoadEvent) => e,
}

export type DiffusionWaveLoadEvent = {
  scene: Scene
}
export type DiffusionWaveEmits = typeof diffusionWaveEmits
export type DiffusionWaveProps = ExtractPropTypes<typeof diffusionWaveProps>
export type DiffusionWaveInstance = InstanceType<typeof DiffusionWaveComponent>
