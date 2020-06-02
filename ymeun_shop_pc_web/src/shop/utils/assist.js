/**
 * 替换掉旧对象(在旧对象为不可变时替换)
 * @param {被覆盖的旧对象} oldObj
 * @param {去覆盖的新对象} newObj
 */
export const coverageObject = function (oldObj, newObj) {
  if (!getDataType(oldObj)) {
    throw String('被覆盖的变量非对象或数组')
  }
  if (!getDataType(newObj)) {
    throw String('新覆盖结果变量非对象或数组')
  }
  if (getDataType(newObj) !== getDataType(oldObj)) {
    throw String('新旧变量必须都为对象或都为数组')
  }
  if (getDataType(oldObj) === 'Array') {
    oldObj.splice(0, oldObj.length) // 清空数组
    // 拷贝数组
    newObj.forEach(function (element) {
      oldObj.push(element)
    })
  } else {
    // 清空属性字段
    for (let key in oldObj) {
      delete oldObj[key]
    }
    // 拷贝对象
    for (let key in newObj) {
      if (getDataType(newObj[key]) === 'Object') {
        oldObj[key] = coverageObject({}, newObj[key])
      } else if (getDataType(newObj[key]) === 'Array') {
        oldObj[key] = coverageObject([], newObj[key])
      } else {
        oldObj[key] = newObj[key]
      }
    }
  }
  return oldObj
}

/**
 * 判断变量是不是对象
 * @param {待判断的变量} obj
 **/
const getDataType = function (obj) {
  if (obj instanceof Array) {
    return 'Array'
  } else if (obj instanceof Object) {
    return 'Object'
  } else {
    return false
  }
}

/**
* 清空空字符条件
* @param {*} conditions
*/
export const copySearchConditions = function (conditions) {
  let search = Object.assign({}, conditions)
  for (let key in search) {
    if (search[key] === undefined) {
      delete search[key]
    }
    if (String(search[key]).length === 0 || (typeof search[key] === 'number' && search[key] <= 0)) {
      delete search[key]
    }
  }
  return search
}

/**
   * 只保留数组内字段,返回新对象
   * @param {*} waitObj
   * @param {*} copyObj
   */
export const cleanRedundancyField = function (waitObj, fileds) {
  if (getDataType(waitObj) !== 'Object') {
    throw String('必须为变量')
  } if (getDataType(fileds) !== 'Array') {
    throw String('必须为字符串数组')
  }
  let newObj = {}
  for (let key in waitObj) {
    if (fileds.indexOf(key) >= 0) {
      newObj[key] = waitObj[key]
    }
  }
  return newObj
}

/**
  * 清理数组内字段,返回新对象
  * @param {*} waitObj
  * @param {*} copyObj
*/
export const cleanHasFields = function (waitObj, fileds) {
  if (getDataType(waitObj) !== 'Object') {
    throw String('必须为变量')
  } if (getDataType(fileds) !== 'Array') {
    throw String('必须为字符串数组')
  }
  let newObj = {}
  for (let key in waitObj) {
    if (fileds.indexOf(key) < 0) {
      newObj[key] = waitObj[key]
    }
  }
  return newObj
}

/**
   * 拷贝已有字段
   * @param {*} waitObj
   * @param {*} copyObj
   */
export const copyHasFields = function (waitObj, copyObj) {
  if (
    getDataType(waitObj) === 'Object' &&
    getDataType(waitObj) !== getDataType(copyObj)
  ) {
    throw String('新旧变量必须都为对象')
  }
  for (let key in waitObj) {
    if (typeof copyObj[key] !== 'undefined') {
      waitObj[key] = copyObj[key]
    }
  }
  return waitObj
}

/**
 * UUID生成器
 */
export const generateUUID = function () {
  let d = new Date().getTime()
  let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    let r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
  })
  return uuid
}

export default {
  coverageObject,
  copySearchConditions,
  copyHasFields,
  cleanRedundancyField,
  cleanHasFields
}
