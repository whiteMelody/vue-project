/**
 * 与客户端交互的SDK
 */
((() => {
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
    onInit() {
      if (hostsdk && hostsdk.onInit) hostsdk.onInit();
    },

    // 生命周期方法，暂停执行
    onPause() {
      if (hostsdk && hostsdk.onPause) hostsdk.onPause();
    },

    // 生命周期方法，恢复执行
    onResume() {
      if (hostsdk && hostsdk.onResume) hostsdk.onResume();
    },

    // 生命周期方法，结束执行
    onStop() {
      if (hostsdk && hostsdk.onStop) hostsdk.onStop();
    },


    // 发生错误的回调
    errorCallback(errorMsg) {},

    // 取消操作后的回调
    cancelCallback() {},

    // 操作成功后回调
    successCallback(platform) {}
  };

  // 封装SDK
  window.hostsdk = {
    //分享
    share(options) {
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

    //用户登录
    login(options) {
      if (options.successCallback) window.host_sdk.successCallback = options.successCallback;
      if (options.errorCallback) window.host_sdk.errorCallback = options.errorCallback;
      if (options.cancelCallback) window.host_sdk.cancelCallback = options.cancelCallback;
      if (client_tool.isApple) {
        ios_hostsdk.callHandler("login");
      } else {
        android_hostsdk.login(options.msg);
      }
    },


    //用户充值
    recharge(options) {
      if (options.successCallback) window.host_sdk.successCallback = options.successCallback;
      if (options.errorCallback) window.host_sdk.errorCallback = options.errorCallback;
      if (options.cancelCallback) window.host_sdk.cancelCallback = options.cancelCallback;
      if (client_tool.isApple) {
        ios_hostsdk.callHandler("recharge");
      } else {
        android_hostsdk.recharge();
      }
    },

    //获取环境变量
    getInfo(options) {
      if (options.successCallback) window.host_sdk.successCallback = options.successCallback;
      if (options.errorCallback) window.host_sdk.errorCallback = options.errorCallback;
      if (client_tool.isApple) {
        ios_hostsdk.callHandler("getInfo");
      } else {
        android_hostsdk.getInfo();
      }
    },

    //手动关闭
    exit(errorCallback) {
      if (errorCallback) window.host_sdk.errorCallback = errorCallback;
      if (client_tool.isApple) {
        ios_hostsdk.callHandler("exit");
      } else {
        android_hostsdk.exit();
      }
    },

    //获取当前用户
    getUser(options) {
      if (options.successCallback) window.host_sdk.successCallback = options.successCallback;
      if (options.errorCallback) window.host_sdk.errorCallback = options.errorCallback;
      if (client_tool.isApple) {
        ios_hostsdk.callHandler("getUser");
      } else {
        android_hostsdk.getInfo();
      }
    },

    //设置全屏
    setFullScreen(options) {
      if (options.successCallback) window.host_sdk.successCallback = options.successCallback;
      if (options.errorCallback) window.host_sdk.errorCallback = options.errorCallback;
      if (client_tool.isApple) {
        ios_hostsdk.callHandler("setFullScreen");
      } else {
        android_hostsdk.getInfo();
      }
    },

    //设置左侧按钮
    leftIcon(options) {
      if (options.successCallback) window.host_sdk.successCallback = options.successCallback;
      if (options.errorCallback) window.host_sdk.errorCallback = options.errorCallback;
      if (client_tool.isApple) {
        ios_hostsdk.callHandler("leftIcon");
      } else {
        android_hostsdk.getInfo();
      }
    },

    //设置右侧按钮
    rightIcon(options) {
      if (options.successCallback) window.host_sdk.successCallback = options.successCallback;
      if (options.errorCallback) window.host_sdk.errorCallback = options.errorCallback;
      if (client_tool.isApple) {
        ios_hostsdk.callHandler("rightIcon");
      } else {
        android_hostsdk.getInfo();
      }
    },


    //打开新的窗口
    openUrl(options) {
      if (options.successCallback) window.host_sdk.successCallback = options.successCallback;
      if (options.errorCallback) window.host_sdk.errorCallback = options.errorCallback;
      if (client_tool.isApple) {
        ios_hostsdk.callHandler("openUrl", { "url": options.url, "fullscreen": options.fullscreen, "leftIcon": options.leftIcon, "rightIcon": options.rightIcon, "openpush": options.openpush, "openpresent": options.openpresent });
      } else {
        android_hostsdk.openUrl();
      }
    },


    //调用每日一句
    today(options) {
      if (options.successCallback) window.host_sdk.successCallback = options.successCallback;
      if (options.errorCallback) window.host_sdk.errorCallback = options.errorCallback;
      if (client_tool.isApple) {
        ios_hostsdk.callHandler("today", { "date": options.date, "fullscreen": options.fullscreen, "leftIcon": options.leftIcon, "rightIcon": options.rightIcon, "openpush": options.openpush, "openpresent": options.openpresent });
      } else {
        android_hostsdk.today();
      }
    },


    //OpenCourse打开课程
    OpenCourse(options) {
      if (options.successCallback) window.host_sdk.successCallback = options.successCallback;
      if (options.errorCallback) window.host_sdk.errorCallback = options.errorCallback;
      if (client_tool.isApple) {
        ios_hostsdk.callHandler("OpenCourse", { "channelID": options.channelID });
      } else {
        android_hostsdk.OpenCourse(options.channelID);
      }
    },

    //OpenCategory查看更多
    OpenCategory(options) {

      if (options.successCallback) window.host_sdk.successCallback = options.successCallback;
      if (options.errorCallback) window.host_sdk.errorCallback = options.errorCallback;
      if (client_tool.isApple) {
        ios_hostsdk.callHandler("OpenCategory", { "categoryID": options.categoryID, "categoryName": options.categoryName });
      } else {
        android_hostsdk.OpenCategory(options.categoryID, options.categoryName);
      }
    },

  };
}))();
