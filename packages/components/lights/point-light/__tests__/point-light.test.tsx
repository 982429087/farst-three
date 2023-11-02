import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import PointLight from '../src/point-light.vue'

const AXIOM = 'Just test world'

describe('PointLight.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <PointLight>{AXIOM}</PointLight>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
