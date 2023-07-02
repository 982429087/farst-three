import {
  boxGeometryInjectionKey,
  cameraInjectionKey,
  meshInjectionKey,
  sceneInjectionKey,
  sceneRefInjectionKey,
} from '@farst-three/constants/injection'
import { useInjection } from '.'
import type { BoxGeometry, Camera, Mesh, Scene } from 'three'

export function useScene() {
  return useInjection<Scene>(sceneInjectionKey)
}

export function useMesh() {
  return useInjection<Mesh>(meshInjectionKey)
}

export function useBoxGeometry() {
  return useInjection<BoxGeometry>(boxGeometryInjectionKey)
}

export function useSceneRef() {
  return useInjection<HTMLDivElement>(sceneRefInjectionKey)
}

export function useCamera() {
  return useInjection<Camera>(cameraInjectionKey)
}