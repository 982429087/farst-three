import { Mesh, MeshPhongMaterial, PlaneGeometry, TextureLoader } from 'three'
import { Reflector } from 'three/examples/jsm/objects/Reflector'
import type { ReflectorOptions } from 'three/examples/jsm/objects/Reflector'
import type { Scene } from 'three'

export type ReflectorPlaneOptions = {
  planeGeometry: ConstructorParameters<typeof PlaneGeometry>
  reflectorOptions: ReflectorOptions
}

export function useReflectorPlane(
  scene: Scene,
  options: ReflectorPlaneOptions = {
    planeGeometry: [800, 800],
    reflectorOptions: {},
  }
) {
  const textureLoader = new TextureLoader()

  const geometry = new PlaneGeometry(...options.planeGeometry)
  const mirror = new Reflector(geometry, {
    clipBias: 0.13,
    textureWidth: window.innerWidth * window.devicePixelRatio,
    textureHeight: window.innerHeight * window.devicePixelRatio,
    color: '#8f9299',
    ...options.reflectorOptions,
  })
  mirror.rotateX(-Math.PI / 2)
  scene.add(mirror)

  //底部颜色
  const texture = textureLoader.load('/geo/地板背景.png')
  const materialx = new MeshPhongMaterial({
    color: 0xffffff,
    map: texture,
    // emissive:0xffffff,
    emissiveMap: texture,
    transparent: true,
    opacity: 1,
    // depthTest: true,
    // roughness:1,
    // metalness:0,
    // depthWrite: false,
    // side: DoubleSide
  })
  const plane = new Mesh(geometry, materialx)
  plane.rotateX(-Math.PI / 2)
  plane.position.y = 0.05
  scene.add(plane)

  const circlePoint = textureLoader.load('/geo/circle-point.png')
  const material3 = new MeshPhongMaterial({
    color: 0x00ffff,
    map: circlePoint,
    transparent: true,
    opacity: 1,
    depthWrite: false,
    // depthTest: false,
  })
  const plane3 = new PlaneGeometry(120, 120)
  const mesh3 = new Mesh(plane3, material3)
  mesh3.rotateX(-Math.PI / 2)
  mesh3.position.y = 0.06
  scene.add(mesh3)

  function dispose() {
    scene.remove(mirror)
    scene.remove(plane)
    scene.remove(mesh3)
    mesh3.geometry.dispose()
    mesh3.material.dispose()

    plane.geometry.dispose()
    plane.material.dispose()
    mirror.dispose()
  }
  return {
    dispose,
  }
}
