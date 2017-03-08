/**
 * Created by zq199 on 2017/3/8.
 */

/** 作用域 */

/** JavaScript中的全局作用域和window 对象 */
// 一个全局作用域下的变量，存储了字符串 'test'
var test = 'test';
// 全局变量和 window对象的test的 test 属性是一致的
console.log(window.test == test);
//true

/** 隐藏全局作用域的变量声明 */
// 一个设置了 foo 值的函数
function test() {
    foo = 'test;'
}
// 调用此函数以设置 foo的值
test();
// 现在foo 在全局作用域下
console.log(window.foo == "test");
// true