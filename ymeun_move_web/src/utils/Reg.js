/*
* 正则表达式和验证公用的方法
* REG 为正则表达式定义
* PUBLIC 为公共使用的验证方法
* PRIVATE 为私有的验证方法
* */
// 小数及整数等所有数字正则 四位小数
export const REG_ALL_NUMBER = /^0{1}([.]\d{1,4})?$|^[1-9]\d*([.]{1}[0-9]{1,4})?$/
// 正整数
export const REG_NUMBER = /^[0-9]*[1-9][0-9]*$/
// 大写字母正则,一般用于代码验证
export const REG_UPPER_WORD = /[A-Z]+$/
// 手机号正则,只验证手机号码为11位，且以1开头
export const REG_PHONE = /^1[0-9]{10}$/
// 手机号可以为空
export const REG_PHONE_NULL = /^$|^1[0-9]{10}$/
// 身份证
export const REG_ID_NUMBER = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
// 邮箱
export const REG_EMAIL = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
// 中文
export const REG_CHINESE = /^[\u4e00-\u9fa5]+$/
// 中文,英文,数字
export const REG_TEXT = /^[A-Za-z0-9\u4e00-\u9fa5]+$/
// 银行卡
export const REG_BANK_CARD = /^([1-9]{1})(\d{14}|\d{18})$/
// 0-100的整数(保证金比例)
export const REG_ZERO_HUNDRED = /^(0|[1-9][0-9]?|100)$/

// 公共验证方法
// 根据需求,限制'非法字符'
export const REG_LIMIT = /[@#\$%\^&\*]+/
const LIMIT = ['!', '@', '#', '$', '%', '^', '&']
export const PUBLIC_LIMIT = (r, v, c) => {
    if (!v) {
        return c(new Error('此文本框不能为空'))
    } else {
        if (!REG_LIMIT.test(v)) {
            c()
        } else {
            return c(new Error('只能输入中文,字母及数字'))
        }
    }

}


// 小数整数相关验证
export const PUBLIC_NUMBER = (r, v, c) => {
    if (REG_ALL_NUMBER.test(v)) {
        c()
    } else {
        return c(new Error('请输入正确的数字'))
    }
}

// 数字可以为空,及验证时为非必填
export const PUBLIC_NUMBER_NULL = (r, v, c) => {
    if (v === undefined || v === '' || REG_ALL_NUMBER.test(v)) {
        c()
    } else {
        return c(new Error('请输入正确的数字'))
    }
}

//0-100的整数
export const PUBLIC_DEPOSIT_RATIO = (r, v, c) => {
    if (v === undefined || v === '' || REG_ZERO_HUNDRED.test(v)) {
        c()
    } else {
        return c(new Error('请输入0-100的数值'))
    }
}

// 电话验证 正整数即可
export const PUBLIC_TEL = (r, v, c) => {
    if (REG_NUMBER.test(v)) {
        c()
    } else {
        return c(new Error('请输入正确的电话号码'))
    }
}

// 手机号验证
export const PUBLIC_PHONE = (r, v, c) => {
    if (REG_PHONE.test(v)) {
        c()
    } else {
        return c(new Error('请输入正确的手机号'))
    }
}

// 手机号验证 可以为空
export const PUBLIC_PHONE_NULL = (r, v, c) => {
    if (v === undefined || REG_PHONE_NULL.test(v)) {
        c()
    } else {
        return c(new Error('请输入正确的手机号'))
    }
}

// 身份证验证
export const PUBLIC_ID_NUMBER = (r, v, c) => {
    if (REG_ID_NUMBER.test(v)) {
        c()
    } else {
        return c(new Error('请输入正确的身份证号码'))
    }
}

// 邮箱验证
export const PUBLIC_EMAIL = (r, v, c) => {
    if (v === undefined || v === '' || REG_EMAIL.test(v)) {
        c()
    } else {
        return c(new Error('请输入正确的邮箱'))
    }
}

// 中文
export const PUBLIC_CHINESE = (r, v, c) => {
    if (REG_CHINESE.test(v)) {
        c()
    } else {
        return c(new Error('请输入正确的中文'))
    }
}

// 非中文
export const PUBLIC_NOT_CHINESE = (r, v, c) => {
    if (!REG_CHINESE.test(v)) {
        c()
    } else {
        return c(new Error('不能输入中文'))
    }
}

// 私有验证方法
// 验证代码相关
export const PRIVATE_CODE = (r, v, c) => {
    if (!v) {
        return c(new Error('请输入代码'))
    } else {
        if (REG_UPPER_WORD.test(v)) {
            c()
        } else {
            return c(new Error('代码均为大写字母'))
        }
    }
}

// 验证客户单位
export const PRIVATE_CUSTOMER_UNIT = (r, v, c) => {
    if (v === undefined) {
        return c(new Error('请选择客户单位'))
    } else {
        c()
    }
}
































































