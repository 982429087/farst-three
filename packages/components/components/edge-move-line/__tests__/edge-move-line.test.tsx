import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import EdgeMoveLine from '../src/edge-move-line.vue'

const AXIOM = 'Just test world'

describe('EdgeMoveLine.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <EdgeMoveLine>{AXIOM}</EdgeMoveLine>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
