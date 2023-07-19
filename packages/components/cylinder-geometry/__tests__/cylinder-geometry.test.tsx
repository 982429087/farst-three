import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import CylinderGeometry from '../src/cylinder-geometry.vue'

const AXIOM = 'Just test world'

describe('CylinderGeometry.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <CylinderGeometry>{AXIOM}</CylinderGeometry>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
