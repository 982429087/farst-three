import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  CatmullRomCurve3,
  Color,
  DoubleSide,
  ExtrudeGeometry,
  FrontSide,
  Group,
  Mesh,
  MeshPhongMaterial,
  Object3D,
  Points,
  RepeatWrapping,
  ShaderMaterial,
  Shape,
  TextureLoader,
  Vector2,
  Vector3,
} from 'three'

import type { GeoProjection } from 'd3-geo'
import type { Scene } from 'three'
import type { FeatureCollection, Geometry } from '@turf/turf'
export function useGeoJsonPlane(
  scene: Scene,
  projection: GeoProjection,
  geoJson: FeatureCollection<Geometry>
) {
  const textureLoader = new TextureLoader()
  const map = new Group()
  const uniforms2 = {
    u_time: { value: 0.0 },
  }
  function initMapMesh() {
    const singleUniforms = {
      color: { value: new Color('#02518d') }, //02518d
      repeat: { value: new Vector2(0.07, 0.07) },
      colorTexture: {
        value: textureLoader.load('/geo/geo-plane-texture.png'),
      },
    }
    singleUniforms['colorTexture'].value.wrapS = singleUniforms[
      'colorTexture'
    ].value.wrapT = RepeatWrapping
    const material = new ShaderMaterial({
      uniforms: singleUniforms,
      vertexShader: `
				varying vec2 vUv;
				varying vec3 fNormal;
				varying vec3 vPosition;
				void main()
				{
				  vUv = uv;
				  fNormal=normal;
				  vPosition=position;

				  vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
				  gl_Position = projectionMatrix * mvPosition;
				}
			`,
      fragmentShader: `
        varying vec2 vUv;
        uniform sampler2D colorTexture;
        uniform sampler2D colorTexture2;
        uniform vec2 repeat;
        varying vec3 fNormal;
        varying vec3 vPosition;
        uniform vec3 color;
        void main( void ) {
          vec2 position = vUv;
          vec3 tempNomal= normalize(fNormal);
          float power=step(0.95,abs(tempNomal.y));
          vec4 colorb= vec4(color,1.0);
          vec4 colora = texture2D(colorTexture,vec2((vUv*repeat).x,fract((vUv*repeat).y)));
          gl_FragColor = vec4( (colora).r*1., (colora).g*1., (colora).b*1., colora+colorb );
          gl_FragColor=colora+colorb;
        }
				`,
      transparent: true,
      opacity: 1,
      side: FrontSide,
      // blending:AdditiveBlending
    })

    const texture2 = textureLoader.load('/geo/gradation.png')
    texture2.center.set(0.5, 0.5)
    texture2.rotation = Math.PI

    const material1 = new MeshPhongMaterial({
      // color: '#ffffff',
      map: texture2,
      transparent: false,
      depthTest: true,
      opacity: 1,
    })

    function initLineMaterial(setting: any) {
      const number = setting ? Number(setting.number) || 1.0 : 1.0
      const speed = setting ? Number(setting.speed) || 1.0 : 1.0
      const length = setting ? Number(setting.length) || 0.5 : 0.5
      const size = setting ? Number(setting.size) || 3.0 : 3.0
      const color = setting
        ? setting.color || new Vector3(0, 1, 1)
        : new Vector3(0, 1, 1)
      const singleUniforms = {
        u_time: uniforms2.u_time,
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
        void main()
        {
          vUv = uv;
          vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
          float l = clamp(1.0-length,0.0,1.0);
          gl_PointSize = clamp(fract(percent*number + l - u_time*number*speed)-l ,0.0,1.) * size * (1./length);
          opacity = gl_PointSize/size;
          gl_Position = projectionMatrix * mvPosition;
        }`,
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
        }`,
        transparent: true,
        side: DoubleSide,
        blending: AdditiveBlending,
      })
      return lineMaterial
    }

    function initFlyLine(curve: any, matSetting: any, pointsNumber: any) {
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

    geoJson.features?.forEach((elem: any) => {
      const meshArrs = new Object3D()
      const coordinates = elem.geometry.coordinates
      coordinates.forEach((multiPolygon: any) => {
        multiPolygon.forEach((polygon: any) => {
          const shape = new Shape()
          const v3ps: Vector3[] = []
          for (const [i, element] of polygon.entries()) {
            const [x, y] = projection(element) as any
            if (i === 0) {
              shape.moveTo(x, -y)
            }
            shape.lineTo(x, -y)
            v3ps.push(new Vector3(x, -y, 4.02))
          }
          const extrudeSettings = {
            depth: 3, //该属性指定图形可以拉伸多高，默认值是100
            bevelEnabled: false, //是否给这个形状加斜面，默认加斜面。
          }
          //拉升成地图
          const geometry = new ExtrudeGeometry(shape, extrudeSettings)
          const mesh = new Mesh(geometry, [material, material1])
          mesh.rotateX(-Math.PI / 2)
          mesh.position.set(0, 1, -3)
          meshArrs.add(mesh)

          //地图边缘飞光效果
          //是否闭合
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
          meshArrs.add(flyLine)
        })
      })
      map.add(meshArrs)
    })
    scene.add(map)
  }

  initMapMesh()
  function dispose() {
    map.traverse((obj) => {
      if (obj instanceof Mesh) {
        obj.geometry.dispose()
        obj.material.dispose?.()
      }
    })
    scene.remove(map)
  }
  function render() {
    uniforms2.u_time.value += 0.007
  }

  return {
    render,
    dispose,
  }
}
