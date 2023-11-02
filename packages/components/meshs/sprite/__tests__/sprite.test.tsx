import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Sprite from '../src/sprite.vue'

const AXIOM = 'Just test world'

describe('Sprite.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <Sprite>{AXIOM}</Sprite>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
