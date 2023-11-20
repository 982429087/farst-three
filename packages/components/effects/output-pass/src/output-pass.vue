<template>
  <slot />
</template>

<script lang="ts" setup>
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass'
import { useComposer } from '@farst-three/hooks'
import { outputPassEmits } from './output-pass'

defineOptions({
  name: 'FtOutputPass',
})

const emit = defineEmits(outputPassEmits)

useComposer(emit, () => {
  return new OutputPass()
})
</script>
