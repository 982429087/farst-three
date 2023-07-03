import { onBeforeUnmount } from 'vue'
import { GUI } from 'dat.gui'

export function useGui() {
  const gui = new GUI()
  onBeforeUnmount(() => {
    gui.destroy()
  })
  return {
    gui,
  }
}
