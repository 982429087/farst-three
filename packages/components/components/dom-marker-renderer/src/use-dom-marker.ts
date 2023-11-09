import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer'
import type { Camera, Scene } from 'three'
export function useDomMarker(
  scene: Scene,
  camera: Camera,
  container: HTMLElement
) {
  const labelRenderer = new CSS2DRenderer()
  labelRenderer.setSize(container.offsetWidth, container.offsetHeight)
  labelRenderer.domElement.className = 'ft-dom-marker-container'
  container.appendChild(labelRenderer.domElement)

  const resize = () => {
    labelRenderer.setSize(container.offsetWidth, container.offsetHeight)
  }
  const observer = new ResizeObserver(resize)
  observer.observe(container)

  function dispose() {
    observer.unobserve(container)
    observer.disconnect()
    container.removeChild(labelRenderer.domElement)
  }

  function render() {
    labelRenderer.render(scene, camera)
  }

  return {
    render,
    dispose,
  }
}
