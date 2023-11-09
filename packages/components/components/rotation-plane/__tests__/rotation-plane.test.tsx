import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import RotationPlane from '../src/rotation-plane.vue'

const AXIOM = 'Just test world'

describe('RotationPlane.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <RotationPlane>{AXIOM}</RotationPlane>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
