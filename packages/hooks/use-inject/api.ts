import {
  animationServiceInjectionKey,
  directionalLightInjectionKey,
  geometryInjectionKey,
  groupInjectionKey,
  hemisphereLightInjectionKey,
  materialInjectKey,
  materialServiceInjectionKey,
  object3dInjectionKey,
  rendererInjectionKey,
  storeServiceInjectionKey,
} from '@farst-three/constants/injection'
import { useInjection } from '@farst-three/hooks'
import type { AnimationService } from '@farst-three/components'
import type { CountService, StoreService } from '@farst-three/hooks'
import type {
  BufferGeometry,
  DirectionalLight,
  Group,
  HemisphereLight,
  Material,
  Mesh,
  Renderer,
} from 'three'

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

export function useObj3d() {
  return useInjection<Mesh>(object3dInjectionKey)
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

export function useMaterialService() {
  return useInjection<CountService<Material>>(materialServiceInjectionKey)
}
export function useDirectionalLight() {
  return useInjection<DirectionalLight>(directionalLightInjectionKey)
}
export function useHemisphereLight() {
  return useInjection<HemisphereLight>(hemisphereLightInjectionKey)
}
