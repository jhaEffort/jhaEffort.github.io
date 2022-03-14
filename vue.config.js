const path = require('path')
const glob = require("glob-all");
const resolve = (dir) => {
    return path.join(__dirname, dir)
}
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;
// 打包图形化信息
// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
// 压缩代码
const CompressionWebpackPlugin = require('compression-webpack-plugin');
// 清除多余的css
const PurgecssPlugin = require("purgecss-webpack-plugin");

const IS_PROD = ['production', 'development', 'prod'].includes(process.env.NODE_ENV)
module.exports = {
    publicPath: './',
    outputDir: 'dist', // 生成的路径
    assetsDir: '',
    configureWebpack: config => {
        const plugins = []
        plugins.push(
            new PurgecssPlugin({
                paths: glob.sync([resolve("./**/*.vue")]),
                extractors: [
                    {
                        extractor: class Extractor {
                            static extract(content) {
                                const validSection = content.replace(/<style([\s\S]*?)<\/style>+/gim, "");
                                return validSection.match(/[A-Za-z0-9-_:/]+/g) || [];
                            }
                        },
                        extensions: ["html", "vue"]
                    }
                ],
                whitelist: ["html", "body"],
                whitelistPatterns: [/el-.*/],
                whitelistPatternsChildren: [/^token/, /^pre/, /^code/]
            })
        );
        plugins.push(
            new CompressionWebpackPlugin({
                filename: "[path].gz[query]",
                algorithm: "gzip",
                test: productionGzipExtensions,
                threshold: 10240,
                minRatio: 0.8
            })
        );
    },
    // 类似 webpack module Loader 
    chainWebpack: config => {
        // 压缩图片
        config.module
            .rule("images")
            .test(/\.(png|jpe?g|gif|webp)(\?.*)?$/)
            .use("image-webpack-loader")
            .loader("image-webpack-loader")
            .options({
                mozjpeg: { progressive: true, quality: 65 },
                optipng: { enabled: false },
                pngquant: { quality: [0.65, 0.90], speed: 4 },
                gifsicle: { interlaced: false },
                webp: { quality: 75 }
            })
            .end()
    }
}