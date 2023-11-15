import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  CatmullRomCurve3,
  Color,
  DoubleSide,
  Points,
  ShaderMaterial,
  Vector3,
} from 'three'
import { merge } from 'lodash'
import { fragment, vertex } from './shader'
import type { FtObject } from '@farst-three/hooks'
import type { GeoProjection } from 'd3-geo'
import type { ColorRepresentation, Scene } from 'three'
import type { FeatureCollection, Geometry, Position } from '@turf/turf'

export type EdgeMoveLineSetting = {
  number?: number
  speed?: number
  length?: number
  size?: number
  color?: ColorRepresentation
}

export type EdgeMoveLineOptions = {
  pointsCount?: number
  z?: number
} & EdgeMoveLineSetting

/**
 * 流光线条
 * @param scene Scene
 * @param projection 经纬度转墨卡托
 * @param opts pointsCount: 线条点数 speed: 线条速度 color: 线条颜色 number: 同时跑动的流光数量 length: 流光线条长度 size: 粗细 z: z轴坐标
 * @param geoJson GeoJSON
 */
export class EdgeMoveLine implements FtObject {
  private defaultOptions: EdgeMoveLineOptions = {
    pointsCount: 10000,
    speed: 0.2,
    color: '#1c475e',
    number: 3,
    length: 0.2,
    size: 8,
    z: 4.2,
  }
  private _options: EdgeMoveLineOptions = {}
  private _scene: Scene
  private _projection: GeoProjection | undefined
  private timeUniforms = {
    u_time: { value: 0.0 },
  }
  public _geoJson: FeatureCollection<Geometry> | undefined
  public flyLine: Points<BufferGeometry, ShaderMaterial> | undefined

  constructor(
    scene: Scene,
    geoJson?: FeatureCollection<Geometry>,
    opts?: EdgeMoveLineOptions,
    projection?: GeoProjection
  ) {
    this._scene = scene
    this._projection = projection
    this.geoJson = geoJson
    this.options = opts || {}
  }

  get options() {
    return this._options
  }

  set options(opts: EdgeMoveLineOptions) {
    this._options = merge(this.defaultOptions, opts)
  }
  get geoJson() {
    return this._geoJson
  }
  set geoJson(geoJson: FeatureCollection<Geometry> | undefined) {
    this._geoJson = geoJson
  }

  render() {
    this.dispose()
    if (!this.geoJson) return

    const v3ps: Vector3[] = []
    this.geoJson.features.forEach((e) => {
      const coordinates = e.geometry.coordinates as Position[][][]
      coordinates.forEach((mp) =>
        mp.forEach((p) => {
          for (const [, element] of p.entries()) {
            const [x, y] = this._projection
              ? (this._projection(element as [number, number]) as number[])
              : (element as number[])
            v3ps.push(new Vector3(x, -y, this.options.z))
          }
        })
      )
    })
    const curve = new CatmullRomCurve3(v3ps, true)
    this.flyLine = this.initLine(curve)
    this.flyLine.rotateX(-Math.PI / 2)
    this.flyLine.position.set(0, 0.1, -3)
    this.flyLine.scale.multiplyScalar(1.001)
    this._scene.add(this.flyLine)
  }

  loop() {
    if (!this.flyLine) return
    this.timeUniforms.u_time.value += 0.007
  }

  dispose() {
    if (!this.flyLine) return
    this._scene.remove(this.flyLine)
    this.flyLine.geometry.dispose()
    ;(this.flyLine.material as ShaderMaterial).dispose()
    this.flyLine = undefined
    this.timeUniforms.u_time.value = 0.0
  }

  initLine(curve: CatmullRomCurve3) {
    const points = curve.getPoints(this.options.pointsCount)
    const geometry = new BufferGeometry().setFromPoints(points)
    const length = points.length
    const percents = new Float32Array(length)
    for (let i = 0; i < points.length; i += 1) {
      percents[i] = i / length
    }
    geometry.setAttribute('percent', new BufferAttribute(percents, 1))
    const lineMaterial = this.initLineMaterial()
    const line = new Points(geometry, lineMaterial)
    return line
  }

  initLineMaterial() {
    const material = new ShaderMaterial({
      uniforms: {
        u_time: this.timeUniforms.u_time,
        number: { value: this.options.number },
        speed: { value: this.options.speed },
        length: { value: this.options.length },
        size: { value: this.options.size },
        color: { value: new Color(this.options.color) },
      },
      vertexShader: vertex,
      fragmentShader: fragment,
      transparent: true,
      side: DoubleSide,
      blending: AdditiveBlending,
    })
    return material
  }
}
