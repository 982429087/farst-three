import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import ShadowMaterial from '../src/shadow-material.vue'

const AXIOM = 'Just test world'

describe('ShadowMaterial.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <ShadowMaterial>{AXIOM}</ShadowMaterial>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
