import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import HemisphereLight from '../src/hemisphere-light.vue'

const AXIOM = 'Just test world'

describe('HemisphereLight.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <HemisphereLight>{AXIOM}</HemisphereLight>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
