import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import RectAreaLight from '../src/rect-area-light.vue'

const AXIOM = 'Just test world'

describe('RectAreaLight.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <RectAreaLight>{AXIOM}</RectAreaLight>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
