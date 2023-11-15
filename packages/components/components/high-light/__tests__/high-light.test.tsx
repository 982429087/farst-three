import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import HighLight from '../src/high-light.vue'

const AXIOM = 'Just test world'

describe('HighLight.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <HighLight>{AXIOM}</HighLight>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
