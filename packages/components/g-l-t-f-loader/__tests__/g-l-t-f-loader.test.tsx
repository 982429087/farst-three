import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import GLTFLoader from '../src/g-l-t-f-loader.vue'

const AXIOM = 'Just test world'

describe('GLTFLoader.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <GLTFLoader>{AXIOM}</GLTFLoader>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
