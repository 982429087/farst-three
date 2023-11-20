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
import { isClient } from '@vueuse/core'
import {
  useAnimationService,
  useBindProps,
  useContainer,
  useOnEmits,
} from '@farst-three/hooks'
import {
  FtOrthographicCamera,
  orthographicCameraEmits,
  orthographicCameraProps,
} from '@farst-three/components'
import { thumbnailEmits, thumbnailProps } from './thumbnail'
import type { AnimationFunsParams } from '@farst-three/hooks'
import type { OrthographicCameraLoadEvent } from '@farst-three/components'
import type { OrthographicCamera } from 'three'

defineOptions({
  name: 'FtThumbnail',
})
let camera: OrthographicCamera | null = null
// TODO 类型过深导致打包出问题
const props = defineProps(thumbnailProps as any)
const emit = defineEmits(thumbnailEmits)

const animationService = useAnimationService()
const bindProps = useBindProps(props, orthographicCameraProps)
const onEmits = useOnEmits(emit, orthographicCameraEmits)

const container = useContainer()

const cameraLoad = (e: OrthographicCameraLoadEvent) => {
  camera = e.camera
}
const dpr = isClient ? window.devicePixelRatio || 1 : 1
animationService.noRender = true
const animate = ({
  renderer,
  scene,
  camera: renderCamera,
}: AnimationFunsParams) => {
  if (camera) {
    renderer.setScissorTest(true)
    renderer.setScissor(0, 0, container.offsetWidth, container.offsetHeight)
    renderer.setViewport(0, 0, container.offsetWidth, container.offsetHeight)
    renderer.setClearColor(
      props.scissorClearColor,
      props.scissorClearColorAlpha
    )
    renderer.setPixelRatio(dpr)
    renderer.setSize(container.offsetWidth, container.offsetHeight)
    renderer.render(scene, camera)

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
  animationService.noRender = false
  animationService.off('thumbnail')
})
</script>
