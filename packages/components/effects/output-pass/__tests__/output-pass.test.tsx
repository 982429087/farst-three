import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import OutputPass from '../src/output-pass.vue'

const AXIOM = 'Just test world'

describe('OutputPass.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <OutputPass>{AXIOM}</OutputPass>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
