import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Mesh from '../src/mesh.vue'

const AXIOM = 'Just test world'

describe('Mesh.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <Mesh>{AXIOM}</Mesh>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
