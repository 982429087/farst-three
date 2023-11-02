import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import RingGeometry from '../src/ring-geometry.vue'

const AXIOM = 'Just test world'

describe('RingGeometry.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <RingGeometry>{AXIOM}</RingGeometry>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
