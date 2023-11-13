import {
  DoubleSide,
  Group,
  Mesh,
  MeshBasicMaterial,
  PlaneGeometry,
  TextureLoader,
} from 'three'
import { merge } from 'lodash'
import type { GeoProjection } from 'd3-geo'
import type { MeshBasicMaterialParameters, Scene } from 'three'

export type PointMarkerOptions = {
  x?: number
  y?: number
  z?: number
  scale?: number
  xKey?: string
  yKey?: string
  zKey?: string
  materialOptions?: MeshBasicMaterialParameters
  texture?: string
  waveTexture?: string
  speed?: number
}

export function usePointMarker(
  o3d: Scene | Group,
  opts: PointMarkerOptions,
  projection?: GeoProjection
) {
  const defaultOptions: PointMarkerOptions = {
    x: 0,
    y: 0,
    z: 0,
    scale: 1.5,
    xKey: 'x',
    yKey: 'y',
    zKey: 'z',
    speed: 0.007,
    texture: '/geo/geo-label.png',
    waveTexture: '/geo/geo-cycle-label.png',
    materialOptions: {},
  }
  const options = merge(defaultOptions, opts)
  const textureLoader = new TextureLoader()
  const group = new Group()
  const [x, y] = projection
    ? (projection([options.x!, options.y!]) as number[])
    : [options.x!, options.y!]
  const position: Record<string, number> = {
    x,
    y,
    z: options.z!,
  }

  group.position.set(
    position[options.xKey!],
    position[options.yKey!],
    position[options.zKey!]
  )

  function createLightHalo(scaleSize: number) {
    const geometry = new PlaneGeometry(1, 1)
    const material = new MeshBasicMaterial({
      map: textureLoader.load(options.waveTexture!),
      color: '#00ffc4',
      side: DoubleSide,
      opacity: 0,
      transparent: true,
      depthWrite: false,
      ...options.materialOptions,
    })
    const mesh = new Mesh(geometry, material)
    mesh.renderOrder = 2
    mesh.name = 'createLightHalo'
    mesh.rotation.x = Math.PI / 2
    const scale = 1.8 * scaleSize
    ;(mesh as any).size = scale
    mesh.scale.set(scale, scale, scale)
    return mesh
  }

  function createPointMesh(scaleSize: number) {
    const geometry = new PlaneGeometry(1, 1)
    const material = new MeshBasicMaterial({
      map: textureLoader.load(options.texture!),
      color: '#00ffc4',
      side: DoubleSide,
      transparent: true,
      depthWrite: false,
      ...options.materialOptions,
    })
    const mesh = new Mesh(geometry, material)
    mesh.renderOrder = 2
    mesh.rotation.x = Math.PI / 2
    mesh.name = 'createPointMesh'
    const scale = 1 * scaleSize
    mesh.scale.set(scale, scale, scale)
    return mesh
  }

  function render() {
    const wm = waveMesh as any
    wm._s += options.speed!
    wm.scale.set(wm.size * wm._s, wm.size * wm._s, wm.size * wm._s)
    if (wm._s <= 1.5) {
      //mesh._s=1，透明度=0 mesh._s=1.5，透明度=1
      wm.material.opacity = (wm._s - 1) * 2
    } else if (wm._s > 1.5 && wm._s <= 2) {
      //mesh._s=1.5，透明度=1 mesh._s=2，透明度=0
      wm.material.opacity = 1 - (wm._s - 1.5) * 2
    } else {
      wm._s = 1.0
    }
  }

  function dispose() {
    o3d.remove(group)
    group.remove(haloMesh, waveMesh)
    haloMesh.geometry.dispose()
    haloMesh.material.dispose()
    waveMesh.geometry.dispose()
    waveMesh.material.dispose()
  }

  const waveMesh = createLightHalo(options.scale!)
  const haloMesh = createPointMesh(options.scale!)
  group.add(haloMesh, waveMesh)
  o3d.add(group)

  return {
    render,
    dispose,
    haloMesh,
    waveMesh,
    group,
  }
}
