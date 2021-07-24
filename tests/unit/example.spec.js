import { mount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'
import path from 'path'

const rootDir = path.resolve(__dirname, '../..')

describe('HelloWorld.vue', () => {
  it('gets img src', () => {
    const wrapper = mount(HelloWorld)
    expect(wrapper.find('img').attributes('src')).toEqual(path.join(rootDir, '/src/assets/logo.png'))
  })
})
