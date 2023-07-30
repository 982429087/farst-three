import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import LineBasicMaterial from '../src/line-basic-material.vue'

const AXIOM = 'Just test world'

describe('LineBasicMaterial.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <LineBasicMaterial>{AXIOM}</LineBasicMaterial>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
