<template>
  <div ref="domMarkerItem" class="ft-dom-marker-item">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer'
import { useOptions, useProjection, useScene } from '@farst-three/hooks'
import { domMarkerEmits, domMarkerProps } from './dom-marker'

defineOptions({
  name: 'FtDomMarker',
})

const props = defineProps(domMarkerProps)
const emit = defineEmits(domMarkerEmits)
const scene = useScene()
const projection = useProjection()

const domMarkerItem = ref<HTMLDivElement>()

function createTextPoint() {
  if (!domMarkerItem.value) return
  const tag = domMarkerItem.value
  const css2DObject = new CSS2DObject(tag)
  const position = projection
    ? (projection([props.x, props.y]) as number[])
    : [props.x, props.y]
  const positionObj: Record<string, number> = {
    x: position[0],
    y: position[1],
    z: props.z,
  }

  css2DObject.position.set(
    positionObj[props.xKey],
    positionObj[props.yKey],
    positionObj[props.zKey]
  )
  css2DObject.position.z += props.offsetZ
  css2DObject.position.x += props.offsetX
  css2DObject.position.y += props.offsetY
  scene.add(css2DObject)

  useOptions(props.options, css2DObject, scene)
  emit('load', { scene, css2DObject })
}

onMounted(() => {
  createTextPoint()
})

onBeforeUnmount(() => {
  //
})
</script>
