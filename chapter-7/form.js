/**
 * Created by zq199 on 2017/4/5.
 */

/** -----表单验证 ------*/
/*-------------检查一个必填字段是否被修改 -------------- */
// 检查输入元素是否键入了信息的通用函数
function checkRequired(elem) {
    if( elem.type == "checkbox" || elem.type == "radio"){
        return getInputByName(elem.name).numChecked;
    }else{
        return elem.value.length > 0  && elem.value != elem.defaultValue;
    }
}
// 找出指定name的所有input元素（对查找以及复选框或单选框十分有用）
function getInputByName(name) {
    // 匹配的Input元素的数组
    var results = [];
    // 追踪被选中元素的数量
    results.numChecked = 0;

    // 找出文档中所有input元素
    var input = document.getElementsByTagName("input");
    for( var i = 0;i<input.length;i++){
        // 找出所有指定name 的字段
        if( input[i].name == name){
            // 保存结果，稍后会返回
            results.push(input[i]);
            // 记录被选中字段的数量
            if(input[i].checked){
                results.numChecked++
            }
        }
    }
    // 返回匹配的字段集合
    return results;
}
/** ------ 模式匹配 ---------------*/

/*-----电子邮件 ------*/
//--------------- 检查指定的input元素是否包含电子邮件地址
// 检查input元素是否符合email地址要求的通用函数
function checkEmail( elem ) {
    // 确保输入的内容是正确的email地址
    return !elem.value || /^[a-z0-9_+.-]+\@([a-z0-9-]+\.)+[a-z0-9]{2,4}$/i.test(elem.value);
}
// 等待文档完成加载
window.onload = function () {
    // 获得表单并监听提交事件
    console.log("加载完毕！");
    document.getElementsByTagName('form')[0].onsubmit = function () {
        // 获取需检查的input元素
        var elem = document.getElementById('age');
        // 确保年龄的必选字段已经被选中
        if( !checkRequired(elem)){
            // 否则显示错误并组织表单提交
            console.warn("Required field is empty - "+ "you must be over 13 to use this site");
            return false;
        }

        // 获取需检查的input元素
        var elem1  = document.getElementById("name");

        // 确保名字字段有文本输入
        if( !checkRequired(elem1)){
            // 否则显示错误并组织表单提交
            console.warn("Required field is empty - "+ "please provide your name.");
            return false
        }
       // 获取需要检查的input元素
        var elem2 = document.getElementById('email');
        // 检查这个字段是否正确
        if(!checkEmail(elem2)){
            console.warn("Field is not an email address.");
            return false;
        }
    };
};
// Error Message
var errMsg = {
    // Checks for when a specified field is required
    required: {
        msg: "This field is required.",
        test: function(obj,load) {
            // Make sure that something was not entered and that this
            // isn't on page load (showing 'field required' messages
            // would be annoying on page load)
            return obj.value || load || obj.value == obj.defaultValue;
        }
    },

    // Makes sure that the field s a valid email address
    email: {
        msg: "Not a valid email address.",
        test: function(obj) {
            // Make sure that something was entered and that it looks like
            // an email address
            return !obj.value ||
                /^[a-z0-9_+.-]+\@([a-z0-9-]+\.)+[a-z0-9]{2,4}$/i.test( obj.value );
        }
    },

    // Makes sure the field is a phone number and
    // auto-formats the number if it is one
    phone: {
        msg: "Not a valid phone number.",
        test: function(obj) {
            // Check to see if we have something that looks like
            // a valid phone number
            var m = /(\d{3}).*(\d{3}).*(\d{4})/.exec( obj.value );

            // If it is, seemingly, valid - force it into the specific
            // format that we desire: (123) 456-7890
            if ( m ) obj.value = "(" + m[1] + ") " + m[2] + "-" + m[3];

            return !obj.value || m;
        }
    },

    // Makes sure that the field is a valid MM/DD/YYYY date
    date: {
        msg: "Not a valid date.",
        test: function(obj) {
            // Make sure that something is entered, and that it
            // looks like a valid MM/DD/YYYY date
            return !obj.value || /^\d{2}\/\d{2}\/\d{2,4}$/.test(obj.value);
        }
    },

    // Makes sure that the field is a valid URL
    url: {
        msg: "Not a valid URL.",
        test: function(obj) {
            // Make sure that some text was entered, and that it's
            // not the default http:// text
            return !obj.value || obj.value == 'http://' ||
                // Make sure that it looks like a valid URL
                /^https?:\/\/([a-z0-9-]+\.)+[a-z0-9]{2,4}.*$/.test( obj.value );
        }
    }
};
function validateForm( form, load ) {
    var valid = true;

    // Go through all the field elements in form
    // form.elements is an array of all fields in a form
    for ( var i = 0; i < form.elements.length; i++ ) {

        // Hide any error messages, if they're being shown
        hideErrors( form.elements[i] );

        // Check to see if the field contains valid contents, or not
        if ( ! validateField( form.elements[i], load ) )
            valid = false;

    }

    // Return false if a field does not have valid contents
    // true if all fields are valid
    return valid;
}

// Validate a single field's contents
function validateField( elem, load ) {
    var errors = [];

    // Go through all the possible validation techniques
    for ( var name in errMsg ) {
        // See if the field has the class specified by the error type
        var re = new RegExp("(^|\\s)" + name + "(\\s|$)");

        // Check to see if  the element has the class and that it passes the
        // validatino test
        if ( re.test( elem.className ) && !errMsg[name].test( elem, load ) )
        // If it fails the validation, add the error message to list
            errors.push( errMsg[name].msg );
    }

    // Show the error messages, if they exist
    if ( errors.length )
        showErrors( elem, errors );

    // Return false if the field fails any of the validation routines
    return errors.length > 0;
}
// Hide any validation error messages that are currently shown
function hideErrors( elem ) {
    // Find the next element after the current field
    var next = elem.nextSibling;

    // If the next element is a ul and has a class of errors
    if ( next && next.nodeName == "UL" && next.className == "errors" )
    // Remove it (which is our means of  'hiding')
        elem.parenttNode.removeChild( next );
}

// Show a set of errors messages for a specific field within a form
function showErrors( elem, errors ) {
    // Find the next element after the field
    var next = elem.nextSibling;

    // If the field isn't one of our special error-holders.
    if ( next && ( next.nodeName != "UL" || next.className != "errors" ) ) {
        // We need to make one instead
        next = document.createElement( "ul" );
        next.className = "errors";

        // and then insert into the correct place in the DOM
        elem.paretNode.insertBefore( next, elem.nextSibling );
    }

    // Now that we have a reference to the error holder UL
    // We then loop through all the error messages
    for ( var i = 0; i < errors.length; i++ ) {
        // Create a new li wrapper for each
        var li = document.createElement( "li" );
        li.innerHTML = errors[i];

        // and insert it into the DOM
        next.appendChild( li );
    }
}
function watchForm( form ) {
    // Watch the form for submission
    addEvent( form, 'submit',  function(){

        // make sure that the form's contents validate correctly
        return validateForm( form );

    });
}
function watchFields( form ) {
    // Go through all the field elements in form
    for ( var i = 0; i < form.elements.length; i++ ) {

        // and attach a 'blur' event handler (which watches for a user
        // to lose focus of an input element)
        addEvent( form.elements[i], 'blur',  function(){
            // Once the focus has been lost, re-validate the field
            return validateField( this );
        });

    }
}
addEvent( window, "load", function() {
    // Find all the forms on the page
    var forms = document.getElementsByTagName("form");

    // Go through all the forms on the page
    for ( var i = 0; i < forms.length; i++ ) {

        // Validate each of the forms, being sure to set the 'load' argument to
        // true, which stops certain, unnecessary, errors from appearing
        validateForm( forms[i], true );

    }
});