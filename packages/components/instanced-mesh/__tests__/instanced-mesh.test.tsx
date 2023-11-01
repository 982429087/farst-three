import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import InstancedMesh from '../src/instanced-mesh.vue'

const AXIOM = 'Just test world'

describe('InstancedMesh.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <InstancedMesh>{AXIOM}</InstancedMesh>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
