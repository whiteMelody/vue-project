export const deepCopy = (data) => {
    if (data.constructor.name === 'Array') { 
       // 判断为数组类型
        var arrCopy = []
        for (var i = 0, len = data.length; i < len; i++) {
       //遍历数组
            if (data[i] instanceof Object) {
               // arrary object null以下有关于instanceof的注解
                arrCopy.push(deepCopy(data[i]))
            } else { 
           // 基本类型
                arrCopy.push(data[i])
            }
        }
        return arrCopy;
   
    } else { // 为对象
        var objCopy = {};
        for (x in data) {
            if(data[x] instanceof Object){
                objCopy[x] = deepCopy(data[x])
            }else{ // 基本类型
                objCopy[x] = data[x];
            }
       }
        return objCopy;
   }
}