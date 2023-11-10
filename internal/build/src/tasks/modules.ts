import { rollup } from 'rollup'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueMacros from 'unplugin-vue-macros/rollup'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import esbuild from 'rollup-plugin-esbuild'
import glob from 'fast-glob'
import { epRoot, excludeFiles, pkgRoot } from '@farst-three/build-utils'
import { generateExternal, writeBundles } from '../utils'
import { ElementPlusAlias } from '../plugins/farst-three-alias'
import { buildConfigEntries, target } from '../build-info'

import type { OutputOptions } from 'rollup'

// -- https://github.com/vuejs/core/issues/8303
const __defProp = Object.defineProperty
const __name = (target: any, value: any) =>
  __defProp(target, 'name', { value, configurable: true })
;(globalThis as any).__name = __name
// --

export const buildModules = async () => {
  const input = excludeFiles(
    await glob('**/*.{js,ts,vue}', {
      cwd: pkgRoot,
      absolute: true,
      onlyFiles: true,
    })
  )
  try {
    const bundle = await rollup({
      input,
      plugins: [
        ElementPlusAlias(),
        VueMacros({
          setupComponent: false,
          setupSFC: false,
          plugins: {
            vue: vue({
              isProduction: false,
            }),
            vueJsx: vueJsx(),
          },
        }),
        nodeResolve({
          extensions: ['.mjs', '.js', '.json', '.ts'],
        }),
        commonjs(),
        esbuild({
          sourceMap: true,
          target,
          loaders: {
            '.vue': 'ts',
          },
        }),
      ],
      external: await generateExternal({ full: false }),
      treeshake: false,
    })
    await writeBundles(
      bundle,
      buildConfigEntries.map(([module, config]): OutputOptions => {
        return {
          format: config.format,
          dir: config.output.path,
          exports: module === 'cjs' ? 'named' : undefined,
          preserveModules: true,
          preserveModulesRoot: epRoot,
          sourcemap: true,
          entryFileNames: `[name].${config.ext}`,
        }
      })
    )
  } catch (e) {
    console.error(e)
  }
}
