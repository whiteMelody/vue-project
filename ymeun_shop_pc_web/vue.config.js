var projectname = process.env.NODE_ENV == 'production' ? process.argv[3] : process.argv[5]
var glob = require('glob')
const webpack = require('webpack')

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
        var items = glob.sync( './src/*/*.js')
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

/**
 * 获取本地代理地址
 * @param isStore 是否是仓库 默认false
 * @returns {any}
 */
function getBaseApi(isStore){
    if (process.env.NODE_ENV == 'production' || process.env.NODE_ENV == 'test') {
        return projectname == 'shop' ? process.env.VUE_APP_BASE_API_SHOP : process.env.VUE_APP_BASE_API_CHAIN
    }else {
        if(isStore)
            return process.env.VUE_APP_BASE_API_STORE
        if(process.env.NODE_ENV == 'shop'){
            return process.env.VUE_APP_BASE_API_SHOP
        }else if(process.env.NODE_ENV == 'chain'){
            return process.env.VUE_APP_BASE_API_CHAIN
        }else{
            //dev模式
        }
    }
}

console.log(getBaseApi(false), 'getBaseApi')

var pages = getEntry()
module.exports = {
    publicPath: process.env.NODE_ENV == 'production' || process.env.NODE_ENV == 'test' ? './' : '/',
    productionSourceMap: false, // 生产禁止显示源代码
    outputDir: 'dist/' + projectname,
    pages: pages,
    devServer: {
        https: false,
        proxy: {
            '/post': {
                //getBaseApi  true 仓库 | 不传或者false 开发
                target: getBaseApi(false),
                changeOrigin: true,
                pathRewrite: {
                    '^/post': '/post'
                }
            }
        },
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
}
