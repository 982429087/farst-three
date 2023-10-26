import { isRef, onBeforeUnmount, onMounted } from 'vue'
import { Deferred } from '@farst-three/utils'
import type { Ref } from 'vue'
import type { GUI, GUIParams } from 'dat.gui'

export function useGui(
  container: Ref<HTMLElement> | HTMLElement = document.body,
  option?: GUIParams
) {
  const guiDef = new Deferred<GUI>()
  onMounted(async () => {
    const { GUI } = await import('dat.gui')
    const gui = new GUI({ autoPlace: false, ...option })
    guiDef.resolve(gui)
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
    guiDef.promise.then((res) => res.destroy())
  })
  return {
    guiPromise: guiDef.promise,
  }
}
