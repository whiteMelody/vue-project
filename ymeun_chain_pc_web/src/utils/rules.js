const tel = 11
const creditCode = 18
const sort = 32
const normal = 100
const max = 256

// 电话长度
export const telLength = {
    max: tel, message: `最多输入${tel}个字符`, trigger: 'change'
}

//社会统一信用代码
export const creditCodeLength = {
    max: creditCode, message: `请输入${creditCode}个字符`, trigger: 'change'
}
export const creditCodeMinLength = {
    min: creditCode, message: `请输入${creditCode}个字符`, trigger: 'change'
}

export const sortLength = {
    max: sort, message: `最多输入${sort}个字符`, trigger: 'change'
}

export const normalLength = {
    max: normal, message: `最多输入${normal}个字符`, trigger: 'change'
}

export const maxLength = {
    max: max, message: `最多输入${max}个字符`, trigger: 'change'
}

