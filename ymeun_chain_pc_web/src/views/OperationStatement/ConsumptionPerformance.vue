<template>
    <div class="wb100">

        <p class="lh50px h50px">
            <span class="fl f16px fc-gray4">划扣业绩</span>
        </p>

        <div class="clear0"></div>

        <div class="wb100">

            <div class="wb100">

                <el-form :inline="true" :model="condition" class="search-form" slot="search" label-width="80px">
                    <el-form-item label="">
                        <date-slot :dateTime.sync="dateTime"></date-slot>
                    </el-form-item>

                    <el-form-item label>
                        <el-select v-model="condition.storeId" placeholder="选择门店" readonly clearable @change="changeStore">
                            <el-option :key="''" label="全部门店" :value="''"></el-option>
                            <el-option v-for="item in storeList" :key="item.id" :label="item.name"
                                       :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>

                    <!--  选择员工 -->
<!--                    <el-form-item label="">-->
<!--                        <el-select v-model="condition.technicianId" placeholder="选择美容师" readonly="" clearable :disabled="!condition.storeId">-->
<!--                            <el-option :key="''" :value="''" label="全部美容师"></el-option>-->
<!--                            <el-option v-for="item in staffList" :key="item.users_id" :label="item.name"-->
<!--                                       :value="item.users_id"></el-option>-->
<!--                        </el-select>-->
<!--                    </el-form-item>-->

                    <el-button type="primary" icon="el-icon-search" @click="loadData" class="h32px"></el-button>
                    <el-button type="primary" class="h32px" @click="deriveExcel">导出Excel</el-button>
                </el-form>

                <div class="pa20 bg-pink2 text-center  f16px">

                    <div class="wb20 fl h40px lh40px bd-red3 bd-r1 mat15">
                        划扣业绩合计
                    </div>
                    <div class="wb18 fl">
                        <p class="fc-gray2 h20px lh20px">划扣总金额（元）</p>
                        <div class="clear2"></div>
                        <p class="fc-gray3 f20px h40px lh40px">{{info.amount | _filterNumFormat }}</p>
                    </div>
                    <div class="wb18 fl">
                        <p class="fc-gray2 h20px lh20px">划扣券额（元）</p>
                        <div class="clear2"></div>
                        <p class="fc-gray3 f20px h40px lh40px">{{info.give | _filterNumFormat }}</p>
                    </div>
                    <!-- <div class="wb18 fl">
                        <p class="fc-gray2 h20px lh20px">退款总额（元）</p>
                        <div class="clear2"></div>
                        <p class="fc-gray3 f20px h40px lh40px">{{info.refund_price | _filterNumFormat }}</p>
                    </div> -->
              

                    <div class="clear0"></div>

                </div>

                <div class="clear2"></div>

                <div class="pal20 lh38px h40px pointer">
                    <template v-if="showType == 0">
                        <span class="fl fc-green2 f16px bd-green2 bd-b2">划扣业绩</span>
                        <span class="fl f16px mal20 mar20 fc-gray1"> | </span>
                        <span class="fl fc-gray2 f16px pab2" @click="changeShowType(1)">不计入划扣业绩</span>
                    </template>
                    <template v-else>
                        <span class="fl fc-gray2 f16px pab2" @click="changeShowType(0)">划扣业绩</span>
                        <span class="fl f16px mal20 mar20 fc-gray1"> | </span>
                        <span class="fl fc-green2 f16px bd-green2 bd-b2">不计入划扣业绩</span>
                    </template>
                </div>

                <div class="clear4"></div>

                <base-list ref="demoTable" :condition="condition"
                           :datas.sync="demoList" :pageSearch="pageSearch" :isPaging="true" v-on:listLoaded="getLoaded">

                    <el-table slot="list" :data="demoList" stripe border>

                        <el-table-column prop="huakou_time" align="center" label="划扣时间">
                            <template slot-scope="scope">
                                {{scope.row.huakou_time | _endTimeFormat}}
                            </template>
                        </el-table-column>

                        <el-table-column prop="consumeCode" align="center" label="划扣订单号">
                            <template slot-scope="scope">
                                {{ scope.row.consumeCode }}
                            </template>
                        </el-table-column>

                        <el-table-column prop="customer" align="center" label="渠道">
                            <template slot-scope="scope">
                                {{ scope.row.customer.channel.name }}
                            </template>
                        </el-table-column>

                        <el-table-column prop="customer" align="center" label="姓名">
                            <template slot-scope="scope">
                                {{ scope.row.customer.name }}
                            </template>
                        </el-table-column>

                        <el-table-column prop="customer" align="center" label="电话">
                            <template slot-scope="scope">
                                {{ scope.row.customer.mobile }}
                            </template>
                        </el-table-column>

                        <el-table-column prop="adviser" align="center" label="顾问">
                            <template slot-scope="scope">
                                {{ scope.row.adviser.name }}
                            </template>
                        </el-table-column>

                        <el-table-column prop="technician" align="center" label="美容师">
                            <template slot-scope="scope">
                                {{ scope.row.technician.name }}
                            </template>
                        </el-table-column>

                        <el-table-column prop="order_time" align="center" label="开单日期">
                            <template slot-scope="scope">
                                {{ scope.row.order_time | _endTimeFormat }}
                            </template>
                        </el-table-column>

                        <el-table-column prop="items" align="center" label="项目名称">
                            <template slot-scope="scope">
                                {{ scope.row.items.name }}
                            </template>
                        </el-table-column>

                        <el-table-column prop="order_code" align="center" label="消费单号">
                            <template slot-scope="scope">
                                {{ scope.row.order_code }}
                            </template>
                        </el-table-column>

                        <el-table-column prop="total" align="center" label="总数量">
                            <template slot-scope="scope">
                                {{ scope.row.total }}
                            </template>
                        </el-table-column>

                        <el-table-column prop="number" align="center" label="已划扣数量">
                            <template slot-scope="scope">
                                {{ scope.row.number }}
                            </template>
                        </el-table-column>

                        <el-table-column prop="number" align="center" label="剩余数量">
                            <template slot-scope="scope">
                                {{ scope.row.surplus_number }}
                            </template>
                        </el-table-column>

                        <el-table-column prop="price" align="center" label="划扣总金额">
                            <template slot-scope="scope">
                                {{ scope.row.price | _filterNumFormat}}
                            </template>
                        </el-table-column>

                        <el-table-column prop="actual_price" align="center" label="实际划扣金额">
                            <template slot-scope="scope">
                                {{ scope.row.actual_price  | _filterNumFormat}}
                            </template>
                        </el-table-column>

                        <el-table-column prop="give_price" align="center" label="划扣券额">
                            <template slot-scope="scope">
                                {{ scope.row.give_price | _filterNumFormat }}
                            </template>
                        </el-table-column>

                        <el-table-column prop="status" align="center" label="状态">
                            <template slot-scope="scope">
                                {{ scope.row.status.label }}
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

    import { getConsumeAchievement } from "@/assets/api/manage/statistics"
    import dateSlot from '@/components/date/dateSlot'

    import {  getListChannel  } from "../../assets/api/channelManagement/channelManagement"
    import {  getStoreMembers  } from "../../assets/api/common/common"

    export default {
        name: "SalesPerformance",
        components: {
            dateSlot
        },
        data() {
            return {
                form: {},
                dateTime: [ this.$base.getDateScope(0).startTime,  this.$base.getDateScope(0).endTime],
                condition: {
                    startTime: this.$base.getDateScope(0).startTime,
                    stopTime: this.$base.getDateScope(0).endTime,
                    mark: 0,
                    technicianId: '',
                },
                // dateTime: [],
                // condition: {},                             // 查询条件
                demoList: [],                      // table数组
                pageSearch: getConsumeAchievement,       // 分页查询api接口
                info: {},
                showType: 0,
                cosmetologistList: [],
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
                        url = `https://${location.hostname}/post/export/member/technicianConsumeAchievementExcel`;
                    }else{
                        url = `http://${location.hostname}:${location.port}/post/export/member/technicianConsumeAchievementExcel`;
                    }

                    url += `?downloadUserId=${res.data.users_id}`;
                    if (params.storeId) {
                        url += `&storeId=${params.storeId}`
                    }
                    url += `&startTime=${params.startTime}&stopTime=${params.stopTime}`;
                    if (params.technicianId) {
                        url += `&technicianId=${params.technicianId}`;
                    }

                    /**
                     * 2019年8月27日18:38:49
                     * 导出Excel
                     * 新增字段excel  1 导出划扣明细 | 2 导出不计入业绩划扣明细
                     */
                    if (params.mark == 1) {
                        url += `&excel=2`
                    }else{
                        url += `&excel=1`
                    }

                    window.location.href = url;

                });

            },

            /**
             * 切换门店
             */
            changeStore(){

                this.condition.technicianId = ''
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
                        this.staffList = _tmp.filter(item => item.role_id == 4 )
                    }
                })
            },

            changeShowType(type){
                this.showType = type
                this.condition.mark = type
                this.loadData()
            },

            hideEmpty(flag){
                this.isHideEmpty = flag
                if(this.isHideEmpty){
                    this.condition.hiddenEmpty = 1
                }else{
                    this.condition.hiddenEmpty = 0
                }
                this.loadData()
            },

            loadData() {
                this.$refs.demoTable.loadData()
            },

            getLoaded(data){
                this.info = data.analisis
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
