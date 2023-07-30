import {
  buildProps,
  definePropType,
  isNumber,
  isString,
} from '@farst-three/utils'
import type { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import type { DataTexture, Material, Scene, Texture } from 'three'
import type { ExtractPropTypes } from 'vue'
import type { ThreeOptions } from '@farst-three/utils'
import type RgbeLoaderComponent from './rgbe-loader.vue'

export const rgbeLoaderProps = buildProps({
  options: {
    type: definePropType<ThreeOptions<RGBELoader>>(Object),
    default: () => ({}),
  },
  url: {
    type: String,
    required: true,
    default: '',
  },
  load: {
    type: definePropType<RGBELoaderOnLoad>(Function),
    default: () => () => undefined,
  },
  progress: {
    type: definePropType<RGBELoaderOnProgress>(Function),
    default: () => () => undefined,
  },
  error: {
    type: definePropType<RGBELoaderOnError>(Function),
    default: () => () => undefined,
  },
  type: {
    type: definePropType<RGBETextureType>(String),
    default: 'map',
  },
})
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
export type RGBELoaderOnError = (e: ErrorEvent) => void
