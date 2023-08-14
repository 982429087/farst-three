import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import SpriteMaterial from '../src/sprite-material.vue'

const AXIOM = 'Just test world'

describe('SpriteMaterial.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <SpriteMaterial>{AXIOM}</SpriteMaterial>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
