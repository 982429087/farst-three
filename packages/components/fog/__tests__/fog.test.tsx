import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Fog from '../src/fog.vue'

const AXIOM = 'Just test world'

describe('Fog.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <Fog>{AXIOM}</Fog>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
