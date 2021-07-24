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

// Make sure our transform takes precedence over the default one
newJestPreset.transform = {
  '\\.png$': '<rootDir>/tests/jest-url-transform',
  ...newJestPreset.transform,
}

module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  ...newJestPreset,
}
