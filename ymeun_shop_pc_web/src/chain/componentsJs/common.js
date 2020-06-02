// 引入基本模板
let echarts = require('echarts/lib/echarts')
// 引入柱状图组件
require('echarts/lib/chart/line')
require('echarts/lib/chart/pie')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/legend')
require('echarts/lib/component/title')

//图表自适应
export function echartResize() {
    const arr = getElementsClass('Echart')
    for (let i = 0; i < arr.length; i++) {
        const element = arr[i];
        echarts.init(element).resize();
    }

}
export function getElementsClass(classnames) {
    var classobj = new Array(); //定义数组 
    var classint = 0; //定义数组的下标 
    var tags = document.getElementsByTagName("*"); //获取HTML的所有标签 
    for (var i in tags) { //对标签进行遍历 
        if (tags[i].nodeType == 1) { //判断节点类型 
            if (tags[i].getAttribute("class") == classnames) //判断和需要CLASS名字相同的，并组成一个数组 
            {
                classobj[classint] = tags[i];
                classint++;
            }
        }
    }
    return classobj; //返回组成的数组 
}


export function getNextMonth(date) {
    var arr = date.split('-');
    var year = arr[0]; //获取当前日期的年份
    var month = arr[1]; //获取当前日期的月份
    var day = arr[2]; //获取当前日期的日
    var days = new Date(year, month, 0);
    days = days.getDate(); //获取当前日期中的月的天数
    var year2 = year;
    var month2 = parseInt(month) + 1;
    if (month2 == 13) {
        year2 = parseInt(year2) + 1;
        month2 = 1;
    }
    var day2 = day;
    var days2 = new Date(year2, month2, 0);
    days2 = days2.getDate();
    if (day2 > days2) {
        day2 = days2;
    }
    if (month2 < 10) {
        month2 = '0' + month2;
    }

    var t2 = year2 + '-' + month2 + '-' + day2;
    return t2;
}

export function getBeginningOfMonth() {
    var myDate = new Date();
    let date1 = myDate.getFullYear() + '-' + (myDate.getMonth() + 1) + '-' + myDate.getDate();
    var arr = date1.split('-');
    var year = arr[0]; //获取当前日期的年份
    var month = arr[1]; //获取当前日期的月份
    var day = '1'; //获取当前日期的日
    var t2 = year + '-' + month + '-' + day;
    let dateArr = [t2 , date1]
    return dateArr;
}

/**
 * 获取本月，今日，昨日，上周，本年
 * @param index
 * @returns {{startTime: dateString, endTime: dateString}}
 */
export function getComplexDate(index){
    let date = new Date();
    if(index == 4){
        //本月
        this.startTime = `${date.getFullYear()}-${date.getMonth() + 1}-1 0:0:0`
        this.endTime = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} 23:59:59`
    }else if(index == 3){
        //今日
        this.startTime = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} 0:0:0`
        this.endTime = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} 23:59:59`
    }else if(index == 2){
        //昨日
        let count = -1
        date = new Date(date.getTime() + (86400 * 1000) * count);
        this.startTime = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} 0:0:0`
        this.endTime = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} 23:59:59`
    }else if(index == 1){
        //上周
        let week = date.getDay()
        let count = 0

        if(week == 0){
            count = -5
        }else{
            count = week * -1 + 1
        }
        date = new Date(date.getTime() + (86400 * 1000) * (count - 7));
        let date2 = new Date(date.getTime() + (86400 * 1000) * 6);
        this.startTime = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} 0:0:0`
        this.endTime = `${date2.getFullYear()}-${date2.getMonth() + 1}-${date2.getDate()} 23:59:59`
    }else if(index == 0){
        //本年
        this.startTime = `${date.getFullYear()}-1-1 0:0:0`
        this.endTime = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} 23:59:59`
    }

    return { startTime, endTime}
}


export default {
    echartResize,
    getElementsClass,
    getNextMonth,
    getBeginningOfMonth,
    getComplexDate
}