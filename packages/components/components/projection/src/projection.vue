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

const projection = useProjection(props.center, props.scale, props.translate)
provide(projectionInjectionKey, projection)
emit('load', { projection })
</script>
