const vueJestPreset = require('@vue/cli-plugin-unit-jest/presets/default/jest-preset')
const merge = require('lodash.merge')

const newJestPreset = merge(vueJestPreset, {
  globals: {
    'vue-jest': {
      templateCompiler: {
        transformAssetUrls: {
          video: ['src', 'poster'],
          source: 'src',
          img: 'src',
          image: ['xlink:href', 'href'],
          use: ['xlink:href', 'href']
        }
      }
    }
  },
  moduleNameMapper: {
    '^foo/(.*)$': '<rootDir>/$1',
  },
})

function useUrlLoaderForImages(preset) {
  const imageTypes = ['jpg', 'jpeg', 'png', 'svg', 'gif', 'webp']
  const imageTypesRegex = new RegExp(`(${imageTypes.join('|')})\\|?`, 'ig')

  // remove the image types from the transforms
  Object.entries(preset.transform).filter(([key]) => {
    const regex = new RegExp(key)
    return imageTypes.some(ext => regex.test(`filename.${ext}`))
  }).forEach(([key, value]) => {
    delete preset.transform[key]
    const newKey = key.replace(imageTypesRegex, '')
    preset.transform[newKey] = value
  })

  preset.transform = {
    ...preset.transform,
    [`.+\\.(${imageTypes.join('|')})$`]: '<rootDir>/tests/my-jest-url-loader',
  }
}

useUrlLoaderForImages(newJestPreset)

module.exports = newJestPreset
