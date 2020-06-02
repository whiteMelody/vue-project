
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
      return false;
    }
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

  // 时间格式转换
  getDateStr(key){
    if(key == "" || key == null){
      return
    }
    let date = new Date(key);
    let y = date.getFullYear();
    let MM = date.getMonth() + 1;
    MM = MM < 10 ? ('0' + MM) : MM;
    let d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    let h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    let m = date.getMinutes();
    m = m < 10 ? ('0' + m) : m;
    let s = date.getSeconds();
    s = s < 10 ? ('0' + s) : s;
    return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
  },
  
  //去头尾空格
  trimStr(str){
    return str.replace(/(^\s*)|(\s*$)/g,"");
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
      return date.getTime();
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
    };
  })(),
  language: (navigator.browserLanguage || navigator.language).toLowerCase()
};


