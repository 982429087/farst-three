import {
  isNumber,
  isString,
} from '@farst-three/utils'
import type { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import type { DataTexture, Material, Scene, Texture } from 'three'
import type { ExtractPropTypes, PropType } from 'vue'
import type { ThreeOptions } from '@farst-three/utils'
import type RgbeLoaderComponent from './rgbe-loader.vue'

export const rgbeLoaderProps = {
  options: {
    type: Object as PropType<RgbeLoaderOptions>,
    default: () => ({}),
  },
  url: {
    type: String,
    required: true,
    default: '',
  },
  load: {
    type: Function as PropType<RGBELoaderOnLoad>,
    default: () => () => undefined,
  },
  progress: {
    type: Function as PropType<RGBELoaderOnProgress>,
    default: () => () => undefined,
  },
  error: {
    type: Function as PropType<RGBELoaderOnError>,
    default: () => () => undefined,
  },
  type: {
    type: String as PropType<RGBETextureType>,
    default: 'map',
  },
}
export const rgbeLoaderEmits = {
  load: (e: RgbeLoaderLoadEvent) => e,
  managerLoad: () => true,
  managerStart: (url: string, loaded: number, total: number) =>
    isString(url) && isNumber(loaded) && isNumber(total),
  managerProgress: (url: string, loaded: number, total: number) =>
    isString(url) && isNumber(loaded) && isNumber(total),
  managerError: (url: string) => isString(url),
}

export type RgbeLoaderLoadEvent = {
  scene: Scene
  rgbeLoader: RGBELoader
  material: Material
  texture: Texture
}
export type RgbeLoaderEmits = typeof rgbeLoaderEmits
export type RgbeLoaderProps = ExtractPropTypes<typeof rgbeLoaderProps>
export type RgbeLoaderInstance = InstanceType<typeof RgbeLoaderComponent>
export type RgbeLoaderOptions = ThreeOptions<RGBELoader>

export type RGBETextureType =
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
export type RGBELoaderOnLoad = (
  dataTexture: DataTexture,
  texData: object
) => void
export type RGBELoaderOnProgress = (e: ProgressEvent<EventTarget>) => void
export type RGBELoaderOnError = (e: any) => void
