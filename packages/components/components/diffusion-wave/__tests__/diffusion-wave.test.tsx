import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import DiffusionWave from '../src/diffusion-wave.vue'

const AXIOM = 'Just test world'

describe('DiffusionWave.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <DiffusionWave>{AXIOM}</DiffusionWave>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
