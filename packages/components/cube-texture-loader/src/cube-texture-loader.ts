import {
  buildProps,
  definePropType,
  isBoolean,
  isNumber,
  isString,
} from '@farst-three/utils'
import type { ThreeOptions } from '@farst-three/utils'
import type { CubeTextureLoader, Material, Scene, Texture } from 'three'
import type { ExtractPropTypes } from 'vue'
import type CubeTextureLoaderComponent from './cube-texture-loader.vue'

export const cubeTextureLoaderProps = buildProps({
  urls: {
    type: definePropType<string[]>(Array),
    default: () => [],
    required: true,
  },
  load: {
    type: definePropType<CubeTextureLoaderOnLoad>(Function),
    default: () => () => undefined,
  },
  progress: {
    type: definePropType<CubeTextureLoaderOnProgress>(Function),
    default: () => () => undefined,
  },
  error: {
    type: definePropType<CubeTextureLoaderOnError>(Function),
    default: () => () => undefined,
  },
  type: {
    type: definePropType<CubeTextureType>(String),
    default: 'map',
  },
  options: {
    type: definePropType<CubeTextureLoaderOptions>(Object),
    default: () => ({}),
  },
})
export const cubeTextureLoaderEmits = {
  load: (e: CubeTextureLoadEvent) => e,
  managerLoad: () => true,
  managerStart: (url: string, loaded: number, total: number) =>
    isString(url) && isNumber(loaded) && isNumber(total),
  managerProgress: (url: string, loaded: number, total: number) =>
    isString(url) && isNumber(loaded) && isNumber(total),
  managerError: (url: string) => isString(url),
}

export type CubeTextureType = 'envMap' | 'roughnessMap'

export type CubeTextureLoadEvent = {
  scene: Scene
  cubeTextureLoader: CubeTextureLoader
  material: Material
  texture: Texture
}
export type CubeTextureLoaderEmits = typeof cubeTextureLoaderEmits
export type CubeTextureLoaderProps = ExtractPropTypes<
  typeof cubeTextureLoaderProps
>
export type CubeTextureLoaderInstance = InstanceType<
  typeof CubeTextureLoaderComponent
>
export type CubeTextureLoaderOnLoad = (e: Texture) => void
export type CubeTextureLoaderOnProgress = (
  e: ProgressEvent<EventTarget>
) => void
export type CubeTextureLoaderOnError = (e: ErrorEvent) => void
export type CubeTextureLoaderOptions = ThreeOptions<Texture>
