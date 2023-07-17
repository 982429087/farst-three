import {
  buildProps,
  definePropType,
  isNumber,
  isString,
} from '@farst-three/utils'
import type { Texture } from 'three'
import type { ExtractPropTypes } from 'vue'
import type TextureLoaderComponent from './texture-loader.vue'

export const textureLoaderProps = buildProps({
  url: {
    type: String,
    required: true,
    default: '',
  },
  onLoad: {
    type: definePropType<TextureLoaderOnLoad>(Function),
  },
  onProgress: {
    type: definePropType<TextureLoaderOnProgress>(Function),
  },
  onError: {
    type: definePropType<TextureLoaderOnError>(Function),
  },
  type: {
    type: definePropType<TextureType>(String),
    default: 'map',
  },
})
export const textureLoaderEmits = {
  load: () => true,
  start: (url: string, loaded: number, total: number) =>
    isString(url) && isNumber(loaded) && isNumber(total),
  progress: (url: string, loaded: number, total: number) =>
    isString(url) && isNumber(loaded) && isNumber(total),
  error: (url: string) => isString(url),
}

export type TextureType =
  | 'map'
  | 'aoMap'
  | 'bumpMap'
  | 'matcap'
  | 'envMap'
  | 'specularMap'
  | 'lightMap'
  | 'displacementMap'
  | 'normalMap'
  | 'roughnessMap'
  | 'metalnessMap'
export type TextureLoaderEmits = typeof textureLoaderEmits
export type TextureLoaderProps = ExtractPropTypes<typeof textureLoaderProps>
export type TextureLoaderInstance = InstanceType<typeof TextureLoaderComponent>
export type TextureLoaderOnLoad = (e: Texture) => void
export type TextureLoaderOnProgress = (e: ProgressEvent<EventTarget>) => void
export type TextureLoaderOnError = (e: ErrorEvent) => void
