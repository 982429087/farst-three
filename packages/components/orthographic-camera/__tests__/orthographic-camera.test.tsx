import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import OrthographicCamera from '../src/orthographic-camera.vue'

const AXIOM = 'Rem is the best girl'

describe('OrthographicCamera.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => (
      <OrthographicCamera>{AXIOM}</OrthographicCamera>
    ))

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
