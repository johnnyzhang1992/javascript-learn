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