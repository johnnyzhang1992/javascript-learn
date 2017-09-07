/**
 * Author johnnyZhang
 * Site johnnyzhang.cn
 * CreateTime 2017/9/5.
 */
// 如果这个模块还依赖其他模块，那么define()函数的第一个参数，必须是一个数组，指明该模块的依赖性。
define([],function (){
    var add = function (x,y){
        return x+y;
    };
    return {
        add: add
    };
});
// // 使用 require 和 exports
// //
// // 创建一个名为"alpha"的模块，使用了require，exports，和名为"beta"的模块:
// define("alpha", ["require", "exports", "beta"], function (require, exports, beta) {
//     exports.verb = function() {
//         return beta.verb();
//         //Or:
//         return require("beta").verb();
//     }
// });
// // 一个返回对象的匿名模块：
//
// define(["alpha"], function (alpha) {
//     return {
//         verb: function(){
//             return alpha.verb() + 2;
//         }
//     };
// });
// // 一个没有依赖性的模块可以直接定义对象：
//
// define({
//     add: function(x, y){
//         return x + y;
//     }
// });
// // 一个使用了简单CommonJS转换的模块定义：
//
// define(function (require, exports, module) {
//     var a = require('a'),
//         b = require('b');
//
//     exports.action = function () {};
// });

// 使用Require.js加载一个jQuery插件：
(function (factory) {
    if (typeof define === "function" && define.amd) {
        // AMD模式
        define([ "jquery" ], factory);
    } else {
        // 全局模式
        factory(jQuery);
    }
}(function ($) {
    $.fn.jqueryPlugin = function () {
        //插件代码
    };
}));