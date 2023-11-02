import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import SpotLightHelper from '../src/spot-light-helper.vue'

const AXIOM = 'Just test world'

describe('SpotLightHelper.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <SpotLightHelper>{AXIOM}</SpotLightHelper>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
