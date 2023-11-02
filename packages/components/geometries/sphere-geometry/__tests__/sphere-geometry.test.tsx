import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import SphereGeometry from '../src/sphere-geometry.vue'

const AXIOM = 'Just test world'

describe('SphereGeometry.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <SphereGeometry>{AXIOM}</SphereGeometry>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
