/**
 * Created by zq199 on 2017/4/12.
 */

// 执行 Ajax 请求的通用函数
// 带一个参数，是包含一系列选项的对象，这些选项在下面的注释中简述
function ajax( options ) {

    // 如果用户没有提供某个选项的值，就用默认值代替
    options = {
        // HTTP 请求的类型
        type: options.type || "POST",

        // 请求的 URL
        url: options.url || "",

        // 请求超时的时间
        timeout: options.timeout || 5000,

        // 请求失败、成功或完成（不管成功还是失败都会调用的）时执行的函数
        onComplete: options.onComplete || function(){},
        onError: options.onError || function(){},
        onSuccess: options.onSuccess || function(){},

        // 服务器将会返回的数据类型，这一默认值用于判断服务器返回的数据
        // 并作相应动作
        data: options.data || ""
    };

    // 创建请求对象
    var xml = new XMLHttpRequest();

    // 初始化异步请求
    xml.open("GET", "/some/url.cgi", true);

    // 我们在请求后等待 5 秒，超时则放弃
    var timeoutLength = 5000;

    // 记录请求是否成功完成
    var requestDone = false;

    // 初始化一个 5 秒后执行的回调函数，用于取消请求（如果尚未完成的话）
    setTimeout(function(){
        requestDone = true;
    }, timeoutLength);

    // 监听文档状态的更新
    xml.onreadystatechange = function(){
        // 保持等待，直到数据完全加载，并保证请求未超时
        if ( xml.readyState == 4 && !requestDone ) {

            // 检查是否请求成功
            if ( httpSuccess( xml ) ) {

                // 以服务器返回的数据作为参数调用成功回调函数
                options.onSuccess( httpData( xml, options.type ) );

                // 否则就发生了错误，执行错误回调函数
            } else {
                options.onError();
            }

            // 调用完成回调函数
            options.onComplete();

            // 为避免内存泄露，清理文档
            xml = null;
        }
    };

    // 建立与服务器的连接
    xml.send();

    // 判断 HTTP 响应是否成功
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

    // 从 HTTP 响应中解析正确数据
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
}

