import { Layers, ShaderMaterial, Vector2 } from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader'
import { merge } from 'lodash'

import type { FtObject } from '@farst-three/hooks'
import type { Camera, Mesh, Scene, WebGLRenderer } from 'three'

export type HighLightOptions = {
  strength?: number
  threshold?: number
  radius?: number
}

export const HIGHLITHT_SCENE = 1

export class HighLight implements FtObject {
  private scene: Scene
  private camera: Camera
  private renderer: WebGLRenderer
  private defaultOptions = {
    strength: 0.78,
    threshold: 0,
    radius: 0.1,
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
    }
  }

  render() {
    this._destroyed = false
    const effectFXAA = new ShaderPass(FXAAShader)
    effectFXAA.uniforms['resolution'].value.set(
      0.6 / this.width,
      0.6 / this.height
    )
    effectFXAA.renderToScreen = true
    // 去掉锯齿
    const renderScene = new RenderPass(this.scene, this.camera) // RenderPass这个通道会在当前场景（scene）和摄像机（camera）的基础上渲染出一个新场景，新建：
    // 添加光晕效果
    this.bloomPass = new UnrealBloomPass( // UnrealBloomPass通道可实现一个泛光效果。
      new Vector2(this.width, this.height),
      this.options.strength!,
      this.options.radius!,
      this.options.threshold!
    )
    // 添加光晕效果---2
    // 着色器通道容器--放进容器里
    this.bloomComposer = new EffectComposer(this.renderer) // EffectComposer可以理解为着色器通道容器，着色器通道按照先后顺序添加进来并执行

    this.bloomComposer.renderToScreen = false
    this.bloomComposer.addPass(renderScene)
    this.bloomComposer.addPass(this.bloomPass) // 添加光晕效果
    this.bloomComposer.addPass(effectFXAA) // 去掉锯齿

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
        fragmentShader: `
        uniform sampler2D baseTexture;
        uniform sampler2D bloomTexture;
        varying vec2 vUv;
        void main() {
            gl_FragColor = ( texture2D( baseTexture, vUv ) + vec4( 1.0 ) * texture2D( bloomTexture, vUv ) );
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
