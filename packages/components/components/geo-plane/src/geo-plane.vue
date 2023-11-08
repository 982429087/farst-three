<template>
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount } from 'vue'
import {
  useAnimationService,
  useScene,
  useStoreService,
} from '@farst-three/hooks'
import { geoPlaneEmits, geoPlaneProps } from './geo-plane'
import { useGeo } from './use-geo'
import { useFloor } from './use-floor'
import { usePatricle } from './use-particle'
import { useCSS2D } from './use-CSS2D'

defineOptions({
  name: 'FtGeoPlane',
})

defineProps(geoPlaneProps)
const emit = defineEmits(geoPlaneEmits)
const animation = useAnimationService()
const scene = useScene()
const store = useStoreService()

const { render: geoRender } = useGeo(scene)
const { render } = useFloor(scene)
const { render: particleRender } = usePatricle(scene)
const { render: css2dRender, destroy } = useCSS2D(
  scene,
  store.getRenderCamera()!,
  store.getSceneRef()!
)

animation.on('floor', () => {
  geoRender()
  render()
  particleRender()
  css2dRender()
})
emit('load', { scene })

onBeforeUnmount(() => {
  destroy()
})
</script>

<style>
.label-item {
  color: #fff;
}
</style>
