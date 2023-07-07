import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Scene from '../src/scene.vue'

const AXIOM = 'Just test world'

describe('Scene.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <Scene>{AXIOM}</Scene>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
