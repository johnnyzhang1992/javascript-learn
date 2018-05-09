/**
 * Author johnnyZhang
 * Site johnnyzhang.cn
 * CreateTime 2018/5/8.
 */

// email *@.**
let email_pattern = new RegExp('^\\w@[a-z0-9]+(\\.[a-z]+){1,3}$');
let e_pattern = /^\w+@[a-z0-9]+(\.[a-z]+){1,3}$/;
console.log(email_pattern.test('a@aa.com'));
console.log(e_pattern.test('a@aa.com'));

// Email：^\w+@[a-z0-9]+(\.[a-z]+){1,3}$
//起始至少为一个字符(\w字母，数字或者下划线)，然后匹配@,接着为任意个字母或者数字，\.代表真正的点，.后面为至少一个的字符（a-z）,同时这个(比如.com)整体为一个子项作为结束，可以出现1-3次。因为有的邮箱是这样的.cn.net。（xxxx.@qq.com xxxx.@163.com xxxx.@16.cn.net ）

// 去掉首位空格
let str = '  hello  ';
console.log( '('+trim(str)+')' );//为了看出区别所以加的括号。 (hello)
function trim(str){
    let re = /^\s+|\s+$/g; // |代表或者   \s代表空格  +至少一个    前面有至少一个空格 或者后面有至少一个空格 且全局匹配
    return str.replace(re,''); //把空格替换成空
}

// 例子：从 URL 中提取子域名
let url = "https://news.domain.com";
let url_matches = /[^.]+/.exec(url);
console.log(url_matches);
console.log(/[^.]+/.exec(url)[0].toString().split('//')[1]); // news

// 获取协议
console.log(/https?/.exec(url)[0]); // https