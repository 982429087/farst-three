import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import TextGeometry from '../src/text-geometry.vue'

const AXIOM = 'Just test world'

describe('TextGeometry.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <TextGeometry url={''}>{AXIOM}</TextGeometry>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
