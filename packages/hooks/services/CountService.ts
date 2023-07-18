import { shallowRef } from 'vue'

export class CountService<T extends { [key: string]: any }> {
  public materials = shallowRef<T[]>([])

  constructor(public keyStr = 'id') {}

  setMaterials(materials: T[]) {
    this.materials.value = materials
  }

  clearMaterials() {
    this.materials.value = []
  }

  addCount(material: T) {
    this.materials.value.push(material)
  }

  subCount(material: T) {
    const index = this.materials.value.findIndex(
      (item) => item[this.keyStr] === material[this.keyStr]
    )
    if (index > -1) {
      this.materials.value.splice(index, 1)
    }
  }
}
