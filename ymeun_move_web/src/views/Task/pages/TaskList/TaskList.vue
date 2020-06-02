<template>
    <div class="wb100">

        <div class="wb100 f28rem"
             v-infinite-scroll="load"
             infinite-scroll-immediate-check="false"
             infinite-scroll-disabled="disabled"
             infinite-scroll-distance="200">
            <template v-for="item in list">
                <div class="pa20 relative bg-white lh50rem">
                    <div class="wb100 fc-gray3">
                        <p class="fc-gray4">
                            <span class="fl maxW400 text-over-hidden1">{{item.title}}</span>
                            <span class="fr" :class="item.status.value == 0 ? 'fc-red' : 'fc-green' ">
                                {{item.status.value == 0 ? '未完成' : '完成'}}
                            </span>
                        </p>
                        <div class="clear0"></div>
                        <p>员工：{{item.userName}}</p>
                        <p>顾客：{{item.name}}</p>
                        <p>手机号：{{item.mobile}}</p>
                    </div>

                    <template v-if="item.status.value == 0">

                        <template v-if="item.type == 2">
                            <div class="clear4 bd-gray bd-b1"></div>
                            <div class="clear4"></div>
                            <div class="fr pat10 pab10 pal20 par20 bd-green bd-a1 radius6 fc-green f26rem lh30rem text-center minW100" @click="$router.push({name: 'ImprovingData', query:{id: item.id, customer_id: item.customer_id}})">
                                去填写
                            </div>
                        </template>

                        <template v-else-if="item.type == 3">
                            <div class="clear4 bd-gray bd-b1"></div>
                            <div class="clear4"></div>
                            <div class="fr pat10 pab10 pal20 par20 bd-green bd-a1 radius6 fc-green f26rem lh30rem text-center minW100" @click="toDetail(item.customer_id, item.appointment_id, item.member.users_id)">
                                去填写
                            </div>
                        </template>

                        <template v-else-if="item.type == 4">
                            <div class="clear4 bd-gray bd-b1"></div>
                            <div class="clear4"></div>
                            <div class="fr pat10 pab10 pal20 par20 bd-green bd-a1 radius6 fc-green f26rem lh30rem text-center minW100" @click="$router.push({name: 'AddVisits'})">
                                去填写
                            </div>
                        </template>

                        <template v-else-if="item.type == 8">
                            <div class="clear4 bd-gray bd-b1"></div>
                            <div class="clear4"></div>
                            <div class="fr pat10 pab10 pal20 par20 bd-green bd-a1 radius6 fc-green f26rem lh30rem text-center minW100" @click="$router.push({name: 'PrivateFileFilling',query:{ id: item.customer_id} })">
                                去填写
                            </div>
                        </template>

                        <template v-else-if="item.type == 1">
                            <div class="clear4 bd-gray bd-b1"></div>
                            <div class="clear4"></div>
                            <div class="fr pat10 pab10 pal20 par20 bd-green bd-a1 radius6 fc-green f26rem lh30rem text-center minW100" @click="done(item.appointment_id, item.id)">
                                确认完成
                            </div>
                        </template>

                    </template>

                    <div class="clear0"></div>
                </div>
                <div class="clear4 bg-white1"></div>
            </template>
        </div>

        <div class="clear4"></div>

        <div class="h80rem wb100 f28rem bg-white1" v-show="loading" v-loading="loading"></div>

        <div class="wb100 h60rem f28rem lh80rem fc-gray2 text-center" v-show="noMore">没有更多了</div>

    </div>
</template>
<script>

    import { getTaskList, expireAppointment } from "@/assets/api/Task/Task"

    import { Toast } from 'vant';

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
            load() {

                if (this.disabled || this.loading) return

                this.disabled = true
                this.loading = true
                this.params.start++

                getTaskList(this.params).then((res) => {

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

                            console.log('this.disabled:' + this.disabled)
                            console.log('this.loading:' + this.loading)
                        }

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

            clear(){
                this.params.start = 0
                this.list = []
                this.disabled = false
                this.noMore = false
                this.loading = false
            },

            toDetail(customer_id, appointment_id, adviser_id){
                window.location.href = `flow.html#/ConsultationDetails?customer_id=${customer_id}&id=${appointment_id}&adviser_id=${adviser_id}`
            },

            done(appointment_id, task_id){
                expireAppointment({appointment_id, task_id}).then((res)=>{
                    setTimeout(() => {
                        if( res.status == 0 ){
                            Toast({
                                message: '确认成功',
                                type: 'success',
                                duration:500,
                                onClose:()=>{
                                    this.clear()
                                    this.load()
                                }
                            });
                        }else Toast(res.msg);
                    },1000)
                }).catch((e)=>{
                    console.log(e)
                })
            },

        },
        mounted() {
            this.minHeight = window.innerHeight
            this.params.endTime = this.endtime + ' 23:59:59'
            this.params.startTime = this.starttime + ' 00:00'
            this.params.memberId = this.userid

            this.load()

        },

        // watch: {
        //     endtime(curVal, oldVal) {
        //         this.endtime = oldVal
        //         this.clear()
        //         this.load()
        //     },
        //     starttime(curVal, oldVal) {
        //         this.starttime = oldVal
        //         this.clear()
        //         this.load()
        //     },
        //     userid(curVal, oldVal) {
        //         this.starttime = oldVal
        //         this.clear()
        //         this.load()
        //     },
        // }

    };
</script>
<style scoped>
    .is-selected {
        color: #1989FA;
    }
</style>



    
