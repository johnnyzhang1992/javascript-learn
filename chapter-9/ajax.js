/**
 * Created by zq199 on 2017/4/11.
 */
// ---------------- 一种向浏览器发送HTTP GET请求的跨浏览器方法
//如果使用了IE，需要再XMLHTTPRequest对象外包装一层
if( typeof XMLHttpRequest == 'undefined'){
    XMLHttpRequest = function () {
        // IE 使用ActiveXObject来创建新的XMLHttpRequest对象
        return new ActiveXObject(
            // IE 5 使用的XMLHTTP对象和IE6 不同
            navigator.userAgent.indexOf("MSIE 5") >= 0 ? "Microsoft.XMLHTTP" : "Msxml2.XMLHTTP"
        );
    };
}
// 创建新的请求对象
var xml = new XMLHttpRequest();

// 初始化请求
xml.open("GET","/some/url.cgi",true);

// 与服务器建立连接并发送数据
xml.send();