<template>
    <span>
        <span>文件名:xxx</span>
        <a @click="handleDownload">下载</a>
        <a>预览</a>
    </span>
</template>

<script>
    import { downloadFile } from "@/shop/api/attachment/attachment";

    export default {
        name: "download",
        props: {
            id: {
                type: Number,
                default: 63
            },
        },
        data() {
            return {}
        },
        methods: {
            handleDownload(filename='xxx.xlsx') {
                downloadFile(this.id).then(res => {
                    console.log('res',res)
                    //这里res.data是返回的blob对象
                    var blob = new Blob([res], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'}); //application/vnd.openxmlformats-officedocument.spreadsheetml.sheet这里表示xlsx类型
                    var downloadElement = document.createElement('a');
                    var href = window.URL.createObjectURL(blob); //创建下载的链接
                    downloadElement.href = href;
                    console.log(filename)
                    let xx='xxx.xlsx'
                    downloadElement.download = xx; //下载后文件名
                    document.body.appendChild(downloadElement);
                    downloadElement.click(); //点击下载
                    document.body.removeChild(downloadElement); //下载完成移除元素
                    window.URL.revokeObjectURL(href); //释放掉blob对象
                })
            }
        }
    }
</script>

<style scoped>

</style>
