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