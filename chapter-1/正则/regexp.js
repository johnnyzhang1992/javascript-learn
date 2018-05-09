/**
 * Author johnnyZhang
 * Site johnnyzhang.cn
 * CreateTime 2018/5/8.
 */

// 字面量, 构造函数和工厂符号都是可以的：
// /pattern/flags
// new RegExp(pattern [, flags])
// RegExp(pattern [, flags])

// 当使用构造函数创造正则对象时，需要常规的字符转义规则（在前面加反斜杠 \）。
// 比如，以下是等价的：

let re2 = new RegExp("\\w+");
let re3 = /\w+/;

// 字符集合（Character Sets）

// [xyz]
// 一个字符集合，也叫字符组。匹配集合中的任意一个字符。你可以使用连字符'-'指定一个范围。
//例如，[abcd] 等价于 [a-d]，匹配"brisket"中的'b'和"chop"中的'c'。

// [^xyz]
// 一个反义或补充字符集，也叫反义字符组。也就是说，它匹配任意不在括号内的字符。你也可以通过使用连字符 '-' 指定一个范围内的字符。
// 例如，[^abc] 等价于 [^a-c]。 第一个匹配的是 "bacon" 中的'o' 和 "chop" 中的 'h'。

// 分组（Grouping）与反向引用（back references）
// (x)
// 匹配 x 并且捕获匹配项。 这被称为捕获括号（capturing parentheses）。
// 例如，/(foo)/ 匹配且捕获 "foo bar." 中的 "foo"。被匹配的子字符串可以在结果数组的元素 [1], ..., [n] 中找到，或在被定义的 RegExp 对象的属性 $1, ..., $9 中找到。


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

// 参考网页
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp