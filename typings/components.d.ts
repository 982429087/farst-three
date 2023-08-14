// For this project development
import '@vue/runtime-core'

declare module '@vue/runtime-core' {
  // GlobalComponents for Volar
  export interface GlobalComponents {
    FtScene: typeof import('@farst-three/components')['FtScene']
    FtMeshBasicMaterial: typeof import('@farst-three/components')['FtMeshBasicMaterial']
    FtPerspectiveCamera: typeof import('@farst-three/components')['FtPerspectiveCamera'] // 透视相机
    FtMesh: typeof import('@farst-three/components')['FtMesh']
    FtWebglRenderer: typeof import('@farst-three/components')['FtWebglRenderer']
    FtBoxGeometry: typeof import('@farst-three/components')['FtBoxGeometry']
    FtOrthographicCamera: typeof import('@farst-three/components')['FtOrthographicCamera'] // 正交相机
    FtAxesHelper: typeof import('@farst-three/components')['FtAxesHelper']
    FtGridHelper: typeof import('@farst-three/components')['FtGridHelper']
    FtOrbitControls: typeof import('@farst-three/components')['FtOrbitControls']
    FtCameraHelper: typeof import('@farst-three/components')['FtCameraHelper']
    FtTubeGeometry: typeof import('@farst-three/components')['FtTubeGeometry']
    FtSphereGeometry: typeof import('@farst-three/components')['FtSphereGeometry']
    FtThumbnail: typeof import('@farst-three/components')['FtThumbnail']
    FtMeshLambertMaterial: typeof import('@farst-three/components')['FtMeshLambertMaterial']
    FtPlaneGeometry: typeof import('@farst-three/components')['FtPlaneGeometry']
    FtAmbientLight: typeof import('@farst-three/components')['FtAmbientLight']
    FtPointLight: typeof import('@farst-three/components')['FtPointLight']
    FtGroup: typeof import('@farst-three/components')['FtGroup']
    FtTextureLoader: typeof import('@farst-three/components')['FtTextureLoader']
    FtCubeTextureLoader: typeof import('@farst-three/components')['FtCubeTextureLoader']
    FtDirectionalLight: typeof import('@farst-three/components')['FtDirectionalLight']
    FtCylinderGeometry: typeof import('@farst-three/components')['FtCylinderGeometry']
    FtMeshStandardMaterial: typeof import('@farst-three/components')['FtMeshStandardMaterial']
    FtMeshPhongMaterial: typeof import('@farst-three/components')['FtMeshPhongMaterial']
    FtTorusGeometry: typeof import('@farst-three/components')['FtTorusGeometry']
    FtMeshMatcapMaterial: typeof import('@farst-three/components')['FtMeshMatcapMaterial']
    FtMeshDepthMaterial: typeof import('@farst-three/components')['FtMeshDepthMaterial']
    FtMeshToonMaterial: typeof import('@farst-three/components')['FtMeshToonMaterial']
    FtMeshPhysicalMaterial: typeof import('@farst-three/components')['FtMeshPhysicalMaterial']
    FtRgbeLoader: typeof import('@farst-three/components')['FtRgbeLoader']
    FtShadowMaterial: typeof import('@farst-three/components')['FtShadowMaterial']
    FtLine: typeof import('@farst-three/components')['FtLine']
    FtBufferGeometry: typeof import('@farst-three/components')['FtBufferGeometry']
    FtLineBasicMaterial: typeof import('@farst-three/components')['FtLineBasicMaterial']
    FtDirectionalLightHelper: typeof import('@farst-three/components')['FtDirectionalLightHelper']
    FtHemisphereLight: typeof import('@farst-three/components')['FtHemisphereLight']
    FtHemisphereLightHelper: typeof import('@farst-three/components')['FtHemisphereLightHelper']
    FtPointLightHelper: typeof import('@farst-three/components')['FtPointLightHelper']
    FtPoints: typeof import('@farst-three/components')['FtPoints']
    FtPointsMaterial: typeof import('@farst-three/components')['FtPointsMaterial']
    FtRectAreaLight: typeof import('@farst-three/components')['FtRectAreaLight']
    FtRectAreaLightHelper: typeof import('@farst-three/components')['FtRectAreaLightHelper']
    FtSpotLight: typeof import('@farst-three/components')['FtSpotLight']
    FtSoptLightHelper: typeof import('@farst-three/components')['FtSoptLightHelper']
    FtFog: typeof import('@farst-three/components')['FtFog']
    FtRingGeometry: typeof import('@farst-three/components')['FtRingGeometry']
    FtFogExp2: typeof import('@farst-three/components')['FtFogExp2']
    FtSprite: typeof import('@farst-three/components')['FtSprite']
    FtSpriteMaterial: typeof import('@farst-three/components')['FtSpriteMaterial']
  }
}

export {}
