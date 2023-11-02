import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import SpotLight from '../src/spot-light.vue'

const AXIOM = 'Just test world'

describe('SpotLight.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <SpotLight>{AXIOM}</SpotLight>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
