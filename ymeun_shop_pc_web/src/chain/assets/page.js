export default function () {
    let pageArr = [5, 10, 15, 20, 100]// 分页数组
    return {
        page: 1,			//当前页
        size: pageArr[2],	//每页显示条数
        pageArr,
    }
}
