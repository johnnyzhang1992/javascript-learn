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
