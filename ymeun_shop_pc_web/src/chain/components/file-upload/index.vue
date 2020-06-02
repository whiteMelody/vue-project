<template>
    <div>
        <el-upload ref="upL" :http-request="uploadSectionFile" :on-preview="handlePreview"
                   :on-remove="handleRemove"
                   :file-list="fileList" :before-upload="handleBefore" :action="action" multiple>
            <el-button type="primary" plain>{{ btnName }}</el-button>
            <div slot="tip"></div>
        </el-upload>
        <el-progress v-show="showProgress" :percentage="uploadPercent"></el-progress>
    </div>
</template>
<script>
    import { getCookie, Token } from '@/chain/utils/cookie'
    import { uploadFileMulti, uploadFileSingle } from "@/chain/api/attachment/attachment";

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
                default: '上传附件'
            }
        },
        data() {
            return {
                action: 'http://wisdomorg.oicp.net:8899/attachments/uploadMulti',
                headers: {
                    'Authorization': getCookie(Token),
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                uploadPercent: 0,
                showProgress: false,
            }
        },
        mounted() {
        },
        methods: {
            cleanFiles() {
                this.attachments.splice(0, this.attachments.length)
            },
            uploadSectionFile(param) {
                let fileObj = param.file;
                // 接收上传文件的后台地址
                let FileController = "http://47.244.157.225:80/platform/attachments/uploadSigle";
                // FormData 对象
                let form = new FormData();
                // 文件对象
                form.append("file", fileObj);
                var xhr = new XMLHttpRequest();
                xhr.open("post", FileController, true);
                //xhr.setRequestHeader('Authorization', getCookie(Token))
                // xhr.upload.addEventListener("progress", this.progressFunction, false); //监听上传进度
                xhr.onload = () => {
                    let res = JSON.parse(xhr.response)
                    this.attachments.push("http://47.244.157.225:80" + res.data)
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
                return fileList
            }
        },
        destroyed(){
            //console.log('销毁?')
        }
    }
</script>
