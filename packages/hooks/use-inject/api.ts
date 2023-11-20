import {
  animationServiceInjectionKey,
  directionalLightInjectionKey,
  dragServiceInjectionKey,
  effectComposerInjectionKey,
  eventServiceInjectionKey,
  geometryInjectionKey,
  groupInjectionKey,
  hemisphereLightInjectionKey,
  materialInjectKey,
  materialServiceInjectionKey,
  object3dInjectionKey,
  pointLightInjectionKey,
  projectionInjectionKey,
  rectAreaLightInjectionKey,
  spotLightInjectionKey,
  storeServiceInjectionKey,
} from '@farst-three/constants/injection'
import { useInjection, useRefInjection } from '@farst-three/hooks'
import type { GeoProjection } from 'd3-geo'
import type { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import type {
  AnimationService,
  CountService,
  EventService,
  StoreService,
} from '@farst-three/hooks'
import type {
  BufferGeometry,
  DirectionalLight,
  Group,
  HemisphereLight,
  Material,
  Mesh,
  Object3D,
  PointLight,
  RectAreaLight,
  SpotLight,
} from 'three'

export function useStoreService() {
  return useInjection<StoreService>(storeServiceInjectionKey)
}

export function useContainer() {
  const container = useInjection<StoreService>(
    storeServiceInjectionKey
  ).getSceneRef()
  if (!container) {
    throw new Error('容器元素缺失')
  }
  return container
}

export function useRenderer() {
  const renderer = useInjection<StoreService>(
    storeServiceInjectionKey
  ).getRenderer()
  if (!renderer) {
    throw new Error('渲染器缺失')
  }
  return renderer
}

export function useRenderCamera() {
  const camera = useInjection<StoreService>(
    storeServiceInjectionKey
  ).getRenderCamera()
  if (!camera) {
    throw new Error('相机缺失')
  }
  return camera
}

export function useScene() {
  return useInjection<StoreService>(storeServiceInjectionKey).getScene()
}

export function useEventService() {
  return useInjection<EventService>(eventServiceInjectionKey)
}

export function useObj3d() {
  return useInjection<Mesh>(object3dInjectionKey)
}

export function useGeometry() {
  return useInjection<BufferGeometry>(geometryInjectionKey)
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
export function usePointLight() {
  return useInjection<PointLight>(pointLightInjectionKey)
}
export function useRectAreaLight() {
  return useInjection<RectAreaLight>(rectAreaLightInjectionKey)
}
export function useSpotLight() {
  return useInjection<SpotLight>(spotLightInjectionKey)
}

export function useDragService() {
  return useInjection<CountService<Object3D>>(dragServiceInjectionKey)
}

export function useEffectComposer() {
  return useRefInjection<EffectComposer>(effectComposerInjectionKey).value
}

export function useProjection() {
  return useInjection<GeoProjection>(projectionInjectionKey)
}
