import { buildProps, definePropType } from '@farst-three/utils'
import type { Audio, Scene } from 'three'
import type { ExtractPropTypes } from 'vue'
import type { ThreeOptions } from '@farst-three/utils'
import type AudioComponent from './audio.vue'

export const audioProps = buildProps({
  options: {
    type: definePropType<AudioOptions>(Object),
    default: () => ({}),
  },
  url: {
    type: String,
    required: true as const,
  },
  bufferOnload: {
    type: definePropType<AudioLoaderOnLoad>(Function),
    default: () => true,
  },
})
export const audioEmits = {
  load: (e: AudioLoadEvent) => e,
}

export type AudioLoadEvent = {
  scene: Scene
}
export type AudioEmits = typeof audioEmits
export type AudioProps = ExtractPropTypes<typeof audioProps>
export type AudioInstance = InstanceType<typeof AudioComponent>
export type AudioOptions = ThreeOptions<Audio>

export type AudioLoaderOnLoad = (sound: Audio, audioBuffer: AudioBuffer) => void
