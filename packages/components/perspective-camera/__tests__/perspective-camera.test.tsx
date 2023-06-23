import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import PerspectiveCamera from '../src/perspective-camera.vue'

const AXIOM = 'Rem is the best girl'

describe('PerspectiveCamera.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <PerspectiveCamera>{AXIOM}</PerspectiveCamera>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
