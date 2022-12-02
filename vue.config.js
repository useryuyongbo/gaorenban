module.exports = {
  lintOnSave: false,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://192.168.196.141:8080/', 
        changeOrigin: true, //是否同意跨域
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
