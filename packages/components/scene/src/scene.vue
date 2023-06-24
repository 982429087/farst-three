<template>
  <div>
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { provide, shallowRef } from 'vue'
import { Scene } from 'three'
import { sceneInjectionKey } from '@farst-three/constants/injection'
import { sceneProps } from './scene'

defineOptions({
  name: 'FtScene',
})

defineProps(sceneProps)

// init here
const scene = new Scene()
provide(sceneInjectionKey, shallowRef(scene))
</script>
