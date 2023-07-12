import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import PlaneGeometry from '../src/plane-geometry.vue'

const AXIOM = 'Just test world'

describe('PlaneGeometry.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <PlaneGeometry>{AXIOM}</PlaneGeometry>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
