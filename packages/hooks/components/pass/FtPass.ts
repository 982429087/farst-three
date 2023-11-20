import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader'
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import type { Camera, Scene, WebGLRenderer } from 'three'

export class FtPass {
  public _destroyed = true

  public scene: Scene
  public camera: Camera
  public renderer: WebGLRenderer
  public width: number
  public height: number
  public effectFXAA: ShaderPass
  public observer: ResizeObserver | undefined

  constructor(scene: Scene, camera: Camera, renderer: WebGLRenderer) {
    this.scene = scene
    this.camera = camera
    this.renderer = renderer
    this.width = renderer.domElement.offsetWidth
    this.height = renderer.domElement.offsetHeight
    this.effectFXAA = new ShaderPass(FXAAShader)
    this.effectFXAA.uniforms['resolution'].value.set(
      1 / this.width,
      1 / this.height
    )
  }

  genPass() {
    const renderPass = new RenderPass(this.scene, this.camera)
    const outputPass = new OutputPass()
    return {
      renderPass,
      outputPass,
    }
  }

  genEffectComposer() {
    const effectComposer = new EffectComposer(this.renderer)
    return effectComposer
  }

  onChange(composers: EffectComposer[]) {
    this.width = this.renderer.domElement.offsetWidth
    this.height = this.renderer.domElement.offsetHeight
    const resize = () => {
      composers.forEach((composer) => {
        composer.setSize(this.width, this.height)
      })

      this.effectFXAA.uniforms['resolution'].value.set(
        1 / this.width,
        1 / this.height
      )
    }
    this.observer = new ResizeObserver(resize)
    this.observer.observe(this.renderer.domElement)
  }

  destroy() {
    this._destroyed = true
    this.observer?.disconnect()
  }
}
