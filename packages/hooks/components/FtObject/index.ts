import type { AnyFun } from '@farst-three/utils'

export interface FtObject {
  render: AnyFun
  loop: AnyFun
  dispose: AnyFun
}
