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
              // target: window.location.hostname == 'passport.ymeun.com' ? 'https://passport.ymeun.com' : 'http://120.76.244.240:1003',
              target: 'http://120.76.244.240:1003',     //连锁端 测试
              // target: 'https://passport.ymeun.com',  //连锁端 线上
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
