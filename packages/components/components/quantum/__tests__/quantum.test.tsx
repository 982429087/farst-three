import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Quantum from '../src/quantum.vue'

const AXIOM = 'Just test world'

describe('Quantum.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <Quantum>{AXIOM}</Quantum>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
