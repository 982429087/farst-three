import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import PointsMaterial from '../src/points-material.vue'

const AXIOM = 'Just test world'

describe('PointsMaterial.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <PointsMaterial>{AXIOM}</PointsMaterial>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
