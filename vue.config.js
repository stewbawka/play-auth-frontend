module.exports = {
  configureWebpack: {
    devServer: {
      host: "localhost",
      disableHostCheck: true,
      port: 8081,
      headers: { "Access-Control-Allow-Origin": "*" }
    }
  },
  publicPath: "/"
}

