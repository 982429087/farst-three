import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import DirectionalLight from '../src/directional-light.vue'

const AXIOM = 'Just test world'

describe('DirectionalLight.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <DirectionalLight>{AXIOM}</DirectionalLight>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
