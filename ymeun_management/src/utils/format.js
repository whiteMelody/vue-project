
export const formatArrayToMap = function (arr, key, value) {
  let newArr = []

  for(let i=0; i<arr.length; i++){
    newArr.push({key: arr[i][key], value: arr[i][value]})
  }

  return newArr
}

export const formatArrayToStringMap = function (arr, key, value) {
  let newArr = []

  for(let i=0; i<arr.length; i++){
    newArr.push([arr[i][key], arr[i][value]])
  }

  return newArr
}

export default {
  formatArrayToMap,
  formatArrayToStringMap
}
