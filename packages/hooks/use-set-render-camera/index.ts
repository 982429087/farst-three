import { watch } from 'vue'
import { useStoreService } from '@farst-three/hooks'

export function useSetRenderCamera(props: any, camera: any) {
  const storeService = useStoreService()
  watch(
    () => props.isRenderCamera,
    (val) => {
      if (val) storeService.setRenderCamera(camera)
    },
    {
      immediate: true,
    }
  )
}
