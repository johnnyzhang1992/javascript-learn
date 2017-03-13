/**
 * Created by zq199 on 2017/3/13.
 */
/** 命名空间 */
// JavaScript 中的命名空间化以及实现
// 创建一个默认的、全局的命名空间
var YAHOO = {};
// 使用对象设置一些子命名
YAHOO.util = {};
//创建最终命名空间，它包含一个值为函数的属性
YAHOO.util.Event = {
    addEventListener: function () {
        //........
    }
};
// 调用某个具体命名空间控件中的函数
YAHOO.util.Event.addEventListener();