import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Line from '../src/line.vue'

const AXIOM = 'Just test world'

describe('Line.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <Line>{AXIOM}</Line>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
