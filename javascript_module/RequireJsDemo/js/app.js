/**
 * Author johnnyZhang
 * Site johnnyzhang.cn
 * CreateTime 2017/9/5.
 */
// 简单的配置
require.config({
    // RequireJS 通过一个相对的路径 baseUrl来加载所有代码。baseUrl通常被设置成data-main属性指定脚本的同级目录。
    baseUrl: "./js",
    paths: {
        "jquery": ["lib/jquery.min"],
        "bootstrap": ['lib/bootstrap']
    },
    // 第三方脚本模块的别名,jquery比libs/jquery-1.11.1.min.js简洁明了；
    shim: {
        jquery: {
            exports: 'jquery'
        },
        bootstrap: {
            deps: ['jquery']//依赖文件
        }
    }
});
define.amd.jQuery = true;
require(['jquery','bootstrap','app/math'], function ($,bs,math){
    $(document).ready(function () {
        console.info('-------文档加载完毕---------');
        console.log('\"1+2=\"'+math.add(1,2))
    });

});