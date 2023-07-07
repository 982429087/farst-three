import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import OrbitControls from '../src/orbit-controls.vue'

const AXIOM = 'Just test world'

describe('OrbitControls.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <OrbitControls>{AXIOM}</OrbitControls>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
