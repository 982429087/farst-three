import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import PointMarker from '../src/point-marker.vue'

const AXIOM = 'Just test world'

describe('PointMarker.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <PointMarker>{AXIOM}</PointMarker>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
