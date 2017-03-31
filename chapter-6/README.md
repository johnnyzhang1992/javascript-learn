## JavaScript 与 CSS

### 访问样式信息

访问个设置CSS 属性的主要工具是元素自身的样式属性。
比如：``` elem.style.helght = 100px  ```.

### 动态元素

创建动态效果有3个至关重要的属性： 位置、尺寸和可见性。

1. 元素的位置（position）

```
 - 静态定位：static 
 - 相对定位：relative
 - 绝对定位：absolute
 - 固定定位：fixed
```
 * 获取位置
 
 ```
 offsetParent: 理论上，这是元素的父亲，元素相对于它定位。实际上，所指向的元素取决于浏览器 
 
 offsetLeft和offsetTop: 这两个属性分别是元素在offsetParent 上下文中的水平和垂直偏移量。
 ```
 * 设置位置
 
 2. 元素的尺寸
 
 3. 元素的可见性
 
 ### 动画
 
 1. 滑动
 
 ### 浏览器
 
 1. 鼠标位置