/**
 * Author johnnyZhang
 * Site johnnyzhang.cn
 * CreateTime 2018/5/14.
 */

// Boolean 类型是与布尔值对应的引用类型

let booleanObject = new Boolean(false);
console.log(typeof booleanObject); // object

let falseObject = new Boolean(false);
let result = falseObject && true;
console.log(result); // true

let falseValue = false;
let result1 = falseValue && true;
console.log(result); // false

console.log(typeof falseObject); // object
console.log(typeof falseValue); // boolean
console.log(falseObject instanceof Boolean); // true
console.log(falseValue instanceof Boolean); // false