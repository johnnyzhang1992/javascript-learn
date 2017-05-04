/**
 * Created by zq199 on 2017/5/3.
 */
/*
  表达式语句
 */
// switch
function convert(x) {
    switch (typeof x){
        case 'number':
            return x.toString(16);//将数字转换为十六进制
        case 'string':
            return '"'+x+'""';// 返回亮点带双引号的字符串
        default:
            return String(x);
    }
}
// for/in

// 标签语句
var token = null;
mainloop : while(token != null){
    token = '';
    continue mainloop; //跳转到下一次循环
    token = 'aaaa';//不被执行
}
//try catch
try{
    var n = Number(prompt('请输入一个整数',''));
    var f = factorial(n);
    console.log(f);
}catch(ex){
    alert(ex);//告诉用户发生了什么错误
}

/*
  ------with 语句-------
  with语句用于临时扩展作用域链:

  with(object)
  statement

  这条语句将object添加到作用域链的头部，然乎执行statement，
  最后把作用于链回复到原始状态。
 */

with(document.forms[0]){
    // 直接访问表单元素，例如:
    name.value = "";//等价于 document.form[0].name.value
    address.value = "";
    email.value = "";
}

/*
 debugger语句
 当调试程序可用并运行的时候，JavaScript解释器将会（非必需）以调试模式运行。
 */

/*
  use strict

  "use strict" 是ECMAScript 5引入的一条指令。指令不是语句。
 */