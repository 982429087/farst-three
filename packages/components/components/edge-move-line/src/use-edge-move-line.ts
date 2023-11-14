import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  CatmullRomCurve3,
  Color,
  DoubleSide,
  Group,
  Object3D,
  Points,
  ShaderMaterial,
  Vector3,
} from 'three'
import type { GeoProjection } from 'd3-geo'
import type { Scene } from 'three'
import type { FeatureCollection, Geometry, Position } from '@turf/turf'

export type EdgeMoveLineOptions = {
  geoJson: FeatureCollection<Geometry>
}

export function useEdgeMoveLine(
  scene: Scene,
  projection: GeoProjection,
  geoJson: FeatureCollection<Geometry>
) {
  const group = new Group()
  const timeUniforms = {
    u_time: { value: 0.0 },
  }

  function initLineMaterial(setting: any) {
    const number = setting ? Number(setting.number) || 1.0 : 1.0
    const speed = setting ? Number(setting.speed) || 1.0 : 1.0
    const length = setting ? Number(setting.length) || 0.5 : 0.5
    const size = setting ? Number(setting.size) || 3.0 : 3.0
    const color = setting
      ? setting.color || new Vector3(0, 1, 1)
      : new Vector3(0, 1, 1)
    const singleUniforms = {
      u_time: timeUniforms.u_time,
      number: { type: 'f', value: number },
      speed: { type: 'f', value: speed },
      length: { type: 'f', value: length },
      size: { type: 'f', value: size },
      color: { type: 'v3', value: color },
    }
    const lineMaterial = new ShaderMaterial({
      uniforms: singleUniforms,
      vertexShader: `
        varying vec2 vUv;
        attribute float percent;
        uniform float u_time;
        uniform float number;
        uniform float speed;
        uniform float length;
        varying float opacity;
        uniform float size;
        void main() {
          vUv = uv;
          vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
          float l = clamp(1.0-length,0.0,1.0);
          gl_PointSize = clamp(fract(percent*number + l - u_time*number*speed)-l ,0.0,1.) * size * (1./length);
          opacity = gl_PointSize/size;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        #ifdef GL_ES
        precision mediump float;
        #endif
        varying float opacity;
        uniform vec3 color;
        void main(){
          if(opacity <=0.2){
            discard;
          }
          gl_FragColor = vec4(color,1.0);
        }
      `,
      transparent: true,
      side: DoubleSide,
      blending: AdditiveBlending,
    })
    return lineMaterial
  }

  function initFlyLine(
    curve: CatmullRomCurve3,
    matSetting: any,
    pointsNumber: any
  ) {
    const points = curve.getPoints(pointsNumber)
    const geometry = new BufferGeometry().setFromPoints(points)
    const length = points.length
    const percents = new Float32Array(length)
    for (let i = 0; i < points.length; i += 1) {
      percents[i] = i / length
    }
    geometry.setAttribute('percent', new BufferAttribute(percents, 1))
    const lineMaterial = initLineMaterial(matSetting)
    const flyLine = new Points(geometry, lineMaterial)
    return flyLine
  }

  geoJson.features.forEach((elem) => {
    const o3d = new Object3D()
    const coordinates = elem.geometry.coordinates as Position[][][]
    coordinates.forEach((multiPolygon) => {
      multiPolygon.forEach((polygon) => {
        const v3ps: Vector3[] = []
        for (const [, element] of polygon.entries()) {
          const [x, y] = projection(element as [number, number]) as number[]
          v3ps.push(new Vector3(x, -y, 4.2))
        }

        const curve = new CatmullRomCurve3(v3ps, true)
        const flyLine = initFlyLine(
          curve,
          {
            speed: 0.4,
            color: new Color('#ffff00'),
            number: 3, //同时跑动的流光数量
            length: 0.2, //流光线条长度
            size: 8, //粗细
          },
          10000
        )
        flyLine.position.set(0, 0.1, -3)
        flyLine.scale.multiplyScalar(1.001)
        flyLine.rotateX(-Math.PI / 2)
        o3d.add(flyLine)
      })
    })
    group.add(o3d)
  })

  scene.add(group)

  function render() {
    timeUniforms.u_time.value += 0.007
  }

  return {
    render,
  }
}
