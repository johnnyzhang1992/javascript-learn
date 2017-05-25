/**
 * Created by zq199 on 2017/5/10.
 */
/**
 *
 * 函数
 *
 */

/*
*
* 函数定义
*
 */
// 函数声明语句
function f1() {

}

// 命名函数表达式
// f1 对函数外部不可访问
(function f1() {});

// 函数定义表达式
var f2 = function () {

};

// 匿名函数表达式

(function () {
    console.log('aaaa')
})();