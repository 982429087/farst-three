<template>
  <div ref="domMarkerItem" class="ft-dom-marker-item">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer'
import { useProjection, useScene } from '@farst-three/hooks'
import { domMarkerEmits, domMarkerProps } from './dom-marker'

defineOptions({
  name: 'FtDomMarker',
})

const props = defineProps(domMarkerProps)
const emit = defineEmits(domMarkerEmits)
const scene = useScene()
const projection = useProjection()

emit('load', { scene })

const domMarkerItem = ref<HTMLDivElement>()

function createTextPoint() {
  if (!domMarkerItem.value || !props.point) return
  const tag = domMarkerItem.value
  const label = new CSS2DObject(tag)
  const [x, z] = projection
    ? (projection([props.point[0], props.point[1]]) as number[])
    : props.point
  label.position.set(x, props.y, z)
  label.position.z += props.offsetZ
  label.position.x += props.offsetX
  label.position.y += props.offsetY
  scene.add(label)
}

onMounted(() => {
  createTextPoint()
})

onBeforeUnmount(() => {
  //
})
</script>
