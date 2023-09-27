import { isRef, onBeforeUnmount, onMounted } from 'vue'
import type { Ref } from 'vue'
import type { GUI, GUIParams } from 'dat.gui'

export function useGui(
  container: Ref<HTMLElement | undefined> | HTMLElement = document.body,
  option?: GUIParams
) {
  let gui = {} as GUI
  onMounted(async () => {
    const { GUI } = await import('dat.gui')
    gui = new GUI({ autoPlace: false, ...option })

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
