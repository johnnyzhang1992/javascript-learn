/**
 * Author johnnyZhang
 * Site johnnyzhang.cn
 * CreateTime 2018/5/8.
 */

// 实例方法
// exec() test

//exec()
// 接受一个参数： 要应用模式的字符串
let text ='mon and dad and baby';
let pattern = /mon( and dad( and baby)?)?/gi;
let matches = pattern.exec(text);
// 返回第一个匹配项信息的数组或者再没有匹配情况下返回null
// 数组包含两个额外的属性：index 和input
console.log(matches.index);// 0
console.log(matches.input);//mon and dad and baby
// 数组中第一项是与整个模式匹配的字符串；
// 其他项是与模式的捕获组匹配的字符串
console.log(matches[0]);//mon and dad and baby
console.log(matches[1]);//and dad and baby
console.log(matches[2]);//and baby
console.log(matches);
// [ 'mon and dad and baby',
// ' and dad and baby',
// ' and baby',
// index: 0,
// input: 'mon and dad and baby' ]

// test()
// 接受一个字符串参数
// 匹配返回true ；否返回false
let text1 = '000-00-0000';
let pattern1 = /\d{3}-\d{2}-\d{4}/;
if(pattern1.test(text1)){
    console.log('The pattern was matched.')//----
}

let pattern2 = new RegExp('\\d{3}-\\d{2}-\\d{4}');
if(pattern2.test(text1)){
    console.log('The pattern was matched.')//----
}
console.log(pattern2.toString());// /\d{3}-\d{2}-\d{4}/
console.log(pattern2.toLocaleString());// /\d{3}-\d{2}-\d{4}/