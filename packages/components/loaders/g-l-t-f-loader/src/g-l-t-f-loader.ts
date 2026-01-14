import type { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import type { Scene } from 'three'
import type { ExtractPropTypes, PropType } from 'vue'
import type { ThreeOptions } from '@farst-three/utils'
import type GLTFLoaderComponent from './g-l-t-f-loader.vue'

export const gLTFLoaderProps = {
  options: {
    type: Object as PropType<GLTFLoaderOptions>,
    default: () => ({}),
  },
  url: {
    type: String,
    required: true as const,
  },
  load: {
    type: Function as PropType<(gltf: GLTF) => void>,
    required: true as const,
  },
  progress: {
    type: Function as PropType<(event: ProgressEvent<EventTarget>) => void>,
  },
  error: {
    type: Function as PropType<(event: any) => void>,
  },
  decoderPath: {
    type: String,
    default: '',
  },
}
export const gLTFLoaderEmits = {
  load: (e: GLTFLoaderLoadEvent) => e,
}

export type GLTFLoaderLoadEvent = {
  scene: Scene
  gltfLoader: GLTFLoader
}
export type GLTFLoaderEmits = typeof gLTFLoaderEmits
export type GLTFLoaderProps = ExtractPropTypes<typeof gLTFLoaderProps>
export type GLTFLoaderInstance = InstanceType<typeof GLTFLoaderComponent>
export type GLTFLoaderOptions = ThreeOptions<GLTFLoader>
