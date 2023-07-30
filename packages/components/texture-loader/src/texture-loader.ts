import {
  buildProps,
  definePropType,
  isNumber,
  isString,
} from '@farst-three/utils'
import type { ThreeOptions } from '@farst-three/utils'
import type { Material, Scene, Texture, TextureLoader } from 'three'
import type { ExtractPropTypes } from 'vue'
import type TextureLoaderComponent from './texture-loader.vue'

export const textureLoaderProps = buildProps({
  url: {
    type: String,
    required: true,
    default: '',
  },
  load: {
    type: definePropType<TextureLoaderOnLoad>(Function),
    default: () => () => undefined,
  },
  progress: {
    type: definePropType<TextureLoaderOnProgress>(Function),
    default: () => () => undefined,
  },
  error: {
    type: definePropType<TextureLoaderOnError>(Function),
    default: () => () => undefined,
  },
  type: {
    type: definePropType<TextureType>(String),
    default: 'map',
  },
  options: {
    type: definePropType<TextureLoaderOptions>(Object),
    default: () => ({}),
  },
})
export const textureLoaderEmits = {
  load: (e: TextureLoadEvent) => e,
  'update:update': (e: boolean) => true,
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
  | 'alphaMap'
  | 'gradientMap'
export type TextureLoadEvent = {
  scene: Scene
  textureLoader: TextureLoader
  material: Material
  texture: Texture
}
export type TextureLoaderEmits = typeof textureLoaderEmits
export type TextureLoaderProps = ExtractPropTypes<typeof textureLoaderProps>
export type TextureLoaderInstance = InstanceType<typeof TextureLoaderComponent>
export type TextureLoaderOnLoad = (e: Texture) => void
export type TextureLoaderOnProgress = (e: ProgressEvent<EventTarget>) => void
export type TextureLoaderOnError = (e: ErrorEvent) => void
export type TextureLoaderOptions = ThreeOptions<Texture>
