/**
 * Author johnnyZhang
 * Site johnnyzhang.cn
 * CreateTime 2018/5/14.
 */

let numberObject = new Number(10);
console.log(numberObject); // [Number: 10]
console.log(typeof numberObject); // object

// toFixed() 参数，小数点后几位
// toString() 参数，表示基数，进制

let num = 10;
console.log(num.toString(2));//1010
console.log(num.toString(8));//12
console.log(num.toString(10));//10
console.log(num.toString(16));//a

console.log(num.toFixed(2));//10.00