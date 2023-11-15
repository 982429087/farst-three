import {
  Color,
  ExtrudeGeometry,
  FrontSide,
  Group,
  Mesh,
  MeshPhongMaterial,
  Object3D,
  RepeatWrapping,
  ShaderMaterial,
  Shape,
  TextureLoader,
  Vector2,
} from 'three'

import { merge } from 'lodash'
import { fragment, vertex } from './shader'
import type { GeoProjection } from 'd3-geo'
import type {
  ColorRepresentation,
  MeshBasicMaterialParameters,
  Scene,
  ShaderMaterialParameters,
} from 'three'
import type { FeatureCollection, Geometry, Position } from '@turf/turf'

export type GeoJsonPlaneOptions = {
  geoJson?: FeatureCollection<Geometry>
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
}

export function useGeoJsonPlane(
  scene: Scene,
  projection: GeoProjection,
  opts: GeoJsonPlaneOptions
) {
  const defaultOptions = {
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
  }
  const options = merge(defaultOptions, opts)
  const geoJson = options.geoJson!
  const textureLoader = new TextureLoader()
  const map = new Group()

  function initMapMesh() {
    const topts = options.topPlaneOptions
    const sopts = options.sidePlaneOptions
    // 网格图片
    const gridTexture = textureLoader.load(topts.texture)
    gridTexture.wrapS = RepeatWrapping
    gridTexture.wrapT = RepeatWrapping
    const singleUniforms = {
      color: {
        value: new Color(topts.color),
      },
      repeat: {
        value: topts.textureRepeat,
      },
      colorTexture: {
        value: gridTexture,
      },
    }

    const gridMaterial = new ShaderMaterial({
      uniforms: singleUniforms,
      vertexShader: vertex,
      fragmentShader: fragment,
      transparent: true,
      opacity: 1,
      side: FrontSide,
      // blending:AdditiveBlending
      ...topts.geometryOptions,
    })

    // 渐变图片
    const gradationTexture = textureLoader.load(sopts.texture)
    gradationTexture.center.set(...(sopts.textureCenter! as [number, number]))
    gradationTexture.rotation = sopts.textureRotation
    const gradationMaterial = new MeshPhongMaterial({
      map: gradationTexture,
      transparent: false,
      depthTest: true,
      opacity: 1,
      ...sopts.geometryOptions,
    })

    geoJson.features?.forEach((elem) => {
      const o3d = new Object3D()
      const coordinates = elem.geometry.coordinates as Position[][][]
      coordinates.forEach((multiPolygon) => {
        multiPolygon.forEach((polygon) => {
          const shape = new Shape()
          for (const [i, element] of polygon.entries()) {
            const [x, y] = projection(element as [number, number]) as number[]
            if (i === 0) shape.moveTo(x, -y)
            shape.lineTo(x, -y)
          }

          const geometry = new ExtrudeGeometry(shape, {
            depth: options.depth,
            bevelEnabled: false,
          })
          const mesh = new Mesh(geometry, [gridMaterial, gradationMaterial])
          mesh.rotateX(-Math.PI / 2)
          mesh.position.set(0, 1, -3)
          o3d.add(mesh)
        })
      })
      map.add(o3d)
    })
    scene.add(map)
  }

  function dispose() {
    map.traverse((obj) => {
      if (obj instanceof Mesh) {
        obj.geometry.dispose()
        obj.material.dispose?.()
      }
    })
    scene.remove(map)
  }

  initMapMesh()

  return {
    dispose,
  }
}
