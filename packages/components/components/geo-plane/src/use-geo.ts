import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  CatmullRomCurve3,
  Color,
  DoubleSide,
  ExtrudeGeometry,
  FileLoader,
  FrontSide,
  Group,
  Mesh,
  MeshBasicMaterial,
  MeshPhongMaterial,
  Object3D,
  PlaneGeometry,
  Points,
  RepeatWrapping,
  ShaderMaterial,
  Shape,
  TextureLoader,
  Vector2,
  Vector3,
} from 'three'
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial'
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry'
import { Line2 } from 'three/examples/jsm/lines/Line2'
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer'
import { geoMercator } from 'd3-geo'
import type { Scene } from 'three'
import type { FeatureCollection, Geometry } from '@turf/turf'
export function useGeo(scene: Scene) {
  const textureLoader = new TextureLoader()
  const WaveMeshArr: any = []
  const map = new Group()
  const uniforms2 = {
    u_time: { value: 0.0 },
  }
  function initMap(chinaJson: FeatureCollection<Geometry>) {
    const matLine = new LineMaterial({
      color: 0x68c5f6,
      linewidth: 0.002,
      vertexColors: true,
      dashed: false,
      alphaToCoverage: true,
    })

    const matLine2 = new LineMaterial({
      color: 0x45bff8,
      linewidth: 0.004,
      vertexColors: true,
      dashed: false,
      alphaToCoverage: true,
    })
    // d3-geo转化坐标
    const projection = geoMercator()
      .center([102.44662948242187, 30.927128325051036])
      .scale(450)
      .translate([0, 0])
    // 遍历省份构建模型
    chinaJson.features.forEach((elem) => {
      const province = new Object3D()
      const coordinates = elem.geometry.coordinates
      const properties = elem.properties
      //这里创建光柱
      initLightPoint(properties, projection)
      coordinates.forEach((multiPolygon: any) => {
        multiPolygon.forEach((polygon: any) => {
          const positions: number[] = []
          const colors: number[] = []
          const color = new Color()
          const linGeometry = new LineGeometry()
          for (const element of polygon) {
            const [x, y] = projection(element) as any
            positions.push(x, -y, 4.01)
            color.setHSL(1, 1, 1)
            colors.push(color.r, color.g, color.b)
          }
          //Line2
          linGeometry.setPositions(positions)
          linGeometry.setColors(colors)
          const line = new Line2(linGeometry, matLine)
          const line2 = new Line2(linGeometry, matLine2)
          line.computeLineDistances()
          line.rotateX(-Math.PI / 2)
          line2.rotateX(-Math.PI / 2)
          line.position.set(0, 0.1, -3)
          line2.position.set(0, -3.2, -3)
          line2.computeLineDistances()
          line.scale.set(1, 1, 1)
          province.add(line)
          province.add(line2)
        })
      })
      map.add(province)
    })
    scene.add(map)
  }

  function initMapMesh(chinaJson: any) {
    const singleUniforms = {
      color: { value: new Color('#02518d') }, //02518d
      repeat: { value: new Vector2(0.07, 0.07) },
      colorTexture: {
        value: new TextureLoader().load('/geo/geo-plane-texture.png'),
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

    const texture2 = new TextureLoader().load('/geo/gradation.png')
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

    // d3-geo转化坐标
    const projection = geoMercator()
      .center([102.44662948242187, 30.927128325051036])
      .scale(450)
      .translate([0, 0])
    // 遍历省份构建模型
    chinaJson.features.forEach((elem: any) => {
      // 新建一个省份容器：用来存放省份对应的模型和轮廓线
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

          //地图边缘飞光效果，有需要自行开启

          const curve = new CatmullRomCurve3(v3ps, true) //是否闭合
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

  function random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
  function initLightPoint(properties: any, projection: (...args: any) => any) {
    // 创建光柱
    const heightScaleFactor = 8 + random(1, 5) / 5
    const lightCenter = properties.centroid || properties.center
    const areaName = properties.name
    // let lightCenter = properties.centroid;
    // projection用来把经纬度转换成坐标
    const [x, y] = projection(lightCenter)
    const light = createLightPillar(x, y, heightScaleFactor)
    light.position.z -= 3
    // light.position.y = 13.31;
    map.add(light)

    //这里创建坐标
    createTextPoint(x, y, areaName)
  }

  function createTextPoint(x: number, z: number, areaName: string) {
    // 标签
    const tag = document.createElement('div')
    // tag.innerHTML = name
    tag.className = 'label-item'
    tag.style.pointerEvents = 'none'
    // tag.style.visibility = 'hidden'
    tag.style.position = 'absolute'
    const label = new CSS2DObject(tag)
    label.element.innerHTML = areaName
    label.element.style.visibility = 'visible'
    label.position.set(x, 5.01, z)
    label.position.z -= 3
    scene.add(label)
  }

  function createLightHalo(size: number) {
    // 标记点：几何体，材质，
    const geometry = new PlaneGeometry(1, 1)
    const material = new MeshBasicMaterial({
      map: textureLoader.load('/geo/geo-cycle-label.png'),
      color: '#00ffc4',
      side: DoubleSide,
      opacity: 0,
      transparent: true,
      depthWrite: false, //禁止写入深度缓冲区数据
    })
    const mesh = new Mesh(geometry, material)
    mesh.renderOrder = 2
    mesh.name = 'createLightHalo'
    mesh.rotation.x = Math.PI / 2
    // 缩放
    const scale = 1.8 * size
    ;(mesh as any).size = scale //自顶一个属性，表示mesh静态大小
    mesh.scale.set(scale, scale, scale)
    return mesh
  }

  function createPointMesh(size: number) {
    // 标记点：几何体，材质，
    const geometry = new PlaneGeometry(1, 1)
    const material = new MeshBasicMaterial({
      map: textureLoader.load('/geo/geo-label.png'),
      color: '#00ffc4', //0x00ffff
      side: DoubleSide,
      transparent: true,
      depthWrite: false, //禁止写入深度缓冲区数据
    })
    const mesh = new Mesh(geometry, material)
    mesh.renderOrder = 2
    mesh.rotation.x = Math.PI / 2
    mesh.name = 'createPointMesh'
    // 缩放
    const scale = 1 * size
    mesh.scale.set(scale, scale, scale)
    return mesh
  }

  function createLightPillar(x: number, z: number, heightScaleFactor = 1) {
    const group = new Group()
    // 柱体高度
    const height = heightScaleFactor
    // 柱体的geo,6.19=柱体图片高度/宽度的倍数
    const geometry = new PlaneGeometry(height / 6.219, height)
    // 柱体旋转90度，垂直于Y轴
    // geometry.rotateX(Math.PI / 2)
    // 柱体的z轴移动高度一半对齐中心点
    geometry.translate(0, height / 2, 0)
    // 柱子材质
    const material = new MeshBasicMaterial({
      map: textureLoader.load('/geo/light-column.png'),
      color: '#00ffc4', //ffff00
      transparent: true,
      depthWrite: false,
      // depthTest:false,
      side: DoubleSide,
    })
    // 光柱01
    const light01 = new Mesh(geometry, material)
    light01.renderOrder = 2
    light01.name = 'createLightPillar01'
    // 光柱02：复制光柱01
    const light02 = light01.clone()
    light02.renderOrder = 2
    light02.name = 'createLightPillar02'
    // 光柱02，旋转90°，跟 光柱01交叉
    light02.rotateY(Math.PI / 2)

    // 创建底部标点
    const bottomMesh = createPointMesh(1.5)

    // 创建光圈
    const lightHalo = createLightHalo(1.5)
    WaveMeshArr.push(lightHalo)
    // 将光柱和标点添加到组里
    group.add(bottomMesh, lightHalo, light01, light02)
    // 设置组对象的姿态
    // group = setMeshQuaternion(group, R, lon, lat)
    group.position.set(x, 4.01, z)
    return group
  }

  function initGeoJson() {
    const loader = new FileLoader()
    loader.load('/geo/sichuansheng.json', (data) => {
      const dataStr = data as string
      const jsonData = JSON.parse(dataStr)
      initMap(jsonData)
    })

    loader.load('/geo/sichuan-outLine.json', (data) => {
      const dataStr = data as string
      const jsonData = JSON.parse(dataStr)
      initMapMesh(jsonData)
    })
  }

  initGeoJson()

  function render() {
    uniforms2.u_time.value += 0.007

    if (WaveMeshArr.length) {
      WaveMeshArr.forEach((mesh: any) => {
        mesh._s += 0.007
        mesh.scale.set(
          mesh.size * mesh._s,
          mesh.size * mesh._s,
          mesh.size * mesh._s
        )
        if (mesh._s <= 1.5) {
          //mesh._s=1，透明度=0 mesh._s=1.5，透明度=1
          mesh.material.opacity = (mesh._s - 1) * 2
        } else if (mesh._s > 1.5 && mesh._s <= 2) {
          //mesh._s=1.5，透明度=1 mesh._s=2，透明度=0
          mesh.material.opacity = 1 - (mesh._s - 1.5) * 2
        } else {
          mesh._s = 1.0
        }
      })
    }
  }

  return {
    render,
  }
}
