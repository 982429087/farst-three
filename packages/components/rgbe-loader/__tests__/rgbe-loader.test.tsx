import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import RgbeLoader from '../src/rgbe-loader.vue'

const AXIOM = 'Just test world'

describe('RgbeLoader.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <RgbeLoader>{AXIOM}</RgbeLoader>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
