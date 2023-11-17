import {
  // BackSide,
  Color,
  // DoubleSide,
  ExtrudeGeometry,
  // FrontSide,
  Group,
  Mesh,
  // MeshBasicMaterial,
  MeshPhongMaterial,
  RepeatWrapping,
  // ShaderMaterial,
  Shape,
  TextureLoader,
  Vector2,
} from 'three'
import { merge } from 'lodash'
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial'
import { Line2 } from 'three/examples/jsm/lines/Line2'
import { flatten } from '@turf/turf'
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry'
// import { fragment, vertex } from './shader'
import type { FeatureCollection, Geometry, Position } from '@turf/turf'
import type { LineMaterialParameters } from 'three/examples/jsm/lines/LineMaterial'
import type { GeoProjection } from 'd3-geo'
import type {
  ColorRepresentation,
  Material,
  MeshBasicMaterialParameters,
  Scene,
  ShaderMaterialParameters,
} from 'three'
import type { FtObject } from '@farst-three/hooks'

export type GeoJsonPlaneOptions = {
  depth?: number
  topPlaneOptions?: {
    color?: ColorRepresentation
    texture?: string
    textureRepeat?: Vector2
    geometryOptions?: ShaderMaterialParameters
  }
  sidePlaneOptions?: {
    texture?: string
    textureCenter?: [number, number]
    textureRotation?: number
    geometryOptions?: MeshBasicMaterialParameters
  }
  topLineMaterialOptions?: LineMaterialParameters
  showBottomLine?: boolean
  showTopLine?: boolean
  bottomLineMaterialOptions?: LineMaterialParameters
  topLineOptions?: {
    position: [number, number, number]
  }
  bottomLineOptions?: {
    position: [number, number, number]
  }
  z?: number
}

export class GeoJsonPlane implements FtObject {
  private scene: Scene
  private defaultOptions = {
    depth: 3,
    sidePlaneOptions: {
      texture: '/geo/gradation.png',
      textureCenter: [0.5, 0.5],
      textureRotation: Math.PI,
    },
    topPlaneOptions: {
      color: '#02518d',
      texture: '/geo/geo-plane-texture.png',
      textureRepeat: new Vector2(0.07, 0.07),
    },
    showBottomLine: true,
    showTopLine: true,
    topLineMaterialOptions: {},
    bottomLineMaterialOptions: {},
    topLineOptions: {
      position: [0, 0.1, -3] as [number, number, number],
    },
    bottomLineOptions: {
      position: [0, -3.2, -3] as [number, number, number],
    },
    z: 4.1,
  }
  private _options = {}
  private projection: GeoProjection | undefined
  private _geoJson: FeatureCollection<Geometry> | undefined

  private textureLoader = new TextureLoader()
  public lineGroup = new Group()
  public planeGroup = new Group()

  constructor(
    scene: Scene,
    projection?: GeoProjection,
    opts?: GeoJsonPlaneOptions,
    geoJson?: FeatureCollection<Geometry>
  ) {
    this.projection = projection
    this.options = opts || {}
    this.scene = scene
    this.geoJson = geoJson
  }

  get options() {
    return this._options
  }
  set options(opts: GeoJsonPlaneOptions) {
    this._options = merge(this.defaultOptions, opts)
  }

  get geoJson() {
    return this._geoJson
  }
  set geoJson(geoJson: FeatureCollection<Geometry> | undefined) {
    this._geoJson = geoJson
  }
  render() {
    if (!this.geoJson) return
    this.dispose()
    const { gridMaterial, gradationMaterial } = this.initPlaneMaterial()
    const { bottomMaterial, topMaterial } = this.initLineMaterial()
    const geojson = flatten(this.geoJson)
    geojson.features?.forEach((elem) => {
      const coordinates = elem.geometry.coordinates as Position[][]
      const shape = new Shape()
      const positions: number[] = []
      const colors: number[] = []
      const color = new Color()
      coordinates.forEach((multiPolygon) => {
        multiPolygon.forEach((element, i) => {
          const [x, y] = this.projection
            ? (this.projection(element as [number, number]) as number[])
            : (element as number[])
          if (i === 0) shape.moveTo(x, -y)
          shape.lineTo(x, -y)
          positions.push(x, -y, this.options.z!)
          colors.push(color.r, color.g, color.b)
        })
      })
      this.addLine(positions, colors, topMaterial, bottomMaterial)
      this.addPlane(shape, gridMaterial, gradationMaterial)
    })

    this.scene.add(this.lineGroup, this.planeGroup)
  }

  addPlane(shape: Shape, gridMaterial: Material, gradationMaterial: Material) {
    const geometry = new ExtrudeGeometry(shape, {
      depth: this.options.depth,
      bevelEnabled: false,
    })
    const mesh = new Mesh(geometry, [gridMaterial, gradationMaterial])
    mesh.renderOrder = 1
    mesh.rotateX(-Math.PI / 2)
    mesh.position.set(0, 1, -3)
    this.planeGroup.add(mesh)
  }

  addLine(
    positions: number[] | Float32Array,
    colors: number[] | Float32Array,
    topMaterial: LineMaterial,
    bottomMaterial: LineMaterial
  ) {
    // 线条
    const linGeometry = new LineGeometry()
    linGeometry.setPositions(positions)
    linGeometry.setColors(colors)

    if (this.options.showTopLine) {
      const topLine = this.createLine(linGeometry, topMaterial)
      topLine.position.set(...this.options.topLineOptions!.position!)
      this.lineGroup.add(topLine)
    }

    if (this.options.showBottomLine) {
      const bottomLine = this.createLine(linGeometry, bottomMaterial)
      bottomLine.position.set(...this.options.bottomLineOptions!.position!)
      this.lineGroup.add(bottomLine)
    }
  }

  loop() {
    return
  }

  initPlaneMaterial() {
    const topts = this.options.topPlaneOptions!
    const sopts = this.options.sidePlaneOptions!

    const gridTexture = this.textureLoader.load(topts.texture!)
    gridTexture.wrapS = RepeatWrapping
    gridTexture.wrapT = RepeatWrapping
    gridTexture.repeat.set(topts.textureRepeat!.x, topts.textureRepeat!.y)
    // const singleUniforms = {
    //   color: {
    //     value: new Color(topts.color),
    //   },
    //   repeat: {
    //     value: topts.textureRepeat,
    //   },
    //   colorTexture: {
    //     value: gridTexture,
    //   },
    // }

    // TODO shader材质需要再来
    // const gridMaterial = new ShaderMaterial({
    //   uniforms: singleUniforms,
    //   vertexShader: vertex,
    //   fragmentShader: fragment,
    //   transparent: true,
    //   opacity: 1,
    //   side: FrontSide,
    //   depthTest: false,

    //   // blending:AdditiveBlending
    //   ...topts.geometryOptions,
    // })

    const gridMaterial = new MeshPhongMaterial({
      map: gridTexture,
      ...topts.geometryOptions,
    })

    // 侧面材质
    const gradationTexture = this.textureLoader.load(sopts.texture!)
    gradationTexture.center.set(...(sopts.textureCenter! as [number, number]))
    gradationTexture.rotation = sopts.textureRotation!
    const gradationMaterial = new MeshPhongMaterial({
      map: gradationTexture,
      transparent: false,
      opacity: 1,
      ...sopts.geometryOptions,
    })

    return { gridMaterial, gradationMaterial }
  }

  initLineMaterial() {
    const topMaterial = new LineMaterial({
      color: 0x68c5f6,
      linewidth: 0.002,
      vertexColors: true,
      dashed: false,
      alphaToCoverage: true,
      ...this.options.topLineMaterialOptions,
    })
    const bottomMaterial = new LineMaterial({
      color: 0x45bff8,
      linewidth: 0.004,
      vertexColors: true,
      dashed: false,
      alphaToCoverage: true,
      ...this.options.bottomLineMaterialOptions,
    })
    return { topMaterial, bottomMaterial }
  }

  createLine(geometry: LineGeometry, material: LineMaterial) {
    const line = new Line2(geometry, material)
    line.computeLineDistances()
    line.rotateX(-Math.PI / 2)
    return line
  }

  dispose() {
    this.scene.remove(this.planeGroup)
    this.scene.remove(this.lineGroup)
    this.planeGroup.traverse((obj) => {
      obj.traverse((child) => {
        if (child instanceof Mesh) {
          child.geometry.dispose()
          child.material.dispose?.()
        }
        if (child instanceof Line2) {
          child.geometry.dispose()
          child.material.dispose()
        }
      })
    })
    this.planeGroup.remove(...this.planeGroup.children)
    this.lineGroup.traverse((obj) => {
      obj.traverse((child) => {
        if (child instanceof Mesh) {
          child.geometry.dispose()
          child.material.dispose?.()
        }
        if (child instanceof Line2) {
          child.geometry.dispose()
          child.material.dispose()
        }
      })
    })
    this.lineGroup.remove(...this.lineGroup.children)
  }
}
