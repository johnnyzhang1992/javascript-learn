/**
 * Author johnnyZhang
 * Site johnnyzhang.cn
 * CreateTime 2018/6/27.
 */
// RegExp 构造函数

// 字符串对象共有 4 个方法，可以使用正则表达式：
// match()、replace()、search()和split()

function codePointLength(text) {
    let result = text.match(/[\s\S]/gu);
    return result ? result.length : 0;
}

let s = '𠮷𠮷';

s.length ;// 4
codePointLength(s) ;// 2
