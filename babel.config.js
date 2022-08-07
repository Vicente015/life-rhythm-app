module.exports = function (api) {
  api.cache(true)
  return {
    plugins: [
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      '@babel/plugin-transform-runtime',
      'react-native-reanimated/plugin'
    ],
    presets: ['babel-preset-expo']
  }
}
