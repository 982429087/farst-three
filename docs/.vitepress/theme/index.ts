import ElementPlus from 'element-plus'
import FarstThree, { config } from 'farst-three'

import VPApp, { NotFound, globals } from '../vitepress'
import { define } from '../utils/types'
import 'uno.css'
import './style.css'
import type { Theme } from 'vitepress'

export default define<Theme>({
  NotFound,
  Layout: VPApp,
  enhanceApp: ({ app }) => {
    config.staticUrl = import.meta.env.VITE_BASE_URL
    app.use(ElementPlus)
    app.use(FarstThree)

    globals.forEach(([name, Comp]) => {
      app.component(name, Comp)
    })
  },
})
