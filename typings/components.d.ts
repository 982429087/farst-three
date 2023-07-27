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
  }
}

export {}
