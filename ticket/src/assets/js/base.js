
export default{

  /**
   * 通过key获取浏览器的参数
   * @param paras 	参数名
   * @param _url		浏览器地址（可选参数）
   * @returns {*}	参数值
   */
  getParmar(paras, _url) {
    let url = location.href;
    if (_url) url = _url;
    const paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
    const paraObj = {};
    for (let i = 0, j = 0; j = paraString[i]; i++) {
      paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
    }
    const returnValue = paraObj[paras.toLowerCase()];

    return returnValue;
  },

  /**
   * 获取string的长度，可以传中文
   * @param val			字符串
   * @returns {number}	长度
   */
  getByteLen(val) {
    let len = 0;
    for (let i = 0; i < val.length; i++) {
      if (val[i].match(/[^\x00-\xff]/ig) != null) //全角
        len += 2;else len += 1;
    };
    return len;
  },

  /**
   * 截取string，超出省略，可以传中文
   * @param str		字符串
   * @param num		截取长度
   * @returns {*}	截取后字符串
   */
  cutStrForNum(str, num) {
    let len = 0;
    let index = 0;
    let newStr = "";
    for (let i = 0; i < str.length; i++) {
      if (str[i].match(/[^\x00-\xff]/ig) != null) //全角
        len += 2;else len += 1;
      index++;
      if (len >= num) {
        break;
      }
    }
    if (len >= num) newStr = `${str.substring(0, index)}...`;else newStr = str;
    return newStr;
  },

  /**
   * 判断中文
   * @param str
   * @returns {boolean}
   */
  isChinese(str) {
    const reg = /^[\u4E00-\u9FA5]+$/;
    if (!reg.test(str)) {
      // console.log("不是中文");
      return false;
    }
    // console.log("中文");
    return true;
  },

  /**
   * 随机任意位数的值
   * @param length		位数
   * @returns {number}	随机数
   */
  mathRandom(length) {
    let num = 0;
    for (let i = 0; i < length; i++) {
      num += Math.floor(Math.random() * 10);
    }
    return num;
  },

  /**
   * 保留2位小数
   * @param oNum			原始数值 {number}
   * @returns {number}	新数值
   */
  twoDecimal(x) {
    var f = parseFloat(x);
    if (isNaN(f)) {
      return false;
    }
    var f = Math.round(x * 100) / 100;
    let s = f.toString();
    let rs = s.indexOf('.');
    if (rs < 0) {
      rs = s.length;
      s += '.';
    }
    while (s.length <= rs + 2) {
      s += '0';
    }
    return s;
  },

  /**
   * 通过name删除本地cookie
   * @param name		cookie名
   */
  delCookie(name) {
    if(this.versions.isWeiXin){
      return localStorage.removeItem(name);
    }
    document.cookie = `${name}=;expires=${new Date(0).toGMTString()}`;
  },

  /**
   * 通过name获取本地cookie
   * @param objName	cookie名
   */
  getCookie(objName) {
    if(this.versions.isWeiXin){
      return localStorage.getItem(objName)
    }
    const arrStr = document.cookie.split("; ");
    for (let i = 0; i < arrStr.length; i++) {
      const temp = arrStr[i].split("=");
      if (temp[0] == objName) return unescape(temp[1]);
    }
  },

  /**
   * 设置本地cookie
   * @param name		cookie名
   * @param value		cookie值
   * @param day		cookie保存天数
   */
  setCookie(name, value, day) {

    // alert('WeiXin:' + this.versions.isWeiXin);

    if(this.versions.isWeiXin){
      return localStorage.setItem(name, value);
    }

    if (day == null || day == "" || day == undefined) day = 30;
    const exp = new Date();
    exp.setTime(exp.getTime() + day * 24 * 60 * 60 * 1000);

    // console.log(`${name}=${escape(value)};expires=${exp.toGMTString()}`)

    document.cookie = `${name}=${escape(value)};expires=${exp.toGMTString()}`;
  },

  /**
   * 生成一个UUID
   * @returns {string}
   */
  getUuid() {
    const len = 32; //32长度
    let radix = 16; //16进制
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    const uuid = [];
    let i;
    radix = radix || chars.length;if (len) {
      for (i = 0; i < len; i++) {
        uuid[i] = chars[0 | Math.random() * radix];
      }
    } else {
      let r;uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';uuid[14] = '4';for (i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | Math.random() * 16;uuid[i] = chars[i == 19 ? r & 0x3 | 0x8 : r];
        }
      }
    }
    return uuid.join('');
  },

  /**
   * 时间戳格式化函数
   * @param nS	秒数时间戳（非js时间戳，js时间戳是毫秒数，需要/=1000
   * @returns {string}
   */
  toLocalTime(nS) {
    const date = new Date(parseInt(nS) * 1000);
    const myDate = `${this.addZero(date.getMonth() + 1)}月${this.addZero(date.getDate())}日`;
    const _linkDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    return [myDate, date, _linkDate];
  },

  /**
   * 小于9补0函数
   * @param num		原始数值
   * @returns {*}	新数值
   */
  addZero(num) {
    const str = num.toString();
    if (str.length == 1) return `0${num}`;else return num;
  },

  /**
   * 去0函数
   * @param num	原始数值
   * @returns {*}	新数值
   */
  splitZero(num) {
    const str = num.toString();
    if (str.length >= 2) {
      if (str.substring(0, 1) == '0') {
        return str.substring(1);
      } else {
        return num;
      }
    } else return num;
  },

  /**
   * 随机数 传数字区间
   * @param smin		最小值
   * @param smax		最大值
   * @returns {*}	随机值
   */
  random_num(smin, smax) {
    const Range = smax - smin;
    const Rand = Math.random();
    return smin + Math.round(Rand * Range);
  },

  /**
   * unicode转码
   * @param str
   * @returns {string}
   */
  encodeUnicode(str) {
    const res = [];
    for (let i = 0; i < str.length; i++) {
      res[i] = (`00${str.charCodeAt(i).toString(16)}`).slice(-4);
    }
    return `\\u${res.join("\\u")}`;
  },

  /**
   * unicode解码
   * @param str
   */
  decodeUnicode(str) {
    str = str.replace(/\\/g, "%");
    return unescape(str);
  },

  /**
   * 金额格式化
   * @param number
   * @param places
   * @param symbol
   * @param thousand
   * @param decimal
   * @returns {string}
   */
  // formatMoney(number=0, places, symbol, thousand, decimal) {
  //   places = !isNaN(places = Math.abs(places)) ? places : 2;
  //   symbol = symbol !== undefined ? symbol : "$";
  //   thousand = thousand || ",";
  //   decimal = decimal || ".";
  //   var j = 0;
  //   const negative = number < 0 ? "-" : "";
  //   const i = `${parseInt(number = Math.abs(+number || 0).toFixed(places), 10)}`;
  //   const j = (j = i.length) > 3 ? j % 3 : 0;
  //   return symbol + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "");
  // },

  /**
   * 阶层
   * @param n			值
   * @returns {number}
   */
  factorial(n) {
    return n > 1 ? n * this.factorial(n - 1) : 1;
  },

  /**
   * 组合数
   * @param nu 数组
   * @param groupl 组合个数
   * @param result 原始数组，没有则不传
   * @returns {*}
   */
  group(nu, groupl, result) {

    var result = result ? result : [];
    const nul = nu.length;
    const outloopl = nul - groupl;

    const nuc = nu.slice(0);

    let item = nuc.shift();
    item = item.constructor === Array ? item : [item];

    (function func(item, nuc) {
      let itemc;
      const nucc = nuc.slice(0);
      const margin = groupl - item.length;

      if (margin == 0) {
        result.push(item);
        return;
      }
      if (margin == 1) {
        for (const j in nuc) {
          itemc = item.slice(0);
          itemc.push(nuc[j]);
          result.push(itemc);
        }
      }
      if (margin > 1) {
        itemc = item.slice(0);
        itemc.push(nucc.shift());
        func(itemc, nucc);

        if (item.length + nucc.length >= groupl) {
          func(item, nucc);
        }
      }
    })(item, nuc);

    if (nuc.length >= groupl) {
      return this.group(nuc, groupl, result);
    } else {
      return result;
    }
  },

  /**
   * 获取session中的指定类型票
   * @param type
   */
  getTickets(type) {
    let _ticket = '';

    if (type == 'ssq') {
      _ticket = window.sessionStorage.getItem('ssq_ticket');
    }
    if (type == 'dlt') {
      _ticket = window.sessionStorage.getItem('dlt_ticket');
    }
    if (type == 'd11') {
      _ticket = window.sessionStorage.getItem('d11_ticket');
    }
    if (type == 'q3') {
      _ticket = window.sessionStorage.getItem('q3_ticket');
    }
    if (type == 'soccer') {
      _ticket = window.sessionStorage.getItem('soccer_ticket');
    }

    if (this.isNull(_ticket)) {
      return null;
    } else {
      return JSON.parse(_ticket);
    }
  },

  /**
   * 根据ID获取session中的票
   * @param ticketID
   */
  getTicketByID(ticketID, type) {

    let _ticket = this.getTickets(type);

    if (this.isNull(_ticket)) {
      return null;
    } else {
      for (let _i = 0; _i < _ticket.length; _i++) {
        if (ticketID == _ticket[_i].id) {
          _ticket[_i].index = _i;
          return _ticket[_i];
        }
      }
      return null;
    }
  },

  /**
   * 根据ID删除session中的票
   * @param ticketID
   * @param type
   */
  delTicketByID(ticketID, type) {

    let _tickets = this.getTickets(type);

    let _index = this.getTicketByID(ticketID, type).index;

    if (this.isNull(_tickets)) {
      return false;
    }

    _tickets.splice(_index, 1);

    _tickets = _tickets;

    if (type == 'ssq') {
      window.sessionStorage.setItem('ssq_ticket', JSON.stringify(_tickets));
    }
    if (type == 'dlt') {
      window.sessionStorage.setItem('dlt_ticket', JSON.stringify(_tickets));
    }
    if (type == 'd11') {
      window.sessionStorage.setItem('d11_ticket', JSON.stringify(_tickets));
    }
    if (type == 'q3') {
      window.sessionStorage.setItem('q3_ticket', JSON.stringify(_tickets));
    }
    if (type == 'soccer') {
      window.sessionStorage.setItem('soccer_ticket', JSON.stringify(_tickets));
    }

    return true;
  },

  /**
   * 根据ID修改session中的票
   * @param ticketID
   * @param type
   */
  editTicketByID(ticketID, type, ticket) {
    let _tickets = this.getTickets(type);
    let _index = this.getTicketByID(ticketID, type).index;

    if (this.isNull(_tickets)) {
      return false;
    }

    ticket.id = _tickets[_index].id;
    _tickets[_index] = ticket;

    _tickets = _tickets;

    if (type == 'ssq') {
      window.sessionStorage.setItem('ssq_ticket', JSON.stringify(_tickets));
    }
    if (type == 'dlt') {
      window.sessionStorage.setItem('dlt_ticket', JSON.stringify(_tickets));
    }
    if (type == 'd11') {
      window.sessionStorage.setItem('d11_ticket', JSON.stringify(_tickets));
    }
    if (type == 'q3') {
      window.sessionStorage.setItem('q3_ticket', JSON.stringify(_tickets));
    }
    if (type == 'soccer') {
      window.sessionStorage.setItem('soccer_ticket', JSON.stringify(_tickets));
    }

    return true;
  },

  /**
   * 判断彩种
   * @param type          彩种缩写
   */
  getLotteryType(type){

    let _res = {};

    if(type == 'ssq'){
      _res = {
        name: '双色球',
        type: 1
      }
    }else if(type == 'JXK3'){
      _res = {
        name: '江西快3',
        type: 2
      }
    }else if(type == 'JSK3'){
      _res = {
        name: '江苏快3',
        type: 2
      }
    }else if(type == 'AHK3'){
      _res = {
        name: '安徽快3',
        type: 2
      }
    }else if(type == 'D11'){
      _res = {
        name: '十一运夺金11选5',
        type: 3
      }
    }else if(type == 'dlc'){
      _res = {
        name: '多乐彩江西11选5',
        type: 3
      }
    }else if(type == 'C511'){
      _res = {
        name: '上海11选5',
        type: 3
      }
    }else if(type == 'CQD11'){
      _res = {
        name: '重庆11选5',
        type: 3
      }
    }else if(type == 'ZJC511'){
      _res = {
        name: '浙江11选5',
        type: 3
      }
    }else if(type == 'GDD11'){
      _res = {
        name: '广东11选5',
        type: 3
      }
    }else if(type == 'dlt'){
      _res = {
        name: '超级大乐透',
        type: 4
      }
    }else if(type == 'FT001'){
      _res = {
        name: '竞彩足球胜平负',
        type: 5
      }
    }else if(type == 'FT002'){
      _res = {
        name: '竞彩足球比分',
        type: 5
      }
    }else if(type == 'FT003'){
      _res = {
        name: '竞彩足球总进球',
        type: 5
      }
    }else if(type == 'FT004'){
      _res = {
        name: '竞彩足球半场胜平负',
        type: 5
      }
    }else if(type == 'FT005'){
      _res = {
        name: '竞彩足球混合串关玩法',
        type: 5
      }
    }else if(type == 'FT006'){
      _res = {
        name: '竞彩足球让分胜平负',
        type: 5
      }
    }

    return _res;

  },

  /**
   * stringToDate
   * @param dateString
   * @returns {Date}
   */
  stringToDate(dateString) {
    if (dateString) {
      var arr1 = dateString.split(" ");
      var sdate = arr1[0].split('-');
      var sdate2 = arr1[1].split(':');
      var date = new Date(sdate[0], sdate[1]-1, sdate[2], sdate2[0], sdate2[1], sdate2[2]);
      return date;
    }
  },

  get_unix_time(dateStr) {
    const newstr = dateStr.replace(/-/g, '/');
    const date = new Date(newstr);
    const time_str = date.getTime().toString();
    return time_str;
  },

  /**
   * 判断一个值是否为空
   * @param obj			任意类型
   * @returns {boolean}	是否为空
   */
  isNull(obj) {
    if (obj == undefined || obj == 'undefined' || obj == null || obj == 'null' || obj == "" || obj.length == 0) return true;else return false;
  },

  /**
   * 通过时间戳获取离现在的时间（几天前，几分钟前，几小时前）
   * @param dateTimeStamp				时间戳
   * @returns {string|*|string}		（几天前，几分钟前，几小时前）
   */
  getDateDiff(dateTimeStamp) {
    const minute = 1000 * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const halfamonth = day * 15;
    const month = day * 30;
    const now = new Date().getTime();
    const diffValue = now - dateTimeStamp;
    if (diffValue < 0) {
      //若日期不符则弹出窗口告之
      console.log("结束日期不能小于开始日期！");
    }
    const monthC = diffValue / month;
    const weekC = diffValue / (7 * day);
    const dayC = diffValue / day;
    const hourC = diffValue / hour;
    const minC = diffValue / minute;
    let result = "";
    if (monthC >= 1) {
      result = `${parseInt(monthC)}个月前`;
    } else if (weekC >= 1) {
      result = `${parseInt(weekC)}周前`;
    } else if (dayC >= 1) {
      result = `${parseInt(dayC)}天前`;
    } else if (hourC >= 1) {
      result = `${parseInt(hourC)}个小时前`;
    } else if (minC >= 1) {
      result = `${parseInt(minC)}分钟前`;
    } else result = "刚刚";
    return result;
  },

  /**
   * 获取浏览器信息
   * 取值方式versions.isType(*) == true/false
   */
  versions: (() => {
    const u = navigator.userAgent;
    const app = navigator.appVersion;
    return { //移动终端浏览器版本信息
      isTrident: u.includes('Trident'), //IE内核
      isPresto: u.includes('Presto'), //opera内核
      isWebKit: u.includes('AppleWebKit'), //苹果、谷歌内核
      isGecko: u.includes('Gecko') && !u.includes('KHTML'), //火狐内核
      isMobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
      isIos: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
      isAndroid: u.includes('Android') || u.includes('Linux'), //android终端或uc浏览器
      isIPhone: u.includes('iPhone'), //是否为iPhone或者QQHD浏览器
      isIPad: u.includes('iPad'), //是否iPad
      isWebApp: !u.includes('Safari'), //是否web应该程序，没有头部与底部
      isWeiXin: u.match(/MicroMessenger/i) == 'MicroMessenger' || u.match(/MicroMessenger/i) == 'micromessenger', //微信浏览器
      isWnl: u.includes('wnl'), //是否在万年历中
      isIosApp : u.includes('ticket_ios'), //ios客户端版本
      isAndroidApp : u.includes('ticket_android') //安卓客户端版本
    };
  })(),
  language: (navigator.browserLanguage || navigator.language).toLowerCase()
};


