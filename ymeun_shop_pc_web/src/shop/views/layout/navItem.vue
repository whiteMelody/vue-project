<template>
    <el-aside width="160px" class="asideNav relative">

        <div class="wb100">

            <div class="wb100 relative">
                <img src="@/shop/assets/img/layout-top.png">
                <img src="@/shop/assets/img/logo2.png" class="absolute" style="top:62.5px; left: 0; right: 0; margin: 0 auto;">
            </div>

            <div class="clear0"></div>

            <el-menu style="width: 160px; z-index: 9; height: auto; background: transparent" default-active="1" class="el-menu-vertical-demo relative"
                     :unique-opened="true"
                     @open="handleOpen" @close="handleClose"
                     text-color="#fff" active-text-color="#fff">

                <template v-for="item in menu">
                    <template v-if="item.name == '首页'">
                        <el-menu-item index="home" @click="handleRouterPush('Home')">
                            <i class="iconfont iconshouye fc-white f16px"></i>
                            <span slot="title">{{item.name}}</span>
                        </el-menu-item>
                    </template>
                    <template v-else-if="item.name == '流程管理'">
                        <el-submenu index="flow">
                            <template slot="title">
                                <i class="iconfont iconliuchengguanli fc-white f16px"></i>
                                <span>{{item.name}}</span>
                            </template>

                            <template v-if="item.secondLevel">
                                <el-menu-item-group>
                                    <el-menu-item index="AddClient" @click="handleRouterPush('AddClient')" v-if="item.secondLevel.newCustomers">
                                        <span>{{item.secondLevel.newCustomers.name}}</span>
                                    </el-menu-item>
                                    <el-menu-item index="AddMakeAnAppointment" @click="handleRouterPush('AddMakeAnAppointment')" v-if="item.secondLevel.newAppointment">
                                        <span>{{item.secondLevel.newAppointment.name}}</span>
                                    </el-menu-item>
                                    <el-menu-item index="Triage" @click="handleRouterPush('Triage')" v-if="item.secondLevel.triageList">
                                        <span>{{item.secondLevel.triageList.name}}</span>
                                    </el-menu-item>
                                    <el-menu-item index="AdvisoryCard" @click="handleRouterPush('AdvisoryCard')" v-if="item.secondLevel.todayAppointment">
                                        <span>{{item.secondLevel.todayAppointment.name}}</span>
                                    </el-menu-item>
                                    <el-menu-item index="ToCollectMoneyCard" @click="handleRouterPush('ToCollectMoneyCard')" v-if="item.secondLevel.todayCashier">
                                        <span>{{item.secondLevel.todayCashier.name}}</span>
                                    </el-menu-item>
                                    <el-menu-item index="Deduction" @click="handleRouterPush('Deduction')" v-if="item.secondLevel.todayConsumption">
                                        <span>{{item.secondLevel.todayConsumption.name}}</span>
                                    </el-menu-item>
                                </el-menu-item-group>
                            </template>

                        </el-submenu>
                    </template>
                    <template v-else-if="item.name == '任务管理'">
                        <el-submenu index="task">
                        <template slot="title">
                            <i class="iconfont iconrenwuguanli fc-white f16px mar5 mal5"></i>
                            <span>{{item.name}}</span>
                        </template>
                        <template v-if="item.secondLevel">
                            <el-menu-item-group>
                                <el-menu-item index="MissionCenter" @click="handleRouterPush('MissionCenter')" v-if="item.secondLevel.TaskCore">
                                    <span>{{item.secondLevel.TaskCore.name}}</span>
                                </el-menu-item>
                                <el-menu-item index="TaskList" @click="handleRouterPush('TaskList')" v-if="item.secondLevel.Task">
                                    <span>{{item.secondLevel.Task.name}}</span>
                                </el-menu-item>
                                <el-menu-item index="ReturnVisitList" @click="handleRouterPush('ReturnVisitList')" v-if="item.secondLevel.Review">
                                    <span>{{item.secondLevel.Review.name}}</span>
                                </el-menu-item>
                            </el-menu-item-group>
                        </template>
                    </el-submenu>
                    </template>

                    <template v-else-if="item.name == '信息化管理'">
                        <el-submenu index="infoManager">
                        <template slot="title">
                            <i class="iconfont iconxinxihuaguanli fc-white f16px mar4 mal4"></i>
                            <span>{{item.name}}</span>
                        </template>
                        <template v-if="item.secondLevel">
                            <el-menu-item-group>
                                <el-menu-item index="MakeAnAppointmentList" @click="handleRouterPush('MakeAnAppointmentList')" v-if="item.secondLevel.appointmentList">
                                    <span>{{item.secondLevel.appointmentList.name}}</span>
                                </el-menu-item>
                                <el-menu-item index="AdvisoryList" @click="handleRouterPush('AdvisoryList')" v-if="item.secondLevel.consultationList">
                                    <span>{{item.secondLevel.consultationList.name}}</span>
                                </el-menu-item>
                                <el-menu-item index="DeductionList" @click="handleRouterPush('DeductionList')" v-if="item.secondLevel.historyConsumption">
                                    <span>{{item.secondLevel.historyConsumption.name}}</span>
                                </el-menu-item>
                                <el-menu-item index="ToCollectMoneyList" @click="handleRouterPush('ToCollectMoneyList')" v-if="item.secondLevel.historyCashier">
                                    <span>{{item.secondLevel.historyCashier.name}}</span>
                                </el-menu-item>
                                <el-menu-item index="ChargebackList" @click="handleRouterPush('ChargebackList')" v-if="item.secondLevel.chargeBack">
                                    <span>{{item.secondLevel.chargeBack.name}}</span>
                                </el-menu-item>
                                <el-menu-item index="ToCollectMoneyDetailList" @click="handleRouterPush('ToCollectMoneyDetailList')" v-if="item.secondLevel.receiptItems">
                                    <span>{{item.secondLevel.receiptItems.name}}</span>
                                </el-menu-item>
                                <el-menu-item index="TopUpList" @click="handleRouterPush('TopUpList')" v-if="item.secondLevel.prepaid">
                                    <span>{{item.secondLevel.prepaid.name}}</span>
                                </el-menu-item>
                                <el-menu-item index="DebtList" @click="handleRouterPush('DebtList')" v-if="item.secondLevel.arrears">
                                    <span>{{item.secondLevel.arrears.name}}</span>
                                </el-menu-item>
                            </el-menu-item-group>
                        </template>
                    </el-submenu>
                    </template>

                    <template v-else-if="item.name == '客户管理'">
                        <el-submenu index="client">
                        <template slot="title">
                            <i class="iconfont icongukeguanli fc-white f15px mar5 mal5"></i>
                            <span>{{item.name}}</span>
                        </template>

                        <template v-if="item.secondLevel">
                            <el-menu-item-group>
                                <el-menu-item index="ClientList" @click="handleRouterPush('ClientList')" v-if="item.secondLevel.customerList">
                                    <span>{{item.secondLevel.customerList.name}}</span>
                                </el-menu-item>
                                <el-menu-item index="CustomerAnalysis" @click="handleRouterPush('CustomerAnalysis')" v-if="item.secondLevel.customerAnalysis">
                                    <span>{{item.secondLevel.customerAnalysis.name}}</span>
                                </el-menu-item>
                                <el-menu-item index="RecordList" @click="handleRouterPush('RecordList')" v-if="item.secondLevel.customerLabel">
                                    <span>{{item.secondLevel.customerLabel.name}}</span>
                                </el-menu-item>
                                <el-menu-item index="RecordAnalyze" @click="handleRouterPush('RecordAnalyze')" v-if="item.secondLevel.customerLabelAnalysis">
                                    <span>{{item.secondLevel.customerLabelAnalysis.name}}</span>
                                </el-menu-item>
                            </el-menu-item-group>
                        </template>
                    </el-submenu>
                    </template>

                    <template v-else-if="item.name == '经营管理'">
                        <el-submenu index="manager">
                            <template slot="title">
                                <i class="iconfont iconjingyingguanli fc-white f16px mar6 mal6"></i>
                                <span>{{item.name}}</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item index="Sale" @click="handleRouterPush('OperationStatement')" v-if="item.secondLevel.Sale">
                                    <span>{{item.secondLevel.Sale.name}}</span>
                                </el-menu-item>
                                <el-menu-item index="TeamManagement" @click="handleRouterPush('TeamManagement')" v-if="item.secondLevel.teamManagement">
                                    <span>{{item.secondLevel.teamManagement.name}}</span>
                                </el-menu-item>
                                <el-menu-item index="ProjectManagement" @click="handleRouterPush('ProjectManagement')" v-if="item.secondLevel.itemsManagement">
                                    <span>{{item.secondLevel.itemsManagement.name}}</span>
                                </el-menu-item>
                                <el-menu-item index="ChannelManagement" @click="handleRouterPush('ChannelManagement')" v-if="item.secondLevel.channelManagement">
                                    <span>{{item.secondLevel.channelManagement.name}}</span>
                                </el-menu-item>
                                <el-menu-item index="CureRoom" @click="handleRouterPush('CureRoom')" v-if="item.secondLevel.roomSet">
                                    <span>{{item.secondLevel.roomSet.name}}</span>
                                </el-menu-item>
                                <el-menu-item index="Activity" @click="handleRouterPush('ActivityList')" v-if="item.secondLevel.promotion">
                                    <span>{{item.secondLevel.promotion.name}}</span>
                                </el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                    </template>

                </template>

            </el-menu>

            <div class="clear10"></div>

            <div class="text-center fc-white f14px lh30px">
                <p>微信扫码手机版</p>
                <div class="clear1"></div>
                <p>{{$store.getters.currentUser.store.name}}</p>
            </div>

            <div class="clear4"></div>

            <div class="wb100 text-center">
                <img src="@/shop/assets/img/wx_code.jpg">
            </div>

            <div class="clear10"></div>

            <div class="wb100 text-center absolute" style="bottom: 0">
                <img src="@/shop/assets/img/layout-bottom.png">
            </div>

        </div>

    </el-aside>
</template>

<script>

    import { menus } from "@/shop/assets/api/manage/jurisdiction"

    export default {
        name: "navItem",
        data() {
            return {
                menu: {},
                minHeight: 0
            };
        },
        methods: {
            handleOpen(key, keyPath) {
                // console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                // console.log(key, keyPath);
            },
            handleRouterPush(val) {
                // console.log(val)
                this.$router.push(`/${val}`)
            }
        },
        mounted() {
            menus().then(res=>{
                if(res.status == 0){
                    let _tmp = res.data

                    for(let i=0; i<_tmp.length; i++){
                        if(_tmp[i].secondLevel){

                            if(_tmp[i].name == '首页'){

                            }else if(_tmp[i].name == '流程管理'){
                                _tmp[i].child = [
                                    _tmp[i].secondLevel.newAppointment,
                                    _tmp[i].secondLevel.newCustomers,
                                    _tmp[i].secondLevel.todayAppointment,
                                    _tmp[i].secondLevel.todayCashier,
                                    _tmp[i].secondLevel.todayConsumption,
                                    _tmp[i].secondLevel.triageList,
                                ]
                            }else if(_tmp[i].name == '任务管理'){
                                _tmp[i].child = [
                                    _tmp[i].secondLevel.Review,
                                    _tmp[i].secondLevel.Task,
                                    _tmp[i].secondLevel.TaskCore,
                                ]
                            }else if(_tmp[i].name == '信息化管理'){
                                _tmp[i].child = [
                                    _tmp[i].secondLevel.appointmentList,
                                    _tmp[i].secondLevel.arrears,
                                    _tmp[i].secondLevel.chargeBack,
                                    _tmp[i].secondLevel.consultationList,
                                    _tmp[i].secondLevel.historyCashier,
                                    _tmp[i].secondLevel.historyConsumption,
                                    _tmp[i].secondLevel.prepaid,
                                    _tmp[i].secondLevel.receiptItems,
                                ]
                            }else if(_tmp[i].name == '客户管理'){
                                _tmp[i].child = [
                                    _tmp[i].secondLevel.customerAnalysis,
                                    _tmp[i].secondLevel.customerLabel,
                                    _tmp[i].secondLevel.customerList,
                                ]
                            }else if(_tmp[i].name == '经营管理'){
                                _tmp[i].child = [
                                    _tmp[i].secondLevel.Sale,
                                    _tmp[i].secondLevel.channelManagement,
                                    _tmp[i].secondLevel.itemsManagement,
                                    _tmp[i].secondLevel.roomSet,
                                    _tmp[i].secondLevel.teamManagement,
                                ]
                            }
                        }
                    }

                    // console.log(res.data)

                    this.menu = _tmp

                }
            })

            this.minHeight = window.innerHeight;
        },
    }
</script>

<style scoped>
    .asideNav {
        width: 160px;
        height: 100%;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        overflow-x: hidden ;
        overflow-y: auto;
        background:linear-gradient(180deg,rgba(1,4,43,1),rgba(7,8,22,1));
    }
    .asideNav::-webkit-scrollbar {
        display: none;
      }

</style>
