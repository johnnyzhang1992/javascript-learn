/**
 * Created by PhpStorm.
 * Author: johnnyzhang
 * Date: 2018/9/10 下午5:30
 */

/*
遍历器（Iterator）就是这样一种机制。它是一种接口，为各种不同的数据结构提供统一的访问机制。
任何数据结构只要部署 Iterator 接口，就可以完成遍历操作（即依次处理该数据结构的所有成员）。
Iterator 的作用有三个：
一是为各种数据结构，提供一个统一的、简便的访问接口；
二是使得数据结构的成员能够按某种次序排列；
三是 ES6 创造了一种新的遍历命令for...of循环，Iterator 接口主要供for...of消费。
 */

/*
Iterator 的遍历过程是这样的。

（1）创建一个指针对象，指向当前数据结构的起始位置。也就是说，遍历器对象本质上，就是一个指针对象。

（2）第一次调用指针对象的next方法，可以将指针指向数据结构的第一个成员。

（3）第二次调用指针对象的next方法，指针就指向数据结构的第二个成员。

（4）不断调用指针对象的next方法，直到它指向数据结构的结束位置。
 */

// 模拟
let it = makeIterator(['a', 'b']);

console.log(it.next()); // { value: "a", done: false }
console.log(it.next());// { value: "b", done: false }
console.log(it.next());// { value: undefined, done: true }

function makeIterator(array) {
    let nextIndex = 0;
    return {
        next: function() {
            return nextIndex < array.length ?
                {value: array[nextIndex++], done: false} :
                {value: undefined, done: true};
        }
    };
}

/*
原生具备 Iterator 接口的数据结构如下。

Array
Map
Set
String
TypedArray
函数的 arguments 对象
NodeList 对象
 */

let arr = ['a', 'b', 'c'];
let iter = arr[Symbol.iterator]();// 

iter.next(); // { value: 'a', done: false }
iter.next(); // { value: 'b', done: false }
iter.next(); // { value: 'c', done: false }
iter.next(); // { value: undefined, done: true }

// Iterator 接口与 Generator 函数
// Symbol.iterator方法的最简单实现，还是使用下一章要介绍的 Generator 函数。

let myIterable = {
    [Symbol.iterator]: function* () {
        yield 1;
        yield 2;
        yield 3;
    }
};
let arr1 = [...myIterable];// [1, 2, 3]
console.log(arr1);
// 或者采用下面的简洁写法

let obj = {
    * [Symbol.iterator]() {
        yield 'hello';
        yield 'world';
    }
};

for (let x of obj) {
    console.log(x);
}
// "hello"
// "world"
// 上面代码中，Symbol.iterator方法几乎不用部署任何代码，只要用 yield 命令给出每一步的返回值即可。