import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Audio from '../src/audio.vue'

const AXIOM = 'Just test world'

describe('Audio.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <Audio>{AXIOM}</Audio>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
