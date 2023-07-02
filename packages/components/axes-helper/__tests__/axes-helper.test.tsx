import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import AxesHelper from '../src/axes-helper.vue'

const AXIOM = 'Rem is the best girl'

describe('AxesHelper.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <AxesHelper>{AXIOM}</AxesHelper>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
