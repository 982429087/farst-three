import {
  Color,
  ExtrudeGeometry,
  ExtrudeGeometryOptions,
  FrontSide,
  Group,
  Mesh,
  MeshBasicMaterial,
  MeshPhongMaterial,
  Object3D,
  RepeatWrapping,
  ShaderMaterial,
  Shape,
  TextureLoader,
  Vector2,
  Vector3,
} from 'three'

import { merge } from 'lodash'
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

    // 合并颜色和贴图
    const gridMaterial = new ShaderMaterial({
      uniforms: singleUniforms,
      vertexShader: `
				varying vec2 vUv;
				varying vec3 vPosition;
				void main()
				{
				  vUv = uv;
				  vPosition = position;
				  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}
			`,
      fragmentShader: `
        varying vec2 vUv;
        uniform sampler2D colorTexture;
        uniform vec2 repeat;
        uniform vec3 color;
        void main( void ) {
          vec2 position = vUv;
          vec4 colorb = vec4(color,1.0);
          vec4 colora = texture2D(colorTexture,vec2((vUv*repeat).x,fract((vUv*repeat).y)));
          gl_FragColor = colora+colorb;
        }
			`,
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
          const v3ps: Vector3[] = []
          for (const [i, element] of polygon.entries()) {
            const [x, y] = projection(element as [number, number]) as number[]
            if (i === 0) {
              shape.moveTo(x, -y)
            }
            shape.lineTo(x, -y)
            v3ps.push(new Vector3(x, -y, 4.2))
          }
          //拉升成地图
          const geometry = new ExtrudeGeometry(shape, {
            depth: 3, //该属性指定图形可以拉伸多高，默认值是100
            bevelEnabled: false, //是否给这个形状加斜面，默认加斜面。
          })
          const mesh = new Mesh(geometry, [gridMaterial, gradationMaterial])
          mesh.rotateX(-Math.PI / 2)
          mesh.position.set(0, 1, -3)
          o3d.add(mesh)

          //地图边缘飞光效果
          //是否闭合
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
