import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import EffectComposer from '../src/effect-composer.vue'

const AXIOM = 'Just test world'

describe('EffectComposer.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <EffectComposer>{AXIOM}</EffectComposer>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
