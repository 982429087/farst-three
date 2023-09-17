import { buildProps, definePropType } from '@farst-three/utils'
import type { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import type { Scene } from 'three'
import type { ExtractPropTypes } from 'vue'
import type { ThreeOptions } from '@farst-three/utils'
import type GLTFLoaderComponent from './g-l-t-f-loader.vue'

export const gLTFLoaderProps = buildProps({
  options: {
    type: definePropType<GLTFLoaderOptions>(Object),
    default: () => ({}),
  },
  url: {
    type: String,
    required: true as const,
  },
  load: {
    type: definePropType<(gltf: GLTF) => void>(Function),
    required: true as const,
  },
  progress: {
    type: definePropType<(event: ProgressEvent<EventTarget>) => void>(Function),
  },
  error: {
    type: definePropType<(event: ErrorEvent) => void>(Function),
  },
})
export const gLTFLoaderEmits = {
  load: (e: GLTFLoaderLoadEvent) => e,
}

export type GLTFLoaderLoadEvent = {
  scene: Scene
  fltfLoader: GLTFLoader
}
export type GLTFLoaderEmits = typeof gLTFLoaderEmits
export type GLTFLoaderProps = ExtractPropTypes<typeof gLTFLoaderProps>
export type GLTFLoaderInstance = InstanceType<typeof GLTFLoaderComponent>
export type GLTFLoaderOptions = ThreeOptions<GLTFLoader>
