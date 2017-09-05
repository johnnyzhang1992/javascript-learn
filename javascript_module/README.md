# Javascript模块化编程

## require.js

## 作用
  * 实现js文件的异步加载，避免网页失去响应
  * 管理模块之间的依赖性，便于代码的编写和维护。
 
 ````angular2html
<script src="js/require.js" defer async="true" ></script>
````　
  async属性表明这个文件需要异步加载，避免网页失去响应。IE不支持这个属性，只支持defer，所以把defer也写上。
  加载require.js以后，下一步就要加载我们自己的代码了。假定我们自己的代码文件是main.js，也放在js目录下面。那么，只需要写成下面这样就行了：
  
 　````
  <script src="js/require.js" data-main="js/main"></script>
  ````
  data-main属性的作用是，指定网页程序的主模块。
  在上例中，就是js目录下面的main.js，这个文件会第一个被require.js加载。
  由于require.js默认的文件后缀名是js，所以可以把main.js简写成main。
## 加载非规范的模块
require.config()接受一个配置对象，这个对象除了有前面说过的paths属性之外，
还有一个shim属性，专门用来配置不兼容的模块。
具体来说，每个模块要定义
（1）exports值（输出的变量名），表明这个模块外部调用时的名称；
（2）deps数组，表明该模块的依赖性。

```
require.config({
　　　　shim: {

　　　　　　'underscore':{
　　　　　　　　exports: '_'
　　　　　　},
　　　　　　'backbone': {
　　　　　　　　deps: ['underscore', 'jquery'],
　　　　　　　　exports: 'Backbone'
　　　　　　}
　　　　}
　　});
```

比如，jQuery的插件可以这样定义：
```　
shim: {
　　　　'jquery.scroll': {
　　　　　　deps: ['jquery'],
　　　　　　exports: 'jQuery.fn.scroll'
　　　　}
　　}
````
### require.js插件

require.js还提供一系列插件，实现一些特定的功能。
domready插件，可以让回调函数在页面DOM结构加载完成后再运行。
```angular2html　
require(['domready!'], function (doc){
　　　　// called once the DOM is ready
　　});
```

text和image插件，则是允许require.js加载文本和图片文件。
```angular2html
define([
　　　　'text!review.txt',
　　　　'image!cat.jpg'
　　　　],

　　　　function(review,cat){
　　　　　　console.log(review);
　　　　　　document.body.appendChild(cat);
　　　　}
　　);
```
　　