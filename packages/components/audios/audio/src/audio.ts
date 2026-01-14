import type { Audio, Scene } from 'three'
import type { ExtractPropTypes, PropType } from 'vue'
import type { ThreeOptions } from '@farst-three/utils'
import type AudioComponent from './audio.vue'

export const audioProps = {
  options: {
    type: Object as PropType<AudioOptions>,
    default: () => ({}),
  },
  url: {
    type: String,
    required: true as const,
  },
  bufferOnload: {
    type: Function as PropType<AudioLoaderOnLoad>,
    default: () => true,
  },
}
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
