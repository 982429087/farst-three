import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import MeshLine from '../src/mesh-line.vue'

const AXIOM = 'Just test world'

describe('MeshLine.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <MeshLine>{AXIOM}</MeshLine>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
