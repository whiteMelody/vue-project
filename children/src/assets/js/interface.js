
import Base from './base.js'
import Md5 from './md5_ch.js'
import HostSdk from './hostSdk.js'

/**
 * 接口配置
 * @type {{server_url: string, time_out: number}}
 */

const ajaxConfig = {
  server_url: 'https://infant.7english.cn:1440/',
  time_out: 3000,
  lazy: 1000,
  source: 'wap',
  type: '1',
  debug: false
};

if (ajaxConfig.debug == true) {
  ajaxConfig.server_url = 'https://infant.7english.cn:1440/';
} else if (ajaxConfig.debug == false) {
  ajaxConfig.server_url = 'https://infant.7english.cn:1440/';
}

let Interface = {

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
   * 获取渠道/来源
   */
  getSource(){

    let source = Base.getCookie("source");

    if(Base.isNull(source))
      source = 'wap';

    return source;
  },

  /**
   * 获取通用签名
   * @returns {string}
   */
  getAjaxSign(params) {

    const t = Math.round(new Date().getTime() / 1000);

    let arr = [];

    let str = '';

    if (Base.isNull(params)) {
      params = {};
    }

    if(Base.isNull(params.userID)){
        params.userID = this.getUserId();
    }
    if(Base.isNull(params.deviceID)){
        params.deviceID = this.getDeviceID();
    }

    if(Base.isNull(params.type)){
        //判断设备类型
        if(Base.versions.isAndroid){
          params.type = 2
        }else{
          params.type = 3
        }
    }

    if(Base.isNull(params.t)){
      params.t = t;
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
    params.s = str.split('@@@')[0];
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
   * 获取首页分裂
   * @param callback
   */
  getFunctionList(callback) {
    const _sign = this.getAjaxSign();
    $.ajax({
      type: "post",
      url: ajaxConfig.server_url + "v2/hot/functionList",
      data: { userID: _sign.userID, deviceID: _sign.deviceID, type: _sign.type, s: _sign.s, t: _sign.t },
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
   * 获取首页推荐
   * @param callback
   */
  getHomeContentList (callback) {
    const _sign = this.getAjaxSign();
    $.ajax({
      type: "post",
      url: ajaxConfig.server_url + "v2/hot/homeContentList",
      data: { userID: _sign.userID, deviceID: _sign.deviceID, type: _sign.type, s: _sign.s, t: _sign.t },
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
  getFocusConfig (callback) {
    const _sign = this.getAjaxSign();
    $.ajax({
      type: "post",
      url: ajaxConfig.server_url + "focus/getFocusConfig",
      data: { userID: _sign.userID, deviceID: _sign.deviceID, type: _sign.type, s: _sign.s, t: _sign.t },
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
   * 根据categoryID获取频道数据
   * @param categoryID        频道ID
   * @param callback
   */
  getAudioChannelsByCategoryIDV2 (categoryID, callback) {
    const _sign = this.getAjaxSign({
      categoryID
    });
    $.ajax({
      type: "post",
      url: ajaxConfig.server_url + "channel/getAudioChannelsByCategoryIDV2",
      data: { categoryID: _sign.categoryID, userID: _sign.userID, deviceID: _sign.deviceID, type: _sign.type, s: _sign.s, t: _sign.t },
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


