import { mount } from '@vue/test-utils'
import CoreApp from '@/components/core/App/index.vue'
import path from 'path'

const rootDir = path.resolve(__dirname, '../..')

describe('CoreApp.vue', () => {
  it('gets img src', () => {
    const wrapper = mount(CoreApp)
    expect(wrapper.find('img').attributes('src')).toEqual(path.join(rootDir, '/src/assets/logo.png'))
  })
})
