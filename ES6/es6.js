/**
 * Author johnnyZhang
 * Site johnnyzhang.cn
 * CreateTime 2017/7/13.
 */

/*
变量的解构赋值
 */
let x = 1;
let y = 2;

[x, y] = [y, x];
console.log(x+':'+y);
function example() {
    return [1, 2, 3];
}
let [a, b, c] = example();
console.log(a,b,c);

// 字符串中嵌入变量
let name = "Bob", time = "today";
console.log(`Hello ${name}, how are you ${time}?`);
// 如果大括号中的值不是字符串，将按照一般的规则转为字符串。
// 比如，大括号中是一个对象，将默认调用对象的toString方法。
function fn() {
    return "Hello World";
}
console.log(`foo ${fn()} ba`);
// 嵌套
const tmpl = addrs => `
  <table>
  ${addrs.map(addr => 
    `<tr><td>first:${addr.first}</td></tr>
    <tr><td>last:${addr.last}</td></tr>
  `.trim()).join('')}
  </table>
`;
const data = [
    { first: '<Jane>', last: 'Bond' },
    { first: 'Lars', last: '<Croft>' },
];

console.log(tmpl(data));

// 可以将参数默认值设为undefined，表明这个参数是可以省略的。
function foo(optional = undefined) {  }

// rest 参数
// ES6 引入 rest 参数（形式为...变量名），用于获取函数的多余参数，这样就不需要使用arguments对象了。
// rest 参数搭配的变量是一个数组，该变量将多余的参数放入数组中。
function add(...values) {
    let sum = 0;

    for (let val of values) {
        sum += val;
    }

    return sum;
}

console.log(add(2, 5, 3)); // 10

function push(array, ...items) {
    // items.forEach(function(item) {
    //     array.push(item);
    //     console.log(item);
    // });
    for(let item of items){
        array.push(item);
        console.log(array)
    }
}

let a1 = [];
push(a1, 1, 2, 3);