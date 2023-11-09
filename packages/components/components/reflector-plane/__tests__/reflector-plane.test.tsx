import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import ReflectorPlane from '../src/reflector-plane.vue'

const AXIOM = 'Just test world'

describe('ReflectorPlane.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <ReflectorPlane>{AXIOM}</ReflectorPlane>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
