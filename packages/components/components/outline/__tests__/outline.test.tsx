import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Outline from '../src/outline.vue'

const AXIOM = 'Just test world'

describe('Outline.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <Outline>{AXIOM}</Outline>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
