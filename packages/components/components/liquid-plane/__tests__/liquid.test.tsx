import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Liquid from '../src/liquid.vue'

const AXIOM = 'Just test world'

describe('Liquid.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <Liquid>{AXIOM}</Liquid>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
