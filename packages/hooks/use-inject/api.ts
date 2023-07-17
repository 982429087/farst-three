import {
  animationServiceInjectionKey,
  geometryInjectionKey,
  groupInjectionKey,
  materialInjectKey,
  meshInjectionKey,
  rendererInjectionKey,
  storeServiceInjectionKey,
} from '@farst-three/constants/injection'
import { useInjection } from '@farst-three/hooks'
import type { AnimationService } from '@farst-three/components'
import type { StoreService } from '@farst-three/hooks'
import type { BufferGeometry, Group, Material, Mesh, Renderer } from 'three'

export function useStoreService() {
  return useInjection<StoreService>(storeServiceInjectionKey)
}

export function useSceneRef() {
  const sceneRef = useInjection<StoreService>(
    storeServiceInjectionKey
  ).getSceneRef()
  if (!sceneRef) {
    throw new Error('sceneRef is not defined')
  }
  return sceneRef
}

export function useScene() {
  return useInjection<StoreService>(storeServiceInjectionKey).getScene()
}

export function useMesh() {
  return useInjection<Mesh>(meshInjectionKey)
}

export function useGeometry() {
  return useInjection<BufferGeometry>(geometryInjectionKey)
}

export function useRenderer() {
  return useInjection<Renderer>(rendererInjectionKey)
}

export function useAnimationService() {
  return useInjection<AnimationService>(animationServiceInjectionKey)
}

export function useGroup() {
  return useInjection<Group>(groupInjectionKey, null)
}

export function useMaterial() {
  return useInjection<Material>(materialInjectKey)
}
