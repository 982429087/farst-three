import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import RectAreaLightHelper from '../src/rect-area-light-helper.vue'

const AXIOM = 'Just test world'

describe('RectAreaLightHelper.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => (
      <RectAreaLightHelper>{AXIOM}</RectAreaLightHelper>
    ))

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
