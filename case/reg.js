/**
 * Author johnnyZhang
 * Site johnnyzhang.cn
 * CreateTime 2017/7/14.
 */
/* 正则表达式 */

/**
 * search() 
 */
var str = "Visit Runoob!";
var n = str.search(/Runoob/i);
console.log(n);

/**
 * replace()
 */
var str1 = 'facebook microsoft apple';
var txt = str1.replace(/microsoft/i,"Runoob");
console.log(txt);
var txt1 =str1.replace(/\b(facebook)\b/,"Facebook");
console.log(txt1);
/*
 使用 test()
 test() 方法是一个正则表达式方法。
 test() 方法用于检测一个字符串是否匹配某个模式，如果字符串中含有匹配的文本，则返回 true，否则返回 false。
 */
var patt = /best/;
patt.test("The best things in life are free!");//true

