<template>
  <slot />
</template>

<script lang="ts" setup>
import { provide } from 'vue'
import { useProjection } from '@farst-three/utils'
import { projectionInjectionKey } from '@farst-three/constants'
import { projectionEmits, projectionProps } from './projection'

defineOptions({
  name: 'FtProjection',
})

const props = defineProps(projectionProps)
const emit = defineEmits(projectionEmits)

const projection = useProjection(props.center as [number, number], props.scale, props.translate as [number, number])
provide(projectionInjectionKey, projection)
emit('load', { projection })
</script>
