import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Projection from '../src/projection.vue'

const AXIOM = 'Just test world'

describe('Projection.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <Projection>{AXIOM}</Projection>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
