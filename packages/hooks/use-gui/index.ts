import { isRef, onBeforeUnmount, onMounted } from 'vue'
import { GUI } from 'dat.gui'
import type { Ref } from 'vue'
import type { GUIParams } from 'dat.gui'

export function useGui(
  container: Ref<HTMLElement | undefined> | HTMLElement = document.body,
  option?: GUIParams
) {
  const gui = new GUI({ autoPlace: false, ...option })
  onMounted(() => {
    gui.domElement.classList.add('ft-dat-gui')
    let element: HTMLElement
    if (isRef(container)) {
      element = container.value!
    } else {
      element = container
    }
    element.appendChild(gui.domElement)
  })
  onBeforeUnmount(() => {
    gui.destroy()
  })
  return {
    gui,
  }
}
