
import Base from './base.js'
import Md5 from './md5_ch.js'
import HostSdk from './hostSdk.js'

/**
 * 接口配置
 * @type {{server_url: string, time_out: number}}
 */

const ajaxConfig = {
  server_url: 'http://192.168.8.148:8081/',
  time_out: 3000,
  lazy: 1000,
  source: 'wap',
  type: '1',
  debug: true
};

if (ajaxConfig.debug == true) {
  ajaxConfig.server_url = 'http://192.168.8.148:8081/';
} else if (ajaxConfig.debug == false) {
  // ajaxConfig.server_url = 'http://s.bombsport.com/';
  //- 2018年3月2日10:43:08
  //- 启用https
  ajaxConfig.server_url = 'https://s.bombsport.com:4432/';
} else if (ajaxConfig.debug == 'test') {
  ajaxConfig.server_url = 'http://139.129.196.77:7783/';
}

let Interface = {

  lotteryType : {
    SSQ: 'ssq', //双色球
    FC3D: '3d', //福彩3d
    QLC: '307', //七乐彩
    JXK3: 'JXK3', //江西快3
    PL3: 'p3', //排列3
    PL5: 'p5', //排列5
    QXC: 'p7', //七星彩
    SJDLT: 'dlt', //超级大乐透
    ZQSFC: 'sfc', //足彩胜负彩
    ZC6CBQC: 'bqc', //足彩六场半全场
    ZQ4CJQ: '4jq', //足彩四场进球
    YDJ11X5: 'D11', //十一运夺金11选5
    KL123: 'H123', //快乐123
    DLCJX11X5: 'dlc', //多乐彩江西11选5
    SH11X5: 'C511', //上海11选5
    JSK3: 'JSK3', //江苏快3
    SDKLPK: 'HPoker', //山东快乐扑克
    AHK3: 'AHK3', //安徽快3
    ZJFY: 'ZJFish', //浙江飞鱼
    CQ11X5: 'CQD11', //重庆11选5
    ZJ11X5: 'ZJC511', //浙江11选5
    GD11X5: 'GDD11', //广东11选5
    HLXYSC: 'XYSC' //湖南幸运赛车
  },

  /**
   * 获取用户ID
   * @returns {number}
   */
  getUserId() {
    // return '09081d3e210e4bfebd59ff2c33b6f559';
    let userInfo = Base.getCookie("userInfo");
    if (Base.isNull(userInfo)) {
      return 0;
    } else {
      return JSON.parse(userInfo).uuid;
    }
  },

  /**
   * 获取设备ID
   */
  getDeviceID() {

    let deviceID = Base.getCookie('deviceID');
    if (Base.isNull(deviceID)) {
      deviceID = Base.getUuid();
      Base.setCookie('deviceID', deviceID);
    }
    return deviceID;
  },

  /**
   * 获取用户余额
   */
  getBalance() {

    const userInfo = Base.getCookie("userInfo");
    if (Base.isNull(userInfo)) {
      return 0;
    } else {
      return JSON.parse(userInfo).accountBalance;
    }
  },

  /**
   * 获取渠道/来源
   */
  getSource(){

    let source = Base.getCookie("source");

    if(Base.isNull(source))
      source = 'wap';

    // if(Base.isNull(tmp)){
    //   return 'wap';
    // }
    // // source #/ page
    // let i1 = tmp.indexOf('&');
    //
    // if(i1 == -1){
    //
    //   //继续查询i1
    //   i1 = tmp.indexOf('#/');
    //   if(i1 == -1){
    //     i1 = tmp.indexOf('#');
    //   }
    // }
    //
    // if(i1 == -1){
    //   return 'wap';
    // }

    // return tmp.substring(0,i1);
    return source;
  },

  getSourceName(){
    let source = this.getSource();

    if(source == 'wap'){
      return '稳赢竞彩';
    }else if(source == 'cpt'){
      return '稳赢竞彩';
    }else if(source == 'tianqi'){
      return '中央天气预报';
    }else if(source == 'wnl'){
      return '万年历';
    }

    return '稳赢竞彩';

  },

  getLazy(){
    return ajaxConfig.lazy;
  },

  /**
   * 获取通用签名
   * @returns {string}
   */
  getAjaxSign(params) {

    const _timestamp = Math.round(new Date().getTime() / 1000);

    let arr = [];

    let str = '';

    if (Base.isNull(params)) {
      params = {};
    }

    if(Base.isNull(params.uuid)){
      if(Base.versions.isAndroidApp || Base.versions.isIosApp){
        params.uuid = HostSdk.uuid;
      }else{
        params.uuid = this.getUserId();
      }
    }
    if(Base.isNull(params.deviceID)){
      if(Base.versions.isAndroidApp || Base.versions.isIosApp){
        params.deviceID = HostSdk.deviceID;
      }else{
        params.deviceID = this.getDeviceID();
      }
    }
    if(Base.isNull(params.source)){
      if(Base.versions.isAndroidApp || Base.versions.isIosApp){
        params.source = HostSdk.source;
      }else{
        params.source = this.getSource();
      }
    }
    if(Base.isNull(params.deviceType)){
      if(Base.versions.isAndroidApp || Base.versions.isIosApp){
        params.deviceType = HostSdk.deviceType;
      }else{
        //判断设备类型
        if(Base.versions.isAndroid){
          params.deviceType = 2
        }else{
          params.deviceType = 3
        }
        //- 2018年3月2日15:55:04
        //- 更改设备类型
        // params.deviceType = ajaxConfig.type;
      }
    }

    if(Base.isNull(params.t)){
      params.timestemp = _timestamp;
    }

    $.each(params, (key, value) => {
      arr.push(key);
    });

    arr = arr.sort();

    for (let i = 0; i < arr.length; i++) {
      const _tmp = `${arr[i]}=${params[arr[i]]}&`;
      str += _tmp;
    }

    str = this.privateKey(str,[107,101,121,61]);

    // console.log(str);

    params.signKey = str.split('.6419')[0];
    params.privateKey = str.split('.6419')[1];
    params.sha1Code =  str.split('529.')[0];
    params.md5Code =  str.split('529.')[1];
    params.sign = str.split('@@@')[0];
    params.key = str.split('@@@')[1];

    // console.log(params.sign)

    // params.key = 'lottery@213cbs!';

    return params;
  },

  privateKey(s,arr){
    let r = '';

    if(!arr)
      arr.split(",");

    for(var i=0; i<arr.length; i++){
      r += String.fromCharCode(arr[i]);
    }

    return this.privateLottery(s+r);
  },

  privateLottery(r){
    return this.groupKey(r,['01101100','01101111','01110100','01110100','01100101','01110010','01111001']);
  },

  groupKey(r,arr){

    if(!arr){
      arr.split(",");
    }

    for(var i=0; i<arr.length; i++){
      r += String.fromCharCode(this.formateTwoInt(arr[i]));
    }

    return this.privateStr(r);
  },

  symbolKey(s){
    return [parseInt(s.split('.')[0], 8),parseInt(s.split('.')[1], 8)];
  },

  stringKey(arr){
    let r = '';

    if(!arr)
      arr.split(",");

    for(var i=0; i<arr.length; i++){
      r += String.fromCharCode(arr[i]).toLowerCase();
    }
    return r;
  },

  privateS1(r){

    // console.log(r)

    r = Md5(r) + this.privateS5(2,6,3);

    let s = this.symbolKey('205.49');

    r += s;

    return this.privateS2(r);

  },

  privateS2(r){
    r = this.privateS3(r);
    return r + Base.factorial(101);
  },

  privateS3(r){
    return r + this.privateS4('23.64');
  },

  privateS4(r){
    return r + this.symbolKey(r);
  },

  privateS5(num, i1, i2){

    let n = 1;

    let s = '';

    for(let i=0; i<i1; i++){
      n*= num;
    }

    for(let i=0; i<i2; i++){
      s+= String.fromCharCode(n);
    }

    return s;
  },

  privateStr(r){
    let s = this.symbolKey('100.41');

    s = ['@','!'];

    r += s[0];

    let v = Base.group([true, false, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a' , 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'z'], s.length).length + Base.factorial(0) + s.length;

    r+= v;

    r+= this.stringKey([67,66,83]);

    r+= s[1];

    return this.privateS1(r);

  },

  /**
   * ascii转码
   */
  formateAscii(k){
    return String.fromCharCode(k);
  },

  /**
   * 二进制转换
   */
  formateTwoInt(s){
    return  parseInt(s,2);
  },

  /**
   * 获取验证码
   * @param mobilePhone			手机号
   * @param codeType				code
   * @param callback
   */
  sendLoginInCode(mobilePhone, callback) {

    var _sign = this.getAjaxSign({
      mobilePhone
    });

    $.ajax({
      type: "post",
      url: ajaxConfig.server_url + "sms/sendLoginInCode",
      data: { mobilePhone: _sign.mobilePhone, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, sign: _sign.sign, timestemp: _sign.timestemp },
      dataType: "json",
      success(data) {
        if (data.status == 1) {
          callback(data);
        } else {
          callback(false, data.message);
        }
      }
    });
  },

  /**
   * 绑定手机号验证码
   * @param mobilePhone
   * @param callback
   */
  sendBindPhoneCode(mobilePhone, callback) {

    var _sign = this.getAjaxSign({
      mobilePhone
    });

    $.ajax({
      type: "post",
      url: ajaxConfig.server_url + "sms/sendBindPhoneCode",
      data: { mobilePhone: _sign.mobilePhone, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, sign: _sign.sign, timestemp: _sign.timestemp },
      dataType: "json",
      success(data) {
        if (data.status == 1) {
          callback(data);
        } else {
          callback(false, data.message);
        }
      }
    });
  },

  /**
   * 变更手机号验证码获取
   * @param callback
   */
  changeMobilePhoneCode(callback) {

    var _sign = this.getAjaxSign();

    $.ajax({
      type: "post",
      url: ajaxConfig.server_url + "sms/changeMobilePhoneCode",
      data: { uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, sign: _sign.sign, timestemp: _sign.timestemp },
      dataType: "json",
      success(data) {
        if (data.status == 1) {
          callback(data);
        } else {
          callback(false, data.message);
        }
      }
    });
  },

  /**
   * 实名认证验证码
   * @param mobilePhone
   * @param callback
   */
  realNameAuthCode(mobilePhone, callback) {

    var _sign = this.getAjaxSign({
      mobilePhone
    });

    $.ajax({
      type: "post",
      url: ajaxConfig.server_url + "sms/realNameAuthCode",
      data: { mobilePhone: _sign.mobilePhone, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, sign: _sign.sign, timestemp: _sign.timestemp },
      dataType: "json",
      success(data) {
        if (data.status == 1) {
          callback(data);
        } else {
          callback(false, data.message);
        }
      }
    });
  },

  /**
   * 忘记支付密码验证码获取
   * @param mobilePhone
   * @param callback
   */
  forgetPayPwdCode(callback) {

    var _sign = this.getAjaxSign();

    $.ajax({
      type: "post",
      url: ajaxConfig.server_url + "sms/forgetPayPwdCode",
      data: { uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, sign: _sign.sign, timestemp: _sign.timestemp },
      dataType: "json",
      success(data) {
        if (data.status == 1) {
          callback(data);
        } else {
          callback(false, data.message);
        }
      }
    });
  },

  /**
   * 获取用户资料
   * @param callback
   */
  userInfo(callback) {

    var _sign = this.getAjaxSign();

    // alert(JSON.stringify({ uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, sign: _sign.sign, timestemp: _sign.timestemp }));

    $.ajax({
      type: "post",
      url: ajaxConfig.server_url + "user/userInfo",
      data: { uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, sign: _sign.sign, timestemp: _sign.timestemp },
      dataType: "json",
      success(data) {
        // alert(JSON.stringify(data));
        if (data.status == 1) {
          callback(data);
        } else {
          callback(false, data.message);
        }
      }
    });
  },

  /**
   * 获取用户数据
   * @param callback
   */
  userBaseInfo(callback) {
    this.userInfo(callback);
  },

  /**
   * 修改用户昵称
   * @param nickName
   * @param callback
   */
  updateUserInfo(nickName, callback) {

    var _sign = this.getAjaxSign({
      nickName
    });

    $.ajax({
      type: "post",
      url: ajaxConfig.server_url + "user/updateUserInfo",
      data: { nickName: _sign.nickName, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, sign: _sign.sign, timestemp: _sign.timestemp },
      dataType: "json",
      success(data) {
        if (data.status == 1) {
          callback(data);
        } else {
          callback(false, data.message);
        }
      }
    });
  },

  /**
   * 实名认证
   * @param mobilePhone
   * @param code
   * @param realName
   * @param identityCard
   * @param callback
   */
  realNameAuth(code, mobilePhone, realName, identityCard, callback) {

    //- 2017年7月20日17:51:53
    //- 取消mobilePhone参数

    var _sign = this.getAjaxSign({
      code,
      mobilePhone,
      realName,
      identityCard
    });

    $.ajax({
      type: "post",
      url: ajaxConfig.server_url + "user/realNameAuth",
      data: { code: _sign.code, mobilePhone: _sign.mobilePhone, realName: _sign.realName, identityCard: _sign.identityCard, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, sign: _sign.sign, timestemp: _sign.timestemp },
      dataType: "json",
      success(data) {
        if (data.status == 1) {
          callback(data);
        } else {
          callback(false, data.message);
        }
      }
    });
  },

  /**
   * 获取用户已绑定的信息
   * @param callback
   */
  securityInfo(callback) {
    this.userInfo(callback);
  },

  /**
   * 手机号注册、登录
   * @param phoneNumber
   * @param code
   * @param source
   * @param callback
   */
  phoneLoginIn(phoneNumber, code, callback) {

    var _sign = this.getAjaxSign({
      phoneNumber,
      code
    });

    $.ajax({
      type: "post",
      url: ajaxConfig.server_url + "user/loginInPhone",
      data: { phoneNumber: _sign.phoneNumber, code: _sign.code, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, sign: _sign.sign, timestemp: _sign.timestemp },
      dataType: "json",
      success(data) {
        if (data.status == 1) {
          Base.setCookie('userInfo', JSON.stringify(data.returnJSON));
          callback(data);
        } else {
          callback(false, data.message);
        }
      }
    });
  },

  /**
   * 绑定手机
   * @param mobilePhone
   * @param code
   * @param callback
   */
  bindMobilePhone(mobilePhone, code, callback) {

    var _sign = this.getAjaxSign({
      mobilePhone,
      code
    });

    $.ajax({
      type: "post",
      url: ajaxConfig.server_url + "user/bindMobilePhone",
      data: { mobilePhone: _sign.mobilePhone, code: _sign.code, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, sign: _sign.sign, timestemp: _sign.timestemp },
      dataType: "json",
      success(data) {
        if (data.status == 1) {
          callback(data);
        } else {
          callback(false, data.message);
        }
      }
    });
  },

  /**
   * 绑定手机号修改前原手机验证，验证成功返回变更的编码
   * @param code
   * @param callback
   */
  smsUpPhoneCode(code, callback) {

    var _sign = this.getAjaxSign({
      code
    });

    $.ajax({
      type: "post",
      url: ajaxConfig.server_url + "user/smsUpPhoneCode",
      data: { code: _sign.code, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, sign: _sign.sign, timestemp: _sign.timestemp },
      dataType: "json",
      success(data) {
        if (data.status == 1) {
          callback(data);
        } else {
          callback(false, data.message);
        }
      }
    });
  },

  /**
   * 修改绑定手机号，根据变更的编码及手机验证码验证
   * @param changeCode
   * @param newMobilePhone
   * @param newCode
   * @param callback
   */
  smsUpMobilePhone(changeCode, newMobilePhone, newCode, callback) {

    var _sign = this.getAjaxSign({
      changeCode,
      newMobilePhone,
      newCode
    });

    $.ajax({
      type: "post",
      url: ajaxConfig.server_url + "user/smsUpMobilePhone",
      data: { changeCode: _sign.changeCode, newMobilePhone: _sign.newMobilePhone, newCode: _sign.newCode, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, sign: _sign.sign, timestemp: _sign.timestemp },
      dataType: "json",
      success(data) {
        if (data.status == 1) {
          callback(data);
        } else {
          callback(false, data.message);
        }
      }
    });
  },

  /**
   * 绑定银行卡
   * @param realName
   * @param bankCard
   * @param callback
   */
  bankCard(realName, bankCard, callback) {

    var _sign = this.getAjaxSign({
      realName,
      bankCard
    });

    $.ajax({
      type: "post",
      url: ajaxConfig.server_url + "user/bankCard",
      data: { realName: _sign.realName, bankCard: _sign.bankCard, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, sign: _sign.sign, timestemp: _sign.timestemp },
      dataType: "json",
      success(data) {
        if (data.status == 1) {
          callback(data);
        } else {
          callback(false, data.message);
        }
      }
    });
  },

  /**
   * 移除银行卡绑定
   * @param cardID
   * @param callback
   */
  removeBankCard(cardID, callback) {

    var _sign = this.getAjaxSign({
      cardID
    });

    $.ajax({
      type: "post",
      url: ajaxConfig.server_url + "user/removeBankCard",
      data: { cardID: _sign.cardID, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, sign: _sign.sign, timestemp: _sign.timestemp },
      dataType: "json",
      success(data) {
        if (data.status == 1) {
          callback(data);
        } else {
          callback(false, data.message);
        }
      }
    });
  },

  /**
   * 获取已绑定的银行卡
   * @param callback
   */
  bankCardList(callback) {

    var _sign = this.getAjaxSign();

    $.ajax({
      type: "post",
      url: ajaxConfig.server_url + "user/bankCardList",
      data: { uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, sign: _sign.sign, timestemp: _sign.timestemp },
      dataType: "json",
      success(data) {
        if (data.status == 1) {
          callback(data);
        } else {
          callback(false, data.message);
        }
      }
    });
  },

  /**
   * 设置默认银行卡
   * @param cardID
   * @param callback
   */
  defaultBankCard(cardID, callback) {
    var _sign = this.getAjaxSign({
      cardID
    });
    $.ajax({
      type: "post",
      url: ajaxConfig.server_url + "user/defaultBankCard",
      data: { cardID: _sign.cardID, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, sign: _sign.sign, timestemp: _sign.timestemp },
      dataType: "json",
      success(data) {
        if (data.status == 1) {
          callback(data);
        } else {
          callback(false, data.message);
        }
      }
    });
  },

  /**
   * 设置支付密码
   * @param oldPwd
   * @param newPwd
   * @param callback
   */
  outPwd(oldPwd, newPwd, callback) {
    var _sign = this.getAjaxSign({
      oldPwd: Md5(oldPwd),
      newPwd: Md5(newPwd)
    });
    $.ajax({
      type: "post",
      url: ajaxConfig.server_url + "user/outPwd",
      data: { oldPwd: _sign.oldPwd, newPwd: _sign.newPwd, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, sign: _sign.sign, timestemp: _sign.timestemp },
      dataType: "json",
      success(data) {
        if (data.status == 1) {
          callback(data);
        } else {
          callback(false, data.message);
        }
      }
    });
  },

  /**
   * 忘记支付密码重置
   * @param code
   * @param password
   * @param callback
   */
  resetOutPwd(code, password, callback) {
    var _sign = this.getAjaxSign({
      code,
      password: Md5(password)
    });
    $.ajax({
      type: "post",
      url: ajaxConfig.server_url + "user/resetOutPwd",
      data: { code: _sign.code, password: _sign.password, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, sign: _sign.sign, timestemp: _sign.timestemp },
      dataType: "json",
      success(data) {
        if (data.status == 1) {
          callback(data);
        } else {
          callback(false, data.message);
        }
      }
    });
  },

  /**
   * 用户充值
   * @param call
   */
  recharge(callback) {
    callback(true);
  },

  /**
   * 获取彩种列表
   */
  lotteryList(callback) {
    var _sign = this.getAjaxSign();
    $.ajax({
      type: "post",
      url: ajaxConfig.server_url + "lottery/lotteryList",
      data: { uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, sign: _sign.sign, timestemp: _sign.timestemp },
      dataType: "json",
      success(data) {
        if (data.status == 1) {
          callback(data);
        } else {
          callback(false, data.message);
        }
      }
    });
  },

  /**
   * 获取彩种列表
   */
  lotteryListWap(callback) {
    var _sign = this.getAjaxSign();
    $.ajax({
      type: "post",
      url: ajaxConfig.server_url + "lottery/lotteryListWap",
      data: { uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, sign: _sign.sign, timestemp: _sign.timestemp },
      dataType: "json",
      success(data) {
        if (data.status == 1) {
          callback(data);
        } else {
          callback(false, data.message);
        }
      }
    });
  },

  /**
   * 双色球投注
   * @param anteCodeList
   * @param number
   * @param lotMulti
   * @param callback
   */
  ssqTicket(anteCodeList, number, lotMulti, callback) {

    var _sign = this.getAjaxSign({
      number,
      lotMulti
    });

    $.ajax({
      type: "post",
      url: ajaxConfig.server_url + "lottery/ssqTicket",
      data: { anteCodeList: anteCodeList, number: _sign.number, lotMulti: _sign.lotMulti, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, sign: _sign.sign, timestemp: _sign.timestemp },
      dataType: "json",
      success(data) {
        if (data.status == 1) {
          callback(data);
        } else {
          callback(false, data.message);
        }
      }
    });
  },

  /**
   * 快3投注
   * @param lotteryType
   * @param number
   * @param lotMulti
   * @param anteCodeList
   * @param callback
   */
  k3Ticket(lotteryType, number, lotMulti, anteCodeList, callback) {
    var _sign = this.getAjaxSign({
      lotteryType,
      number,
      lotMulti
    });

    $.ajax({
      type: "post",
      url: ajaxConfig.server_url + "lottery/k3Ticket",
      data: { lotteryType: _sign.lotteryType, number: _sign.number, lotMulti: _sign.lotMulti, anteCodeList: anteCodeList, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, sign: _sign.sign, timestemp: _sign.timestemp },
      dataType: "json",
      success(data) {
        if (data.status == 1) {
          callback(data);
        } else {
          callback(false, data.message);
        }
      }
    });
  },

  /**
   * 11选5投注
   * @param lotteryType
   * @param playType
   * @param number
   * @param lotMulti
   * @param anteCodeList
   * @param callback
   */

  d11Ticket(ticketList, lotteryType, number, lotMulti, callback) {
    var _sign = this.getAjaxSign({
      lotteryType,
      number,
      lotMulti
    });

    $.ajax({
      type: "post",
      url: ajaxConfig.server_url + "lottery/d11Ticket",
      data: { ticketList: ticketList, lotteryType: _sign.lotteryType, number: _sign.number, lotMulti: _sign.lotMulti, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, sign: _sign.sign, timestemp: _sign.timestemp },
      dataType: "json",
      success(data) {
        if (data.status == 1) {
          callback(data);
        } else {
          callback(false, data.message);
        }
      }
    });
  },

  /**
   * 大乐透投注
   * @param number
   * @param lotMulti
   * @param anteCodeList
   * @param callback
   */
  dltTicket(number, lotMulti, subjoin, anteCodeList, callback) {

    var _sign = this.getAjaxSign({
      number,
      lotMulti,
      subjoin
    });

    $.ajax({
      type: "post",
      url: ajaxConfig.server_url + "lottery/dltTicket",
      data: { number: _sign.number, lotMulti: _sign.lotMulti, subjoin: _sign.subjoin, anteCodeList: anteCodeList, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, sign: _sign.sign, timestemp: _sign.timestemp },
      dataType: "json",
      success(data) {
        if (data.status == 1) {
          callback(data);
        } else {
          callback(false, data.message);
        }
      }
    });
  },

  /**
   * 获取彩种奖期
   * @param lotteryType       彩种
   * @param callback
   */
  awardPeriod(lotteryType, callback) {

    var _sign = this.getAjaxSign({
      lotteryType
    });

    $.ajax({
      type: "post",
      url: ajaxConfig.server_url + "lottery/awardPeriod",
      data: { lotteryType: _sign.lotteryType, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, sign: _sign.sign, timestemp: _sign.timestemp },
      dataType: "json",
      success(data) {
        if (data.status == 1) {
          callback(data);
        } else {
          callback(false, data.message);
        }
      }
    });
  },

  /**
   * 获取开奖公告
   * @param lotteryType
   * @param callback
   */
  openAwardList(callback) {
    var _sign = this.getAjaxSign();

    $.ajax({
      type: "post",
      url: ajaxConfig.server_url + "lottery/openAwardList",
      data: { uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, sign: _sign.sign, timestemp: _sign.timestemp },
      dataType: "json",
      success(data) {
        if (data.status == 1) {
          callback(data);
        } else {
          callback(false, data.message);
        }
      }
    });
  },

  /**
   * 获取指定的开奖信息
   * @param lotteryType               彩票彩种
   * @param pageIndex                 页码
   * @param pageSize                  每页显示条数
   * @param callback
   */
  openAwardListByLotteryType(lotteryType, pageIndex, pageSize, callback) {
    var _sign = this.getAjaxSign({
      lotteryType,
      pageIndex,
      pageSize
    });

    $.ajax({
      type: "post",
      url: ajaxConfig.server_url + "lottery/openAwardListByLotteryType",
      data: { lotteryType: _sign.lotteryType, pageIndex: _sign.pageIndex, pageSize: _sign.pageSize, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, sign: _sign.sign, timestemp: _sign.timestemp },
      dataType: "json",
      success(data) {
        if (data.status == 1) {
          callback(data);
        } else {
          callback(false, data.message);
        }
      }
    });
  },

  /**
   * 获取订单详情
   * @param status
   * @param pageIndex
   * @param pageSize
   * @param callback
   */
  ticketList(status, pageIndex, pageSize, callback) {
    var _sign = this.getAjaxSign({
      status,
      pageIndex,
      pageSize
    });

    $.ajax({
      type: "post",
      url: ajaxConfig.server_url + "lottery/ticketList",
      data: { status: _sign.status, pageIndex: _sign.pageIndex, pageSize: _sign.pageSize, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, sign: _sign.sign, timestemp: _sign.timestemp },
      dataType: "json",
      success(data) {
        if (data.status == 1) {
          callback(data);
        } else {
          callback(false, data.message);
        }
      }
    });
  },

  /**
   * 查询订单详情
   * @param ticketID
   * @param callback
   */
  ticketDetails(ticketID, callback) {
    var _sign = this.getAjaxSign({
      ticketID
    });

    $.ajax({
      type: "post",
      url: ajaxConfig.server_url + "lottery/ticketDetails",
      data: { ticketID: _sign.ticketID, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, sign: _sign.sign, timestemp: _sign.timestemp },
      dataType: "json",
      success(data) {
        if (data.status == 1) {
          callback(data);
        } else {
          callback(false, data.message);
        }
      }
    });
  },

  /**
   * 账户明细
   * @param queryType
   * @param pageIndex
   * @param pageSize
   * @param callback
   */
  userAccountFlow(queryType, pageIndex, pageSize, callback) {
    var _sign = this.getAjaxSign({
      queryType,
      pageIndex,
      pageSize
    });

    $.ajax({
      type: "post",
      url: ajaxConfig.server_url + "user/userAccountFlow",
      data: { queryType: _sign.queryType, pageIndex: _sign.pageIndex, pageSize: _sign.pageSize, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, sign: _sign.sign, timestemp: _sign.timestemp },
      dataType: "json",
      success(data) {
        if (data.status == 1) {
          callback(data);
        } else {
          callback(false, data.message);
        }
      }
    });
  },

  /**
   * 支付宝wap支付
   * @param totalFee            金额
   * @param returnUrl           回调地址
   * @param attType             支付类型
   * @param attInfo             支付描述
   * @param callback
   */
  alipayWap(totalFee, returnUrl, attType, attInfo, attDesc, callback) {

    let data = {
      totalFee,
      returnUrl
    }

    if(!Base.isNull(attType)){
      data.attType = attType;
    }if(!Base.isNull(attInfo)){
      data.attInfo = attInfo;
    }if(!Base.isNull(attDesc)){
      data.attDesc = attDesc;
    }

    const _sign = this.getAjaxSign(data);

    $.ajax({
      type: "post",
      url: `${ajaxConfig.server_url}p/alipayWap`,
      data: { totalFee: _sign.totalFee, returnUrl: _sign.returnUrl, attType: _sign.attType, attInfo: _sign.attInfo, attDesc: _sign.attDesc, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, sign: _sign.sign, timestemp: _sign.timestemp },
      success(data) {
        callback(data);
      }
    });
  },

  /**
   * 微信wap支付
   * @param amount        金额
   * @param attType       支付类型
   * @param attInfo       支付描述
   * @param attDesc       支付描述2
   * @param callback
   */
  wxWebPay(amount, attType, attInfo, attDesc, callback) {

    let data = {
      amount,
    }

    if(!Base.isNull(attType)){
      data.attType = attType;
    }if(!Base.isNull(attInfo)){
      data.attInfo = attInfo;
    }if(!Base.isNull(attDesc)){
      data.attDesc = attDesc;
    }

    const _sign = this.getAjaxSign(data);

    $.ajax({
      type: "post",
      url: `${ajaxConfig.server_url}p/wxWebPay`,
      data: { amount: _sign.amount, attType: _sign.attType, attInfo: _sign.attInfo, attDesc: _sign.attDesc, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, sign: _sign.sign, timestemp: _sign.timestemp },
      success(data) {
        callback(data);
      }
    });
  },

  /**
   * 支付结果查询
   * @param orderNo                   订单号
   * @param queryType                 支付类型
   * @param callback
   */
  payResultQuery(orderNo, queryType, callback) {

    let data = {
      queryType
    };

    if(!Base.isNull(orderNo)){
      data.orderNo = orderNo;
    }

    const _sign = this.getAjaxSign(data);

    // $("p").eq(0).append(JSON.stringify({ orderNo: _sign.orderNo, queryType: _sign.queryType, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, s: _sign.s, t: _sign.t }));

    // alert( JSON.stringify({ orderNo: _sign.orderNo, queryType: _sign.queryType, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, s: _sign.s, t: _sign.t }));

    $.ajax({
      type: "post",
      url: `${ajaxConfig.server_url}p/payResultQuery`,
      data: { orderNo: _sign.orderNo, queryType: _sign.queryType, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, sign: _sign.sign, timestemp: _sign.timestemp },
      dataType: "json",
      success(data) {

        // alert(JSON.stringify(data));

        // $("p").eq(1).append(JSON.stringify(data));

        if (data.status == 1) {
          callback(data);
        } else {
          callback(false, data.message);
        }
      },
      error(data){
        callback('error',e,data);
      }
    });
  },

  /**
   * 完成充值
   * @param orderNo               订单号
   * @param txn_id                交易号
   * @param totalFee              支付金额
   * @param time_end
   * @param callback
   * @constructor
   */
  payment(orderNo, txn_id, totalFee, time_end, callback) {
    const _sign = this.getAjaxSign({
      orderNo,
      txn_id,
      totalFee,
      time_end
    });

    $.ajax({
      type: "post",
      url: ajaxConfig.server_url + "api/Payment",
      data: { orderNo: _sign.orderNo, txn_id: _sign.txn_id, totalFee: _sign.totalFee, time_end: _sign.time_end, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, sign: _sign.sign, timestemp: _sign.timestemp },
      dataType: "json",
      success(data) {
        if (data.status == 1) {
          callback(data);
        } else {
          callback(false, data.message);
        }
      }
    });
  },

  /**
   * 申请提现
   * @param cardID
   * @param money
   * @param callback
   */
  applyAccountOutput(cardID, money, outPwd, callback) {
    const _sign = this.getAjaxSign({
      cardID,
      money,
      outPwd
    });

    $.ajax({
      type: "post",
      url: ajaxConfig.server_url + "user/applyAccountOutput",
      data: { cardID: _sign.cardID, money: _sign.money, outPwd: _sign.outPwd, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, sign: _sign.sign, timestemp: _sign.timestemp },
      dataType: "json",
      success(data) {
        if (data.status == 1) {
          callback(data);
        } else {
          callback(false, data.message);
        }
      }
    });
  },

  /**
   * 返回可投注的所有赛事
   * @param callback
   */
  lotteryMatch(league, callback) {

    let data = {};

    if(!Base.isNull(league)){
      data.league = league;
    }

    const _sign = this.getAjaxSign(data);

    $.ajax({
      type: "post",
      url: ajaxConfig.server_url + "match/lotteryMatch",
      data: { league: league, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, sign: _sign.sign, timestemp: _sign.timestemp },
      dataType: "json",
      success(data) {
        if (data.status == 1) {
          callback(data);
        } else {
          callback(false, data.message);
        }
      }
    });
  },

  /**
   * 返回所有赛事的分页列表
   * @param pageIndex
   * @param pageSize
   * @param callback
   */
  allLotteryMatch(pageIndex, pageSize, callback) {
    const _sign = this.getAjaxSign({
      pageIndex,
      pageSize
    });

    $.ajax({
      type: "post",
      url: ajaxConfig.server_url + "match/allLotteryMatch",
      data: { pageIndex: _sign.pageIndex, pageSize: _sign.pageSize, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, sign: _sign.sign, timestemp: _sign.timestemp },
      dataType: "json",
      success(data) {
        if (data.status == 1) {
          callback(data);
        } else {
          callback(false, data.message);
        }
      }
    });
  },

  /**
   * 竞彩足球投注
   * @param LotId
   * @param lotMulti
   * @param anteCodeList
   * @param callback
   */
  ftTicket(LotId, lotMulti, matchList, anteCodeList, callback) {
    const _sign = this.getAjaxSign({
      LotId,
      lotMulti,
      matchList
    });

    // matchList: matchList,

    $.ajax({
      type: "post",
      url: ajaxConfig.server_url + "match/ftTicket",
      data: { LotId: _sign.LotId, lotMulti: _sign.lotMulti, matchList: matchList, anteCodeList: anteCodeList, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, sign: _sign.sign, timestemp: _sign.timestemp },
      dataType: "json",
      success(data) {
        if (data.status == 1) {
          callback(data);
        } else {
          callback(false, data.message);
        }
      }
    });
  },

  /**
   * 竞彩玩法投注
   * @param LotId
   * @param lotMulti
   * @param LotMoney
   * @param playTypeList
   * @param matchList
   * @param callback
   */
  raceTicket(LotId, lotMulti, LotMoney, playTypeList, matchList, serialNumber, callback) {

    let data = {
      LotId,
      lotMulti,
      LotMoney
    }

    if(!Base.isNull(serialNumber)){
      data.serialNumber = serialNumber
    }

    const _sign = this.getAjaxSign(data);

    // matchList: matchList,

    $.ajax({
      type: "post",
      url: ajaxConfig.server_url + "match/raceTicket",
      data: { LotId: _sign.LotId, lotMulti: _sign.lotMulti, LotMoney: _sign.LotMoney, playTypeList: playTypeList, matchList: matchList, serialNumber: serialNumber, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, sign: _sign.sign, timestemp: _sign.timestemp },
      dataType: "json",
      success(data) {
        if (data.status == 1) {
          callback(data);
        } else {
          callback(false, data.message);
        }
      }
    });
  },

  /**
   * 查询订单票
   * @param orderNo           订单号
   * @param callback
   */
  orderTicket(orderNo, callback) {
    const _sign = this.getAjaxSign({
      orderNo
    });

    // matchList: matchList,

    $.ajax({
      type: "post",
      url: ajaxConfig.server_url + "match/orderTicket",
      data: { orderNo: _sign.orderNo, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, sign: _sign.sign, timestemp: _sign.timestemp },
      dataType: "json",
      success(data) {
        if (data.status == 1) {
          callback(data);
        } else {
          callback(false, data.message);
        }
      }
    });
  },

  /**
   * 获取竞彩足球的投注详情
   * @param ticketID
   * @param callback
   */
  matchTicket(ticketID, callback) {
    const _sign = this.getAjaxSign({
      ticketID
    });

    $.ajax({
      type: "post",
      url: ajaxConfig.server_url + "match/matchTicket",
      data: { ticketID: _sign.ticketID, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, sign: _sign.sign, timestemp: _sign.timestemp },
      dataType: "json",
      success(data) {
        if (data.status == 1) {
          callback(data);
        } else {
          callback(false, data.message);
        }
      }
    });
  },

  /**
   * 获取比赛信息
   * @param matchList
   * @param callback
   */
  matchInfo(id, callback) {
    const _sign = this.getAjaxSign({
      id
    });

    $.ajax({
      type: "post",
      url: ajaxConfig.server_url + "match/matchInfo",
      data: { id: id, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, sign: _sign.sign, timestemp: _sign.timestemp },
      dataType: "json",
      success(data) {
        if (data.status == 1) {
          callback(data);
        } else {
          callback(false, data.message);
        }
      }
    });
  },

  /**
   * 获取足彩订单列表
   * @param status
   * @param pageIndex
   * @param pageSize
   * @param callback
   */
  orderList(status, pageIndex, pageSize, callback) {

    const _sign = this.getAjaxSign({
      status,
      pageIndex,
      pageSize,
    });

    $.ajax({
      type: "post",
      url: ajaxConfig.server_url + "match/orderList",
      data: {  status: _sign.status, pageIndex: _sign.pageIndex, pageSize: _sign.pageSize, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, sign: _sign.sign, timestemp: _sign.timestemp },
      dataType: "json",
      success(data) {
        if (data.status == 1) {
          callback(data);
        } else {
          callback(false, data.message);
        }
      }
    });
  },

  /**
   * 足彩订单详情
   * @param orderNo
   * @param callback
   */
  orderInfo(orderNo, callback) {

    const _sign = this.getAjaxSign({
      orderNo
    });

    $.ajax({
      type: "post",
      url: ajaxConfig.server_url + "match/orderInfo",
      data: {  orderNo: _sign.orderNo, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, sign: _sign.sign, timestemp: _sign.timestemp },
      dataType: "json",
      success(data) {
        if (data.status == 1) {
          callback(data);
        } else {
          callback(false, data.message);
        }
      }
    });
  },

  /**
   * 微信公众号支付
   * @param totalFee          订单金额
   * @param attType           订单类型
   * @param attInfo           订单内容
   * @param attDesc           订单描述
   * @param callback
   */
  wxJsPay(totalFee, attType, attInfo, attDesc, callback) {

    let openID = JSON.parse(Base.getCookie('tokenDetail')).openid;

    let data = {
      totalFee,
      openID,
    }

    if(!Base.isNull(attType)){
      data.attType = attType
    }
    if(!Base.isNull(attInfo)){
      data.attInfo = attInfo
    }
    if(!Base.isNull(attDesc)){
      data.attDesc = attDesc
    }

    const _sign = this.getAjaxSign(data);

    $.ajax({
      type: "post",
      url: ajaxConfig.server_url + "p/wxJsPay",
      data: { totalFee: _sign.totalFee, attType: _sign.attType, attInfo: _sign.attInfo, attDesc: _sign.attDesc, openID: _sign.openID, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, sign: _sign.sign, timestemp: _sign.timestemp },
      dataType: "json",
      success(data) {
        if (data.status == 1) {
          callback(data);
        } else {
          callback(false, data.message);
        }
      }
    });
  },

  /**
   * 发起支付宝提现
   * @param money           金额
   * @param payeeAccount    收款人账号
   * @param payeeRealName   收款人姓名
   * @param callback
   */
  createAlipayPayee(money, payeeAccount, payeeRealName, callback) {

    const _sign = this.getAjaxSign({
      money,
      payeeAccount,
      payeeRealName
    });

    $.ajax({
      type: "post",
      url: ajaxConfig.server_url + "user/createAlipayPayee",
      // url: "http://192.168.8.150:9713/user/createAlipayPayee",
      data: { money: _sign.money, payeeAccount: _sign.payeeAccount, payeeRealName: _sign.payeeRealName, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, sign: _sign.sign, timestemp: _sign.timestemp },
      dataType: "json",
      success(data) {
        if (data.status == 1) {
          callback(data);
        } else {
          callback(false, data.message);
        }
      }
    });
  },

  /**
   * 确认提现
   * @param money             提现金额
   * @param payeeAccount      收款人账号
   * @param payeeRealName     收款人姓名
   * @param bizNo             发起提现订单号
   * @param pwd               提现密码
   */
  confirmPayee(money, payeeAccount, payeeRealName, bizNo, pwd, callback) {

    const _sign = this.getAjaxSign({
      money,
      payeeAccount,
      payeeRealName,
      bizNo,
      pwd: Md5(pwd)
    });

    $.ajax({
      type: "post",
      url: ajaxConfig.server_url + "user/confirmPayee",
      // url: "http://192.168.8.150:9713/user/confirmPayee",
      data: { money: _sign.money, payeeAccount: _sign.payeeAccount, payeeRealName: _sign.payeeRealName, bizNo: _sign.bizNo, pwd: _sign.pwd, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, sign: _sign.sign, timestemp: _sign.timestemp },
      dataType: "json",
      success(data) {
        if (data.status == 1) {
          callback(data);
        } else {
          callback(false, data.message);
        }
      }
    });
  },

  /**
   * 获取新闻列表
   * @param pageIndex           页码
   * @param pageSize            每页条数
   * @param type                新闻类型
   * @param callback
   */
  getNewsList(pageIndex, pageSize, type, callback){

    let data = {
      pageIndex,
      pageSize
    }

    if(!Base.isNull(type)){
      data.type = type
    }

    const _sign = this.getAjaxSign(data);

    $.ajax({
      type: "post",
      url: ajaxConfig.server_url + "matchNews/list",
      // url: "http://192.168.8.150:9713/user/confirmPayee",
      data: { pageIndex: _sign.pageIndex, pageSize: _sign.pageSize, type: type, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, sign: _sign.sign, timestemp: _sign.timestemp },
      dataType: "json",
      success(data) {
        if (data.status == 1) {
          callback(data);
        } else {
          callback(false, data.message);
        }
      }
    });
  },

  /**
   * 获取文章详情
   * @param newsID              新闻ID
   * @param callback
   */
  getNewsDetail(newsID, callback){

    const _sign = this.getAjaxSign({
      newsID
    });

    $.ajax({
      type: "post",
      url: ajaxConfig.server_url + "matchNews/news",
      // url: "http://192.168.8.150:9713/user/confirmPayee",
      data: { newsID: _sign.newsID, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, sign: _sign.sign, timestemp: _sign.timestemp },
      dataType: "json",
      success(data) {
        if (data.status == 1) {
          callback(data);
        } else {
          callback(false, data.message);
        }
      }
    });
  },

  /**
   * getMatchNews
   * @param id
   * @param callback
   */
  getMatchNews(matchID, callback){
    const _sign = this.getAjaxSign({
      matchID
    });

    $.ajax({
      type: "post",
      url: ajaxConfig.server_url + "matchNews/byMatchID",
      // url: "http://192.168.8.150:9713/user/confirmPayee",
      data: { matchID: _sign.matchID, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, sign: _sign.sign, timestemp: _sign.timestemp },
      dataType: "json",
      success(data) {
        if (data.status == 1) {
          callback(data);
        } else {
          callback(false, data.message);
        }
      }
    });
  },


  /**
   * 红包领取记录
   * @param callback
   */
  giftCouponRecord(callback){
    const _sign = this.getAjaxSign();

    $.ajax({
      type: "post",
      url: ajaxConfig.server_url + "user/giftCouponRecord",
      // url: "http://192.168.8.150:9713/user/confirmPayee",
      data: {  uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, sign: _sign.sign, timestemp: _sign.timestemp },
      dataType: "json",
      success(data) {
        if (data.status == 1) {
          callback(data);
        } else {
          callback(false, data.message);
        }
      }
    });
  },

  /**
   * 用户红包列表
   * @param callback
   */
  userCouponList(callback){
    const _sign = this.getAjaxSign();

    $.ajax({
      type: "post",
      url: ajaxConfig.server_url + "user/userCouponList",
      // url: "http://192.168.8.150:9713/user/confirmPayee",
      data: {  uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, sign: _sign.sign, timestemp: _sign.timestemp },
      dataType: "json",
      success(data) {
        if (data.status == 1) {
          callback(data);
        } else {
          callback(false, data.message);
        }
      }
    });
  },

  /**
   * 新人注册红包领取
   * @param callback
   */
  registerCoupon(couponNo, callback){
    const _sign = this.getAjaxSign({
      couponNo
    });

    $.ajax({
      type: "post",
      url: ajaxConfig.server_url + "user/registerCoupon",
      // url: "http://192.168.8.150:9713/user/confirmPayee",
      data: { couponNo: _sign.couponNo, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, sign: _sign.sign, timestemp: _sign.timestemp },
      dataType: "json",
      success(data) {
        if (data.status == 1) {
          callback(data);
        } else {
          callback(false, data.message);
        }
      }
    });
  },

  /**
   * 新人专享红包领取
   * @param callback
   */
  newUserCoupon(couponNo, callback){
    const _sign = this.getAjaxSign({
      couponNo
    });

    $.ajax({
      type: "post",
      url: ajaxConfig.server_url + "user/newUserCoupon",
      // url: "http://192.168.8.150:9713/user/confirmPayee",
      data: { couponNo: _sign.couponNo, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, sign: _sign.sign, timestemp: _sign.timestemp },
      dataType: "json",
      success(data) {
        if (data.status == 1) {
          callback(data);
        } else {
          callback(false, data.message);
        }
      }
    });
  },

  /**
   * 获取banner
   * @param callback
   */
  bannerList(callback){
    const _sign = this.getAjaxSign();
    $.ajax({
      type: "post",
      url: ajaxConfig.server_url + "lottery/bannerList",
      // url: "http://192.168.8.150:9713/user/confirmPayee",
      data: {  uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, sign: _sign.sign, timestemp: _sign.timestemp },
      dataType: "json",
      success(data) {
        if (data.status == 1) {
          callback(data);
        } else {
          callback(false, data.message);
        }
      }
    });
  },

  /**
   * 获取首页可投的赛事
   * @param callback
   */
  recentlyMatchList(callback){
    const _sign = this.getAjaxSign();
    $.ajax({
      type: "post",
      url: ajaxConfig.server_url + "lottery/recentlyMatchList",
      // url: "http://192.168.8.150:9713/user/confirmPayee",
      data: {  uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, sign: _sign.sign, timestemp: _sign.timestemp },
      dataType: "json",
      success(data) {
        if (data.status == 1) {
          callback(data);
        } else {
          callback(false, data.message);
        }
      }
    });
  },


  /**
   *
   * @param callback
   */
  msgList(callback){
    const _sign = this.getAjaxSign();
    $.ajax({
      type: "post",
      url: ajaxConfig.server_url + "lottery/msgList",
      // url: "http://192.168.8.150:9713/user/confirmPayee",
      data: {  uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, sign: _sign.sign, timestemp: _sign.timestemp },
      dataType: "json",
      success(data) {
        if (data.status == 1) {
          callback(data);
        } else {
          callback(false, data.message);
        }
      }
    });
  },

  /**
   * 获取公告详情
   * @param noticeID        公告ID
   * @param callback
   */
  matchNoticeInfo(noticeID, callback){
    const _sign = this.getAjaxSign({
      noticeID
    });
    $.ajax({
      type: "post",
      url: ajaxConfig.server_url + "lottery/matchNoticeInfo",
      // url: "http://192.168.8.150:9713/user/confirmPayee",
      data: { noticeID: _sign.noticeID, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, sign: _sign.sign, timestemp: _sign.timestemp },
      dataType: "json",
      success(data) {
        if (data.status == 1) {
          callback(data);
        } else {
          callback(false, data.message);
        }
      }
    });
  },


  /**
   * QQ登录
   * @param token
   * @param key
   * @param openid
   * @param callback
   */
  webQQLoginIn(token, key, openid, callback){
    const _sign = this.getAjaxSign({
      token,
      key,
      openid
    });
    $.ajax({
      type: "post",
      url: ajaxConfig.server_url + "user/webQQLoginIn",
      // url: "http://192.168.8.150:9713/user/confirmPayee",
      data: { token: _sign.token, key: _sign.key, openid: _sign.openid, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, sign: _sign.sign, timestemp: _sign.timestemp },
      dataType: "json",
      success(data) {
        if (data.status == 1) {
          callback(data);
        } else {
          callback(false, data.message);
        }
      }
    });
  },

};

export default Interface;
//
// if (ajaxConfig.debug != true) {
// //线上版本
//   if (ajaxConfig.debug == false) {
//     //检测地址是否被篡改
//     let _href = window.location.href;
//     if (_href.includes('https://mp.bombsport.com/ticket/#/')) {
//
//       //验证渠道
//       if (_href.includes('source=')) {
//         let ___i = _href.indexOf('source=')
//         let source = _href.substring(___i + 7)
//         let mySource = Interface.getSource();
//         if (mySource != source) {
//           Base.setCookie('source', source)
//         }
//       }
//
//       if (Base.versions.isWeiXin) {
//         //验证通过 判断登录
//         Interface.userBaseInfo((data) => {
//           if (data) {
//             if (Base.isNull(data.returnJSON)) {
//               //微信自动登录
//               let __tmp1 = window.location.href;
//               let __index1 = __tmp1.indexOf('#');
//               let __tmp2 = __tmp1.substring(0, __index1);
//
//               let _source = ''
//               let mySource = Interface.getSource();
//
//               if (_href.includes('source=')) {
//                 let ___i = _href.indexOf('source=')
//                 let source = _href.substring(___i + 7)
//                 _source = source
//                 if (mySource != source) {
//                   Base.setCookie('source', source)
//                 }
//               } else {
//                 _source = mySource
//               }
//               window.location.href = __tmp2 + 'wxLogin.html?source=' + _source;
//             }
//           }
//         });
//       }
//     } else {
//       //判断渠道
//       if (_href.includes('source=')) {
//         let ___i = _href.indexOf('source=')
//         let _href2 = _href.substring(___i + 7)
//         //重定向至渠道版
//         window.location.href = 'https://mp.bombsport.com/ticket/main.html?source=' + _href2;
//       } else {
//         //重定向至wap版
//         window.location.href = 'https://mp.bombsport.com/ticket/#/Soccer';
//       }
//     }
//   }
// }

