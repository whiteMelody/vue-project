<template>
    <div>
        <el-upload ref="upL" :http-request="uploadSectionFile" :on-preview="handlePreview"
                   :on-remove="handleRemove"
                   :file-list="fileList" :before-upload="handleBefore" :action="action" multiple>
            <el-button type="primary" >{{ btnName }}</el-button>
            <div slot="tip"></div>
        </el-upload>
        <el-progress v-show="showProgress" :percentage="uploadPercent"></el-progress>
    </div>
</template>
<script>

    import { enterpriseList, storeList, enterpriseSearch } from "@/assets/api/home/home"

    export default {
        model: {
            prop: 'attachments',
            event: 'upload'
        },
        props: {
            attachments: {
                type: Array,
                default: () => []
            },
            btnName: {
                default: '批量提交'
            },
            eid: {
                default: 0
            },
            sid: {
                default: 0
            },
        },
        data() {
            return {
                action: 'http://222.182.202.11:5722/post/channel/channelExcelImport',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('webToken'),
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                uploadPercent: 0,
                showProgress: false,
            }
        },
        mounted() {
        },
        methods: {
            setId(){

            },
            cleanFiles() {
                this.attachments.splice(0, this.attachments.length)
            },
            uploadSectionFile(param) {
                let fileObj = param.file;
                // 接收上传文件的后台地址
                let FileController = "http://222.182.202.11:5722/post/channel/channelExcelImport";
                // FormData 对象
                let form = new FormData();
                // 文件对象
                form.append("file", fileObj);
                form.append("e_id",this.eid);
                form.append("s_id",this.sid);
                var xhr = new XMLHttpRequest();
                xhr.open("post", FileController, true);
                xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('webToken'))
                // xhr.upload.addEventListener("progress", this.progressFunction, false); //监听上传进度
                xhr.onload = () => {
                    let res = JSON.parse(xhr.response)
                    this.attachments.push("http://222.182.202.11:5722/post/channel/channelExcelImport" + res.data)
                    this.$emit('upload', this.attachments)
                    this.uploadPercent = 100
                    this.showProgress = false
                };
                xhr.send(form);
            },
            progressFunction() {
                this.showProgress = true
            },
            handleBefore(file) {
                //console.log(file)
            },
            handleRemove(file, fileList) {
                this.attachments = this.attachments.filter(attachment => attachment.filePath !== file.url)
                this.$emit('upload', this.attachments)
            },
            handlePreview(file) {
               // console.log(file)
            },
        },
        watch: {},
        computed: {
            fileList() {
                let fileList = []
                if (this.attachments.length > 0) {
                    this.attachments.forEach((attachment) => {
                        fileList.push({
                            name: attachment.fileName,
                            url: attachment.filePath
                        })
                    })
                }

                // console.log(this.$parent)
                // console.log(this.$parent.$parent)

                this.$parent.$parent.loadData()
                return fileList
            }
        },
        destroyed(){
            //console.log('销毁?')
        }
    }
</script>
