import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import MeshLambertMaterial from '../src/mesh-lambert-material.vue'

const AXIOM = 'Just test world'

describe('MeshLambert-material.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => (
      <MeshLambertMaterial>{AXIOM}</MeshLambertMaterial>
    ))

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
