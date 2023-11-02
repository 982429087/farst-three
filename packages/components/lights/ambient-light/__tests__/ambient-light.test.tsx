import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import AmbientLight from '../src/ambient-light.vue'

const AXIOM = 'Just test world'

describe('AmbientLight.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <AmbientLight>{AXIOM}</AmbientLight>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
