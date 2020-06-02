<template>
    <div class="wb100">

        <div class="wb100 f28rem"
             v-infinite-scroll="load"
             infinite-scroll-immediate-check="false"
             infinite-scroll-disabled="disabled"
             infinite-scroll-distance="20">
            <template v-for="item in list">
                <div class="pa20 relative bg-white lh50rem">
                    <div class="wb100 fc-gray3">
                        <p class="fc-gray4">
                            <span class="fl">{{item.type.label}}</span>
                            <template v-if="item.status.value == 0">
                                <span class="fr fc-red">未完成</span>
                            </template>
                            <template v-else-if="item.status.value == 1">
                                <span class="fr fc-green">已完成</span>
                            </template>
                            <template v-else-if="item.status.value == 2">
                                <span class="fr fc-blue">补全</span>
                            </template>
                        </p>
                        <div class="clear0"></div>
                        <p>员工：{{item.member.name}}</p>
                        <p>顾客：{{item.customer_name}}</p>
                        <p>手机号：{{item.customer_mobile}}</p>
                    </div>

                    <div class="clear4 bd-gray bd-b1"></div>
                    <div class="clear4"></div>
                    <div v-if="item.status.value == 0" class="fr pat10 pab10 pal20 par20 bd-green bd-a1 radius6 fc-green f26rem lh30rem text-center minW100" @click="$router.push({name: 'EditVisit', query:{id: item.id, customer_id: item.customer_id, type: item.type.value  }})">
                        完成回访
                    </div>

                    <div class="clear0"></div>
                </div>
                <div class="clear4 bg-white1"></div>
            </template>
        </div>

        <div class="clear0"></div>

        <div class="h80rem wb100 f28rem bg-white1" v-show="loading" v-loading="loading"></div>

        <div class="wb100 h60rem f28rem lh80rem fc-gray2 text-center" v-show="noMore">没有更多了</div>

    </div>
</template>
<script>

    import { getReviewList } from "@/assets/api/Task/Task"

    export default {
        props:['starttime', 'endtime', 'userid'],
        data() {
            return {
                minHeight: 0,
                list: [],
                loading: false,
                disabled: false,
                noMore: false,
                isSearch: false,
                timeout: 0,
                params: {
                    memberId: '',
                    startTime:'',
                    endTime:'',
                    start: 0,       // 页码
                    perpage: 9999,     // 数量
                },
            }
        },
        components: {

        },
        methods: {

            setData(params){
                if(params.starttime)    this.params.startTime = params.starttime + ' 00:00'
                if(params.endtime)    this.params.endTime = params.endtime + ' 23:59:59'
                if(params.userid){
                    this.params.memberId = params.userid
                }else{
                    if(params.userid == ''){
                        this.params.memberId = params.userid
                    }
                }
                this.clear()
                this.load()
            },

            load() {

                if (this.disabled || this.loading) return

                this.disabled = true
                this.loading = true
                this.params.start++

                getReviewList(this.params).then((res) => {

                    if (res.status == 0) {
                        let list = res.data.list

                        if (list.length < this.params.perpage) {
                            //已经到底了
                            this.list = this.list.concat(list)
                            this.disabled = true
                            this.noMore = true
                            this.loading = false
                        }else{
                            this.list = this.list.concat(list)
                            this.disabled = false
                            this.loading = false
                        }

                        console.log(this.list)

                    } else {
                        //没有数据
                        this.disabled = true
                        this.noMore = true
                        this.loading = false
                    }
                }).catch((e)=>{
                    console.log(e)
                })
            },



            clear(){
                this.params.start = 0
                this.list = []
                this.disabled = false
                this.noMore = false
                this.loading = false
            },

        },
        mounted() {
            this.minHeight = window.innerHeight
            this.params.endTime = this.endtime + ' 23:59:59'
            this.params.startTime = this.starttime + ' 00:00'
            this.params.memberId = this.userid
            this.load()
        },

        watch: {
            // endtime(curVal, oldVal) {
            //     this.clear()
            //     this.load()
            // },
            // startTime(curVal, oldVal) {
            //     this.clear()
            //     this.load()
            // },
            // userid(curVal, oldVal) {
            //     this.clear()
            //     this.load()
            // },
        }

    };
</script>
<style scoped>
    .is-selected {
        color: #1989FA;
    }
</style>



    
