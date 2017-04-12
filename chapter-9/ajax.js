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
//---------- 数据串行化 ----------------
// 串行化一系列数据。支持两种不同的对象：
// - 表单输入元素的数组
// - 键/值对的散列化

// 本函数返回串行化后的字符串
function serialize(a) {
    // 串行化结果的集合
    var s = [];
    // 如传入的参数是数组，假定他们是表单元素的数组
    if( a.constructor == Array){
        // 串行化表单元素
        for( var i = 0; i<a.length;i++){
            s.push( a[i].name + "=" + encodeURIComponent( a[i].value));
        }
        // 否则,假定这是一个键值对对象
    }else{
        // 串行化键值对
        for( var j in a){
            s.push( j + "=" +encodeURIComponent( a[j]));
        }
    }
    // 返回串行化结果
    return s.join("&")
}
var data = {
    name : "John",
    last: "Resig",
    city: "Cambridge"
};
//--------发送GET请求---------
// 创建新的请求对象
var xml = new XMLHttpRequest();

// 初始化请求
xml.open("GET","/some/url.cgi",true);

// 与服务器建立连接并发送数据
xml.send();

//--------发送POST请求---------
// 创建请求对象
var xml1 = new XMLHttpRequest();
// 初始化异步POST 请求
xml1.open("POST","/some/url.cgi",true);
// 设置 content-type 首部，告知服务器如何解析我们发送的数据
xml1.setRequestHeader(
    "Content-Type","application/x-www-form-urlencoded"
);
// 保证浏览器发送的川航化数据长度正确
// 基于 Mozilla 的浏览器有时处理会碰到这个问题
if( xml1.overrideMimeType){
    xml1.setRequestHeader("Connection","close")
}
// 与服务器建立连接并发送串行化数据
xml1.send(serialize(data));



// ---------------将XML数据发送到服务器的例子------------

// 创建请求对象
var xml2 = new XMLHttpRequest();
// 初始化异步POST 请求
xml2.open("POST","/some/url.cgi",true);
// 设置 content-type 首部，告知服务器如何解析我们发送的数据
xml2.setRequestHeader(
    "Content-Type","text/xml"
);
// 保证浏览器发送的川航化数据长度正确
// 基于 Mozilla 的浏览器有时处理会碰到这个问题
if( xml2.overrideMimeType){
    xml2.setRequestHeader("Connection","close")
}
// 与服务器建立连接并发送串行化数据
xml2.send("<items><item id='one'></item></items>");


//--------------- 与服务器建立连接并读取结果数据---------------
var xml3 = new XMLHttpRequest();
// 初始化异步POST 请求
xml3.open("GET","/some/url.cgi",true);
// 在文档的状态更新时调用
xml3.onreadystatechange = function () {
  // 等到数据完整加载
    if( xml3.readyState == 4){
        // xml.responseXML 包含XML文档（如果返回的是XML）
        // xml.responseText 包含返回的文本（如果返回的不是XML）

        // 为避免内存泄露，清理文档
        xml3 = null;
    }
};
// 建立到服务器的连接
xml3.send();

//----------用于检查服务器HTTP响应的成功状态（Success State）的一个函数
// 检查 XMLHttpRequest 对象是否有 ‘Success’ 状态
// 此函数需要一个 XMLHttpRequest 对象作为参数
function httpSuccess(r) {
    try {
        // 如果得不到服务器状态，且我们正在请求本地文件，认为成功
        return !r.status && location.protocol == "file:" ||

            // 所有 200 到 300 间的状态吗表示成功
            ( r.status >= 200 && r.status < 300 ) ||

            // 文档未修改也算成功
            r.status == 304 ||

            // Safari 在文档未修改时返回空状态
            navigator.userAgent.indexOf("Safari") >= 0 && typeof r.status == "undefined";
    } catch(e){}

    // 若检查状态失败，就假定请求是失败的
    return false;
}


// -----------检查超时---------
// 创建请求对象
var xml4 = new XMLHttpRequest();
// 初始化异步POST 请求
xml4.open("GET","/some/url.cgi",true);
// 我们在请求后等 5 秒，然后放弃
var timeoutLength = 5000;
// 记录请求是否成功完成
var requestDone = false;
// 初始化一个 5 秒后执行的回调函数，用于取消请求（如果尚未完成的话）
setTimeout(function(){
    requestDone = true;
}, timeoutLength);
// 监听文档状态的更新
xml4.onreadystatechange = function(){
    // 保持等待，直到数据完全加载，并保证请求并未超时
    if ( xml4.readyState == 4 && !requestDone ) {

        // xml.responseXML 包含XML文档（如果返回的是XML）
        // xml.responseText 包含返回的文本（如果返回的不是XML）

        // 为避免内存泄露，清理文档
        xml4 = null;
    }
};

// 与服务器建立连接
xml4.send();


//------------从HTTP服务器响应中解析正确数据的一个函数---------------
// 从HTTP 响应中解析数据的函数
// 有两个参数：一个XMLHttpRequest 对象和一个可选参数----期望从服务器得到的数据类型
// 正确的值包括：xml,script,text,或html - 默认是 “”，根据 content-type 的首部得到

function httpData(r, type) {
    // 获取 content-type 首部
    var ct = r.getResponseHeader("content-type");

    // 如果没有提供默认的类型，判断服务器返回的是否是 XML 形式
    var data = !type && ct && ct.indexOf("xml") >= 0;

    // 若是，活的 XML 文档对象，否则返回文本内容
    data = type == "xml" || data ? r.responseXML : r.responseText;

    // 若指定的类型是'script',则以JavaScript 形式返回文本
    if ( type == "script" )
        eval.call( window, data );

    // 返回响应数据（或未 XML 文档或为文本字符串）
    return data;
}