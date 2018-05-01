/**
 * Created by zq199 on 2017/5/9.
 */
/** 创建数组  */
// 数组直接量中的值不一定事常量；它们可以事任意的表达式

let arr1 = new Array();
let arr2 = [];
let arr3 = new Array('red','blue','green');
let arr4 = ['red','blue','green'];
let arr5 = new Array(3);
console.log(arr5);
console.log(arr5[0]);//undefined
console.log(arr5[2]);//undefined
console.log(arr5.length);//3

let arr6 = [,,,];
console.log(arr6);//[undefined,undefined,undefined]
console.log(arr6.length);//3

// 判断该对象是否是数组
// false
console.log(typeof arr5);//object
// true
if(arr5 instanceof Array){
    console.log('is array');
}
//true
if(Array.isArray(arr5)){
    console.log('is array');
}

console.log(arr4);//[ 'red', 'blue', 'green' ]
console.log(arr4.valueOf());//[ 'red', 'blue', 'green' ]
console.log(arr4.toString());//red,blue,green
console.log(arr4.toLocaleString());//red,blue,green

let base = 1024;
let table = [base,base+1,base+2];
// 可以包含对象直接量或其他数组直接量
let b = [[1,{x:1,y:2}],2,[3,{x:3,y:3}]];

/*
* 遍历数组
 */

let keys = Object.keys(b); //获得o对象属性名组成的数组
console.log(keys);
let values = [];//在数组中存储匹配属性的值
for(let i =0;i<keys.length;i++){ // 对于数组的每个索引
    let key = keys[i]; // 获得索引处的键值
    values[i] = b[key]; // 在values 数组中保存属性值
}
console.log(values);


// reverse

let arr7 = [1,3,2,5,8,11,10,5];
console.log(arr7.reverse());//[ 5,10,11,8, 5, 2, 3, 1 ]
console.log(arr7.sort());//[ 1, 10, 11, 2, 3, 5,5, 8 ]

// 升序
function compare(val1,val2) {
    if(val1 > val2){
        return 1;
    }else if(val1 < val2){
        return -1
    }else{
        return 0
    }
}
console.log(arr7.sort(compare));//[ 1, 2, 3, 5, 5, 8, 10, 11 ]
// 降序
function compare1(val1,val2) {
    if(val1 < val2){
        return 1;
    }else if(val1 > val2){
        return -1
    }else{
        return 0
    }
}
console.log(arr7.sort(compare1));//[ 11, 10, 8, 5, 5, 3, 2, 1 ]

console.log(arr7.reverse(compare));// [ 1, 2, 3, 5, 5, 8, 10, 11 ]
console.log(arr7.reverse(compare1));// [ 11, 10, 8, 5, 5, 3, 2, 1 ]
// 降序
function compare2(val1,val2) {
    return val2-val1;
}
// val2 > val1 return true,大的在前面
console.log('---compare2---');
console.log(arr7.sort(compare2));
// pop 取出最后一条数据
// shift 取出第一条数据
// push 末尾添加数据

//concat 联合

let color = ['red'];
let color2 = color.concat('green',['blue','black']);
console.log(color2);//[ 'red', 'green', 'blue', 'black' ]

// slice 剪切

let color3 = [ 'red', 'green', 'blue', 'black','purple'];
console.log(color3.slice(1));// 1-5 [ 'green', 'blue', 'black', 'purple' ]
console.log(color3.slice(1,4));// [ 'green', 'blue', 'black' ]
console.log(color3.slice(-2,-1));// 3,4 [ 'black' ]

// splice 粘接 ，删除/插入/替换
console.log('-------splice------');
// 返回删除项
// 要删除的第一项的位置，要删除的位置
console.log(color3.splice(0,2)); //[ 'red', 'green' ]
console.log(color3);// [ 'blue', 'black', 'purple' ]
// 返回删除项
//  起始位置，要删除的项数，要插入的项
let color4 = color3.splice(1,0,'yellow','orange');
console.log(color3);// [ 'blue', 'yellow', 'orange', 'black', 'purple' ]
console.log(color4);// []
// 分析：从1开始，删除0项，添加两项

// 替换
let color5 = color3.splice(2,1,'white','gray');
console.log(color5);// [ 'orange' ]
console.log(color3);// [ 'blue', 'yellow', 'white', 'gray', 'black', 'purple' ]
//分析： 从2开始，删除一项，添加两项，即其中替换一项，新增一项

// 位置方法
// indexOf lastIndexOf
// 两个参数：要查找的项和（可选）表示查找起点位置的索引

let numbers = [1,2,6,7,3,5,4,2];
console.log(numbers.indexOf(2));//1
console.log(numbers.lastIndexOf(2));//7

// 迭代方法
console.log('----迭代方法---------');
// 每个方法都包含两个参数：
// 1) 要在每一项上运行的函数
// 2)(可选)运行该函数的作用域对象---影响this的值

// 该函数会传入三个参数：
// 1) 数组项的值 value
// 2) 该项再数组中的位置 index
// 3) 数组对象本身 array

// 五个方法
// every filter forEach map some

// every() &&
// 数组中的每一项运行给定函数，如果每一项都返回true，那么返回true
// 返回Boolean
let everyResult = numbers.every(function (item,index,array) {
   return (item>2);
});
// 判断是否每一项都大于2
console.log(everyResult); //false

// some() ||
// 对数组中的每一项运行给定返回，如果该函数对任一项返回true，则返回true
// 返回Boolean

let someResult = numbers.some(function (item,index,array) {
   return (item>2);
});
console.log(someResult);// true

// filter()
// 返回一个数组
// 对数组中的每一项运行给定函数，返回该函数会返回true的项目组成的数组

let filterResult = numbers.filter(function (item,index,array) {
   return (item>2)
});
console.log(filterResult);// [ 6, 7, 3, 5, 4 ]

// map()
// 对数组中的每一项运行给定的函数，返回每次函数调用的结果组成的函数
// 返回一个数组

let mapResult = numbers.map(function (item,index,array) {
    return item*2;
});
console.log(mapResult);// [ 2, 4, 12, 14, 6, 10, 8, 4 ]

// forEach()
// 对数组的每一项运行给定函数，没有返回值
// 本质上与for 循环迭代数组一样
numbers.forEach(function (item,index,array) {
   array[index] = item*2;
});
console.log(numbers);//[ 2, 4, 12, 14, 6, 10, 8, 4 ]

// 归并方法
// reduce() and reduceRight()
// 接收两个参数：
// 1）一个在每一项上调用的函数
// 2）（可选）作为归并基础的初始值
// 这两个方法会迭代数组的所有项，然后构建一个最终返回的值。

// 这两个函数接收四个参数：
// 1）前一个值 pre
// 2）当前值 cur
// 3）项的索引
// 4）数组对象
// 这个函数返回的任何值都会作为第一参数自动传给下一项
let values1 = [1,2,3,4,5];
let sum = values1.reduce(function (pre,cur,index,array) {
   return pre+cur;
});
console.log(sum);//15
