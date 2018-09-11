/**
 * Created by PhpStorm.
 * Author: johnnyzhang
 * Date: 2018/9/11 下午5:51
 */

'use strict';

// one
function normalize(arr) {
    return arr.map((x)=>{
        return x.split('').map((item,index)=>{
           return index<1 ? item.toUpperCase() : item.toLowerCase();
        }).join('')
    })
}

console.time("共花费了1");
console.log(normalize(['adam', 'LISA', 'barT']));
console.timeEnd("共花费了1");

// two
function normalize1(arr) {
    return arr.map((x)=>{
        return x.substring(0,1).toUpperCase()+x.substring(1).toLowerCase();
    })
}
console.time("共花费了2");
console.log(normalize1(['adam', 'LISA', 'barT']));
console.timeEnd("共花费了2");


// 测试:
if (normalize(['adam', 'LISA', 'barT']).toString() === ['Adam', 'Lisa', 'Bart'].toString()) {
    console.log('测试通过!');
}
else {
    console.log('测试失败!');
}

'use strict';

let arr1 = ['1', '2', '3'];
let r1;
console.time("共花费了3");
r1 = arr1.map(Number);
console.log(r1);
console.timeEnd("共花费了3");

function string2int(s) {
    return s.split('').reduce((x,y)=>{return x*10+y*1});
}

function string2int1(s) {
    return s.split('').reduce((x,y)=>{return x+y})*1;
}

console.time('共花费了4');
console.log(string2int('13579'));
console.timeEnd("共花费了4");

console.time('共花费了5');
console.log(string2int1('13579'));
console.timeEnd("共花费了5");