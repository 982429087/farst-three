import { Color, Vector2 } from 'three'
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass'
import { merge } from 'lodash'
import { FtPass } from './FtPass'
import type { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import type { Camera, ColorRepresentation, Scene, WebGLRenderer } from 'three'
import type { FtObject } from '../index'

export type OutlineOptions = {
  edgeStrength?: number
  edgeGlow?: number
  usePatternTexture?: boolean
  edgeThickness?: number
  downSampleRatio?: number
  pulsePeriod?: number
  visibleEdgeColor?: ColorRepresentation
  hiddenEdgeColor?: ColorRepresentation
}

export class Outline extends FtPass implements FtObject {
  public outlinePass: OutlinePass | undefined
  public composer: EffectComposer | undefined
  private _options: OutlineOptions = {}
  private defaultOptions = {
    edgeStrength: 30.0, // 边框的亮度
    edgeGlow: 1, // 光晕[0,1]
    usePatternTexture: false, // 是否使用父级的材质
    edgeThickness: 1.0, // 边框宽度
    downSampleRatio: 1.0, // 边框弯曲度
    pulsePeriod: 0, // 呼吸闪烁的速度
    visibleEdgeColor: 0x02518d, // 无遮挡颜色
    hiddenEdgeColor: 0x02518d, // 被遮挡颜色
  }
  constructor(
    scene: Scene,
    camera: Camera,
    renderer: WebGLRenderer,
    opts: OutlineOptions = {}
  ) {
    super(scene, camera, renderer)
    this.options = opts
  }

  setOptions(temp: Required<OutlineOptions>) {
    if (this.outlinePass) {
      this.outlinePass.edgeStrength = temp.edgeStrength
      this.outlinePass.edgeGlow = temp.edgeGlow
      this.outlinePass.usePatternTexture = temp.usePatternTexture
      this.outlinePass.edgeThickness = temp.edgeThickness
      this.outlinePass.downSampleRatio = temp.downSampleRatio
      this.outlinePass.pulsePeriod = temp.pulsePeriod
      this.outlinePass.visibleEdgeColor.set(new Color(temp.visibleEdgeColor))
      this.outlinePass.hiddenEdgeColor.set(new Color(temp.hiddenEdgeColor))
    }
  }

  get options() {
    return this._options
  }

  set options(options: OutlineOptions) {
    const temp = merge(this.defaultOptions, options)
    this._options = temp
    this.setOptions(temp)
  }

  render() {
    this._destroyed = false
    const { renderPass, outputPass } = this.genPass()
    this.composer = this.genEffectComposer()
    this.outlinePass = new OutlinePass(
      new Vector2(this.width, this.height),
      this.scene,
      this.camera
    )
    this.outlinePass.clear = true

    this.setOptions(this.options as Required<OutlineOptions>)
    this.composer.addPass(renderPass)
    this.composer.addPass(this.outlinePass)
    this.composer.addPass(this.effectFXAA)
    this.composer.addPass(outputPass)
    this.onChange([this.composer])
  }
  loop() {
    this.composer?.render()
  }
  dispose() {
    this.destroy()
    this.composer?.dispose()
    this.outlinePass?.dispose()
  }
}
