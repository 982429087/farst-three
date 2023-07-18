import { provide } from 'vue'
import { materialInjectKey } from '@farst-three/constants'
import { useMesh, useScene } from '@farst-three/hooks'
import { isFunction } from '@farst-three/utils'
import type { Material } from 'three'

/**
 * props一定要有initCount、params
 * emit一定要有load
 * @param props
 * @param emit
 * @param clzss
 */
export function useMaterialProvide<
  T extends { [key: string]: any },
  R extends (...args: any) => any,
  X extends new (...rest: any) => any
>(props: T, emit: R, clzss: X) {
  const mesh = useMesh()
  const scene = useScene()
  // init here

  const materials: Material[] = []
  for (let i = 0; i < props.initCount; i++) {
    const params = isFunction(props.params) ? props.params(i) : props.params
    const material = new clzss(params)
    materials.push(material)
  }

  if (props.initCount === 1) {
    mesh.material = materials[0]
    provide(materialInjectKey, materials[0])
    emit('load', { material: materials[0], mesh, scene })
  } else {
    mesh.material = materials
    provide(materialInjectKey, materials)
    emit('load', { materials, mesh, scene })
  }
  return {
    mesh,
    scene,
    materials,
  }
}
