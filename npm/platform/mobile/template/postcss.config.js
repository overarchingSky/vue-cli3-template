module.exports = {
  plugins: {
    autoprefixer: {},
    // 'postcss-px2rem': {
    //   remUnit: 37.5
    // },
    'postcss-px-to-viewport': {
      viewportWidth: 375,
      viewportHeight: 667,
      unitPrecision: 5,
      viewportUnit: 'vmin',
      selectorBlackList: [],
      minPixelValue: 1,
      mediaQuery: false
    }
  }
}
