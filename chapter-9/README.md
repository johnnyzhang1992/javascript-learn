## Ajax

Ajax 异步的Javascript和XML(Asynchronous JavaScript and XML)的缩写。

Ajax的目的：异步的向服务器发送数据并接收数据。
Ajax 方法中最重要的特性是允许数据在客户端（web浏览器）和服务器端间传输。

### 使用Ajax

1. HTTP请求
- 建立连接
- 数据串行化
- 发送GET请求
- 发送POST请求
2. HTTP 响应
- 处理错误

### 处理响应数据

浏览器可能会返回三种数据格式：
- XML： 幸运的是，所有的现代浏览器都提供了原生的XML文档处理支持，自动将他们转换为可用的DOM文档
- HTML： 和XML文档的区别在于，它通常以纯文本字符串的形式存在，存放一个HTML片段
- JavaScript/JSON：这包括两种格式---原始的可执行JavaScript代码和JSON （javascript Object Notation，JavaScript对象表示）格式。
