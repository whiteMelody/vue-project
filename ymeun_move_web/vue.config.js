const webpack = require('webpack')
module.exports = {
    //...
    baseUrl: './',
    pluginOptions:{
        entry:{
            app:["babel-polyfill","./src/main.js"]
        }
    },

    // devServer: {
    //     https: false,
    //     proxy: {
    //         '/post': {
    //             target: 'http://222.182.202.11:5710/post/',
    //             changeOrigin: true,
    //             pathRewrite: {
    //                 '^/post': '/'
    //             }
    //         }
    //     }
    // },

    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                $:"jquery",
                jQuery:"jquery",
                "windows.jQuery":"jquery"
            })
        ]
    },

    /**
     * 多页面配置
     */
    pages: {
        data: {
            entry: './src/views/Data/main.js',
            template: './public/index.html',
            filename: 'index.html',
        },
        customer: {
            entry: './src/views/Customer/main.js',
            template: './public/customer.html',
            filename: 'customer.html',
        },
        flow: {
            entry: './src/views/Flow/main.js',
            template: './public/flow.html',
            filename: 'flow.html',
        },
        task: {
            entry: './src/views/Task/main.js',
            template: './public/task.html',
            filename: 'task.html',
        },
        login: {
            entry: './src/views/Login/main.js',
            template: './public/login.html',
            filename: 'login.html',
        },
    }
};

