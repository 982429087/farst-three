import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import MarkPoint from '../src/mark-point.vue'

const AXIOM = 'Just test world'

describe('MarkPoint.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <MarkPoint>{AXIOM}</MarkPoint>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
