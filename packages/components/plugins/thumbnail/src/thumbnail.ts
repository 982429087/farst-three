import { buildProps, definePropType } from '@farst-three/utils'

import {
  orthographicCameraEmits,
  orthographicCameraProps,
} from '@farst-three/components'
import type { AnimationFunsParams } from '@farst-three/hooks'
import type { ExtractPropTypes } from 'vue'
import type Thumbnail from './thumbnail.vue'

export const thumbnailProps = buildProps({
  ...orthographicCameraProps,
  width: {
    type: Number,
    default: 200,
  },
  height: {
    type: Number,
    default: 200,
  },
  clearCloor: {
    type: String,
    default: '#000000',
  },
  clearCloorAlpha: {
    type: Number,
    default: 1,
  },
  margin: {
    type: Number,
    default: 20,
  },
  animationFn: {
    type: definePropType<(e: AnimationFunsParams) => void>(Function),
  },
})
export const thumbnailEmits = {
  ...orthographicCameraEmits,
}

export type ThumbnailEmits = typeof thumbnailEmits
export type ThumbnailProps = ExtractPropTypes<typeof thumbnailProps>
export type ThumbnailInstance = InstanceType<typeof Thumbnail>
