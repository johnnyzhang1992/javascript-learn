/**
 * Author johnnyZhang
 * Site johnnyzhang.cn
 * CreateTime 2018/5/28.
 */

/**
let
 */
// for循环还有一个特别之处，就是设置循环变量的那部分是一个父作用域，
// 而循环体内部是一个单独的子作用域。
for (let i = 0; i < 3; i++) {
    let i = 'abc';
    console.log(i);
}

// 在代码块内，使用let命令声明变量之前，该变量都是不可用的。
// 这在语法上，称为“暂时性死区”（temporal dead zone，简称 TDZ

// if (true) {
//     // TDZ开始
//     tmp = 'abc'; // ReferenceError
//     console.log(tmp); // ReferenceError
//
//     let tmp; // TDZ结束
//     console.log(tmp); // undefined
//
//     tmp = 123;
//     console.log(tmp); // 123
// }

