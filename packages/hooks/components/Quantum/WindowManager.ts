export type WinInfo = {
  id: number
  x: number
  y: number
  w: number
  h: number
}

export class WindowManager {
  id: number
  win: WinInfo
  wins: WinInfo[] = []
  count = 0
  constructor() {
    this.wins = this.getItem('wins') || []
    this.count = this.getItem('count') || 0
    this.id = this.count
    this.win = this.add()
    // this.id = params.get('win');
  }

  getItem(key: string) {
    const item = window.localStorage.getItem(key)

    if (item) {
      return JSON.parse(item)
    }

    return null
  }

  setItem(id: string, value: WinInfo[]) {
    this.wins = value
    return window.localStorage.setItem(`${id}`, JSON.stringify(value))
  }

  add(winInfo = {} as WinInfo) {
    Object.assign(winInfo, {
      id: this.id,
      x: window.screenLeft,
      y: window.screenTop,
      w: window.innerWidth,
      h: window.innerHeight,
    })
    this.wins.push(winInfo)
    this.count++
    window.localStorage.setItem('count', `${this.count}`)
    window.localStorage.setItem('wins', JSON.stringify(this.wins))

    return winInfo
  }
}
