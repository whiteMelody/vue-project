
import Base from './base.js'
import Md5 from './md5_ch.js'
import HostSdk from './hostSdk.js'

/**
 * 接口配置
 * @type {{server_url: string, time_out: number}}
 */

const ajaxConfig = {
  server_url: 'http://192.168.8.161:8081/',
  server_url2: 'http://192.168.8.161:8080/cponline/index.php/',
  time_out: 3000,
  lazy: 200,
  source: 'wap',
  type: '1',
  debug: false
};

if (ajaxConfig.debug == true) {
  ajaxConfig.server_url = 'http://192.168.8.161:8081/';
  ajaxConfig.server_url2 = 'http://192.168.8.161:8080/cponline/index.php/';
} else if (ajaxConfig.debug == false) {
  ajaxConfig.server_url = 'https://i.bombsport.com:4431/';
  ajaxConfig.server_url2 = 'https://api.31un.com/';
}

export default {

  /**
   * 获取用户ID
   * @returns {number}
   */
  getUserId() {

    // return '09081d3e210e4bfebd59ff2c33b6f559';

    const userInfo = Base.getCookie("userInfo");
    if (Base.isNull(userInfo)) {
      return 0;
    } else {
      return JSON.parse(userInfo).uuid;
    }
  },

  /**
   * 获取渠道/来源
   */
  getSource(){
    let tmp =  Base.getParmar('source');

    if(Base.isNull(tmp)){
      return 'wap';
    }
    // source #/ page
    let i1 = tmp.indexOf('&');

    if(i1 == -1){

      //继续查询i1
      i1 = tmp.indexOf('#/');
      if(i1 == -1){
        i1 = tmp.indexOf('#');
      }
    }

    if(i1 == -1){
      return 'wap';
    }

    return tmp.substring(0,i1);
  },

  getSourceName(){
    let source = this.getSource();

    if(source == 'wap'){
      return '稳赢体育';
    }else if(source == 'wyjc'){
      return '稳赢体育';
    }else if(source == 'tianqi'){
      return '中央天气预报';
    }

    return '稳赢体育';

  },

  getLazy(){
    return ajaxConfig.lazy;
  },

  /**
   * 获取设备ID
   */
  getDeviceID() {

    let deviceID = Base.getCookie('deviceID');
    if (Base.isNull(deviceID)) {
      deviceID = Base.getUuid();
      Base.setCookie('deviceID', deviceID, 365);
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
      return JSON.parse(userInfo).coinsQty;
    }
  },

  /**
   * 获取通用签名
   * @returns {string}
   */
  getAjaxSign(params) {
    const _this = this;
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
        params.uuid = _this.getUserId();
      }
    }
    if(Base.isNull(params.deviceID)){
      if(Base.versions.isAndroidApp || Base.versions.isIosApp){
        params.deviceID = HostSdk.deviceID;
      }else{
        params.deviceID = _this.getDeviceID();
      }
    }
    if(Base.isNull(params.source)){
      if(Base.versions.isAndroidApp || Base.versions.isIosApp){
        params.source = HostSdk.source;
      }else{
        params.source = _this.getSource();
      }
    }
    if(Base.isNull(params.deviceType)){
      if(Base.versions.isAndroidApp || Base.versions.isIosApp){
        params.deviceType = HostSdk.deviceType;
      }else{
        params.deviceType = ajaxConfig.type;
      }
    }

    if(Base.isNull(params.t)){
      params.t = _timestamp;
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
    
    params.signKey = str.split('.6419')[0];
    params.privateKey = str.split('.6419')[1];
    params.sha1Code =  str.split('529.')[0];
    params.md5Code =  str.split('529.')[1];
    params.s = str.split('@@@')[0];
    params.key = str.split('@@@')[1];

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
   * 联赛信息列表信息(无编号时返回热门联赛信息)
   * @param code
   * @param callback
   */
  leagueList(code, callback) {
    const _sign = this.getAjaxSign({
      code
    });

    $.ajax({
      type: "post",
      url: `${ajaxConfig.server_url}match/leagueList`,
      data: { code: _sign.code, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, s: _sign.s, t: _sign.t },
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
   * 赛事列表（赛事ID小于等于0返回热门赛事）
   * @param pageIndex                 页码
   * @param pageSize                  每页条数
   * @param leagueType                类型
   * @param callback
   */
  matchListByHot(pageIndex, pageSize, queryType, callback) {
    const _sign = this.getAjaxSign({
      pageIndex,
      pageSize
    });

    let _url = `${ajaxConfig.server_url}match/matchListByHot`;

    if(queryType == 0){
      _url = `${ajaxConfig.server_url}match/matchListByHot`;
    }else{
      _url = `${ajaxConfig.server_url}match/matchAllList `;
    }

    $.ajax({
      type: "post",
      url: _url,
      data: { pageIndex: _sign.pageIndex, pageSize: _sign.pageSize, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, s: _sign.s, t: _sign.t },
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
   * 获取推荐赛事
   * @param callback
   */
  recommendMatchInfo(callback) {
    const _sign = this.getAjaxSign();

    $.ajax({
      type: "post",
      url: `${ajaxConfig.server_url}match/recommendMatchInfo`,
      data: { uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, s: _sign.s, t: _sign.t },
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
   * 赛事赔率
   * @param matchID
   * @param callback
   */
  matchRate(matchID, callback) {
    const _sign = this.getAjaxSign({
      matchID
    });

    $.ajax({
      type: "post",
      url: `${ajaxConfig.server_url}match/matchRate`,
      data: { matchID: _sign.matchID, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, s: _sign.s, t: _sign.t },
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
   * 获取比赛详细信息
   * @param matchID
   * @param callback
   */
  matchInfo(matchID, callback) {
    const _sign = this.getAjaxSign({
      matchID
    });

    $.ajax({
      type: "post",
      url: `${ajaxConfig.server_url}match/matchInfo`,
      data: { matchID: _sign.matchID, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, s: _sign.s, t: _sign.t },
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
   * 投注
   * @param couponNumber            红包ID
   * @param money                   投注金额
   * @param matchList               比赛list
   * @param callback
   */
  payMatch(couponNumber, money, matchList, callback) {

    const data = {
      money
    };

    if(!Base.isNull(couponNumber)){
      data.couponNumber = couponNumber;
    }

    const _sign = this.getAjaxSign(data);

    $.ajax({
      type: "post",
      url: `${ajaxConfig.server_url}p/payMatch`,
      data: { couponNumber: _sign.couponNumber, money: _sign.money, matchList: matchList, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, s: _sign.s, t: _sign.t },
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
   * 下单
   * @param couponNumber            红包ID
   * @param money                   投注金额
   * @param matchList               比赛list
   * @param callback
   */
  createMatchOrder(couponNumber, money, matchList, callback) {

    const data = {
      money
    };

    if(!Base.isNull(couponNumber)){
      data.couponNumber = couponNumber;
    }

    const _sign = this.getAjaxSign(data);

    $.ajax({
      type: "post",
      url: `${ajaxConfig.server_url}p/createMatchOrder`,
      data: { couponNumber: _sign.couponNumber, money: _sign.money, matchList: matchList, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, s: _sign.s, t: _sign.t },
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
   * 获取达人推荐列表
   * @param pageIndex                 页码
   * @param pageSize                  每页条数
   * @param matchID                   比赛ID
   * @param callback
   */
  newsListByMatch(pageIndex, pageSize, matchID, callback) {
    const _sign = this.getAjaxSign({
      pageIndex,
      pageSize,
      matchID
    });

    $.ajax({
      type: "post",
      url: `${ajaxConfig.server_url}match/newsListByMatch`,
      data: { pageIndex: _sign.pageIndex, pageSize: _sign.pageSize, matchID: _sign.matchID, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, s: _sign.s, t: _sign.t },
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
   * 获取赛事推荐/文章详情
   * @param newsID                文章ID
   * @param callback
   */
  newsInfo(newsID, callback) {
    const _sign = this.getAjaxSign({
      newsID
    });

    $.ajax({
      type: "post",
      url: `${ajaxConfig.server_url}match/newsInfo`,
      data: { newsID: _sign.newsID, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, s: _sign.s, t: _sign.t },
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
   * 获取赛事列表详情
   * @param newsID
   * @param callback
   */
  newsMatchInfo(newsID, callback) {
    const _sign = this.getAjaxSign({
      newsID
    });

    $.ajax({
      type: "post",
      url: `${ajaxConfig.server_url}match/newsMatchInfo`,
      data: { newsID: _sign.newsID, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, s: _sign.s, t: _sign.t },
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
   * 付费文章详情信息
   * @param newsID
   * @param callback
   */
  newsMatchDetailInfo(newsID, callback) {
    const _sign = this.getAjaxSign({
      newsID
    });

    $.ajax({
      type: "post",
      url: `${ajaxConfig.server_url}match/newsMatchDetailInfo`,
      data: { newsID: _sign.newsID, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, s: _sign.s, t: _sign.t },
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
   * 用户购买达人推荐文章列表
   * @param newsID
   * @param callback
   */
  newsListByUserBought(callback) {
    const _sign = this.getAjaxSign();

    $.ajax({
      type: "post",
      url: `${ajaxConfig.server_url}match/newsListByUser`,
      data: { uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, s: _sign.s, t: _sign.t },
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
   * 生成购买达人推荐订单
   * @param newsID
   * @param callback
   */
  createNewsOrder(newsID, couponNumber, callback) {

    let data = {
      newsID
    }

    if(!Base.isNull(couponNumber)){
      data.couponNumber = couponNumber;
    }

    const _sign = this.getAjaxSign(data);

    $.ajax({
      type: "post",
      url: `${ajaxConfig.server_url}p/createNewsOrder`,
      data: { newsID: _sign.newsID, couponNumber: _sign.couponNumber, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, s: _sign.s, t: _sign.t },
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
   * 购买达人推荐方案
   * @param newsID
   * @param callback
   */
  payNews(newsID, couponNumber, callback) {

    let data = {
      newsID
    }

    if(!Base.isNull(couponNumber)){
      data.couponNumber = couponNumber;
    }

    const _sign = this.getAjaxSign(data);

    $.ajax({
      type: "post",
      url: `${ajaxConfig.server_url}p/payNews`,
      data: { newsID: _sign.newsID, couponNumber: _sign.couponNumber, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, s: _sign.s, t: _sign.t },
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
  bannerList(callback) {
    const _sign = this.getAjaxSign();

    $.ajax({
      type: "post",
      url: `${ajaxConfig.server_url}race/bannerList`,
      data: { uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, s: _sign.s, t: _sign.t },
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
   * 手机号登录（未注册时自动注册）
   * @param phoneNumber
   * @param code
   * @param couponNo
   * @param callback
   */
  loginInPhone(phoneNumber, code, couponNo, callback) {

    const data = {
      phoneNumber,
      code
    };

    if(!Base.isNull(couponNo)){
      data.couponNo = couponNo;
    }

    const _sign = this.getAjaxSign(data);

    $.ajax({
      type: "post",
      url: `${ajaxConfig.server_url}user/loginInPhone`,
      data: { phoneNumber: _sign.phoneNumber, code: _sign.code, couponNo: _sign.couponNo, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, s: _sign.s, t: _sign.t },
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
   * 第三方登录
   * @param openid
   * @param nickname
   * @param iconUrl
   * @param gender
   * @param signInfo
   * @param openType
   * @param couponNo
   * @param callback
   */
  loginInOpen(openid, nickname, iconUrl, gender, signInfo, openType, couponNo, callback) {
    const _sign = this.getAjaxSign({
      openid,
      nickname,
      iconUrl,
      gender,
      signInfo,
      openType,
      couponNo
    });

    $.ajax({
      type: "post",
      url: `${ajaxConfig.server_url}user/loginInOpen`,
      data: { openid: _sign.openid, nickname: _sign.nickname, iconUrl: _sign.iconUrl, gender: _sign.gender, signInfo: _sign.signInfo, openType: _sign.openType, couponNo: _sign.couponNo, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, s: _sign.s, t: _sign.t },
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
   * 获取当前用户信息
   * @param callback
   */
  userInfo(callback) {
    const _sign = this.getAjaxSign();

    $.ajax({
      type: "post",
      url: `${ajaxConfig.server_url}user/userInfo`,
      data: { uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, s: _sign.s, t: _sign.t },
      dataType: "json",
      success(data) {
        if (data.status == 1) {
          callback(data);
          Base.setCookie('userInfo', JSON.stringify(data.returnJSON));
        } else {
          callback(false, data.message);
        }
      }
    });
  },

  /**
   * 获取当前用户信息
   * @param callback
   */
  getUserInfo(uuid, callback) {
    const _sign = this.getAjaxSign({
      uuid
    });

    $.ajax({
      type: "post",
      url: `${ajaxConfig.server_url}user/userInfo`,
      data: { uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, s: _sign.s, t: _sign.t },
      dataType: "json",
      success(data) {
        if (data.status == 1) {
          callback(data);
          Base.setCookie('userInfo', JSON.stringify(data.returnJSON));
        } else {
          callback(false, data.message);
        }
      }
    });
  },

  /**
   * 微信登录
   * @param code
   * @param call
   */
  wxLogin(code, callback){

    if(code  == 'login'){
      const appid = 'wx652688d775b8a865';
      const redirect_uri = encodeURI('https://mp.bombsport.com/beta/#/Login');
      const response_type = 'code';
      const scope = 'snsapi_userinfo';
//        var scope = 'snsapi_Base';
      const state = '';
//                if(_this.call){
//                    state = 'http';
//                }

      const url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirect_uri}&response_type=${response_type}&scope=${scope}&state=${state}#wechat_redirect`;

      window.location.href =  url;
    }else{
      const _sign = this.getAjaxSign({
        code
      });
      $.ajax({
        type: "post",
        url: `${ajaxConfig.server_url}user/loginInWxServer`,
        data: { code: _sign.code, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, s: _sign.s, t: _sign.t },
        dataType: "json",
        success(data) {

          if (data.status == 1) {
            callback(data);
          } else {
            callback(false, data.message);
          }
        }
      });
    }
  },


  /**
   * 微信公众号支付
   * @param totalFee
   * @param attType
   * @param attInfo
   * @param callback
   */
  wxJsPay(totalFee, attType, attInfo, callback) {

    //获取openID

    let token = Base.getCookie('tokenDetail');

    if(!Base.isNull(token)){
      token = JSON.parse(token);
    }else{
      callback(false, '缺少openID');
    }

    const data = {
      totalFee,
      openID: token.openid
    };

    if(!Base.isNull(attType)){
      data.attType = attType;
    }

    if(!Base.isNull(attInfo)){
      data.attInfo = attInfo;
    }

    const _sign = this.getAjaxSign(data);

    $.ajax({
      type: "post",
      url: `${ajaxConfig.server_url}p/wxJsPay`,
      data: { totalFee: _sign.totalFee, attType: _sign.attType, attInfo: _sign.attInfo, openID: _sign.openID, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, s: _sign.s, t: _sign.t },
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
   * 上传头像
   * @param callback
   */
  uploadPhoto(callback) {
    const _sign = this.getAjaxSign();

    $.ajax({
      type: "post",
      url: `${ajaxConfig.server_url}user/uploadPhoto`,
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
   * 修改用户信息
   * @param nickName                      昵称
   * @param customSigna                   签名
   * @param email                         邮箱
   * @param gender                        性别
   * @param dateOfBirth
   * @param callback
   */
  updateUserInfo(nickName, customSigna, email, gender, dateOfBirth, callback) {
    const _sign = this.getAjaxSign({
      nickName,
      customSigna,
      email,
      gender,
      dateOfBirth
    });

    $.ajax({
      type: "post",
      url: `${ajaxConfig.server_url}user/updateUserInfo`,
      data: { nickName: _sign.nickName, customSigna: _sign.customSigna, email: _sign.email, gender: _sign.gender, dateOfBirth: _sign.dateOfBirth, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, s: _sign.s, t: _sign.t },
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
   * 关注用户
   * @param focusUUID
   * @param callback
   */
  focusUser(focusUUID, callback) {
    const _sign = this.getAjaxSign({
      focusUUID
    });

    $.ajax({
      type: "post",
      url: `${ajaxConfig.server_url}user/focusUser`,
      data: { focusUUID: _sign.focusUUID, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, s: _sign.s, t: _sign.t },
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
   * 取消关注
   * @param focusUUID
   * @param callback
   */
  cancelFocusUser(focusUUID, callback) {
    const _sign = this.getAjaxSign({
      focusUUID
    });

    $.ajax({
      type: "post",
      url: `${ajaxConfig.server_url}user/cancelFocusUser`,
      data: { focusUUID: _sign.focusUUID, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, s: _sign.s, t: _sign.t },
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
   * 关注列表
   * @param pageIndex
   * @param pageSize
   * @param callback
   */
  focusUserList(pageIndex, pageSize, callback) {
    const _sign = this.getAjaxSign({
      pageIndex,
      pageSize
    });

    $.ajax({
      type: "post",
      url: `${ajaxConfig.server_url}user/focusUserList`,
      data: { pageIndex: _sign.pageIndex, pageSize: _sign.pageSize, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, s: _sign.s, t: _sign.t },
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
   * 粉丝列表
   * @param callback
   */
  fansList(callback) {
    const _sign = this.getAjaxSign();

    $.ajax({
      type: "post",
      url: `${ajaxConfig.server_url}user/fansList`,
      data: { uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, s: _sign.s, t: _sign.t },
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
   * 关注赛事
   * @param matchID
   * @param callback
   */
  foucsMatch(matchID, callback) {
    const _sign = this.getAjaxSign({
      matchID
    });

    $.ajax({
      type: "post",
      url: `${ajaxConfig.server_url}user/foucsMatch`,
      data: { matchID: _sign.matchID, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, s: _sign.s, t: _sign.t },
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
   * 取消关注赛事
   * @param matchID
   * @param callback
   */
  cancelFoucsMatch(matchID, callback) {
    const _sign = this.getAjaxSign({
      matchID
    });

    $.ajax({
      type: "post",
      url: `${ajaxConfig.server_url}user/cancelFoucsMatch`,
      data: { matchID: _sign.matchID, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, s: _sign.s, t: _sign.t },
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
   * 关注的赛事
   * @param pageIndex
   * @param pageSize
   * @param callback
   */
  focusMatchList(pageIndex, pageSize, callback) {
    const _sign = this.getAjaxSign({
      pageIndex,
      pageSize
    });

    $.ajax({
      type: "post",
      url: `${ajaxConfig.server_url}user/focusMatchList`,
      data: { pageIndex: _sign.pageIndex, pageSize: _sign.pageSize, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, s: _sign.s, t: _sign.t },
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
   * 达人推荐信息列表
   * @param pageIndex
   * @param pageSize
   */
  newsList(pageIndex, pageSize, callback) {
    const _sign = this.getAjaxSign({
      pageIndex,
      pageSize
    });

    $.ajax({
      type: "post",
      url: `${ajaxConfig.server_url}news/newsList`,
      data: { pageIndex: _sign.pageIndex, pageSize: _sign.pageSize, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, s: _sign.s, t: _sign.t },
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
   * 获取用户已购买达人推荐的文章列
   * @param pageIndex
   * @param pageSize
   */
  newsListByUserOrder(pageIndex, pageSize, callback) {
    const _sign = this.getAjaxSign({
      pageIndex,
      pageSize
    });

    $.ajax({
      type: "post",
      url: `${ajaxConfig.server_url}news/newsListByUserOrder`,
      data: { pageIndex: _sign.pageIndex, pageSize: _sign.pageSize, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, s: _sign.s, t: _sign.t },
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
   * 推荐的达人
   * @param callback
   */
  topNewsUser(callback) {
    const _sign = this.getAjaxSign();

    $.ajax({
      type: "post",
      url: `${ajaxConfig.server_url}news/topNewsUser`,
      data: { uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, s: _sign.s, t: _sign.t },
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
   * 达人基本信息
   * @param newsUserID
   * @param callback
   */
  newsUserInfo(newsUserID, callback) {
    const _sign = this.getAjaxSign({
      newsUserID
    });

    $.ajax({
      type: "post",
      url: `${ajaxConfig.server_url}news/newsUserInfo`,
      data: { newsUserID: _sign.newsUserID, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, s: _sign.s, t: _sign.t },
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
   * 获取达人的推荐赛事
   * @param pageIndex
   * @param pageSize
   * @param newsUserID
   * @param callback
   */
  newsListByUser(pageIndex, pageSize, newsUserID, callback) {
    const _sign = this.getAjaxSign({
      pageIndex,
      pageSize,
      newsUserID
    });

    $.ajax({
      type: "post",
      url: `${ajaxConfig.server_url}news/newsListByUser`,
      data: { pageIndex: _sign.pageIndex, pageSize: _sign.pageSize, newsUserID: _sign.newsUserID, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, s: _sign.s, t: _sign.t },
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
   * 用户流水
   * @param pageIndex
   * @param pageSize
   * @param queryType
   * @param callback
   */
  userAccountFlow(pageIndex, pageSize, queryType, callback) {
    const _sign = this.getAjaxSign({
      pageIndex,
      pageSize,
      queryType
    });

    $.ajax({
      type: "post",
      url: `${ajaxConfig.server_url}user/userAccountFlow`,
      data: { pageIndex: _sign.pageIndex, pageSize: _sign.pageSize, queryType: _sign.queryType, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, s: _sign.s, t: _sign.t },
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
   * 红包列表
   * @param couponStatus
   * @param callback
   */
  couponList(page, pageSize, couponStatus, callback) {
    const _sign = this.getAjaxSign({
      couponStatus
    });

    $.ajax({
      type: "post",
      url: `${ajaxConfig.server_url}user/couponList`,
      data: { couponStatus: _sign.couponStatus, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, s: _sign.s, t: _sign.t },
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
   * 获取可用的红包
   * @param lotMoney
   * @param callback
   */
  usableCouponList(lotMoney, callback) {
    const _sign = this.getAjaxSign({
      lotMoney
    });

    $.ajax({
      type: "post",
      url: `${ajaxConfig.server_url}user/usableCouponList`,
      data: { lotMoney: _sign.lotMoney, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, s: _sign.s, t: _sign.t },
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
   * 用户投注列表
   * @param pageIndex
   * @param pageSize
   * @param queryType
   * @param callback
   */
  matchOrderList(pageIndex, pageSize, queryType, callback) {
    const _sign = this.getAjaxSign({
      pageIndex,
      pageSize,
      queryType
    });

    $.ajax({
      type: "post",
      url: `${ajaxConfig.server_url}user/matchOrderList`,
      data: { pageIndex: _sign.pageIndex, pageSize: _sign.pageSize, queryType: _sign.queryType, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, s: _sign.s, t: _sign.t },
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
   * 查询单个投注信息
   * @param orderID
   * @param callback
   */
  matchOrderByOrderID(orderID, callback) {
    const _sign = this.getAjaxSign({
      orderID
    });

    $.ajax({
      type: "post",
      url: `${ajaxConfig.server_url}user/matchOrderByOrderID`,
      data: { orderID: _sign.orderID, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, s: _sign.s, t: _sign.t },
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
   * 登录验证码
   * @param mobilePhone
   * @param callback
   */
  loginCode(mobilePhone, callback) {
    const _sign = this.getAjaxSign({
      mobilePhone
    });
    $.ajax({
      type: "post",
      url: `${ajaxConfig.server_url}msg/loginCode`,
      data: { mobilePhone: _sign.mobilePhone, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, s: _sign.s, t: _sign.t },
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
   * 用户地址列表
   * @param pageIndex
   * @param pageSize
   * @param callback
   */
  addressList(pageIndex, pageSize, callback) {
    const _sign = this.getAjaxSign({
      pageIndex,
      pageSize
    });

    $.ajax({
      type: "post",
      url: `${ajaxConfig.server_url}user/addressList`,
      data: { pageIndex: _sign.pageIndex, pageSize: _sign.pageSize, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, s: _sign.s, t: _sign.t },
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
   * 新增收货地址
   * @param recipients
   * @param mobilePhone
   * @param address
   * @param callback
   */
  addAddress(recipients, mobilePhone, address, callback) {
    const _sign = this.getAjaxSign({
      recipients,
      mobilePhone,
      address
    });

    $.ajax({
      type: "post",
      url: `${ajaxConfig.server_url}user/addAddress`,
      data: { recipients: _sign.recipients, mobilePhone: _sign.mobilePhone, address: _sign.address, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, s: _sign.s, t: _sign.t },
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
   * 修改收货地址
   * @param addressID
   * @param recipients
   * @param mobilePhone
   * @param address
   * @param callback
   */
  editAddress(addressID, recipients, mobilePhone, address, callback) {
    const _sign = this.getAjaxSign({
      addressID,
      recipients,
      mobilePhone,
      address
    });

    $.ajax({
      type: "post",
      url: `${ajaxConfig.server_url}user/editAddress`,
      data: { addressID: _sign.addressID, recipients: _sign.recipients, mobilePhone: _sign.mobilePhone, address: _sign.address, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, s: _sign.s, t: _sign.t },
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
   * 删除收货地址
   * @param addressID
   * @param callback
   */
  delAddress(addressID, callback) {
    const _sign = this.getAjaxSign({
      addressID
    });

    $.ajax({
      type: "post",
      url: `${ajaxConfig.server_url}user/delAddress`,
      data: { addressID: _sign.addressID, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, s: _sign.s, t: _sign.t },
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
   * 默认地址设置
   * @param addressID
   * @param callback
   */
  defaultAddress(addressID, callback) {
    const _sign = this.getAjaxSign({
      addressID
    });

    $.ajax({
      type: "post",
      url: `${ajaxConfig.server_url}user/defaultAddress`,
      data: { addressID: _sign.addressID, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, s: _sign.s, t: _sign.t },
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
   * 兑换商品
   * @param goodsid
   * @param username
   * @param telephone
   * @param address
   * @param callback
   */

  createOrder(goodsid, username, telephone, address, callback) {
    const _sign = this.getAjaxSign({
      goodsid,
      username,
      telephone,
      address
    });

    $.ajax({
      type: "post",
      url: `${ajaxConfig.server_url2}order/createOrder`,
      data: { goodsid: _sign.goodsid, username: _sign.username, telephone: _sign.telephone, address: _sign.address, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, s: _sign.s, t: _sign.t},
      dataType: "json",
      success(data) {
        if (data.code == 4000) {
          callback(data);
        } else {
          callback(false, data.message);
        }
      }
    });
  },



  /**
   * 获取订单信息
   * @param bigtype
   * @param ordernum
   * @param callback
   */
  showOrder(bigtype, ordernum, callback) {
    const _sign = this.getAjaxSign({
      bigtype,
      ordernum
    });

    $.ajax({
      type: "post",
      url: `${ajaxConfig.server_url2}order/showOrder`,
      data: { bigtype: _sign.bigtype, ordernum: _sign.ordernum, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, s: _sign.s, t: _sign.t },
      dataType: "json",
      success(data) {
        if (data.code == 4000) {
          callback(data);
        } else {
          callback(false, data.message);
        }
      }
    });
  },


  /**
   * 订单列表
   * @param page
   * @param pageSize
   * @param callback
   */
  orderList(page, pageSize, callback) {
    const _sign = this.getAjaxSign({
      page,
      pageSize
    });

    $.ajax({
      type: "post",
      url: `${ajaxConfig.server_url2}order/orderList`,
      data: { page: _sign.page, pageSize: _sign.pageSize, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, s: _sign.s, t: _sign.t },
      dataType: "json",
      success(data) {
        if (data.code == 4000) {
          callback(data);
        } else {
          callback(false, data.message);
        }
      }
    });
  },


  /**
   * 支付宝wap支付
   * @param totalFee
   * @param returnUrl
   * @param attType
   * @param attInfo
   * @param callback
   */
  alipayWap(totalFee, returnUrl, attType, attInfo, callback) {
    const data = {
      totalFee,
      returnUrl
    };

    if(!Base.isNull(attType)){
      data.attType = attType;
    }
    if(!Base.isNull(attInfo)){
      data.attInfo = attInfo;
    }

    const _sign = this.getAjaxSign(data);

    $.ajax({
      type: "post",
      url: `${ajaxConfig.server_url}p/alipayWap`,
      data: { totalFee: _sign.totalFee, returnUrl: _sign.returnUrl, attType: _sign.attType, attInfo: _sign.attInfo, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, s: _sign.s, t: _sign.t },
      success(data) {
        callback(data);
      }
    });
  },

  /**
   * 支付宝wap支付，客户端调用
   * @param totalFee
   * @param returnUrl
   * @param attType
   * @param attInfo
   */
  alipayWapForApp(totalFee, returnUrl, attType, attInfo, callback) {

    let data = {
      totalFee,
      returnUrl
    };

    if(!Base.isNull(attType))
      data.attType = attType;
    if(!Base.isNull(attInfo))
      data.attInfo = attInfo;

    const _sign = this.getAjaxSign(data);

    $.ajax({
      type: "post",
      url: ajaxConfig.server_url+'p/alipayWap',
      data: { totalFee: _sign.totalFee, returnUrl: _sign.returnUrl, attType: _sign.attType, attInfo: _sign.attInfo, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, s: _sign.s, t: _sign.t },
      success(data) {
        callback(data);
      },
    });
  },

  /**
   * 微信wap支付
   * @param totalFee
   * @param attType
   * @param attInfo
   * @param callback
   */
  wxWebPay(totalFee, attType, attInfo, callback) {

    const data = {
      totalFee
    };

    if(!Base.isNull(attType)){
      data.attType = attType;
    }
    if(!Base.isNull(attInfo)){
      data.attInfo = attInfo;
    }

    const _sign = this.getAjaxSign(data);

    $.ajax({
      type: "post",
      url: `${ajaxConfig.server_url}p/wxWebPay`,
      data: { totalFee: _sign.totalFee, attType: _sign.attType, attInfo: _sign.attInfo, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, s: _sign.s, t: _sign.t },
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

    const data = {
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
      data: { orderNo: _sign.orderNo, queryType: _sign.queryType, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, s: _sign.s, t: _sign.t },
      dataType: "json",
      success(data) {

        // alert(JSON.stringify(data));

        // $("p").eq(1).append(JSON.stringify(data));

        if (data.status == 1) {
          callback(data);
        } else {
          callback(false, data.message);
        }
      }
    });
  },

  /**
   * 商品列表
   * @param page
   * @param pageSize
   * @param bigtype
   * @param category_id
   * @param callback
   */

  goodsList(page,pageSize, bigtype, category_id, callback) {
    $.ajax({
      type: "post",
      url: `${ajaxConfig.server_url2}goods/goodsList`,
      data: { page, pageSize, bigtype, category_id },
      dataType: "json",
      success(data) {
        if (data.code == 4000) {
          callback(data);
        } else {
          callback(false, data.message);
        }
      }
    });
  },

  /**
   * 商品详情
   * @param id
   * @param callback
   */

  detail(id, callback) {
    $.ajax({
      type: "post",
      url: `${ajaxConfig.server_url2}goods/detail`,
      data: { id },
      dataType: "json",
      success(data) {
        if (data.code == 4000) {
          callback(data);
        } else {
          callback(false, data.message);
        }
      }
    });
  },

  /**
   * 邀请有奖注册
   * @param phoneNumber         手机号
   * @param code                验证码
   * @param parentUUID          邀请人
   * @param couponNo            邀请红包
   * @param callback
   */
  registerByInvitationUser(phoneNumber, code, parentUUID, couponNo, callback) {

    const _sign = this.getAjaxSign({
      phoneNumber,
      code,
      parentUUID,
      couponNo
    });

    $.ajax({
      type: "post",
      url: `${ajaxConfig.server_url}/user/registerByInvitationUser `,
      data: { phoneNumber: _sign.phoneNumber, code: _sign.code, parentUUID: _sign.parentUUID, couponNo: _sign.couponNo, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, s: _sign.s, t: _sign.t },
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
   * 获取指定球队赛程信息
   * @param teamID
   * @param callback
   */
  matchSaiChen(teamID, callback) {

    const _sign = this.getAjaxSign({
      teamID: teamID,
      uuid: 1,
      deviceID: 'wap deviceID',
      source: 'wap',
      deviceType: 1,
    });

    $.ajax({
      type: "post",
      url: `${ajaxConfig.server_url}/matchData/matchSaiChen`,
      data: {teamID: _sign.teamID, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, s: _sign.s, t: _sign.t },
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
   * 获取球队信息
   * @param teamID
   * @param callback
   */
  getTeam(teamID, callback) {

    const _sign = this.getAjaxSign({
      teamID: teamID,
      uuid: 1,
      deviceID: 'wap deviceID',
      source: 'wap',
      deviceType: 1,
    });


    $.ajax({
      type: "post",
      url: `${ajaxConfig.server_url}matchData/team`,
      data: {teamID: _sign.teamID, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, s: _sign.s, t: _sign.t },
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
   * 获取球员信息
   * @param pid
   * @param callback
   */
  getPlayer(pid, callback) {

    const _sign = this.getAjaxSign({
      pid: pid,
      uuid: 1,
      deviceID: 'wap deviceID',
      source: 'wap',
      deviceType: 1,
    });

    $.ajax({
      type: "post",
      url: `${ajaxConfig.server_url}matchData/player`,
      data: {pid: _sign.pid, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, s: _sign.s, t: _sign.t },
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
