import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import GeoJsonPlane from '../src/geo-json-plane.vue'

const AXIOM = 'Just test world'

describe('GeoJsonPlane.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <GeoJsonPlane>{AXIOM}</GeoJsonPlane>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
