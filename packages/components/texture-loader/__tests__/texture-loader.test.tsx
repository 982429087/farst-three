import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import TextureLoader from '../src/texture-loader.vue'

const AXIOM = 'Just test world'

describe('TextureLoader.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <TextureLoader>{AXIOM}</TextureLoader>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
