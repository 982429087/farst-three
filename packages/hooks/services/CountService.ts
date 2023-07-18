import { shallowReactive } from 'vue'

export class CountService<T extends { [key: string]: any }> {
  public aollections = shallowReactive<T[]>([])

  constructor(public keyStr = 'id') {}

  clearCount() {
    this.aollections.length = 0
  }

  addCount(material: T) {
    this.aollections.push(material)
  }

  subCount(material: T) {
    const index = this.aollections.findIndex(
      (item) => item[this.keyStr] === material[this.keyStr]
    )
    if (index > -1) {
      this.aollections.splice(index, 1)
    }
  }
}
