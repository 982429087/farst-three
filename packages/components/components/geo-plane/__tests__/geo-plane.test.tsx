import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import GeoPlane from '../src/geo-plane.vue'

const AXIOM = 'Just test world'

describe('GeoPlane.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <GeoPlane>{AXIOM}</GeoPlane>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
