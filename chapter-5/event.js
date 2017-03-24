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
    // 如果传入了时间对象，那么就是非IE浏览器
    if( e && e.stopPropagation){
        // 因此它支持W3C的stopPropagation() 方法
        e.stopPropagation();
    }else{
        // 否则，我们得使用IE的方式来取消事件冒泡
        window.event.cancelBubble = true;
    }
}
