/**
 * Created by zq199 on 2017/3/22.
 */
/**
 异步事件与线程
 */

//JavaScript 异步回调
// 注册一个函数，当夜幕载入完毕调用
window.onload = loaded;
//页面载入完毕后调用的函数
function loaded() {
    // 页面载入完毕，开始干活
    document.getElementById('body').style.border = "1px solid #000";
}

/* 页签导航的鼠标悬停效果场景 */

//查找所有的<li> 元素，并为他们绑定事件处理函数
var li = document.getElementsByTagName("li");
for( var i=0;i<li.length;i++){

    // 绑定鼠标悬停事件处理函数到 <li> 元素上
    // 它会把 <li> 的背景颜色变成蓝色
    li[i].onmouseover = function () {
        this.style.backgroundColor = "blue";
    };

    // 绑定鼠标离开事件处理函数到 <li> 元素上
    // 它会把 <li> 的背景颜色变成默认的白色
    li[i].onmouseout = function () {
        this.style.backgroundColor = "white";
        this.style.color = '#333';
    };
}
/**
 * 常见事件特性
 */

/*
  事件对象
 */

// 使用DOM 事件复写原有功能
  // 查找页面的第一个<textarea> 并绑定键盘敲击的监听函数
document.getElementsByTagName("textarea")[0].onkeypress = function (e) {
    //如果不存在事件对象，则获取全局（仅IE）的对象
    e = e || window.event;
    // console.info(e.keyCode);
    // 如果敲击了回车键，返回false （使他不发生任何行为）
    return e.keyCode != 13;
};

/*
  this 关键字
 */

// 当被点击的时候 ，改变所有<li> 元素的背景和前景颜色
  // 查找所有的<li> 元素并为每个绑定点击处理函数

for( var i=0;i<li.length;i++){
    li[i].onclick = handleClick;

    // 点击处理函数---被调用是改变指定元素的背景和前景颜色
    function handleClick() {
        this.style.backgroundColor = "blue";
        this.style.color = "white";
    }
}

/*
  取消事件冒泡
 */

// 阻止事件冒泡的通用函数
function stopBubble(e) {
    // 如果传入了事件对象，那么就是非IE浏览器
    if( e && e.stopPropagation){
        // 因此它支持W3C的stopPropagation() 方法
        e.stopPropagation();
    }else{
        // 否则，我们得使用IE的方式来取消事件冒泡
        window.event.cancelBubble = true;
    }
}

// 使用 stopBubble()来创建元素的交互集
  // 定位遍历所有的DOM元素
var all = document.getElementsByTagName("*");
for( var i = 0;i<all.length;i++){

    // 监听用户鼠标，当移动到元素上时
    // 为元素加上红色边框
    all[i].onmouseover = function (e) {
        this.style.border = "1px solid red";
        stopBubble(e);
    };

    // 检查用户鼠标，当移开元素时
    // 删除我们加上的边框
    all[i].onmouseout = function (e) {
        this.style.border = "0px";
        stopBubble(e);
    }
}

/*
  重载浏览器的默认行为
 */

// 防止发生默认浏览器行为的通用函数
function stopDefault(e) {
    // 防止默认浏览器行为（W3C）
    if(e && e.preventDefault){
        e.preventDefault();
    }else{
        // IE 中阻止浏览器行为的捷径
        window.event.returnValue = false;
    }
    return false;
}

// 使用 stopDefault()重载浏览器功能
  // 假设页面中已经存在一个iframe ，它的ID 是iframe
var iframe = document.getElementById("iframe");

// 定位页面上所有的<a>元素
var a = document.getElementsByTagName("a");
for(var i =0;i<a.length;i++){
    // 为 <a> 绑定点击处理函数
    a[i].onclick = function (e) {
        // 设置iframe的地址
        iframe.src = this.href;
        console.log(this.href);

        // 防止浏览器访问<a> 所指向的网站（这是一个默认行为）
        return stopDefault(e);
    }
}
/*
  绑定事件监听函数
 */

// 传统绑定

// 使用事件绑定的传统方法绑定事件
  // 查找第一个<form>元素并为它绑定 'submit' 事件处理函数
document.getElementsByTagName("form")[0].onsubmit = function (e) {
    // 停止表单提交的默认行为
    return stopDefault(e);
};
  // 为文档的 <body> 元素绑定敲击事件处理函数
document.body.onkeypress = myKeyPressHandler;
function myKeyPressHandler() {
    
}
 // 为页面绑定加载事件处理函数
window.onload = function () {};

/*
  DOM绑定： W3C
 */

// 使用w3c 方式绑定事件处理函数的例子
  // 查找第一个<form>元素并为它绑定 'submit' 事件处理函数
document.getElementsByTagName("form")[0].addEventListener('submit',function (e) {
    // 停止表单提交的猫人行为
    return stopDefault(e);
},false);
// 为文档的 <body> 元素绑定敲击事件处理函数
document.body.addEventListener('keypress',myKeyPressHandler,false);

/*
 DOM 绑定：IE
 */

// 使用IE方式为元素绑定事件处理函数的例子
 // 查找第一个<form>元素并为它绑定 'submit' 事件处理函数
/** IE 11 不在支持attachEvent()方法 */
// document.getElementsByTagName("form")[0].attachEvent('onsubmit',function () {
//     // 停止表单提交的默认行为
//     return stopDefault();
// });
// // 为文档的 <body> 元素绑定敲击事件处理函数
// document.body.attachEvent('onkeypress',myKeyPressHandler);

/*
  addEvent 和 removeEvent
 */

// 使用 addEvent()函数的diamante例子

// 等待页面完全载入
addEvent(window,"load",function () {

    // 监听用户的任意敲击
    addEvent(document.body,"keypress",function (e) {
        // 如果用户敲击 空格+Ctrl键
        console.log(e.keyCode);
        if(e.ctrlKey){
            console.log("ctrl");
        }
        if( e.keyCode == 32 && e.ctrlKey){
            // 展示我们的特定表单
            this.getElementsByTagName("form")['1'].style.display = 'block';
            // 确保没有奇怪的事情发生
            e.preventDefault(e);
        }
    })
});