import {
  isNumber,
  isString,
} from '@farst-three/utils'
import type { ThreeOptions } from '@farst-three/utils'
import type { CubeTextureLoader, Material, Scene, Texture } from 'three'
import type { ExtractPropTypes, PropType } from 'vue'
import type CubeTextureLoaderComponent from './cube-texture-loader.vue'

export const cubeTextureLoaderProps = {
  urls: {
    type: Array as PropType<string[]>,
    default: () => [],
    required: true,
  },
  load: {
    type: Function as PropType<CubeTextureLoaderOnLoad>,
    default: () => () => undefined,
  },
  progress: {
    type: Function as PropType<CubeTextureLoaderOnProgress>,
    default: () => () => undefined,
  },
  error: {
    type: Function as PropType<CubeTextureLoaderOnError>,
    default: () => () => undefined,
  },
  type: {
    type: String as PropType<CubeTextureType>,
    default: 'map',
  },
  options: {
    type: Object as PropType<CubeTextureLoaderOptions>,
    default: () => ({}),
  },
}
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
export type CubeTextureLoaderOnError = (e: any) => void
export type CubeTextureLoaderOptions = ThreeOptions<Texture>
