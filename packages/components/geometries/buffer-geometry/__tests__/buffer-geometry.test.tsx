import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import BufferGeometry from '../src/buffer-geometry.vue'

const AXIOM = 'Just test world'

describe('BufferGeometry.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <BufferGeometry>{AXIOM}</BufferGeometry>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
