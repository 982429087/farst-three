import { Layers, ReinhardToneMapping, ShaderMaterial, Vector2 } from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass'
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader'
import { merge } from 'lodash'
import type { FtObject } from '@farst-three/hooks'
import type { Camera, Mesh, Scene, WebGLRenderer } from 'three'

export type HighLightOptions = {
  strength?: number
  threshold?: number
  radius?: number
  exposure?: number
}

export const HIGHLITHT_SCENE = 1
// https://threejs.org/examples/?q=unreal#webgl_postprocessing_unreal_bloom_selective
export class HighLight implements FtObject {
  private scene: Scene
  private camera: Camera
  private renderer: WebGLRenderer
  private defaultOptions = {
    strength: 0.4,
    threshold: 0,
    radius: 0.1,
    exposure: 3,
  }
  private _options: HighLightOptions = {}
  private width: number
  private height: number
  private bloomLayer: Layers
  private bloomComposer: EffectComposer
  private finalComposer: EffectComposer
  private bloomPass: UnrealBloomPass | undefined
  private materials: Record<string, any> = {}
  private _destroyed = true
  constructor(
    scene: Scene,
    camera: Camera,
    renderer: WebGLRenderer,
    opts: HighLightOptions = {}
  ) {
    renderer.toneMapping = ReinhardToneMapping

    this.scene = scene
    this.camera = camera
    this.renderer = renderer
    this.options = opts
    this.width = renderer.domElement.offsetWidth
    this.height = renderer.domElement.offsetHeight
    this.bloomLayer = new Layers()
    this.bloomLayer.set(HIGHLITHT_SCENE)
    this.bloomComposer = new EffectComposer(renderer)
    this.finalComposer = new EffectComposer(renderer)
  }

  get options() {
    return this._options
  }

  set options(opts: HighLightOptions) {
    const temp = merge(this.defaultOptions, opts)
    this._options = temp
    if (this.bloomPass) {
      this.bloomPass.threshold = temp.threshold
      this.bloomPass.strength = temp.strength
      this.bloomPass.radius = temp.radius
      this.renderer.toneMappingExposure = temp.exposure
    }
  }

  render() {
    this._destroyed = false
    const effectFXAA = new ShaderPass(FXAAShader)
    effectFXAA.uniforms['resolution'].value.set(1 / this.width, 1 / this.height)
    const renderScene = new RenderPass(this.scene, this.camera)
    const outputPass = new OutputPass()

    this.bloomPass = new UnrealBloomPass(
      new Vector2(this.width, this.height),
      this.options.strength!,
      this.options.radius!,
      this.options.threshold!
    )

    this.bloomComposer = new EffectComposer(this.renderer)
    this.bloomComposer.renderToScreen = false

    this.bloomComposer.addPass(renderScene)
    this.bloomComposer.addPass(this.bloomPass)
    this.bloomComposer.addPass(effectFXAA)
    this.bloomComposer.addPass(outputPass)

    const finalPass = new ShaderPass(
      new ShaderMaterial({
        uniforms: {
          baseTexture: { value: null },
          bloomTexture: { value: this.bloomComposer.renderTarget2.texture },
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
            // gl_FragColor = ( texture2D( baseTexture, vUv ) + vec4( 1.0 ) * texture2D( bloomTexture, vUv ) );
            vec4 base_color = texture2D(baseTexture, vUv);
            vec4 bloom_color = texture2D(bloomTexture, vUv);

            float lum = 0.21 * bloom_color.r + 0.71 * bloom_color.g + 0.07 * bloom_color.b;
            gl_FragColor = vec4(base_color.rgb + bloom_color.rgb, max(base_color.a, lum));
          }
        `,
        defines: {},
      }),
      'baseTexture'
    )
    finalPass.needsSwap = true
    this.finalComposer = new EffectComposer(this.renderer)
    this.finalComposer.addPass(renderScene)
    this.finalComposer.addPass(finalPass)
    this.finalComposer.addPass(effectFXAA)
    this.finalComposer.addPass(outputPass)
  }

  loop() {
    if (this._destroyed) return
    this.scene.traverse((obj) => {
      const temp = obj as Mesh
      if (this.bloomLayer.test(temp.layers) === false) {
        this.materials[temp.uuid] = temp.material
        temp.material = []
      }
    })

    this.bloomComposer?.render()
    this.scene.traverse((obj) => {
      const temp = obj as Mesh
      if (this.materials[temp.uuid]) {
        temp.material = this.materials[temp.uuid]
        delete this.materials[temp.uuid]
      }
    })
    this.finalComposer?.render()
  }

  dispose() {
    this._destroyed = true
    this.materials = {}
    this.bloomComposer.dispose()
    this.finalComposer.dispose()
  }
}
