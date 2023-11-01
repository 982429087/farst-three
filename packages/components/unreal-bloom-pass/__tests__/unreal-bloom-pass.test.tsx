import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import UnrealBloomPass from '../src/unreal-bloom-pass.vue'

const AXIOM = 'Just test world'

describe('UnrealBloomPass.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <UnrealBloomPass>{AXIOM}</UnrealBloomPass>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
