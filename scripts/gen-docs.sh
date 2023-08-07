#! /bin/bash
NAME=$1
FILE_PATH=$(cd "$(dirname "${BASH_SOURCE[0]}")/../docs" && pwd)
MD_FILE_PATH=$FILE_PATH/component
EXAMPLE_FILE_PATH=$FILE_PATH/examples


mkdir -p "$EXAMPLE_FILE_PATH/$NAME"

cat > $EXAMPLE_FILE_PATH/$NAME/basic.vue <<EOF
<template>
  <slot />
</template>

<script lang="ts" setup>
import { useOptions, useScene } from '@farst-three/hooks'
import { onBeforeUnmount } from 'vue'
import {
  ${SMALL_HUMP}Emits,
   ${SMALL_HUMP}Props
} from './$INPUT_NAME'

defineOptions({
  name: 'Ft$NAME',
})

const props = defineProps(${SMALL_HUMP}Props)
const emit = defineEmits(${SMALL_HUMP}Emits)

// init here
let scene = useScene()
emit('load', { scene })
useOptions(props.options, , scene)

onBeforeUnmount(() => {
  ;(scene as any) = null
})
</script>
EOF
