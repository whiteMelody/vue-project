<template>
    <div class="wb100">

        <p class="lh40px h40px">
            <span class="fl f14px fc-gray4">销售业绩</span>
            <span class="fl mal20 f14px fc-gray3">数据每十分钟更新一次</span>
        </p>

        <div class="clear-f2"></div>
        <div class="clear3"></div>
        

        <div class="wb100">

            <div class="wb100">

                <el-form :inline="true" :model="condition" class="search-form" slot="search" label-width="80px">
                    <el-form-item label="">
                        <!-- <date-slot :dateTime.sync="dateTime"></date-slot> -->
                        <div class="hs_timer">
                            <div class="text">收银时间</div>
                            <em></em>
                            <div class="input">
                            <el-date-picker
                                class="w340px"
                                v-model="dateTime"
                                :clearable="false"
                                type="daterange"
                                range-separator="至"
                                value-format="yyyy-MM-dd"
                                format="yyyy-MM-dd"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                            </el-date-picker>
                            </div>
                        </div>
                    </el-form-item>

                    <el-form-item label>
                        <el-select v-model="condition.storeId" placeholder="选择门店" readonly clearable @change="changeStore">
                            <el-option :key="''" label="全部门店" :value="''"></el-option>
                            <el-option v-for="item in storeList" :key="item.id" :label="item.name"
                                       :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
<!--                    <el-form-item  label="">-->
<!--                        <el-select v-model="condition.channelPid" placeholder="选择渠道" readonly clearable @change="changeChannel" :disabled="!condition.storeId">-->
<!--                            <el-option :key="''" label="全部渠道" :value="''"></el-option>-->
<!--                            <el-option v-for="item in channelList" :key="item.id" :label="item.name"-->
<!--                                       :value="item.id"></el-option>-->
<!--                        </el-select>-->
<!--                        <el-select v-model="condition.channelId" placeholder="选择下级渠道类别" readonly clearable v-if="condition.channelPid" :disabled="!condition.storeId">-->
<!--                            <el-option v-for="item in channelList2" :key="item.id" :label="item.name"-->
<!--                                       :value="item.id"></el-option>-->
<!--                        </el-select>-->
<!--                    </el-form-item>-->

                    <template v-if="isHideEmpty">
                        <el-button @click="hideEmpty(false)">显示空数据</el-button>
                    </template>
                    <template v-else>
                        <el-button @click="hideEmpty(true)">隐藏空数据</el-button>
                    </template>

                    <el-button type="primary" icon="el-icon-search" @click="loadData" class="h32px"></el-button>
                    <!-- <el-button type="primary" class="h32px" @click="deriveExcel">导出Excel</el-button> -->
             
                </el-form>

                <div class="pa20 bg-pink2 text-center bd-blue4 bd-a1 f16px">

                    <div class="wb16 mar3per fl h40px lh40px bd-red3 bd-r1 mat15">
                        销售业绩合计
                    </div>

                    <div class="wb15 fl">
                        <p class="fc-gray2 h20px lh20px">销售金额（元）</p>
                        <div class="clear2"></div>
                        <p class="fc-gray3 f20px h40px lh40px text-over-hidden1">{{info.order | _filterNumFormat }}</p>
                    </div>
                    <div class="wb15 fl">
                        <p class="fc-gray2 h20px lh20px">退单金额（元）</p>
                        <div class="clear2"></div>
                        <p class="fc-gray3 f20px h40px lh40px text-over-hidden1">{{info.refund | _filterNumFormat }}</p>
                    </div>

                    <div class="wb15 fl">
                        <p class="fc-gray2 h20px lh20px">欠款金额（元）</p>
                        <div class="clear2"></div>
                        <p class="fc-gray3 f20px h40px lh40px text-over-hidden1">{{info.arrears_price | _filterNumFormat }}</p>
                    </div>
                    <div class="wb15 fl">
                        <p class="fc-gray2 h20px lh20px">充值金额（元）</p>
                        <div class="clear2"></div>
                        <p class="fc-gray3 f20px h40px lh40px text-over-hidden1">{{(info.prepaid - info.prepaid_refund) | _filterNumFormat }}</p>
                    </div>
                    <div class="wb15 fl">
                        <p class="fc-gray2 h20px lh20px">实际业绩（元）</p>
                        <div class="clear2"></div>
                        <p class="fc-gray3 f20px h40px lh40px text-over-hidden1">{{info.performance | _filterNumFormat }}</p>
                    </div>

                    <div class="clear0"></div>

                </div>

                <div class="clear4"></div>

                <base-list ref="demoTable" :condition="condition"
                           :datas.sync="demoList" :pageSearch="pageSearch" :isPaging="true" v-on:listLoaded="getLoaded">

                    <el-table slot="list" :data="demoList"  border>

                        <el-table-column prop="usersName" align="center" label="员工">
                            <template slot-scope="scope">
                                {{scope.row.usersName}}
                            </template>
                        </el-table-column>

                        <el-table-column prop="allMoney" align="center" label="销售金额（元）">
                            <template slot-scope="scope">
                                {{ scope.row.order | _filterNumFormat }}
                            </template>
                        </el-table-column>

                        <el-table-column prop="refund" align="center" label="退单金额（元）">
                            <template slot-scope="scope">
                                {{ scope.row.refund | _filterNumFormat }}
                            </template>
                        </el-table-column>

                        <el-table-column prop="arrears" align="center" label="欠款金额（元）">
                            <template slot-scope="scope">
                                {{ scope.row.arrears_price | _filterNumFormat }}
                            </template>
                        </el-table-column>

                        <el-table-column prop="arrears" align="center" label="充值金额（元）">
                            <template slot-scope="scope">
                                {{( scope.row.prepaid - scope.row.prepaid_refund) | _filterNumFormat }}
                            </template>
                        </el-table-column>

                        <el-table-column prop="givePrice" align="center" label="实际业绩（元）">
                            <template slot-scope="scope">
                                {{ scope.row.performance | _filterNumFormat }}
                            </template>
                        </el-table-column>

                    </el-table>
                </base-list>
            </div>

            <div class="clear0"></div>

        </div>

    </div>
</template>

<script>

    import { memberPerformance } from "@/chain/assets/api/manage/statistics"

    import {  getListChannel  } from "@/chain/assets/api/channelManagement/channelManagement"
    import {  getStoreMembers  } from "@/chain/assets/api/common/common"

    import dateSlot from '@/chain/components/date/dateSlot'

    export default {
        name: "SalesPerformance",
        components: {
            dateSlot
        },
        data() {
            return {
                form: {
                    c1: '',
                    c2: '',
                },
                dateTime: [ this.$base.getDateScope(0).startTime,  this.$base.getDateScope(0).endTime],
                condition: {
                    startTime: this.$base.getDateScope(0).startTime,
                    stopTime: this.$base.getDateScope(0).endTime,
                    channelPid: '',
                    channelId: '',
                },

                // dateTime: [],
                // condition: {},                              // 查询条件
                demoList: [],                      // table数组
                pageSearch: memberPerformance,       // 分页查询api接口
                info: {},
                isHideEmpty: false,
                channelList: [],
                channelList2: [],
                staffList: [],
                storeList:[],
            }
        },
        mounted() {
            //获取门店列表
            this.$postRequest("/post/api/store/getStore").then(res => {
                if(res.status == 0){
                let _tmp = res.data
                for(let i=0; i<_tmp.length; i++){
                    _tmp[i].isSelected = false
                }
                this.storeList = _tmp
                }
            })

        },
        methods: {
            //导出Excel
            deriveExcel() {
                this.$postRequest("/post/api/getUserInfo").then(res => {
                    let params = this.$base.copySearchConditions(this.condition);
                    let url = ''
                    if(window.location.hostname == this.$base.getChainHost()){
                        url = `https://${location.hostname}/post/export/member/memberPerformanceExcel`;
                    }else{
                        url = `http://${location.hostname}:${location.port}/post/export/member/memberPerformanceExcel`;
                    }
                    url += `?downloadUserId=${res.data.users_id}`;
                    if (params.storeId) {
                        url += `&storeId=${params.storeId}`
                    }
                    url += `&startTime=${params.startTime}&stopTime=${params.stopTime}`;
                    window.location.href = url;
                });
            },

            /**
             * 切换门店
             */
            changeStore(){
                this.condition.channelPid = ''
                this.condition.channelId = ''
                if(!this.condition.storeId){
                    return
                }

                getListChannel({ channelParentId: 0, storeId: this.condition.storeId }).then(res => {
                    if(res.status == 0){
                        let _tmp = res.data.list
                        this.channelList = _tmp
                    }else{
                        this.$message({
                            showClose: true,
                            message: res.msg,
                            type: 'error',
                        });
                    }
                }).catch(error=>{
                    this.$message({
                        showClose: true,
                        message: error,
                        type: 'error',
                    });
                })

                getStoreMembers({ storeId: this.condition.storeId, s_id: this.condition.storeId }).then(res =>{
                    if(res.status == 0){
                        let _tmp = res.data
                        this.staffList = _tmp.filter(item => item.role_id === 3 || item.role_id === 4 )
                    }
                })
            },

            changeChannel(){
                getListChannel({ channelParentId: this.condition.channelPid, storeId: this.condition.storeId  }).then(res => {
                    if(res.status == 0){

                        let _tmp = res.data.list

                        this.channelList2 = _tmp

                    }else{
                        this.$message({
                            showClose: true,
                            message: res.msg,
                            type: 'error',
                        });
                    }
                }).catch(error=>{
                    this.$message({
                        showClose: true,
                        message: error,
                        type: 'error',
                    });
                })
            },
            // //导出Excel
            // deriveExcel() {
            //     let params = this.$base.copySearchConditions(this.condition);
            //     let formData = this.$base.copySearchConditions(this.form);
            //     let url = `http://${location.hostname}/export/analysis/adviserGetPrintInfo`;
            //     url += `?downloadUserId=${this.$store.getters.currentUser.users_id}`;
            //     url += `&startTime=${params.startTime}&endTime=${params.stopTime}`;
            //     console.log(params);
            //     if (formData.c1) {
            //         url += `&channelPid=${formData.c1}`;
            //     }
            //     if (formData.c2) {
            //         url += `&channelId=${formData.c2}`;
            //     }
            //     // console.log(url);
            //     window.location.href = url;
            // },

            hideEmpty(flag){
                this.isHideEmpty = flag
                if(this.isHideEmpty){
                    this.condition.hidden = 1
                }else{
                    this.condition.hidden = 0
                }
                this.loadData()
            },

            loadData() {
                this.$refs.demoTable.loadData()
            },

            getLoaded(data){
                this.info = data.count
            },

        },
        watch: {
            dateTime(c, o){
                this.condition.startTime = c[0]
                this.condition.stopTime = c[1]
            },

        }

    }

</script>

<style scoped lang="scss">

</style>
