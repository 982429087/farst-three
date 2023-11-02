import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import ShaderMaterial from '../src/shader-material.vue'

const AXIOM = 'Just test world'

describe('ShaderMaterial.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <ShaderMaterial>{AXIOM}</ShaderMaterial>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
