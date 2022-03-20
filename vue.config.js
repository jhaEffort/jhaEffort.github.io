const path = require('path')
const resolve = (dir) => {
    return path.join(__dirname, dir)
}
const PrerenderSPAPlugin = require('prerender-spa-plugin')
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;
// 打包图形化信息
// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
// 压缩代码
const CompressionWebpackPlugin = require('compression-webpack-plugin');

// 取消console
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
// 压缩图片 image-webpack-plugin

// 骨架屏
const SkeletonWebpackPlugin = require('vue-skeleton-webpack-plugin')

const IS_PROD = ['production', 'development', 'prod'].includes(process.env.NODE_ENV)
module.exports = {
    publicPath: './',
    outputDir: 'docs', // 生成的路径
    assetsDir: '',// 将所有打包的js css img 都放在当前文件下
    productionSourceMap: false, // 开启sourceMap
    filenameHashing: true, // 生成hash模式
    configureWebpack: config => {
        const plugins = []
        config["performance"] = {//打包文件大小配置
            "maxEntrypointSize": 10000000,
            "maxAssetSize": 30000000
        }
        // 去掉console
        plugins.push(
            new UglifyJsPlugin({
                uglifyOptions: {
                    test: /\.js$/,
                    output: {
                        comments: false, // 去掉注释
                    },
                    compress: {
                        drop_console: true,
                        drop_debugger: true,
                        pure_funcs: ["console.log"] //移除console
                    }
                },
                sourceMap: false,
                parallel: true
            })
        )
        // 代码压缩
        plugins.push(
            new CompressionWebpackPlugin({
                filename: "[path].gz[query]",
                algorithm: "gzip",
                test: productionGzipExtensions,
                threshold: 10240,
                minRatio: 0.8
            })
        );
        // 预渲染
        plugins.push(
            new PrerenderSPAPlugin({
                staticDir: resolve('dist'), // 渲染的路径
                indexPath: path.join(__dirname, 'dist', 'index.html'),
                routes: ['/', '/list', '/my'], // 渲染的路由
                renderer: new Renderer({
                    injectProperty: '__PRERENDER_INJECTED',
                    inject: {
                        foo: 'bar',
                    },
                    headless: false,
                    maxConcurrentRoutes: 4, // 最大渲染4个页面
                    // 在 main.js 中 document.dispatchEvent(new Event('render-event'))，两者的事件名称要对应上。
                    renderAfterDocumentEvent: 'render-event',
                }),
            })
        );

        // 骨架屏
        plugins.push(new SkeletonWebpackPlugin({
            webpackConfig: {
                entry: {
                    app: resolve('./src/Skeleton.js')
                }
            },
            minimize: true,
            quiet: true,
            router: {
                mode: 'history',
                routes: [
                    { path: '', skeletonId: 'listSkeleton' },
                    { path: /^\/detail/, skeletonId: 'detailSkeleton' }
                ]
            }
        }));

        // 第三方包压缩  
        config.optimization = {
            splitChunks: {
                maxAsyncRequests:30,// 按需加载时的最大并行请求数 默认30
                maxInitialRequests:30, // 入口点的最大并行请求数 默认30
                cacheGroups: {
                    libs: {
                        name: "chunk-libs",
                        test: /[\\/]node_modules[\\/]/,
                        priority: 10, // 优化将优先考虑级别
                        chunks: "initial",
                        enforce: true // 强制抽离此模块
                    },
                    elementUI: {
                        name: "chunk-elementUI",
                        automaticNameDelimiter:'=====', // 打包出来的 chunk {中间的分割线} element ui
                        priority: 20,
                        test: /[\\/]node_modules[\\/]_?element-ui(.*)/,
                        chunks: "all",
                        // filename: 'js/[name]/bundle.js', dist\js\chunk-elementUI\bundle.js 可以定义类型
                        enforce: true // 强制抽离此模块
                    },
                    styles: {
                        name: 'styles',
                        test: /\.(sa|sc|c)ss$/,
                        chunks: 'all',
                        enforce: true
                    },
                }
            },
        };



        config.plugins = [...config.plugins, ...plugins];
    },
    // 类似 webpack module Loader 
    chainWebpack: config => {
        // config.plugins.delete('prefetch')
        // config.plugins.delete('preload')
        // 有选择的开启prefetch 只加载当前的
        config.plugin('prefetch').tap(options => {
            options[0].fileBlacklist = options[0].fileBlacklist || []
            options[0].fileBlacklist.push(/myasyncRoute(.)+?\.js$/)
            return options
        })
        config.resolve.symlinks(true); // 修复热更新失效
        // 压缩图片
        config.module.rule("images")
            .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
            .use("image-webpack-loader")
            .loader("image-webpack-loader")
            .options({
                // bypassOnDebug:true,
                mozjpeg: { progressive: true, quality: 65 },
                optipng: { enabled: false },
                pngquant: { quality: [0.65, 0.90], speed: 4 },
                gifsicle: { interlaced: false },
                webp: { quality: 75 }
            })
            .end()
    },

    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        // extract: true,
        // 开启 CSS source maps?
        // sourceMap: false,
        // 启用 CSS modules for all css / pre-processor files.
        // requireModuleExtension: false,
        loaderOptions: {
            sass: {
                prependData: `@import "@/style/index.scss";` //引入全局变量   
            }
        },
    },

    devServer: {

    }
}