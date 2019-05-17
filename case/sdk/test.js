(function (win) {
    function sdk() {
        this.config = {
            appid: 'app',
            sercert: '',
            id:0
        }
    }
    sdk.prototype.init = function (app,id) { 
        this.config.appid = app;
        this.config.id= id
    }
    sdk.prototype.sayHello = function () { 
        console.log('hello')
    }
   win.sdk = new sdk();
})(window)