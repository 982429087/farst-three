import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import HemisphereLightHelper from '../src/hemisphere-light-helper.vue'

const AXIOM = 'Just test world'

describe('HemisphereLightHelper.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => (
      <HemisphereLightHelper>{AXIOM}</HemisphereLightHelper>
    ))

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
