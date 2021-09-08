const path = require('path')

module.exports = {
    // 配置使用stylus全局变量
    chainWebpack: config => {
        const types = ["vue-modules", "vue", "normal-modules", "normal"];
        types.forEach(type =>
            addStyleResource(config.module.rule("stylus").oneOf(type))
        );
    }
}


// 定义函数addStyleResource

function addStyleResource(rule) {
    rule.use("style-resource")
        .loader("style-resources-loader")
        .options({
            patterns: [
                path.resolve(__dirname, "./src/common/stylus/variable.styl"),
                path.resolve(__dirname, "./src/common/stylus/mixin.styl"),
            ] 
            //后面的路径改成你自己放公共stylus变量的路径
        });
}
