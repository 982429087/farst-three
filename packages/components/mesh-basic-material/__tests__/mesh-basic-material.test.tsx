import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import MeshBasicMaterial from '../src/mesh-basic-material.vue'

const AXIOM = 'Just test world'

describe('MeshBasic-material.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <MeshBasicMaterial>{AXIOM}</MeshBasicMaterial>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
