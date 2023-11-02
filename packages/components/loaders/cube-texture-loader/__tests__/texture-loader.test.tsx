import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import CubeTextureLoader from '../src/cube-texture-loader.vue'

const AXIOM = 'Just test world'

describe('TextureLoader.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <CubeTextureLoader>{AXIOM}</CubeTextureLoader>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
