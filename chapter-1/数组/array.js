/**
 * Created by zq199 on 2017/5/9.
 */
/** 创建数组  */
// 数组直接量中的值不一定事常量；它们可以事任意的表达式
var base = 1024;
var table = [base,base+1,base+2];
// 可以包含对象直接量或其他数组直接量
var b = [[1,{x:1,y:2}],2,[3,{x:3,y:3}]];

/*
* 遍历数组
 */

var keys = Object.keys(o); //获得o对象属性名组成的数组
var values = [];//在数组中存储匹配属性的值
for(var i =0;i<keys.length;i++){ // 对于数组的每个索引
    var key = keys[i]; // 获得索引处的键值
    values[i] = o[key]; // 在values 数组中保存属性值
}
