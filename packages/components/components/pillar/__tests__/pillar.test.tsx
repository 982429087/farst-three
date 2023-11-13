import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Pillar from '../src/pillar.vue'

const AXIOM = 'Just test world'

describe('Pillar.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <Pillar>{AXIOM}</Pillar>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
