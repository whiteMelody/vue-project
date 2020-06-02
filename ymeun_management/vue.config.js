const webpack = require('webpack')
module.exports = {
  //...
  baseUrl: './',
  pluginOptions:{
    entry:{
      app:["babel-polyfill","./src/main.js"]
    }
  },
 
  devServer: {
    https: false,
    proxy: {
          '/post': {
              // target: 'http://120.76.244.240:1006',
              target: 'http://120.79.50.185:8889', // 正式
              changeOrigin: true,
              pathRewrite: {
                '^/post': '/post'
              }
          }
      }
  },
    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                $:"jquery",
                jQuery:"jquery",
                "windows.jQuery":"jquery"
            })
        ]
    },
     
  //...
};
