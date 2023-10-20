import { Frustum, Matrix4 } from 'three'
import type { BufferGeometry, Camera } from 'three'

export function useIntersect(camera: Camera, geometry: BufferGeometry) {
  const frustum = new Frustum()
  camera.updateMatrixWorld()
  frustum.setFromProjectionMatrix(
    new Matrix4().multiplyMatrices(
      camera.projectionMatrix,
      camera.matrixWorldInverse
    )
  )
  if (geometry.boundingBox) return frustum.intersectsBox(geometry.boundingBox)
  else return false
}
