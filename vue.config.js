module.exports = {
  devServer: {
    host: "localhost",
    disableHostCheck: true,
    port: 8081,
  },
  configureWebpack: {
    devServer: {
      headers: { "Access-Control-Allow-Origin": "*" }
    }
  },
  publicPath: "/"
}

