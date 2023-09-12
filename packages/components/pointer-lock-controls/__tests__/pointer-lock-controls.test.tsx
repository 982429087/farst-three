import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import PointerLockControls from '../src/pointer-lock-controls.vue'

const AXIOM = 'Just test world'

describe('PointerLockControls.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => (
      <PointerLockControls>{AXIOM}</PointerLockControls>
    ))

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
