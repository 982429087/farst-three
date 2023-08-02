<template>
  <FtOrthographicCamera
    v-bind="bindProps"
    :is-render-camera="false"
    :auto-add-to-scene="false"
    v-on="onEmits"
    @load="cameraLoad"
  />
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount } from 'vue'
import {
  useAnimationService,
  useBindProps,
  useOnEmits,
  useSceneRef,
} from '@farst-three/hooks'
import {
  FtOrthographicCamera,
  orthographicCameraEmits,
  orthographicCameraProps,
} from '@farst-three/components'
import { thumbnailEmits, thumbnailProps } from './thumbnail'
import type {
  AnimationFunsParams,
  OrthographicCameraLoadEvent,
} from '@farst-three/components'
import type { OrthographicCamera } from 'three'

defineOptions({
  name: 'FtThumbnail',
})
let camera: OrthographicCamera | null = null
const props = defineProps(thumbnailProps as any)
const emit = defineEmits(thumbnailEmits)

// init here
let animationService = useAnimationService()
const bindProps = useBindProps(props, orthographicCameraProps)
const onEmits = useOnEmits(emit, orthographicCameraEmits)

const container = useSceneRef()

const cameraLoad = (e: OrthographicCameraLoadEvent) => {
  camera = e.camera
}

let animate = ({
  renderer,
  scene,
  camera: renderCamera,
}: AnimationFunsParams) => {
  if (camera) {
    const width = container.offsetWidth - props.width - props.margin
    const height = container.offsetHeight - props.height - props.margin
    renderer.setScissor(width, height, props.width, props.height)
    renderer.setViewport(width, height, props.width, props.height)
    renderer.setClearColor(props.clearCloor, props.clearCloorAlpha)
    renderer.render(scene, camera)
    camera.position.copy(renderCamera.position)
    camera.quaternion.copy(renderCamera.quaternion)
    camera.zoom = (renderCamera as OrthographicCamera).zoom
    props.animationFn?.({ renderer, scene, camera })
    camera.updateProjectionMatrix()
  }
}

animationService.on('thumbnail', animate)

onBeforeUnmount(() => {
  animationService.off('thumbnail')
  ;(animate as any) = null
  ;(animationService as any) = null
  ;(camera as any) = null
})
</script>
