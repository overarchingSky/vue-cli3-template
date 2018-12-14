// vue.config.js
const path = require('path')
const resolve = path.resolve
module.exports = {
    configureWebpack: {
        resolve:{
            alias:{
                "@": resolve("src"),
                less: resolve("src/less"),
                utils: resolve("src/utils"),
                api: resolve("src/api"),
                views: resolve("src/views"),
                cps: resolve("src/components"),
                'svg-icon': resolve("src/assets/svg-icon"),
                images: resolve("src/assets/images"),
                icon: resolve("src/assets/icon"),
            }
        }
    },
    css:{
        loaderOptions:{
            // [name,local,hash,path]
            css: {
                localIdentName: '[local]-[hash]'
            }
        }
    }
}