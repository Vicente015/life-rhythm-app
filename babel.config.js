module.exports = function (api) {
  api.cache(true)
  return {
    plugins: [
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      '@babel/plugin-transform-runtime'
    ],
    presets: ['babel-preset-expo']
  }
}
