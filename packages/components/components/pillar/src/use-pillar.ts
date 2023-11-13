import {
  DoubleSide,
  Group,
  Mesh,
  MeshBasicMaterial,
  PlaneGeometry,
  TextureLoader,
} from 'three'
import { merge } from 'lodash'
import type { MeshBasicMaterialParameters, Scene } from 'three'
import type { GeoProjection } from 'd3-geo'

export type PillarOptions = {
  x?: number
  y?: number
  z?: number
  height?: number
  offsetX?: number
  offsetY?: number
  offsetZ?: number
  xKey?: string
  yKey?: string
  zKey?: string
  hwRatio?: number // 6.19=柱体图片高度/宽度
  materialOptions?: MeshBasicMaterialParameters
  texture?: string
}

export function usePillar(
  o3d: Group | Scene,
  opts: PillarOptions,
  projection?: GeoProjection
) {
  const defaultOptions: PillarOptions = {
    x: 0,
    y: 0,
    z: 0,
    offsetX: 0,
    offsetY: 0,
    offsetZ: 0,
    xKey: 'x',
    yKey: 'y',
    zKey: 'z',
    height: 3,
    hwRatio: 6.219,
    texture: '/geo/light-column.png',
    materialOptions: {},
  }
  const textureLoader = new TextureLoader()
  const group = new Group()
  const options = merge(defaultOptions, opts)

  const height = options.height!
  const center = [options.x!, options.y!] as [number, number]
  const [x, y] = projection ? (projection(center) as number[]) : center
  const position: Record<string, number> = { x, y, z: options.z! }

  function createLightPillar() {
    const geometry = new PlaneGeometry(height / options.hwRatio!, height)
    // 柱体的z轴移动高度一半对齐中心点
    geometry.translate(0, height / 2, 0)

    const material = new MeshBasicMaterial({
      map: textureLoader.load(options.texture!),
      color: '#00ffc4',
      transparent: true,
      depthWrite: false,
      // depthTest:false,
      side: DoubleSide,
      ...options.materialOptions,
    })
    const pillar = new Mesh(geometry, material)
    pillar.renderOrder = 2
    pillar.name = 'createLightPillar01'
    // 光柱02：复制光柱01
    const pillar2 = pillar.clone()
    pillar2.renderOrder = 2
    pillar2.name = 'createLightPillar02'
    // 光柱02，旋转90°，跟 光柱01交叉
    pillar2.rotateY(Math.PI / 2)
    group.add(pillar, pillar2)
    group.position.set(
      position[options.xKey!],
      position[options.yKey!],
      position[options.zKey!]
    )
  }

  function dispose() {
    o3d.remove(group)
    group.children.forEach((child) => {
      if (child instanceof Mesh) {
        child.geometry.dispose()
        child.material.dispose()
      }
    })
    group.remove(...group.children)
  }

  createLightPillar()
  group.position.z += options.offsetZ!
  group.position.x += options.offsetX!
  group.position.y += options.offsetY!

  o3d.add(group)
  return {
    group,
    dispose,
  }
}
