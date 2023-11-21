<template>
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount, watch } from 'vue'
import {
  GeoJsonPlane,
  uesEvent,
  useContainer,
  useEventService,
  useProjection,
  useScene,
} from '@farst-three/hooks'
import { geoJsonPlaneEmits, geoJsonPlaneProps } from './geo-json-plane'
import type { FunsEvent } from '@farst-three/hooks'
import type { AnyFun } from '@farst-three/utils'

defineOptions({
  name: 'FtGeoJsonPlane',
})

const props = defineProps(geoJsonPlaneProps)
const emit = defineEmits(geoJsonPlaneEmits)
const scene = useScene()
const projection = useProjection()
const geoJsonPlane = new GeoJsonPlane(scene, projection)
const eventService = useEventService()
const dom = useContainer()
let destory: AnyFun | undefined

watch(
  [() => props.geoJson, () => props.options],
  ([json, v]) => {
    if (!json) return
    geoJsonPlane.geoJson = json
    if (v) geoJsonPlane.options = v
    geoJsonPlane.render()

    const { dispose } = uesEvent(
      props,
      emit,
      geoJsonPlane.planeGroup.children,
      eventService,
      mouseMove,
      undefined,
      undefined,
      true
    )
    destory = dispose
    emit('load', { scene, geoJsonPlane })
  },
  {
    immediate: true,
    deep: true,
  }
)

function mouseMove(e: FunsEvent) {
  if (!dom || !props.cursor) return e
  if (e.targets.length) {
    dom.style.cursor = props.cursor
  } else {
    dom.style.cursor = 'default'
  }
  return e
}

onBeforeUnmount(() => {
  geoJsonPlane.dispose()
  destory?.()
})
</script>
