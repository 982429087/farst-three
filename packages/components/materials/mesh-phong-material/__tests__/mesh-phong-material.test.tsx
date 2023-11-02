import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import MeshPhongMaterial from '../src/mesh-phong-material.vue'

const AXIOM = 'Just test world'

describe('MeshPhongMaterial.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <MeshPhongMaterial>{AXIOM}</MeshPhongMaterial>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
