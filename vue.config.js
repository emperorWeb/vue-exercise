const path = require('path')

//骨架屏 为单页面/多页面应用生成骨架屏skeleton，减少白屏时间，在页面完全渲染之前提升用户感知体验
const SkeletonWebpackPlugin = require('vue-skeleton-webpack-plugin')

function resolve(dir) {
    return path.join(__dirname, dir); //path.join(__dirname)设置绝对路径
}
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
    devServer: {
        port: 9896,
        disableHostCheck: true, //webpack4.0 开始热更新
    },
    configureWebpack:config => {
        config.plugins.push(
            new SkeletonWebpackPlugin({
                webpackConfig: {
                    entry: {
                        app: path.join(
                            __dirname,
                            './src/components/Skeleton/entry-skeleton.js'
                        ),
                    },
                },
                quiet: true,
                minimize: true,
            })
        );
         //缓存
         if (!isDev) {
            Object.assign(config.output, {
                filename: `js/[name].js?hash=[contenthash:8]`,
                chunkFilename: `js/[name].js?hash=[contenthash:8]`,
            });
        }
    },

    chainWebpack: config => {

        config.resolve.alias
            .set('@', resolve('./src'))
            .set('@components',resolve('./src/components'));

    },
    css:{
        // 使用 css 分离插件 mini-css-extract-plugin，不然骨架屏组件里的 <style> 不起作用
        extract:true,
        sourceMap:false,
        extract:{

        },
        //使用postcss-px2rem-exclude自动将css中的px转换成rem
        loaderOptions: {
            postcss: {
                plugins: [
                    require('postcss-px2rem-exclude')({
                        remUnit: 50,
                        exclude: /node_modules|styles|ignoreRem/i,//忽略node_modules目录下的文件
                    }),
                ],
            },
        },
    },
    productionSourceMap: false,
}