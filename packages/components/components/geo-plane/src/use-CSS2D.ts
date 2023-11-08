import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer'
import type { Camera, Scene } from 'three'

export function useCSS2D(scene: Scene, camera: Camera, container: HTMLElement) {
  const labelRenderer = new CSS2DRenderer()
  labelRenderer.setSize(container.offsetWidth, container.offsetHeight)
  labelRenderer.domElement.style.position = 'absolute'
  labelRenderer.domElement.style.top = '0px'
  labelRenderer.domElement.style.pointerEvents = 'none'
  container.appendChild(labelRenderer.domElement)

  const resize = () => {
    labelRenderer.setSize(container.offsetWidth, container.offsetHeight)
  }
  const observer = new ResizeObserver(resize)
  observer.observe(container)

  function destroy() {
    observer.unobserve(container)
    observer.disconnect()
    container.removeChild(labelRenderer.domElement)
  }

  function render() {
    labelRenderer.render(scene, camera)
  }

  return {
    render,
    destroy,
  }
}
