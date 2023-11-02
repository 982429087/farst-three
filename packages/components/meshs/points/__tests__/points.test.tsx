import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Points from '../src/points.vue'

const AXIOM = 'Just test world'

describe('Points.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <Points>{AXIOM}</Points>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
