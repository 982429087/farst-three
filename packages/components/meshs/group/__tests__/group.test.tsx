import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Group from '../src/group.vue'

const AXIOM = 'Just test world'

describe('Group.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <Group>{AXIOM}</Group>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
