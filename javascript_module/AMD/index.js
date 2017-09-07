/**
 * Author johnnyZhang
 * Site johnnyzhang.cn
 * CreateTime 2017/9/5.
 */
// 简单的配置
require.config({
    // RequireJS 通过一个相对的路径 baseUrl来加载所有代码。baseUrl通常被设置成data-main属性指定脚本的同级目录。
    baseUrl: "./js",
    // 第三方脚本模块的别名,jquery比libs/jquery-1.11.1.min.js简洁明了；
    paths: {
        "jquery": ["http://libs.baidu.com/jquery/2.0.3/jquery", "jquery"],
        "bootstrap": 'bootstrap',
    },
    shim: {
        jquery: {
            exports: 'jquery'
        },
        bootstrap: {
            deps: ['jquery']
        }
    }
});
// define.amd.jQuery = true;
require(['math'], function (math){
    console.log(math.add(2,3))
});