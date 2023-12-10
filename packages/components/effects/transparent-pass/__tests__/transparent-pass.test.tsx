import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import TransparentPass from '../src/transparent-pass.vue'

const AXIOM = 'Just test world'

describe('TransparentPass.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <TransparentPass>{AXIOM}</TransparentPass>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
