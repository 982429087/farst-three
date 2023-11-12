import {
  DoubleSide,
  Group,
  Mesh,
  MeshBasicMaterial,
  PlaneGeometry,
  TextureLoader,
} from 'three'
// import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer'
import { random } from '@farst-three/utils'
import type { GeoProjection } from 'd3-geo'
import type { Material, Object3D, Scene } from 'three'

export type MarkPoints = {
  center: [number, number]
  name: string
}

export function useMarkPoint(
  map: Object3D | Scene,
  projection: GeoProjection,
  points: MarkPoints[]
) {
  const textureLoader = new TextureLoader()
  const WaveMeshArr: Mesh[] = []

  function initLightPoint(properties: MarkPoints) {
    if (!properties) return
    // 创建光柱
    const heightScaleFactor = 8 + random(1, 5) / 5
    const lightCenter = properties.center
    const [x, y] = projection(lightCenter) as number[]
    const light = createLightPillar(x, y, heightScaleFactor)
    light.position.z -= 3
    // light.position.y = 13.31;
    map.add(light)
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

  // 光圈
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

  // 标记点
  function createPointMesh(size: number) {
    // 标记点：几何体，材质，
    const geometry = new PlaneGeometry(1, 1)
    const material = new MeshBasicMaterial({
      map: textureLoader.load('/geo/geo-label.png'),
      color: '#00ffc4', //0x00ffff
      side: DoubleSide,
      transparent: true,
      depthWrite: false, // 禁止写入深度缓冲区数据
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

  function render() {
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

  function dispose() {
    WaveMeshArr.forEach((mesh) => {
      mesh.geometry.dispose()
      ;(mesh.material as Material).dispose()
      map.remove(mesh)
    })
    WaveMeshArr.length = 0
    map.remove(...map.children)
  }

  points.forEach((elem) => {
    initLightPoint(elem)
  })

  return {
    render,
    dispose,
  }
}
