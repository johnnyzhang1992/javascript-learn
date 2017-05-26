/**
 * Created by zq199 on 2017/4/14.
 */
//-----------[向上funarg问题]--------------
function foo() {
    var x = 10;
    return function bar() {
        console.log(x);
    }
}
// foo 返回的也是一个变量，而且用到了变量x

var returnFunction = foo();

var x = 20;
returnFunction();//10

// 在创建时刻，函数会保存父函数的作用域链
// 这个类型的作用域叫做静态作用域。


//-----------[向下funarg问题]--------------
// global y
var y =10;
// global function
function foo1() {
    console.log(y);
}
(function (funArg) {
    // local y
    var y = 20;
    funArg();//10
})(foo1); // pass "down" foo1 as a "funArg"


/**
 *  闭包是一个代码块（在 ECMAScript 是一个函数）和以静态方式（语法）方式进行存储的所有父作用域的一个集合体。
 *  基本规则： JavaScript函数的执行用到了作用域链，这个作用域链是函数定义时创建的。
 */

// 一个闭包对变量进行的修改会体现在另一个闭包对这些变量的读取上
function baz() {
    var x = 1;
    return {
        foo : function foo() { return ++x;},
        bar : function bar() { return --x;}
    }
}
var closures = baz();

console.log(
    closures.foo(),
    closures.bar()
);

var scope = 'global scope';
function checkscope(){
    var scope = "local scope";
    function f(){return scope;}
    return f;
}

checkscope()();// local scope

var data = [];
for(var k = 0;k < 3; k++){
    data[k] = function () {
        console.log(k);
    };
}
data[0]();//3
data[1]();//3
data[2]();//3
// 这些函数拥有同一个[[Scope]],这个属性中的循环计数器的值是最后一次所赋的值

var data1 = [];
for(var k = 0;k < 3; k++){
    data1[k] = (function (x) {
        return function () {
            console.log(x);
        };
    })(k); // pass "k" value 传递 K 的值
}
data1[0]();//0
data1[1]();//1
data1[2]();//2
// 在作用域链中提供一个额外的对象-比如使用额外函数

function constfuncs() {
    var funcs = [];
    for(var i = 0;i < 10;i++){
        funcs[i] = function(){return i;};
    }
    return funcs;
}
var funcs = constfuncs();
funcs[5]//10

/**
 * this
 */

/*
 this 是执行上下文的一个属性，而不是变量对象的一个属性
  */

