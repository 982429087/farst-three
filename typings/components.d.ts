// For this project development
import '@vue/runtime-core'

declare module '@vue/runtime-core' {
  // GlobalComponents for Volar
  export interface GlobalComponents {
    FtScene: typeof import('@farst-three/components')['FtScene']
    FtMeshBasicMaterial: typeof import('@farst-three/components')['FtMeshBasicMaterial']
    FtPerspectiveCamera: typeof import('@farst-three/components')['FtPerspectiveCamera']
    FtMesh: typeof import('@farst-three/components')['FtMesh']
    FtWebglRenderer: typeof import('@farst-three/components')['FtWebglRenderer']
    FtBoxGeometry: typeof import('@farst-three/components')['FtBoxGeometry']
  }
}

export {}
