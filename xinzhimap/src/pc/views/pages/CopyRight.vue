<template>
    <div class="container relative bg-gray">

        <div class="clear4"></div>
        <div class="w700px center bg-white text-center pa20">
            <div class="wb33 fl">
                <a href="https://www.google.com/maps/dir/?api=1&hl=zh-CN" target="_blank">谷歌地图</a>
            </div>
            <div class="wb33 fl">
                <a href="https://map.baidu.com/">百度地图</a>
            </div>
            <div class="wb33 fl">
                <a href="https://www.tianditu.gov.cn/">天地图</a>
            </div>
            <div class="clear4"></div>
            <div class="wb33 fl">
                <a href="https://www.amap.com/">高德地图</a>
            </div>
            <div class="wb33 fl">
                <a href="https://map.qq.com/">腾讯地图</a>
            </div>
            <div class="wb33 fl">
                <a href="https://developers.arcgis.com/">arcgis</a>
            </div>
            <div class="clear4"></div>
            <div class="wb33 fl">
                <a href="https://www.openstreetmap.org/">OpenStreetMap</a>
            </div>
            <div class="wb33 fl">
                <a href="https://www.mapbox.com/">mapbox</a>
            </div>
            <div class="clear0"></div>
        </div>

        <div class="clear4"></div>

        <div class="w740px center">
            <el-button class="wb100" type="primary" @click="$router.go(-1)">返回首页</el-button>
        </div>

    </div>
</template>


<script>

    export default {
        name: 'CopyRight',
        components: {

        },
        data() {
            return {

            }
        },
        methods: {

        },
        mounted(){

        },

    }

</script>
