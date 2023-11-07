import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import type { TextGeometryParameters } from 'three/examples/jsm/geometries/TextGeometry'

export type UseTextGeometryOptions = {
  url: string
  text: string
}
export function useTextGeometry(
  options: UseTextGeometryOptions,
  params?: Omit<TextGeometryParameters, 'font'>,
  onProgress?: (event: ProgressEvent) => void
) {
  const loader = new FontLoader()
  return new Promise<TextGeometry>((resolve, reject) => {
    loader.load(
      options.url,
      (font) => {
        const geometry = new TextGeometry(
          options.text,
          params ? { ...params, font } : { font }
        )
        resolve(geometry)
      },
      onProgress,
      reject
    )
  })
}
