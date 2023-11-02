import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import CameraHelper from '../src/camera-helper.vue'

const AXIOM = 'Just test world'

describe('CameraHelper.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <CameraHelper>{AXIOM}</CameraHelper>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
