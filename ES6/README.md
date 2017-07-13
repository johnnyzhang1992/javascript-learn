## 最常用的ES6特性

```
 let, const, class, extends, super, arrow functions, template string,
 destructuring, default, rest arguments
```
这些是ES6最常用的几个语法，基本上学会它们，我们就可以走遍天下都不怕啦！

## template string
    
```angular2html
$("#result").append(
  "There are <b>" + basket.count + "</b> " +
  "items in your basket, " +
  "<em>" + basket.onSale +
  "</em> are on sale!"
);
```
我们要用一堆的'+'号来连接文本与变量，而使用ES6的新特性模板字符串``后，我们可以直接这么来写：
```angular2html
$("#result").append(`
  There are <b>${basket.count}</b> items
   in your basket, <em>${basket.onSale}</em>
  are on sale!
`);
```
用反引号（`）来标识起始，用${}来引用变量，而且所有的空格和缩进都会被保留在输出之中.

### ES6 声明变量的六种方法
ES5 只有两种声明变量的方法：var命令和function命令。ES6除了添加let和const命令，后面章节还会提到，另外两种声明变量的方法：import命令和class命令。所以，ES6 一共有6种声明变量的方法。

ES6为了改变这一点，一方面规定，为了保持兼容性，var命令和function命令声明的全局变量，依旧是顶层对象的属性；另一方面规定，let命令、const命令、class命令声明的全局变量，不属于顶层对象的属性。也就是说，从ES6开始，全局变量将逐步与顶层对象的属性脱钩。
