/**
 * Created by zq199 on 2017/4/18.
 */
var a = {a:1,b:2};
console.log(a.toString());//[object Object]
console.log(a.valueOf());//{ a: 1, b: 2 }
console.log(Number(a));//NaN


// 作用域

function test(o) {
    var i = 0;
    if(typeof o == "object"){
        var j = 0;
        for(var k =0;k<10;k++){
            console.log(k);
        }
        console.log(k);
    }
    console.log(j);
}
test({});
// 变量i,j,k，它们都在同一个作用域内（函数作用域）

/*
  函数作用域是指在函数声明的所以变量在函数体内始终是可见的。
 */

var scope = "global";
function f() {
    console.log(scope);//undefined
    var scope = "local";
    console.log(scope);//local
}
//相当于如下
// function f() {
//     var scope;
//     console.log(scope);//undefined
//     scope = "local";
//     console.log(scope);//local
// }
f();

//***** 一元运算符 *************

//---------- 递增（++）---------

// a++
// 当运算符在操作数之前，称为“前增量”运算符，他对操作数进行增量计算，并返回计算后的值。

// ++a
// 当运算符在操作符之后，称为“后增量”运算符，它对操作数进行增量计算但返回未作增量计算的值。

