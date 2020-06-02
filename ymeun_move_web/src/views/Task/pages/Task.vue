<template>
    <div class="wb100 bg-white1" :style=" showSearchStaff || showSearchDate ? 'height:'+ minHeight +'px;' : 'min-height:' + minHeight +'px' " :class="showSearchStaff || showSearchDate ? 'over-hidden' : 'over-auto'">

        <!--   header   -->
        <Header :title="'任务管理'" :title-left="true"></Header>

        <div class="wb100 fixed" style="z-index: 9999; left: 0;" :style=" isWeixin ? 'top:0' : 'top:.8rem;' ">

            <div class="f28rem fc-gray3 h80rem lh80rem text-center bd-gray bd-b1 bg-white">
                <template v-if="showSelect == 0">
                    <span class="fl bd-green bd-b2 wb50 fc-green">任务</span>
                    <span class="fl wb50" @click="showSelect = 1">回访</span>
                </template>
                <template v-else>
                    <span class="fl wb50" @click="showSelect = 0">任务</span>
                    <span class="fl wb50 bd-green bd-b2 fc-green">回访</span>
                </template>
            </div>

            <div class="clear0"></div>

            <div class="wb100 f28rem fc-gray4 text-center h80rem lh80rem bg-white relative" style="z-index: 9999">
                <template v-if="showSearchStaff">
                    <div class="wb30 fl fc-green text-over-hidden1" @click="showSearchStaff = false">
                        {{ userName ? userName : '全部员工' }}
                        <i class="iconfont iconxiala w13rem"></i>
                    </div>
                </template>
                <template v-else>
                    <div class="wb30 fl text-over-hidden1" @click="showSearchStaff = true; showSearchDate = false">
                        {{ userName ? userName : '全部员工' }}
                        <i class="iconfont iconshouqi w13rem"></i>
                    </div>
                </template>
                <div class="wb5 fl fc-gray">|</div>
                <template v-if="showSearchDate">
                    <div class="wb65 fl fc-green" @click="showSearchDate = false">
                        {{dateHorizon ? dateHorizon : '全部时间'}}
                        <i class="iconfont iconxiala w13rem"></i>
                    </div>
                </template>
                <template v-else>
                    <div class="wb65 fl" @click="showSearchDate = true; showSearchStaff = false">
                        {{dateHorizon ? dateHorizon : '全部时间'}}
                        <i class="iconfont iconshouqi w13rem"></i>
                    </div>
                </template>
            </div>
        </div>

        <div class="clear" style="height: 1.8rem;"></div>

        <div v-if="showSelect == 0">
            <task-list :starttime="starttime" :endtime="endtime" :userid="users_id" ref="taskList"></task-list>
        </div>
        <div v-else>
            <visit-list :starttime="starttime" :endtime="endtime" :userid="users_id" ref="visitList"></visit-list>
        </div>

        <div class="clear0"></div>

<!--    选择顾客弹窗    -->
        <div class="bg-dialog" v-show="showSearchStaff">
            <div class="wb100 fixed bg-white bd-gray bd-t1" style="height: 100%; z-index: 9999;" :style=" isWeixin ? 'top:1.6rem' : 'top:2.4rem;' ">
                <div class="pal20 par20 over-auto" :style="'height:'+ minHeight +'px' ">
                    <div class="wb100" :style="'height:' + (staffList.length + 2) + 'rem'">
                        <div class="wb100 h100rem lh100rem f30rem bd-gray bd-b1" @click="users_id = ''; userName = ''; showSearchStaff = false;">
                            <span class="fl">全部</span>
                            <i class="iconfont iconduihao fc-green f28rem fr" v-if="users_id == ''"></i>
                        </div>
                        <template v-for="(item,index) in staffList">
                            <div class="wb100 h100rem lh100rem f30rem bd-gray bd-b1" @click="users_id = item.users_id; userName = item.name; showSearchStaff = false ">
                                <span class="fl">{{item.name}}</span>
                                <i class="iconfont iconduihao fc-green f28rem fr" v-if="users_id == item.users_id"></i>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </div>

<!--    选择时间弹窗    -->
        <div class="bg-dialog" v-show="showSearchDate">
            <div class="bg-date-dialog bg-white bd-gray bd-t1" style="z-index: 9999;" :style=" isWeixin ? 'top:1.6rem' : 'top:2.4rem;' ">
                <div class="pal20 par20 pat10 pab10 f26rem bg-white1 fc-gray3 h50rem lh50rem">
                    <template v-if="dateSelectd == 0">
                        <span class="fl bd-gray1 bd-b2">{{dateFormat(value)}}</span>
                        <span class="fl mal30 mar30">至</span>
                        <span class="fl" @click="dateSelectd = 1">{{dateFormat(value2)}}</span>
                    </template>
                    <template v-else>
                        <span class="fl" @click="dateSelectd = 0">{{dateFormat(value)}}</span>
                        <span class="fl mal30 mar30">至</span>
                        <span class="fl bd-gray1 bd-b2">{{dateFormat(value2)}}</span>
                    </template>
                    <span class="fr fc-green f26rem" @click="changePicker">确定</span>
                </div>
                <div class="clear0"></div>
                <div class="wb100 f22rem" v-show="dateSelectd == 0">
                    <el-calendar v-model="value">
                        <template
                                slot="dateCell"
                                slot-scope="{date, data}">
                            <p :class="date.getTime() >= value & date.getTime() <= value2 ? 'fc-blue' : ''">
                                {{ data.day.split('-')[2] }}
                            </p>
                        </template>
                    </el-calendar>
                </div>
                <div class="wb100 f22rem" v-show="dateSelectd == 1">
                    <el-calendar v-model="value2">
                        <template
                                slot="dateCell"
                                slot-scope="{date, data}">
                            <p :class="date.getTime() >= value & date.getTime() <= value2 ? 'fc-blue' : ''">
                                {{ data.day.split('-')[2] }}
                            </p>
                        </template>
                    </el-calendar>
                </div>
            </div>
        </div>

        <!--   footer   -->
        <Footer :active="3"></Footer>
    </div>
</template>
<script>

    import Header from '../../../components/Header'
    import Footer from '../../../components/Footer'

    import TaskList from './TaskList/TaskList'
    import VisitList from './VisitList/VisitList'

    import { getUserInfo } from "@/assets/api/Data/Login";
    import { getStoreMembers } from "@/assets/api/Flow/MakeAnAppointment"

    import { Toast } from 'vant';

    export default {
        data(){
            return {
                minHeight:0,
                isWeixin: false,

                staffList: [],
                showSearchStaff: false,
                showSearchDate: false,
                showSelect: 0,
                userName: '',

                users_id: '',
                now: new Date().getTime(),
                value: new Date().getTime(),
                value2: new Date().getTime(),
                showDatePicker: false,
                dateSelectd: 0,
                dateHorizon: '',
                starttime: this.dateFormat(new Date().getTime()),
                endtime: this.dateFormat(new Date().getTime()),

            }
        },
        components:{
            Footer, Header, TaskList, VisitList
        },
        methods:{


            changePicker(){
                //判断截止时间大于开始时间
                if(this.value > this.value2){
                    Toast('截止日期不能大于开始日期');
                    return
                }
                this.dateHorizon = this.dateFormat(this.value) + ' 至 ' + this.dateFormat(this.value2)
                this.starttime = this.dateFormat(this.value)
                this.endtime = this.dateFormat(this.value2)

                if(this.$refs.taskList){
                    this.$refs.taskList.setData({starttime: this.starttime, endtime: this.endtime})
                }else if(this.$refs.visitList){
                    this.$refs.visitList.setData({starttime: this.starttime, endtime: this.endtime})
                }

                this.showSearchDate = false
            },
            dateFormat(key){
                if(key == "" || key == null){
                    return
                }
                let date = new Date(key);
                let y = date.getFullYear();
                let MM = date.getMonth() + 1;
                MM = MM < 10 ? ('0' + MM) : MM;
                let d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                let h = date.getHours();
                h = h < 10 ? ('0' + h) : h;
                let m = date.getMinutes();
                m = m < 10 ? ('0' + m) : m;
                let s = date.getSeconds();
                s = s < 10 ? ('0' + s) : s;
                return y + '-' + MM + '-' + d ;
            },

        },
        mounted(){
            this.minHeight = window.innerHeight

            //查询权限
            getUserInfo().then((res)=>{
                if(res.status == 0){
                    if(res.data.role_id == 2 || res.data.role_id == 5){
                        //获取员工
                        getStoreMembers().then((res)=>{
                            if(res.status == 0){
                                this.staffList = res.data
                            }
                        }).catch((e)=>{
                            console.log(e)
                        })
                    }else{
                        this.userName = res.data.name
                    }
                }
            }).catch((e)=>{
                console.log(e)
            })

            this.dateHorizon = this.dateFormat(this.value) + ' 至 ' + this.dateFormat(this.value2)

            //判断是否微信内核
            let ua = navigator.userAgent.toLowerCase();
            if(ua.match(/MicroMessenger/i)=="micromessenger"){
               this.isWeixin = true
            }else{
                this.isWeixin = false
            }

        },

        watch: {
            users_id(curVal, oldVal) {
                if(this.$refs.taskList){
                    this.$refs.taskList.setData({userid: curVal})
                }else if(this.$refs.visitList){
                    this.$refs.visitList.setData({userid: curVal})
                }
            },
        }
    }
</script>
<style scoped>
    .is-selected {
        color: #1989FA;
    }
</style>



    
