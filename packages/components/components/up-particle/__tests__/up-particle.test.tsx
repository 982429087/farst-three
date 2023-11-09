import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import UpParticle from '../src/up-particle.vue'

const AXIOM = 'Just test world'

describe('UpParticle.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <UpParticle>{AXIOM}</UpParticle>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
