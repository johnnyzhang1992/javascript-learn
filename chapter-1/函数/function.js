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

// length 属性
function check(args) {
    var actual = args.length; // 实参的真实个数
    var expected = args.callee.length; // 期望的实参个数
    if(actual !== expected){
        throw Error("Expected " + expected + "args; got" +actual);
    }
}
function f(x,y,z) {
    check(arguments);
    return x+y+z;
}

// bind() 函数
// 作用将函数绑定至某个对象

function f3(y) {
    return this.x +y;
}
var o = { x:1};
var g = f3.bind(o);
g(2);//3


// Function() 构造函数
var f4 = new Function("x","Y","return x*y");
// (function(x,y
//           /*``*/) {
//     return x*y
// })