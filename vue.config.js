module.exports = {
  lintOnSave: false,
  publicPath: process.env.NODE_ENV === "production" ? "/gaorenban" : "/", // 根域上下文目录
  outputDir: 'dist', // 构建输出目录，可不写
  assetsDir: 'assets', // 静态资源目录 (js, css, img, fonts)，可不写

  devServer: {
    proxy: {
      '/api': {
        target: 'https://张琰浩.王聪洋.top',
         //target: 'http://192.168.196.141:8080/', 
        //target: 'http://192.168.196.142:8080/',
        //target: 'http://192.168.196.64:8080/', 
      changeOrigin: true, //是否同意跨域
          // pathRewrite: {
          //   '^/api': ''
          //  }
      }
    }
  }
}
