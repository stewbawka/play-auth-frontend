module.exports = {
  devServer: {
    host: "localhost",
    disableHostCheck: true,
    port: 8080,
  },
  configureWebpack: {
    devServer: {
      headers: { "Access-Control-Allow-Origin": "*" }
    }
  },
  publicPath: "/"
}

