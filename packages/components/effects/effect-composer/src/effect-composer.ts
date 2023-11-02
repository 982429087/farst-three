import { buildProps, definePropType } from '@farst-three/utils'
import type { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import type { Scene, WebGLRenderTarget, WebGLRenderer } from 'three'
import type { ExtractPropTypes } from 'vue'
import type EffectComposerComponent from './effect-composer.vue'

export const effectComposerProps = buildProps({
  renderTarget: {
    type: definePropType<WebGLRenderTarget>(Object),
  },
})
export const effectComposerEmits = {
  load: (e: EffectComposerLoadEvent) => e,
}

export type EffectComposerLoadEvent = {
  scene: Scene
  composer: EffectComposer
  renderer: WebGLRenderer
}
export type EffectComposerEmits = typeof effectComposerEmits
export type EffectComposerProps = ExtractPropTypes<typeof effectComposerProps>
export type EffectComposerInstance = InstanceType<
  typeof EffectComposerComponent
>
