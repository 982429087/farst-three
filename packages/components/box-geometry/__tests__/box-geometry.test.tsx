import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import BoxGeometry from '../src/box-geometry.vue'

const AXIOM = 'Just test world'

describe('BoxGeometry.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <BoxGeometry>{AXIOM}</BoxGeometry>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
