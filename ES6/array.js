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
push(arr,1,3,4,5,6,7);
let new_arr = new Set([...arr]);
console.log(new_arr);
console.log(...[arr]);//[1,2,3,4,5,6,7]

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
//只要是部署了Iterator接口的数据结构，Array.from 都能将其转为数组。
Array.from('hello');
// ['h', 'e', 'l', 'l', 'o']

let map = new Map([
    [1, 'one'],
    [2, 'two'],
    [3, 'three'],
]);

let arr11 = [...map.keys()]; // [1, 2, 3]
console.log(arr11);


/*Array.from()*/
let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
};
// ES5的写法
var arr5 = [].slice.call(arrayLike); // ['a', 'b', 'c']
console.log(arr5);
// ES6的写法
let arr6 = Array.from(arrayLike); // ['a', 'b', 'c']
console.log(arr6);
// 对于还没有部署该方法的浏览器，可以用Array.prototype.slice方法替代。
const toArray = (() =>
        Array.from ? Array.from : obj => [].slice.call(obj)
)();

// Array.from()的另一个应用是，将字符串转为数组，然后返回字符串的长度。
// 因为它能正确处理各种Unicode字符，可以避免JavaScript将大于\uFFFF的Unicode字符，算作两个字符的bug。

function countSymbols(string) {
    return Array.from(string).length;
}

// Array.of方法用于将一组值，转换为数组。

Array.of(3, 11, 8); // [3,11,8]

// 数组实例的copyWithin方法，在当前数组内部，将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组。也就是说，使用这个方法，会修改当前数组。

// Array.prototype.copyWithin(target, start = 0, end = this.length);

// 它接受三个参数。
//
// target（必需）：从该位置开始替换数据。
// start（可选）：从该位置开始读取数据，默认为0。如果为负值，表示倒数。
// end（可选）：到该位置前停止读取数据，默认等于数组长度。如果为负值，表示倒数。
[1, 2, 3, 4, 5].copyWithin(0, 3);

/*数组实例的 find() 和 findIndex()*/
// 数组实例的find方法，用于找出第一个符合条件的数组成员。
// 它的参数是一个回调函数，所有数组成员依次执行该回调函数，直到找出第一个返回值为true的成员，然后返回该成员。
// 如果没有符合条件的成员，则返回undefined。

[1, 4, -5, 10].find((n) => n < 0);//返回满足条件的第一个值
// -5
[1, 5, 10, 15].find(function(value, index, arr) {
    return value > 9;
});// 10

// 数组实例的findIndex方法的用法与find方法非常类似，返回第一个符合条件的数组成员的位置，
// 如果所有成员都不符合条件，则返回-1。
[1, 5, 10, 15].findIndex((n)=>n>9);//返回满足条件的第一个序列
//2
[1, 5, 10, 15].findIndex(function(value, index, arr) {
    return value > 9;
}); // 2

 /*数组实例的fill()*/
['a', 'b', 'c'].fill(7);
// [7, 7, 7]

new Array(3).fill(7);
// [7, 7, 7]

// fill方法还可以接受第二个和第三个参数，用于指定填充的起始位置和结束位置。

['a', 'b', 'c'].fill(7, 1, 2);
// ['a', 7, 'c']

/*数组实例的 entries()，keys() 和 values()*/
// ES6 提供三个新的方法——entries()，keys()和values()——用于遍历数组。
// 它们都返回一个遍历器对象（详见《Iterator》一章），可以用for...of循环进行遍历，
// 唯一的区别是keys()是对键名的遍历、values()是对键值的遍历，entries()是对键值对的遍历。

for (let index of ['a', 'b'].keys()) {
    console.log(index);
}
// 0
// 1

// for (let elem of ['a', 'b'].values()) {
//     console.log(elem);
// } // 不支持
// 'a'
// 'b'

for (let [index, elem] of ['a', 'b'].entries()) {
    console.log(index, elem);
}
// 0 "a"
// 1 "b"

/* 数组实例的 includes() */

// Array.prototype.includes方法返回一个布尔值，表示某个数组是否包含给定的值，
// 与字符串的includes方法类似。ES2016 引入了该方法。

[1, 2, 3].includes(2);     // true
[1, 2, 3].includes(4);     // false
[1, 2, NaN].includes(NaN); // true