var projectname = process.env.NODE_ENV == 'production' ? process.argv[3] : process.argv[5]
var glob = require('glob')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')

let cesiumSource = './node_modules/cesium/Source'
let cesiumWorkers = '../Build/Cesium/Workers'

/**
 * 配置入口和出口
 */
function getEntry() {
    var entries = {}
    if (process.env.NODE_ENV == 'production' || process.env.NODE_ENV == 'test') {
        entries[projectname] = {
            // page的入口
            entry: 'src/' + projectname + '/main.js',
            // 模板来源
            template: 'public/index.html',
            // 在 dist/index.html 的输出
            filename: 'index.html',
            title: projectname,
            chunks: ['chunk-vendors', 'chunk-common', projectname]
        }
    } else {
        var items = glob.sync( `./src/${projectname}/*.js`)

        for (var i in items) {
            var filepath = items[i]
            var fileList = filepath.split('/');
            var fileName = fileList[fileList.length-2];

            entries[fileName] = {
                entry: `src/${fileName}/main.js`,
                // 模板来源
                template: `public/index.html`,
                // 在 dist/index.html 的输出
                filename: `${fileName}.html`,
                // 提取出来的通用 chunk 和 vendor chunk。
                chunks: ['chunk-vendors', 'chunk-common', fileName]
            }
        }
    }
    return entries
}

var pages = getEntry()

module.exports = {
    publicPath: process.env.NODE_ENV == 'production' || process.env.NODE_ENV == 'test' ? './' : '/',
    productionSourceMap: false, // 生产禁止显示源代码
    outputDir: 'dist/' + projectname,
    pages: pages,
    devServer: {
        https: false,
        proxy: {
            '/api': {
                target: "http://a.xinzhi.space",
                changeOrigin: true,
                pathRewrite:{
                    '^/api':'/api'
                }
            }
        },
    },
    configureWebpack: {
        output: {
            sourcePrefix: ' '
        },
        amd: {
            toUrlUndefined: true
        },
        resolve: {
            alias: {
                'vue$': 'vue/dist/vue.esm.js',
                '@': path.resolve('src'),
                'cesium': path.resolve(__dirname, cesiumSource)
            }
        },
        plugins: [
            new CopyWebpackPlugin([ { from: path.join(cesiumSource, cesiumWorkers), to: 'Workers'}]),
            new CopyWebpackPlugin([ { from: path.join(cesiumSource, 'Assets'), to: 'Assets'}]),
            new CopyWebpackPlugin([ { from: path.join(cesiumSource, 'Widgets'), to: 'Widgets'}]),
            new CopyWebpackPlugin([ { from: path.join(cesiumSource, 'ThirdParty/Workers'), to: 'ThirdParty/Workers'}]),
            new webpack.DefinePlugin({
                CESIUM_BASE_URL: JSON.stringify('./')
            })
        ],
        module: {
            unknownContextCritical: /^.\/.*$/,
            unknownContextCritical: false
        }
    },
}