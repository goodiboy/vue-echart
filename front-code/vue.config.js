module.exports = {
  devServer: {
    port: 8888
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/assets/scss/global.scss";'
      }
    }
  }
}
