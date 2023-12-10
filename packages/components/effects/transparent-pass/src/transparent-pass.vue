<template>
  <slot />
</template>

<script lang="ts" setup>
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { ShaderMaterial } from 'three'
import { useComposer, useEffectComposer } from '@farst-three/hooks'
import { transparentPassEmits, transparentPassProps } from './transparent-pass'

defineOptions({
  name: 'FtTransparentPass',
})

defineProps(transparentPassProps)
const emit = defineEmits(transparentPassEmits)
const composer = useEffectComposer()

const transparentPass = new ShaderPass(
  new ShaderMaterial({
    uniforms: {
      baseTexture: { value: null },
      bloomTexture: { value: composer.renderTarget2.texture },
    },
    vertexShader: `
          varying vec2 vUv;
          void main() {
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
          }
        `,
    /* https://github.com/mrdoob/three.js/issues/14104 透明背景*/
    fragmentShader: `
          uniform sampler2D baseTexture;
          uniform sampler2D bloomTexture;
          varying vec2 vUv;
          void main() {
            vec4 base_color = texture2D(baseTexture, vUv);
            vec4 bloom_color = texture2D(bloomTexture, vUv);

            float lum = 0.21 * bloom_color.r + 0.71 * bloom_color.g + 0.07 * bloom_color.b;
            gl_FragColor = vec4(base_color.rgb + bloom_color.rgb, max(base_color.a, lum));
          }
        `,
    defines: {},
  }),
  'transparentPass'
)
transparentPass.needsSwap = true
useComposer(emit, () => {
  return transparentPass
})
</script>
