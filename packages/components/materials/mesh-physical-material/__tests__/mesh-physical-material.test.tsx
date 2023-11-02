import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import MeshPhysicalMaterial from '../src/mesh-physical-material.vue'

const AXIOM = 'Just test world'

describe('MeshPhysicalMaterial.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => (
      <MeshPhysicalMaterial>{AXIOM}</MeshPhysicalMaterial>
    ))

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
