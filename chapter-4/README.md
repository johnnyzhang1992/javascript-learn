## DOM 文档对象模型

1. DOM简介
> DOM 是一个表达XML文档的标准

2. 遍历DOM
> XML文档从一个独立的根节点开始，它包含指向子节点的指针。
每一个子节点都包含指针指向它的父节点、相邻节点和子节点。<br>
指针：``` parentNode、previousSibling、nextSibling、firstChild、lastChild ```

3. 绑定到每一个HTML元素 
```
    HTMLElement.prototype.next = function () {
        var elem = this;
        do{
            elem = elem.nextSibling;
        }while (elem && elem.nodeType != 1)
        return elem;
    }
    
```
4. 标准的DOM 方法

5. 等待HTML DOM 的加载
 浏览器的渲染和操作顺序大致如下：<br>
* HTML 解析完毕
* 外部脚本和样式表加载
* 脚本再文档内解析并执行
* HTML DOM 完全构造起来
* 图片和外部内容加载
* 网页完成加载

6. 在 HTML 文档中查找元素
* 通过类的值查找元素
* 使用css选择器查找元素

7. 获取元素的内容
* 获取元素内的文本
* 获取元素内HTML
* 操作元素特性

8. 修改DOM
