import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import MeshMatcapMaterial from '../src/mesh-matcap-material.vue'

const AXIOM = 'Just test world'

describe('MeshMatcapMaterial.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => (
      <MeshMatcapMaterial>{AXIOM}</MeshMatcapMaterial>
    ))

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
