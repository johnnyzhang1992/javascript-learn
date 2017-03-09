/**
 * Created by zq199 on 2017/3/6.
 */
// 多变量引用同一个变量

//将 obj置为空对象
var obj = new Object();
//objRef 现在是对另一个对象的引用
var objRef = obj;
// 修改原对象的一个属性
obj.oneProperty =  true;
// 我们现在看到，这个改变在两个变量中都反应出来
//因为他们引用的是同一个对象
console.info( obj.oneProperty === objRef.oneProperty);
//true

//自修改对象的例子

//将 items 置为字符串的数组
 var items = new Array("one","two","there");
//将 itemRef 置为items 的引用
var itemRef = items;
//将items置为一个新对象
items = new Array("one","array");
//items 和 itemRef 现在指向不用的对象了
//items 指向的是 new Array("one","two","there")
//itemRef 指向的是 new Array("one","two","there")
console.info( itemRef != items);
//true


//修改对象而生成新对象

//将 items 置为字符串的数组
var items1 = "test";
//将 itemRef 置为items 的引用
var itemRef1 = items;
//将一些新的文本接在这个字符串后面
// 注意：这会创建一个新对象，而非修改原对象
items1 += "ing";
// item 和 itemRef 的值不相等了，因为新的字符串已被创建
console.info( itemRef1 != items1);
//true