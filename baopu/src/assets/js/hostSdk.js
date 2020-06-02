
import Base from './base.js'

let _isLoaded = false;
let timer = 0;

export default{

  uuid: '',
  deviceID: '',
  source: '',
  deviceType: '',

  inited(call){
    let _this = this;
    timer = setInterval(function () {
      //安卓app内
      if(Base.versions.isAndroidApp){
        if(android_hostsdk){
          _isLoaded = true;
          if(_isLoaded){
            clearInterval(timer);
            hostsdk.getInfo({
              successCallback : function(res){
                res = JSON.parse(res);
                _this.uuid = res.uuid;
                _this.deviceID = res.deviceID;
                _this.source = res.source;
                _this.deviceType = res.deviceType;
                call(res);
              },
              errorCallback : function(res){
                call(false,res);
              }
            });
          }
        }
      }
      //iosApp内
      else if(Base.versions.isIosApp){
        if(window.ios_hostsdk){
          _isLoaded = true;
          clearInterval(timer);
          if(_isLoaded){
            hostsdk.getInfo({
              successCallback : function(res){
                res = JSON.parse(res);
                _this.uuid = res.uuid;
                _this.deviceID = res.deviceID;
                _this.source = res.source;
                _this.deviceType = res.deviceType;
                call(res);
              },
              errorCallback : function(res){
                call(false,res);
              }
            });
          }

        }
      }
      //其他版本/客户端
      else{
        _isLoaded = true;
        clearInterval(timer);
        call(false, '请在app内打开');
        return false;
      }

    },167);
  }
}

  // 判断平台的工具方法
  const _ua = navigator.userAgent;
  const client_tool = {
    // 是否是Android
    isAndroid: _ua.toLowerCase().includes("android") || _ua.toLowerCase().includes("linux"),
    // 是否是iPad
    isIpad: _ua.includes("iPad"),
    // 是否是iPhone
    isIphone: _ua.includes("iPhone"),
    // 是否在苹果设备
    isApple: false
  };

  client_tool.isApple = client_tool.isIphone === true || client_tool.isIpad === true;

  // 苹果客户端jbridge
  function setupWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) {
      return callback(WebViewJavascriptBridge);
    }
    if (window.WVJBCallbacks) {
      return window.WVJBCallbacks.push(callback);
    }
    window.WVJBCallbacks = [callback];
    const WVJBIframe = document.createElement('iframe');
    WVJBIframe.style.display = 'none';
    WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
    document.documentElement.appendChild(WVJBIframe);
    setTimeout(() => {
      document.documentElement.removeChild(WVJBIframe);
    }, 0);
  }
  setupWebViewJavascriptBridge(bridge => {
    window.ios_hostsdk = bridge;

    // alert(  ios_hostsdk.callHandler("getInfo"));

  });

  // 客户端回调
  window.host_sdk = {
    // 生命周期方法，初始化
    onInit: function onInit() {
      if (hostsdk && hostsdk.onInit) hostsdk.onInit();
    },

    // 生命周期方法，暂停执行
    onPause: function onPause() {
      if (hostsdk && hostsdk.onPause) hostsdk.onPause();
    },

    // 生命周期方法，恢复执行
    onResume: function onResume() {
      if (hostsdk && hostsdk.onResume) hostsdk.onResume();
    },

    // 生命周期方法，结束执行
    onStop: function onStop() {
      if (hostsdk && hostsdk.onStop) hostsdk.onStop();
    },

    // 发生错误的回调
    errorCallback: function errorCallback(errorMsg) {},

    // 取消操作后的回调
    cancelCallback: function cancelCallback() {},

    // 操作成功后回调
    successCallback: function successCallback(data) {},

    // 左侧按钮点击触发事件前
    leftClickBeforEvent: function leftClickedEvent(data) {},

    // 左侧按钮点击触发事件时
    leftClickedEvent: function leftClickedEvent(data) {},

    // 右侧按钮点击触发事件前
    rightClickBeforEvent: function rightClickedEvent(data) {},

    // 右侧按钮点击触发事件时
    rightClickedEvent: function rightClickedEvent(data) {},

    // 右侧按钮点击触发事件后
    rightClickAfterEvent: function rightClickedEvent(data) {}

  };

  // 封装SDK
  window.hostsdk = {
    //分享
    share: function share(options) {
      // alert("调用分享");
      if (options.successCallback) window.host_sdk.successCallback = options.successCallback;
      if (options.errorCallback) window.host_sdk.errorCallback = options.errorCallback;
      if (options.cancelCallback) window.host_sdk.cancelCallback = options.cancelCallback;
      if (client_tool.isApple) {
        ios_hostsdk.callHandler("share", { "title": options.title, "desc": options.description, "url": options.url, "icon": options.icon, "platforms": options.platforms });
      } else {
        android_hostsdk.share(options.title, options.description, options.url, options.icon, options.platforms);
      }
    },

    //分享
    Openshare: function share(options) {
      // alert("调用分享");
      if (options.successCallback) window.host_sdk.successCallback = options.successCallback;
      if (options.errorCallback) window.host_sdk.errorCallback = options.errorCallback;
      if (options.cancelCallback) window.host_sdk.cancelCallback = options.cancelCallback;
      if (client_tool.isApple) {
        ios_hostsdk.callHandler("share", { "title": options.title, "desc": options.description, "url": options.url, "icon": options.icon, "platforms": options.platforms });
      } else {
        android_hostsdk.share(options.title, options.description, options.url, options.icon, options.platforms);
      }
    },

    //获取环境变量
    getInfo: function getInfo(options) {
      if (options.successCallback) window.host_sdk.successCallback = options.successCallback;
      if (options.errorCallback) window.host_sdk.errorCallback = options.errorCallback;
      if (client_tool.isApple) {
        ios_hostsdk.callHandler("getInfo");
      } else {
        android_hostsdk.getInfo();
      }
    },

    //获取当前用户
    getUser: function getUser(options) {
      if (options.successCallback) window.host_sdk.successCallback = options.successCallback;
      if (options.errorCallback) window.host_sdk.errorCallback = options.errorCallback;
      if (client_tool.isApple) {
        ios_hostsdk.callHandler("getUser");
      } else {
        android_hostsdk.getUser();
      }
    },

    //用户登录
    login: function login(options) {
      if (options.successCallback) window.host_sdk.successCallback = options.successCallback;
      if (options.errorCallback) window.host_sdk.errorCallback = options.errorCallback;
      if (options.cancelCallback) window.host_sdk.cancelCallback = options.cancelCallback;
      if (client_tool.isApple) {
        ios_hostsdk.callHandler("login");
      } else {
        android_hostsdk.login(options.msg);
      }
    },

    //设置全屏
    setFullScreen: function setFullScreen(options) {
      if (options.successCallback) window.host_sdk.successCallback = options.successCallback;
      if (options.errorCallback) window.host_sdk.errorCallback = options.errorCallback;
      if (client_tool.isApple) {
        ios_hostsdk.callHandler("setFullScreen");
      } else {
        android_hostsdk.setFullScreen();
      }
    },

    //设置左侧按钮
    setLeftIcon: function setLeftIcon(options) {
      if (options.successCallback) window.host_sdk.successCallback = options.successCallback;
      if (options.errorCallback) window.host_sdk.errorCallback = options.errorCallback;
      if (options.leftClicked) window.host_sdk.leftClickedEvent = options.leftClicked;

      if (client_tool.isApple) {
        ios_hostsdk.callHandler("setLeftIcon",{"params": options.params,"icon":options.icon,"text":options.text});
      } else {
        android_hostsdk.setLeftIcon(options.params,options.icon,options.text);
      }
    },

    //设置右侧按钮
    setRightIcon: function setRightIcon(options) {
      if (options.successCallback) window.host_sdk.successCallback = options.successCallback;
      if (options.errorCallback) window.host_sdk.errorCallback = options.errorCallback;
      if (options.rightClicked) window.host_sdk.rightClickedEvent = options.rightClicked;

      if (client_tool.isApple) {
        ios_hostsdk.callHandler("setRightIcon",{"params": options.params,"icon":options.icon,"text":options.text});
      } else {
        android_hostsdk.setRightIcon(options.params,options.icon,options.text);
      }
    },

    //手动关闭
    exit: function exit(options) {
      if (options.errorCallback) window.host_sdk.errorCallback = options.errorCallback;
      if (client_tool.isApple) {
        ios_hostsdk.callHandler("exit");
      } else {
        android_hostsdk.exit();
      }
    },

    //跳转到指定APP页面
    openUrl: function openUrl(options) {
      if (options.errorCallback) window.host_sdk.errorCallback = options.errorCallback;
      if (client_tool.isApple) {
        ios_hostsdk.callHandler("openUrl", {"type":options.type, "url":options.url,"params":options.params});
      } else {
        android_hostsdk.openUrl(options.type, options.url, JSON.stringify(options.params));
      }
    },

    //跳转到H5页面
    openLink: function openLink(options) {
      if (options.errorCallback) window.host_sdk.errorCallback = options.errorCallback;
      if (client_tool.isApple) {
        ios_hostsdk.callHandler("openLink", {"type":options.type, "url":options.url,"params":options.params});
      } else {
        android_hostsdk.openLink(options.type, options.url, options.params);
      }
    },

    //FocusUser关注
    FocusUser: function FocusUser(options) {

      if (options.successCallback) window.host_sdk.successCallback = options.successCallback;
      if (options.errorCallback) window.host_sdk.errorCallback = options.errorCallback;
      if (client_tool.isApple) {
        ios_hostsdk.callHandler("FocusUser", options.uuId);
      } else {
        android_hostsdk.FocusUser();
      }
    },

    //FocusUser取消关注
    CancelFocusUser: function CancelFocusUser(options) {

      if (options.successCallback) window.host_sdk.successCallback = options.successCallback;
      if (options.errorCallback) window.host_sdk.errorCallback = options.errorCallback;
      if (client_tool.isApple) {
        ios_hostsdk.callHandler("CancelFocusUser",  options.uuId );
      } else {
        android_hostsdk.CancelFocusUser();
      }
    },

    //设置导航的title
    setViewTitle: function (options) {
      if (options.successCallback) window.host_sdk.successCallback = options.successCallback;
      if (options.errorCallback) window.host_sdk.errorCallback = options.errorCallback;
      if (client_tool.isApple) {
        ios_hostsdk.callHandler("setViewTitle", options.title);
      } else {
        android_hostsdk.setViewTitle();
      }
    },

    //获取串买订单信息
    getUnpaid:function (options) {
      if (options.successCallback) window.host_sdk.successCallback = options.successCallback;
      if (options.errorCallback) window.host_sdk.errorCallback = options.errorCallback;
      if (client_tool.isApple) {
        ios_hostsdk.callHandler("getUnpaid");
      } else {
        android_hostsdk.getUnpaid();
      }
    },

    //刷新余额
    UpdateUserInfo:function (options) {
        if (options.successCallback) window.host_sdk.successCallback = options.successCallback;
        if (options.errorCallback) window.host_sdk.errorCallback = options.errorCallback;
        if (client_tool.isApple) {
          ios_hostsdk.callHandler("UpdateUserInfo");
        } else {
          android_hostsdk.getUnpaid();
        }
    }
  };

