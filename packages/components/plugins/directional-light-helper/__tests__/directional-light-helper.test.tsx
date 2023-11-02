import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import DirectionalLightHelper from '../src/directional-light-helper.vue'

const AXIOM = 'Just test world'

describe('DirectionalLightHelper.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => (
      <DirectionalLightHelper>{AXIOM}</DirectionalLightHelper>
    ))

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
