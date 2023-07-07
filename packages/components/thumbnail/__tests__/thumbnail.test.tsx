import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Thumbnail from '../src/thumbnail.vue'

const AXIOM = 'Just test world'

describe('Thumbnail.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <Thumbnail>{AXIOM}</Thumbnail>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
