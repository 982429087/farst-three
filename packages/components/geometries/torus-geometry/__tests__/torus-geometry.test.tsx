import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import TorusGeometry from '../src/torus-geometry.vue'

const AXIOM = 'Just test world'

describe('TorusGeometry.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <TorusGeometry>{AXIOM}</TorusGeometry>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
