import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import HalftonePass from '../src/halftone-pass.vue'

const AXIOM = 'Just test world'

describe('HalftonePass.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <HalftonePass>{AXIOM}</HalftonePass>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
