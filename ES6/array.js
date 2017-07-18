/**
 * Author johnnyZhang
 * Site johnnyzhang.cn
 * CreateTime 2017/7/18.
 */
/*
 扩展运算符
 */

// 扩展运算符（spread）是三个点（...）。
// 它好比 rest 参数的逆运算，将一个数组转为用逗号分隔的参数序列。

console.log(...[1, 2, 3]);
// 1 2 3

console.log(1, ...[2, 3, 4], 5);
// 1 2 3 4 5

function push(array, ...items) {
    array.push(...items);
}
let arr = [1,2];
push(arr,3,4,5,6,7);
console.log(arr);//[1,2,3,4,5,6,7]

// 替代数组的 apply 方法
// 由于扩展运算符可以展开数组，所以不再需要apply方法，将数组转为函数的参数了。
// ES5 的写法
function f(x, y, z) {
    // ...
}
var args = [0, 1, 2];
f.apply(null, args);

// ES6的写法
function f1(x, y, z) {
    // ...
}
var args1 = [0, 1, 2];
f1(...args);

/**
 * 扩展运算符的应用
 */
// 扩展运算符提供了数组合并的新写法。

/*（1）合并数组*/

// 扩展运算符提供了数组合并的新写法。
// ES5
var more = [];
[1, 2].concat(more);
// ES6
[1, 2, ...more];

var arr1 = ['a', 'b'];
var arr2 = ['c'];
var arr3 = ['d', 'e'];

// ES5的合并数组
arr1.concat(arr2, arr3);
// [ 'a', 'b', 'c', 'd', 'e' ];

// ES6的合并数组
[...arr1, ...arr2, ...arr3];
// [ 'a', 'b', 'c', 'd', 'e' ];

/*（4）字符串*/

// 扩展运算符还可以将字符串转为真正的数组。

[...'hello'];
// [ "h", "e", "l", "l", "o" ]

let map = new Map([
    [1, 'one'],
    [2, 'two'],
    [3, 'three'],
]);

let arr11 = [...map.keys()]; // [1, 2, 3]
console.log(arr11);