import { componentSizeMap } from '@farst-three/constants'

import type { ComponentSize } from '@farst-three/constants'

export const getComponentSize = (size?: ComponentSize) => {
  return componentSizeMap[size || 'default']
}
