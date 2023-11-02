import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import FogExp2 from '../src/fog-exp2.vue'

const AXIOM = 'Just test world'

describe('FogExp2.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <FogExp2>{AXIOM}</FogExp2>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
