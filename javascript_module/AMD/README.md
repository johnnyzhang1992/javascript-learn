# AMD

define() 函数

本规范只定义了一个函数 "define"，它是全局变量。函数的描述为：

    define(id?, dependencies?, factory);
    //id ：可选参数，它指的是模块的名字。
    //dependencies：可选参数，定义中模块所依赖模块的数组。
    //factory：模块初始化要执行的函数或对象
 
## define.amd 属性

为了清晰的标识全局函数（为浏览器加载script必须的）遵从AMD编程接口，任何全局函数应该有一个"amd"的属性，它的值为一个对象。这样可以防止与现有的定义了define函数但不遵从AMD编程接口的代码相冲突。

当前，define.amd对象的属性没有包含在本规范中。实现本规范的作者，可以用它通知超出本规范编程接口基本实现的额外能力。

define.amd的存在表明函数遵循本规范。如果有另外一个版本的编程接口，那么应该定义另外一个属性，如define.amd2，表明实现只遵循该版本的编程接口。

一个如何定义同一个环境中允许多次加载同一个版本的模块的实现：

    define.amd = {
      multiversion: true
    };
最简短的定义：

    define.amd = {};