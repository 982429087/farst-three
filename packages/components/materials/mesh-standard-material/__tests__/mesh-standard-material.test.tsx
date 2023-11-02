import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import MeshStandardMaterial from '../src/mesh-standard-material.vue'

const AXIOM = 'Just test world'

describe('MeshStandard-material.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => (
      <MeshStandardMaterial>{AXIOM}</MeshStandardMaterial>
    ))

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
