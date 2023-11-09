import { Mesh, MeshBasicMaterial, PlaneGeometry, TextureLoader } from 'three'
import { merge } from 'lodash'
import type { MeshBasicMaterialParameters, Scene } from 'three'

export type RotationPlaneOptions = {
  url: string
  speed?: number
  materialOptions?: MeshBasicMaterialParameters
  geometryOptions?: ConstructorParameters<typeof PlaneGeometry>
}

export function useRotationPlane(scene: Scene, ops: RotationPlaneOptions) {
  const defaultOptions = {
    url: '/geo/rotatingAperture.png',
    speed: 0.005,
    materialOptions: {},
    geometryOptions: [100, 100],
  }
  const options = merge(defaultOptions, ops)

  const texture = new TextureLoader().load(options.url)
  const material = new MeshBasicMaterial({
    map: texture,
    transparent: true,
    opacity: 1,
    depthTest: true,
    depthWrite: false,
    ...options.materialOptions,
  })
  const geometry = new PlaneGeometry(...(options.geometryOptions as any[]))
  const mesh = new Mesh(geometry, material)
  mesh.rotateX(-Math.PI / 2)
  mesh.position.y = 0.02
  mesh.scale.set(1, 1, 1)
  scene.add(mesh)

  function render() {
    if (mesh) {
      mesh.rotation.z += options.speed
    }
  }

  function dispose() {
    scene.remove(mesh)
    texture.dispose()
    material.dispose()
    geometry.dispose()
  }

  return {
    render,
    dispose,
    mesh,
  }
}
