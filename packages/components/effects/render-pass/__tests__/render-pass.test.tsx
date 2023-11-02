import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import RenderPass from '../src/render-pass.vue'

const AXIOM = 'Just test world'

describe('RenderPass.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <RenderPass>{AXIOM}</RenderPass>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
