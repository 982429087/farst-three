import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import DomMarker from '../src/dom-marker.vue'

const AXIOM = 'Just test world'

describe('DomMarker.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <DomMarker>{AXIOM}</DomMarker>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
