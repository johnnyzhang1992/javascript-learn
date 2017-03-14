/**
 * Created by zq199 on 2017/3/14.
 */
/**　等待整个也的加载 */
// 使用 addEvent 函数为window.onload 属性绑定回调函数
//直到页面加载完成
addEvent(window,"load",function () {
    // 执行HTML DOM 操作
    id("everywhere").style.border = "1px solid black";
});
/*
   注意：最简单的操作却是最慢的。如果页面有很多图片和视频，JavaScript要等一段时间才能执行
 */
/** 等待大部分DOM 的加载 */
/*
   行内的脚本再DOM 构造后就可立即执行
 */
/** 判断DOM 何时加载完成 */
//监听DOM 是否可用的函数
function domReady(f) {
    // 假如DOM 已经加载，马上执行函数
    if( domReady.done){ return f()}

    // 假如我们已经增加了一个函数
    if(domReady.timer){
        // 把他加入到待执行函数清单中
        domReady.ready.push(f);
    }else{
       // 为页面加载完毕绑定一个时间
        // 以防它最先完成，使用addEvent
        addEvent(window,'load',isDOMReady);

        // 初始化待执行函数的数组
        domReady.ready = [f];

        // 尽可能快的检查DOM是否已可用
        domReady.timer = setInterval(isDOMReady,13);
    }
}
// 检查DOM 是否已可操作
function isDOMReady() {
    // 如果我们能判断出DOM 已可用，忽略
    if( domReady.done){ return false;}

    // 检查若干函数和元素是否可用
    if( document && document.getElementsByTagName && document.getElementById && document.body){
        // 如果可用，我们可以停止检查
        clearInterval(domReady.timer);
        domReady.timer = null;

        // 执行所有正等待的函数
        for( var i = 0; i < domReady.ready.length;i++){
            domReady.ready[i]();

            // 记录我们在此完成
            domReady.ready = null;
            domReady.done = true;
        }
    }
}
// 在实际中使用上面的俩函数
domReady(function () {
    console.log("The Dom is loaded!");
});