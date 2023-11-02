import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import PointLightHelper from '../src/point-light-helper.vue'

const AXIOM = 'Just test world'

describe('PointLightHelper.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <PointLightHelper>{AXIOM}</PointLightHelper>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
