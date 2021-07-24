module.exports = {
  chainWebpack: (config) => {
    // Add project name as alias
    config.resolve.alias.set('foo', __dirname);
  },
};