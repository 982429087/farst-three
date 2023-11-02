import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import WebGLRenderer from '../src/webgl-renderer.vue'

const AXIOM = 'Just test world'

describe('WebGLRenderer.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <WebGLRenderer>{AXIOM}</WebGLRenderer>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
