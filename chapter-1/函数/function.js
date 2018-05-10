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

// 函数内部属性

// callee()
// 该属性是一个指针，指向拥有这个arguments 对象的函数。

// caller()
// 该属性保存这个调用当前函数的函数的引用。

function outer() {
    inner();
}
function inner() {
    console.log(inner.caller)
}
outer();// [Function: outer]
// 匿名函数表达式

(function () {
    console.log('aaaa')
})();

// 函数的属性和方法

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

// apply() 和call()
// 在特定的作用域中调用函数

// apply()
// 接受两个参数；一个是在其中运行函数的作用域；另一个是参数数组

//例子
function sum(num1,num2) {
    return num1+num2;
}
function applySum1(num1,num2) {
    return sum.apply(this,arguments);
}
function applySum2(num1,num2) {
    return sum.apply(this,[num1,num2])
}
console.log(applySum1(10,20));// 30
console.log(applySum2(10,20));// 30

// call()
// 第一个参数和apply()相同都是在运行函数的作用域
// 不同，传入参数的方法不同。参数需要枚举出来

// 例子
function callSum(num1,num2) {
    return sum.call(this,num1,num2)
}
console.log(callSum(10,15));// 25

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