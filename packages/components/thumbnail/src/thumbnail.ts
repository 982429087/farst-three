import { buildProps } from '@farst-three/utils'

import type { ExtractPropTypes } from 'vue'
import type Thumbnail from './thumbnail.vue'

export const thumbnailProps = buildProps({})
export const thumbnailEmits = {
  load: (e: any) => e,
}

export type ThumbnailEmits = typeof thumbnailEmits
export type ThumbnailProps = ExtractPropTypes<typeof thumbnailProps>
export type ThumbnailInstance = InstanceType<typeof Thumbnail>
