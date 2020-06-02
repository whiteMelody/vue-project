(function(){

    var wxAuth = '';      //微信登录实例
    var xhr = null;
    var baseUrl = 'http://a.xinzhi.space';

    function getGeolocation(callback){
        if(plus){
            plus.geolocation.getCurrentPosition(function(data){
                data.code = 1
                callback(data)
            }, function(data){
                data.code = -1
                callback(data)
            },{ enableHighAccuracy: true, provider: 'baidu', geocode: true });
        }else{
            callback({
                code: -1,
                msg: 'error,需要在uni-app环境内调试',
            })
        }
    }

    function login(callback){
        plus.oauth.getServices(function(services){
            for(var i=0; i< services.length; i++ ){
                if(services[i].id == 'weixin'){
                    wxAuth = services[i]
                }
            }
            var w = null;
            if(plus.os.name=="Android"){
                w = plus.nativeUI.showWaiting();
            }
            document.addEventListener("pause",function(){
                setTimeout(function(){
                    w&&w.close();w=null;
                },2000);
            }, false );
            wxAuth.login(function(){
                w&&w.close();w=null;
                userinfo(wxAuth, callback);
            },function(e){
                w&&w.close();w=null;
                callback({
                    code: -1,
                    msg: '获取登录认证失败：' + e.message ,
                })
            });

        },function(e){
            callback({
                code: -1,
                msg: '获取登录认证失败：' + e.message ,
            })
        });

    }

    // 获取用户信息
    function userinfo(wxAuth, callback){
        wxAuth.getUserInfo(function(){
            callback(wxAuth.userInfo)
        },function(e){
            callback({
                code: -1,
                msg: '获取用户信息失败：' + e.message ,
            })
        });
    }

    function logout(callback){

        plus.oauth.getServices(function(services){
            for(var i=0; i< services.length; i++ ){
                if(services[i].id == 'weixin'){
                    wxAuth = services[i]
                }
            }

            wxAuth.logout(function(){
                callback({
                    code: 1,
                    msg: '注销成功',
                })
            },function(){
                callback({
                    code: 1,
                    msg: '注销失败',
                })
            });

        },function(e){
            callback({
                code: -1,
                msg: '获取登录认证失败：' + e.message ,
            })
        });
    }

    window.wxAuth = wxAuth;
    window.xhr = xhr;
    window.baseUrl = baseUrl;

    window.login = login;
    window.userinfo = userinfo;
    window.logout = logout;
    window.getGeolocation = getGeolocation;

    document.addEventListener('plusready', function() {
        var webview = plus.webview.currentWebview();
        plus.key.addEventListener('backbutton', function() {
            webview.canBack(function(e) {
                if(e.canBack) {
                    webview.back();
                } else {
                    //webview.close(); //hide,quit
                    //plus.runtime.quit();
                    //首页返回键处理
                    //处理逻辑：1秒内，连续两次按返回键，则退出应用；
                    var first = null;
                    plus.key.addEventListener('backbutton', function() {
                        //首次按键，提示‘再按一次退出应用’
                        if (!first) {
                            first = new Date().getTime();
                            console.log('再按一次退出应用');
                            setTimeout(function() {
                                first = null;
                            }, 1000);
                        } else {
                            if (new Date().getTime() - first < 1500) {
                                plus.runtime.quit();
                            }
                        }
                    }, false);
                }
            })
        });
    });

})();