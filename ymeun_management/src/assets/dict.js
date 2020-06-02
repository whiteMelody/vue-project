
export const computedMapDict = function () {
    return {
        _dictGender: () => [...gender],
        _dictPayType: () => [...paytype],
        _dictEducation: () => [...education],
        _dictStyle: () => [...style],
        _dictRole: () => [...role],
        _dictRoleTow: () => [...roleTow],
        _dictPriceType: () => [...priceType],
        _dictDaodianType: () => [...daodianType],
        _dictTaskType: () => [...taskType],
        _dictYuyueType: () => [...yuyueType],
        _dictReturnType: () => [...returnType],
        _dictTypesOfVisitsType: () => [...typesOfVisitsType],
        _dictMoneySortType: () => [...moneySortType],
        _dictMoneySortTypeTow: () => [...moneySortTypeTow],
        _dictTopUpType: () => [...topUpType],
        _dictLiveness: () => [...liveness],
    }
}

export const filtersMapDict = function () {
    return {
        _filterGender: (key) => gender.get(key),
        _filterTimeStampToFormat: (key) => {
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
        _NumFormat: (number, decimals, dec_point, thousands_sep) =>{
            decimals = 0;
            number = (number + '').replace(/[^0-9+-Ee.]/g, '');
            var n = !isFinite(+number) ? 0 : +number,
                prec = !isFinite(+decimals) ? 2 : Math.abs(decimals),
                sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
                dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
                s = '',
                toFixedFix = function(n, prec) {
                    var k = Math.pow(10, prec);
                    return '' + Math.ceil(n * k) / k;
                };

            s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
            var re = /(-?\d+)(\d{3})/;
            while(re.test(s[0])) {
                s[0] = s[0].replace(re, "$1" + sep + "$2");
            }

            if((s[1] || '').length < prec) {
                s[1] = s[1] || '';
                s[1] += new Array(prec - s[1].length + 1).join('0');
            }
            return s.join(dec);
        },
        _filterNumFormat: (number, decimals, dec_point, thousands_sep) =>{
            decimals = 2;
            number = (number + '').replace(/[^0-9+-Ee.]/g, '');
            var n = !isFinite(+number) ? 0 : +number,
                prec = !isFinite(+decimals) ? 2 : Math.abs(decimals),
                sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
                dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
                s = '',
                toFixedFix = function(n, prec) {
                    var k = Math.pow(10, prec);
                    return '' + Math.ceil(n * k) / k;
                };

            s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
            var re = /(-?\d+)(\d{3})/;
            while(re.test(s[0])) {
                s[0] = s[0].replace(re, "$1" + sep + "$2");
            }

            if((s[1] || '').length < prec) {
                s[1] = s[1] || '';
                s[1] += new Array(prec - s[1].length + 1).join('0');
            }
            return s.join(dec);
        },
        _moneyFormat: (number, decimals, dec_point, thousands_sep) =>{
            number = Number.parseFloat(number) / 100
            decimals = 2;
            number = (number + '').replace(/[^0-9+-Ee.]/g, '');
            var n = !isFinite(+number) ? 0 : +number,
                prec = !isFinite(+decimals) ? 2 : Math.abs(decimals),
                sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
                dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
                s = '',
                toFixedFix = function(n, prec) {
                    var k = Math.pow(10, prec);
                    return '' + Math.ceil(n * k) / k;
                };

            s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
            var re = /(-?\d+)(\d{3})/;
            while(re.test(s[0])) {
                s[0] = s[0].replace(re, "$1" + sep + "$2");
            }

            if((s[1] || '').length < prec) {
                s[1] = s[1] || '';
                s[1] += new Array(prec - s[1].length + 1).join('0');
            }
            return s.join(dec);
        },
        _endTimeFormat: (str) =>{
            if(str != undefined){
                let aTimer = str.split(':');
                return aTimer[0] + ":" + aTimer[1]
            }
        },
        _filterPayType: (key) => paytype.get(key),
        _filterEducation: (key) => education.get(key),
        _filterStyle: (key) => style.get(key),
        _filterRole: (key) => role.get(key),
        _filterPriceType: (key) => priceType.get(key),
        _filterDaodianType: (key) => daodianType.get(key),
        _filterTaskType: (key) => taskType.get(key),
        _filterReturnType: (key) => returnType.get(key),
        _filterTypesOfVisitsType: (key) => typesOfVisitsType.get(key),
    }
}

/**
 * 性别
 * @type {Map<any, any>}
 */
export const gender = new Map([
    ['0', '女'],
    ['1', '男'],
])

export const paytype = new Map([
    ['1', '支付宝支付'],
    ['2', '支付宝支付1'],
    ['2', '支付宝支付2'],
    ['3', '支付宝支付3'],
    ['4', '支付宝支付4'],
    ['5', '支付宝支付5'],
    ['6', '支付宝支付6'],
    ['7', '支付宝支付7'],
])

/**
 * 教育程度
 * @type {Map<any, any>}
 */
export const education = new Map([
    ['0', '小学'],
    ['1', '初中'],
    ['2', '高中'],
    ['3', '中专'],
    ['4', '大专'],
    ['5', '本科'],
    ['6', '硕士'],
    ['7', '博士'],
])

/**
 * 新历&旧历
 * @type {Map<any, any>}
 */
export const style = new Map([
    ['0', '新历'],
    ['1', '旧历'],
])

/**
 * role
 * @type {Map<any, any>}
 */
export const role = new Map([
    ['1', '开发人员'],
    ['2', '店长'],
    ['3', '顾问'],
    ['4', '美容师'],
    ['5', '前台'],
    ['6', '其他'],
])

/**
 * roleTow
 * @type {Map<any, any>}
 */
export const roleTow = new Map([
    ['2', '店长'],
    ['3', '顾问'],
    ['4', '美容师'],
    ['5', '前台'],
    ['6', '其他'],
])

/**
 * 原价&活动价
 * @type {Map<any, any>}
 */
export const priceType = new Map([
    ['0', '原价'],
    ['1', '活动价'],
])

/**
 * 到店状态
 * @type {Map<any, any>}
 */
export const daodianType = new Map([
    ['0', '已到店'],
    ['1', '未到店'],
])


/**
 * 任务完成状态
 * @type {Map<any, any>}
 */
export const taskType = new Map([
    ['0', '全部状态'],
    ['1', '已完成'],
    ['2', '未完成'],
])


/**
 * 任务完成状态
 * @type {Map<any, any>}
 */
export const returnType = new Map([
    ['0', '全部状态'],
    ['1', '已完成'],
    ['2', '未完成'],
    ['3', '补录'],
])


/**
 * 预约类型
 * @type {Map<any, any>}
 */
export const yuyueType = new Map([
    ['1', '咨询'],
    ['2', '治疗'],
])


/**
 * 回访类型
 * @type {Map<any, any>}
 */
export const typesOfVisitsType = new Map([
    ['0', '邀约回访'],
    ['1', '满意度回访'],
    ['2', '未成交回访'],
    ['3', '铺垫回访'],
    ['4', '术后回访'],
    ['5', '日常回访'],
    ['6', '划扣邀约回访'],
])

/**
 * 金额排序
 * @type {Map<any, any>}
 */
export const moneySortType = new Map([
    ['1', '从高到低'],
    ['2', '从低到高'],
])

/**
 * 金额排序2
 * @type {Map<any, any>}
 */
export const moneySortTypeTow = new Map([
    ['1', '倒序'],
    ['2', '正序'],
])

/**
 * 充值类型
 * @type {Map<any, any>}
 */
export const topUpType = new Map([
    ['0', '全部类型'],
    ['1', '充值'],
    ['2', '消费'],
    ['3', '退单'],
    ['4', '退款'],
])

/**
 * 活跃度
 * @type {Map<any, any>}
 */
export const liveness = new Map([
    ['0', '全部类型'],
    ['1', '流失顾客'],
    ['2', '预流失顾客'],
    ['3', '活跃用户'],
])