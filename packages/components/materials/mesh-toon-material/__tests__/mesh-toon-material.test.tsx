import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import MeshToonMaterial from '../src/mesh-toon-material.vue'

const AXIOM = 'Just test world'

describe('MeshToonMaterial.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <MeshToonMaterial>{AXIOM}</MeshToonMaterial>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
