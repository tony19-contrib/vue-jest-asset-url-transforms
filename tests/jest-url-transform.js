const urlLoader = require('url-loader')

module.exports = {
  process(src, filename) {
    const urlLoaderOptions = {
      esModule: false,
      limit: 4096,
      fallback: {
        loader: 'file-loader',
        options: {
          esModule: false,
          emitFile: false,
          name: filename,
        },
      },
    }
    const results = urlLoader.call({
      query: urlLoaderOptions,
      resourcePath: filename,
    }, src)

    // strip leading Webpack prefix from file path if it exists
    return results.replace(/^module.exports = __webpack_public_path__ \+ /, 'module.exports = ')
  }
}