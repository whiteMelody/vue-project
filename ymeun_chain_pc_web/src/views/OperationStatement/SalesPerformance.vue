<template>
    <div class="wb100">
       
       <div class="lh38px h40px pointer bd-gray bd-b1">
            <template v-if="tabIndex == 0">
                <span class="fl fc-gray4 f16px bd-gray4 bd-b1">顾问销售业绩</span>
                <span class="fl f16px mal20 mar20 fc-gray1"> | </span>
                <span class="fl fc-gray2 f16px pab2" @click="changeShowType(1)">美容师销售业绩</span>
            </template>
            <template v-else>
                <span class="fl fc-gray2 f16px pab2" @click="changeShowType(0)">顾问销售业绩</span>
                <span class="fl f16px mal20 mar20 fc-gray1"> | </span>
                <span class="fl fc-gray4 f16px bd-gray4 bd-b1">美容师销售业绩</span>
            </template>
        </div>
        <div class="clear3"></div>

        <template v-if="tabIndex == 0">
            <counselor-market></counselor-market>
        </template>
        <template v-if="tabIndex == 1">
            <matting-performance></matting-performance>
        </template>

    </div>
</template>

<script>

    import MattingPerformance from './MattingPerformance'
    import CounselorMarket from './CounselorMarket'
    export default {
        name: "SalesPerformance",
        components: {
            MattingPerformance,
            CounselorMarket
        },
        data() {
            return {
              tabIndex:0
            }
        },
        mounted() {

        },
        methods: {
           changeShowType(type){
                this.tabIndex = type
            },

        },
        watch: {
          

        }

    }

</script>

<style scoped lang="scss">

</style>
