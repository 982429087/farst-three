import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import MeshDepthMaterial from '../src/mesh-depth-material.vue'

const AXIOM = 'Just test world'

describe('MeshDepthMaterial.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <MeshDepthMaterial>{AXIOM}</MeshDepthMaterial>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
