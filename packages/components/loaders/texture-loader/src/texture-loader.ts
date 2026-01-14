import {
  isNumber,
  isString,
} from '@farst-three/utils'
import type { ThreeOptions } from '@farst-three/utils'
import type { Material, Scene, Texture, TextureLoader } from 'three'
import type { ExtractPropTypes, PropType } from 'vue'
import type TextureLoaderComponent from './texture-loader.vue'

export const textureLoaderProps = {
  url: {
    type: String,
    required: true,
    default: '',
  },
  load: {
    type: Function as PropType<TextureLoaderOnLoad>,
    default: () => () => undefined,
  },
  progress: {
    type: Function as PropType<TextureLoaderOnProgress>,
    default: () => () => undefined,
  },
  error: {
    type: Function as PropType<TextureLoaderOnError>,
    default: () => () => undefined,
  },
  type: {
    type: String as PropType<TextureType>,
    default: 'map',
  },
  options: {
    type: Object as PropType<TextureLoaderOptions>,
    default: () => ({}),
  },
}
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
export type TextureLoaderOnError = (e: any) => void
export type TextureLoaderOptions = ThreeOptions<Texture>
