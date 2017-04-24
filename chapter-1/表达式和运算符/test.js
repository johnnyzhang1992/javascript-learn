/**
 * Created by zq199 on 2017/4/24.
 */
/*
 in 元素符
 */
/*
in 运算符希望它的左操作数是一个字符串或可以转换为字符串，希望它的右操作数是一个对象。
如果左侧的对象拥有一个名为左操作数值的属性名，那么表达式返回true：
 */
//例如
var point = { x:1,y:2};
console.log("x" in point);//true:对象有一个名为“x"的属性
console.log("z" in point);// false
console.log("toString" in point);//true  对象继承了对象的方法

var data = [7,8,9]; //0=>7,1=>8,2=>9
console.log( "0" in data);//true 数组包含元素“0”
console.log( 1 in data);//true： 数字转换为字符串
console.log( 3 in data);//false  没有索引为3的元素

/*
instanceof 运算符 instance（例子）
判断对象是不是另一个对象的实例
 */
/*
 instanceof 运算符希望左操作数是一个对象，右操作数标志对象的类。
 如果左侧的对象是右侧类的实例，则返回 true，否则返回false。

 所有对象都是Object 的实例。
 所有的数组都是对象
  */
eval("3"+2);