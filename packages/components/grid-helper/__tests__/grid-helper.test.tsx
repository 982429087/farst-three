import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import GridHelper from '../src/grid-helper.vue'

const AXIOM = 'Rem is the best girl'

describe('GridHelper.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <GridHelper>{AXIOM}</GridHelper>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
