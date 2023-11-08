import { PlaneGeometry } from 'three'
import { Reflector } from 'three/examples/jsm/objects/Reflector'
import type { Scene } from 'three'
export function useReflector(scene: Scene) {
  const geometry = new PlaneGeometry(1000, 1000)
  const verticalMirror = new Reflector(geometry, {
    clipBias: 0,
    textureWidth: 1000,
    textureHeight: 600,
    color: 0xffffff,
  })
  verticalMirror.position.y = 50
  verticalMirror.position.z = -50
  scene.add(verticalMirror)

  // function render () {

  // }
}
