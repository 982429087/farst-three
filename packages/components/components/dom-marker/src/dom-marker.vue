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
  const [x, z] = projection(props.point) as number[]
  label.position.set(x, props.y, z)
  label.position.z += props.offset[2]
  label.position.x += props.offset[0]
  label.position.y += props.offset[1]
  scene.add(label)
}

onMounted(() => {
  createTextPoint()
})

onBeforeUnmount(() => {
  //
})
</script>