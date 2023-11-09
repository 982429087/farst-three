import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import DomMarkerRenderer from '../src/dom-marker-renderer.vue'

const AXIOM = 'Just test world'

describe('DomMarkerRenderer.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <DomMarkerRenderer>{AXIOM}</DomMarkerRenderer>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
