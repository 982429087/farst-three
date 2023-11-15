import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  CatmullRomCurve3,
  Color,
  DoubleSide,
  Group,
  Points,
  ShaderMaterial,
  Vector3,
} from 'three'
import { merge } from 'lodash'
import { fragment, vertex } from './shader'
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
} & EdgeMoveLineSetting

export class EdgeMoveLine {
  private defaultOptions: EdgeMoveLineOptions = {
    pointsCount: 10000,
    speed: 0.2,
    color: new Color('#1c475e'),
    number: 3, // 同时跑动的流光数量
    length: 0.2, // 流光线条长度
    size: 8, // 粗细
  }
  private _options: EdgeMoveLineOptions = {}
  private _scene: Scene
  private _projection: GeoProjection
  private _destroyed = false
  private timeUniforms = {
    u_time: { value: 0.0 },
  }
  public group = new Group()
  public geoJson: FeatureCollection<Geometry> | undefined

  constructor(
    scene: Scene,
    projection: GeoProjection,
    opts?: EdgeMoveLineOptions,
    geoJson?: FeatureCollection<Geometry>
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

  render() {
    this.dispose()
    if (!this.geoJson) return

    this._destroyed = false
    const v3ps: Vector3[] = []
    this.geoJson.features.forEach((e) => {
      const coordinates = e.geometry.coordinates as Position[][][]
      coordinates.forEach((mp) =>
        mp.forEach((p) => {
          for (const [, element] of p.entries()) {
            const [x, y] = this._projection(
              element as [number, number]
            ) as number[]
            v3ps.push(new Vector3(x, -y, 4.2))
          }
        })
      )
    })
    const curve = new CatmullRomCurve3(v3ps, true)
    const flyLine = this.initLine(curve)
    flyLine.position.set(0, 0.1, -3)
    flyLine.scale.multiplyScalar(1.001)
    flyLine.rotateX(-Math.PI / 2)
    this.group.add(flyLine)
    this._scene.add(this.group)
  }

  animationLoop() {
    if (this._destroyed) return
    this.timeUniforms.u_time.value += 0.007
  }

  dispose() {
    this._scene.remove(this.group)
    this.group.remove(...this.group.children)
    this.group.traverse((obj) => {
      if (obj instanceof Points) {
        obj.geometry.dispose()
        obj.material.dispose()
      }
    })
    this.timeUniforms.u_time.value = 0.0
    this._destroyed = true
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
    const number = this.options.number
    const speed = this.options.speed
    const length = this.options.length
    const size = this.options.size
    const color = new Color(this.options.color)
    const singleUniforms = {
      u_time: this.timeUniforms.u_time,
      number: { type: 'f', value: number },
      speed: { type: 'f', value: speed },
      length: { type: 'f', value: length },
      size: { type: 'f', value: size },
      color: { type: 'v3', value: color },
    }
    const lineMaterial = new ShaderMaterial({
      uniforms: singleUniforms,
      vertexShader: vertex,
      fragmentShader: fragment,
      transparent: true,
      side: DoubleSide,
      blending: AdditiveBlending,
    })
    return lineMaterial
  }
}
