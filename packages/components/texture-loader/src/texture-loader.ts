import {
  buildProps,
  definePropType,
  isNumber,
  isString,
} from '@farst-three/utils'
import type { Material, Scene, Texture, TextureLoader } from 'three'
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
    default: () => () => undefined,
  },
  onProgress: {
    type: definePropType<TextureLoaderOnProgress>(Function),
    default: () => () => undefined,
  },
  onError: {
    type: definePropType<TextureLoaderOnError>(Function),
    default: () => () => undefined,
  },
  type: {
    type: definePropType<TextureType>(String),
    default: 'map',
  },
})
export const textureLoaderEmits = {
  load: (e: TextureLoadEvent) => e,
  managerLoad: () => true,
  managerStart: (url: string, loaded: number, total: number) =>
    isString(url) && isNumber(loaded) && isNumber(total),
  managerProgress: (url: string, loaded: number, total: number) =>
    isString(url) && isNumber(loaded) && isNumber(total),
  managerError: (url: string) => isString(url),
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
export type TextureLoadEvent = {
  scene: Scene
  textureLoader: TextureLoader
  material: Material
}
export type TextureLoaderEmits = typeof textureLoaderEmits
export type TextureLoaderProps = ExtractPropTypes<typeof textureLoaderProps>
export type TextureLoaderInstance = InstanceType<typeof TextureLoaderComponent>
export type TextureLoaderOnLoad = (e: Texture) => void
export type TextureLoaderOnProgress = (e: ProgressEvent<EventTarget>) => void
export type TextureLoaderOnError = (e: ErrorEvent) => void
