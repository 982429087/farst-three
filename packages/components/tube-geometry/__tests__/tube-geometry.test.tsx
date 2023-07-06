import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import TubeGeometry from '../src/tube-geometry.vue'

const AXIOM = 'Rem is the best girl'

describe('TubeGeometry.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <TubeGeometry>{AXIOM}</TubeGeometry>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
