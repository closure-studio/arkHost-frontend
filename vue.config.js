const CompressionWebpackPlugin = require("compression-webpack-plugin")
module.exports = {
  productionSourceMap: false,
  transpileDependencies: [
    'vuetify'
  ],
  configureWebpack: config => {
    if (process.env.NODE_ENV == "production") {
      return {
        plugins: [new CompressionWebpackPlugin({
          test: /\.(js|css|svg|woff|ttf|json|html)$/,
          threshold: 10240,
        })]
      }
    }
  },
}
