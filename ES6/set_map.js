/**
 * Author johnnyZhang
 * Site johnnyzhang.cn
 * CreateTime 2017/7/25.
 */
/**
 * Set和Map数据结构
 */
// ES6 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。
//
// Set 本身是一个构造函数，用来生成 Set 数据结构。

const s = new Set();

[2, 3, 5, 4, 5, 2, 2].forEach((x) => s.add(x));

console.log(s);
for (let i of s) {
    console.log(i);
}
/*Set 实例的属性和方法 */
// Set 结构的实例有以下属性。

// Set.prototype.constructor：构造函数，默认就是Set函数。
// Set.prototype.size：返回Set实例的成员总数。
// Set 实例的方法分为两大类：操作方法（用于操作数据）和遍历方法（用于遍历成员）。下面先介绍四个操作方法。
//
// add(value)：添加某个值，返回Set结构本身。
// delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。
// has(value)：返回一个布尔值，表示该值是否为Set的成员。
// clear()：清除所有成员，没有返回值。
let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);

// 并集
let union = new Set([...a, ...b]);
// Set {1, 2, 3, 4}

// 交集
let intersect = new Set([...a].filter(x => b.has(x)));
// set {2, 3}

// 差集
let difference = new Set([...a].filter(x => !b.has(x)));
// Set {1}



/*   WeakSet  */

// WeakSet 结构与 Set 类似，也是不重复的值的集合。但是，它与 Set 有两个区别。
//
// 首先，WeakSet 的成员只能是对象，而不能是其他类型的值。
// const ws = new WeakSet();
// ws.add(1);
// // TypeError: Invalid value used in weak set
// ws.add(Symbol());
// // TypeError: invalid value used in weak set

const aa = [[1, 2], [3, 4]];
const _ws = new WeakSet(aa);

const ws = new WeakSet();
const obj = {};
const foo = {};

// ws.add(window);
ws.add(obj);

// ws.has(window); // true
ws.has(foo);    // false

// ws.delete(window);
// ws.has(window);    // false

// WeakSet没有size属性，没有办法遍历它的成员。


/**
 *
 * Map
 *
 */
// ES6 提供了 Map 数据结构。它类似于对象，也是键值对的集合，
// 但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。
const items = [
    ['name', '张三'],
    ['title', 'Author']
];

const map = new Map();

items.forEach(
    ([key, value]) => map.set(key, value)
);
map.get('name');// 张三
map.has('name');//true
map.set('age',18);
map.size ;//3

const set = new Set([
    ['foo', 1],
    ['bar', 2]
]);
const m1 = new Map(set);
console.log(m1);
m1.get('foo'); // 1

const m2 = new Map([['baz', 3]]);
const m3 = new Map(m2);
m3.get('baz'); // 3

// Map 结构原生提供三个遍历器生成函数和一个遍历方法。
//
// keys()：返回键名的遍历器。
// values()：返回键值的遍历器。
// entries()：返回所有成员的遍历器。
// forEach()：遍历 Map 的所有成员。


// Map 结构转为数组结构，比较快速的方法是使用扩展运算符（...）。
const map1 = new Map([
    [1, 'one'],
    [2, 'two'],
    [3, 'three'],
]);

[...map1.keys()];
// [1, 2, 3]

    [...map1.values()];
// ['one', 'two', 'three']

[...map1.entries()];
// [[1,'one'], [2, 'two'], [3, 'three']]

    [...map1];
// [[1,'one'], [2, 'two'], [3, 'three']]

// 结合数组的map方法、filter方法，可以实现 Map 的遍历和过滤（Map 本身没有map和filter方法）。

const map0 = new Map()
    .set(1, 'a')
    .set(2, 'b')
    .set(3, 'c');
console.log(map0);
const map2 = new Map(
    [...map0].filter(([k, v]) => k < 3)
);
console.log(map2);
// 产生 Map 结构 {1 => 'a', 2 => 'b'}

const map3 = new Map(
    [...map0].map(([k, v]) => [k * 2, '_' + v])
);
console.log(map3);
// 产生 Map 结构 {2 => '_a', 4 => '_b', 6 => '_c'}
// 此外，Map 还有一个forEach方法，与数组的forEach方法类似，也可以实现遍历。

map.forEach(function(value, key, map) {
    console.log("Key: %s, Value: %s", key, value);
});








