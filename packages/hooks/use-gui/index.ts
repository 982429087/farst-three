import { onBeforeUnmount, onMounted } from 'vue'
import { GUI } from 'dat.gui'
import type { GUIParams } from 'dat.gui'

export function useGui(
  option?: GUIParams,
  container: HTMLElement = document.body
) {
  const gui = new GUI({ autoPlace: false, ...option })
  onMounted(() => {
    gui.domElement.classList.add('ft-dat-gui')
    container.appendChild(gui.domElement)
  })
  onBeforeUnmount(() => {
    gui.destroy()
  })
  return {
    gui,
  }
}
