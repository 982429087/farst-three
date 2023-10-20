import path from 'path'
import Inspect from 'vite-plugin-inspect'
import { defineConfig, loadEnv } from 'vite'
import VueMacros from 'unplugin-vue-macros/vite'
import UnoCSS from 'unocss/vite'
import mkcert from 'vite-plugin-mkcert'
import glob from 'fast-glob'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
// import glsl from 'vite-plugin-glsl'
import {
  docPackage,
  epPackage,
  getPackageDependencies,
  projRoot,
} from '@farst-three/build-utils'
import { MarkdownTransform } from './.vitepress/plugins/markdown-transform'

import type { Alias } from 'vite'
const alias: Alias[] = [
  {
    find: '~/',
    replacement: `${path.resolve(__dirname, './.vitepress/vitepress')}/`,
  },
]
if (process.env.DOC_ENV !== 'production') {
  alias.push(
    {
      find: /^farst-three(\/(es|lib))?$/,
      replacement: path.resolve(projRoot, 'packages/farst-three/index.ts'),
    },
    {
      find: /^farst-three\/(es|lib)\/(.*)$/,
      replacement: `${path.resolve(projRoot, 'packages')}/$2`,
    }
  )
}

export default defineConfig(async ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  const { dependencies: epDeps } = getPackageDependencies(epPackage)
  const { dependencies: docsDeps } = getPackageDependencies(docPackage)

  const optimizeDeps = [...new Set([...epDeps, ...docsDeps])].filter(
    (dep) =>
      !dep.startsWith('@types/') &&
      !['@farst-three/metadata', 'farst-three'].includes(dep)
  )

  optimizeDeps.push(
    ...(await glob(['dayjs/plugin/*.js'], {
      cwd: path.resolve(projRoot, 'node_modules'),
      onlyFiles: true,
    }))
  )
  return {
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            try {
              if (id.includes('node_modules')) {
                const name = id.split('node_modules/')[1].split('/')
                if (name[0] == '.pnpm') {
                  return name[1]
                } else {
                  return name[0]
                }
              }
            } catch (error) {
              console.error(error)
            }
          },
        },
      },
    },
    ssr: {
      noExternal: ['lodash-es', 'dat.gui', 'three'],
    },
    server: {
      host: true,
      https: !!env.HTTPS,
      fs: {
        allow: [projRoot],
      },
    },
    resolve: {
      alias,
    },
    plugins: [
      // glsl(), // package.json 中必须包含 "type": "module"
      VueMacros({
        setupComponent: false,
        setupSFC: false,
        plugins: {
          vueJsx: vueJsx(),
        },
      }),

      // https://github.com/antfu/unplugin-vue-components
      Components({
        dirs: ['.vitepress/vitepress/components'],

        allowOverrides: true,

        // custom resolvers
        resolvers: [
          // auto import icons
          // https://github.com/antfu/unplugin-icons
          IconsResolver(),
        ],

        // allow auto import and register components used in markdown
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      }),

      // https://github.com/antfu/unplugin-icons
      Icons({
        autoInstall: true,
      }),
      UnoCSS(),
      MarkdownTransform(),
      Inspect(),
      mkcert(),
    ],
    optimizeDeps: {
      include: optimizeDeps,
    },
  }
})
