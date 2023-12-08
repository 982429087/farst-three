import { Mesh, MeshPhongMaterial, PlaneGeometry, TextureLoader } from 'three'
import { Reflector } from 'three/examples/jsm/objects/Reflector'
import { merge } from 'lodash'
import { config } from '@farst-three/constants'
import type { ReflectorOptions } from 'three/examples/jsm/objects/Reflector'
import type { MeshPhongMaterialParameters, Scene } from 'three'

export type ReflectorPlaneOptions = {
  mirrorPlaneGeometryOptions?: ConstructorParameters<typeof PlaneGeometry>
  circlePlaneGeometryOptions?: ConstructorParameters<typeof PlaneGeometry>
  circleMaterialOptions?: MeshPhongMaterialParameters
  floorMaterialOptions?: MeshPhongMaterialParameters
  reflectorOptions?: ReflectorOptions
}

export function useReflectorPlane(
  scene: Scene,
  container: HTMLElement,
  opts?: ReflectorPlaneOptions
) {
  const defaultOptions = {
    mirrorPlaneGeometryOptions: [800, 800],
    reflectorOptions: {},
    circlePlaneGeometryOptions: [120, 120],
    circleMaterialOptions: {},
    floorMaterialOptions: {},
  }
  const options = merge(defaultOptions, opts)
  const textureLoader = new TextureLoader()

  // 反射面
  const dpr = window.devicePixelRatio
  const width = container.offsetWidth * dpr
  const height = container.offsetHeight * dpr
  const geometry = new PlaneGeometry(...options.mirrorPlaneGeometryOptions)
  const mirror = new Reflector(geometry, {
    clipBias: 0.01,
    textureWidth: width,
    textureHeight: height,
    color: '#8f9299',
    ...options.reflectorOptions,
  })
  mirror.rotateX(-Math.PI / 2)
  mirror.position.y = -0.1
  scene.add(mirror)

  //底部颜色
  const texture = textureLoader.load(
    `${config.staticUrl}geo/floor-background.png`
  )
  const floorMaterial = new MeshPhongMaterial({
    color: 0xffffff,
    map: texture,
    // emissive:0xffffff,
    emissiveMap: texture,
    transparent: true,
    opacity: 1,
    // depthTest: true,
    // roughness:1,
    // metalness:0,
    depthWrite: false,
    // side: DoubleSide
    ...options.floorMaterialOptions,
  })
  const floorMesh = new Mesh(geometry, floorMaterial)
  floorMesh.rotateX(-Math.PI / 2)
  floorMesh.position.y = 0.3
  scene.add(floorMesh)

  // 点阵图片
  const circlePoint = textureLoader.load(
    `${config.staticUrl}geo/floor-circle-point.png`
  )
  const circlePlane = new PlaneGeometry(
    ...(options.circlePlaneGeometryOptions as any)
  )
  const circleMaterial = new MeshPhongMaterial({
    color: 0x00ffff,
    map: circlePoint,
    transparent: true,
    opacity: 1,
    depthWrite: false,
    // depthTest: false,
    ...options.circleMaterialOptions,
  })
  const circleMesh = new Mesh(circlePlane, circleMaterial)
  circleMesh.rotateX(-Math.PI / 2)
  circleMesh.position.y = 0.4
  scene.add(circleMesh)

  function dispose() {
    scene.remove(mirror)
    scene.remove(floorMesh)
    scene.remove(circleMesh)
    circleMesh.geometry.dispose()
    circleMesh.material.dispose()

    floorMesh.geometry.dispose()
    floorMesh.material.dispose()
    mirror.dispose()
  }
  return {
    dispose,
    circleMesh,
    mirror,
    floorMesh,
  }
}
