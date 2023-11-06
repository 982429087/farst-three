<template>
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount, provide } from 'vue'
import { MeshPhysicalMaterial } from 'three'
import {
  useAnimationService,
  useObj3d,
  useOptions,
  useRenderer,
  useScene,
} from '@farst-three/hooks'
import { materialInjectKey } from '@farst-three/constants'
import { liquidEmits, liquidProps } from './liquid-plane'
import LiquidEffect from './liquid-effect'
import type { WebGLRenderer } from 'three'

defineOptions({
  name: 'FtLiquidPlane',
})

const props = defineProps(liquidProps)
const emit = defineEmits(liquidEmits)

let scene = useScene()
const renderer = useRenderer() as WebGLRenderer
const o3d = useObj3d()
const animation = useAnimationService()
const liquidEffect = new LiquidEffect(renderer)
liquidEffect.renderer = renderer
function update() {
  liquidEffect?.update()
}
animation.on('liquid', update)

const material = new MeshPhysicalMaterial(props.params)
// effect中使用切换target的方法来渲染texture，然后使用某个材质来使用这份贴图
material.onBeforeCompile = (shader) => {
  shader.uniforms.hmap = { value: liquidEffect!.hMap.texture }
  shader.vertexShader = `uniform sampler2D hmap;\n${shader.vertexShader}`
  const token = '#include <begin_vertex>'
  const customTransform = `
          vec3 transformed = vec3(position);
          vec4 info = texture2D(hmap, uv);
          vNormal = vec3(info.b, sqrt(1.0 - dot(info.ba, info.ba)), info.a).xzy;
          transformed.z = 20. * info.r;
        `
  shader.vertexShader = shader.vertexShader.replace(token, customTransform)
}

o3d.material = material

emit('load', { scene, liquidEffect })
provide(materialInjectKey, material)
useOptions(props.options, material, scene)

onBeforeUnmount(() => {
  ;(scene as any) = null
})
</script>
