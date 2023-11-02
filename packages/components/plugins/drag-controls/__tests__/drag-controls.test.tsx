import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import DragControls from '../src/drag-controls.vue'

const AXIOM = 'Just test world'

describe('DragControls.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <DragControls>{AXIOM}</DragControls>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
