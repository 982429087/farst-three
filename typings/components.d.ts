// For this project development
import '@vue/runtime-core'

declare module '@vue/runtime-core' {
  // GlobalComponents for Volar
  export interface GlobalComponents {
    FtScene: typeof import('../packages/farst-three')['FtScene']
  }
}

export {}
