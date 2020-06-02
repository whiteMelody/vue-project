<template>
    <div class="wb100">

         <p class="lh40px h40px">
            <span class="fl f14px fc-gray4">沉淀客户报表</span>
        </p>

        <div class="clear-f2"></div>
        <div class="clear3"></div>

        <div class="wb100">

            <div class="wb100">

                <el-form :inline="true" :model="condition" class="search-form" slot="search" label-width="80px">
                    <el-form-item label="">
                        <div class="hs_timer">
                            <div class="text">激活客户时间</div>
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
                        <el-select v-model="condition.usersId" placeholder="选择员工" readonly clearable>
                            <el-option :key="''" label="全部员工" :value="''"></el-option>
                            <el-option v-for="item in staffList" :key="item.users_id" :label="item.name"
                                    :value="item.users_id"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label>
                        <el-select v-model="condition.storeId" placeholder="选择门店" readonly clearable>
                            <el-option :key="''" label="全部门店" :value="''"></el-option>
                            <el-option v-for="item in storeList" :key="item.id" :label="item.name"
                                       :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>

                    <!-- <template v-if="isHideEmpty">
                        <el-button @click="hideEmpty(false)">显示空数据</el-button>
                    </template>
                    <template v-else>
                        <el-button @click="hideEmpty(true)">隐藏空数据</el-button>
                    </template> -->

                    <el-button type="primary" icon="el-icon-search" @click="loadData" class="h32px"></el-button>
                    <el-button type="primary" class="h32px" @click="deriveExcel">导出Excel</el-button>

                </el-form>

                <div class="clear0"></div>

                <div class="pal20 par20 pat20 bg-white4">
                    <div class="w150px fl text-center bd-gray bd-r1 fc-gray4 mar50" :class="isTwoRows ? 'h100px lh100px' : 'h40px lh40px'">
                        沉淀客户合计
                    </div>
                    <div class="w150px fl h40px lh15px mar20 mab20">
                        <p class="fc-gray2">激活人次（次）</p>
                        <p class="Fb fc-gray4 f20px mat10">{{info.activationNums }}</p>
                    </div>
                    <div class="w150px fl h40px lh15px mar20 mab20">
                        <p class="fc-gray2">上门人次（次）</p>
                        <p class="Fb fc-gray4 f20px mat10">{{info.appointmentNums }}</p>
                    </div>
                    <div class="w150px fl h40px lh15px mar20 mab20">
                        <p class="fc-gray2">上门消费人次（次）</p>
                        <p class="Fb fc-gray4 f20px mat10">{{info.ordersNums }}</p>
                    </div>
                    <div class="w150px fl h40px lh15px mar20 mab20">
                        <p class="fc-gray2">上门划扣人次（次）</p>
                        <p class="Fb fc-gray4 f20px mat10">{{info.consumeNums }}</p>
                    </div>
                    <div class="w150px fl h40px lh15px mar20 mab20">
                        <p class="fc-gray2">实际消费金额（元）</p>
                        <p class="Fb fc-gray4 f20px mat10">{{info.payments | _filterNumFormat }}</p>
                    </div>
                    <div class="w150px fl h40px lh15px mar20 mab20">
                        <p class="fc-gray2">划扣金额（元）</p>
                        <p class="Fb fc-gray4 f20px mat10">{{info.consumePrices | _filterNumFormat }}</p>
                    </div>
                    <div class="clear0"></div>
                </div>

                <base-list ref="demoTable" :condition="condition"
                           :datas.sync="demoList" :pageSearch="pageSearch" :isPaging="true" v-on:listLoaded="getLoaded">

                    <el-table slot="list" :data="demoList" border
                              row-key="id"
                              :tree-props="{children: 'list', hasChildren: 'hasChildren'}"
                              ref="myTable"
                              @row-click="switchExpansion">

                        <el-table-column label="员工姓名">
                            <template slot-scope="scope">
                                <template v-if="scope.row.list">  {{scope.row.users.name}} </template>
                            </template>
                        </el-table-column>

                        <el-table-column label="门店名称">
                            <template slot-scope="scope">
                                <template v-if="!scope.row.list">  {{scope.row.storeName}} </template>
                            </template>
                        </el-table-column>

                        <el-table-column label="激活人次">
                            <template slot-scope="scope">
                                <template>  {{scope.row.activationNum}} </template>
                            </template>
                        </el-table-column>

                        <el-table-column label="上门人次">
                            <template slot-scope="scope">
                                <template>  {{scope.row.appointmentNum}} </template>
                            </template>
                        </el-table-column>

                        <el-table-column label="上门消费人次">
                            <template slot-scope="scope">
                                <template>  {{scope.row.ordersNum}} </template>
                            </template>
                        </el-table-column>

                        <el-table-column label="上门划扣人次">
                            <template slot-scope="scope">
                                <template>  {{scope.row.consumeNum}} </template>
                            </template>
                        </el-table-column>

                        <el-table-column label="客户消费金额">
                            <template slot-scope="scope">
                                <template>  {{scope.row.payment | _filterNumFormat}} </template>
                            </template>
                        </el-table-column>

                        <el-table-column label="客户划扣金额">
                            <template slot-scope="scope">
                                <template>  {{scope.row.consumePrice | _filterNumFormat}} </template>
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

    import { settlingCustomerAnalysis } from "@/chain/assets/api/client/client"


    export default {
        name: "CooperativeEnterprise",
        components: {
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
                    endTime: this.$base.getDateScope(0).endTime,
                    storeId: '',
                    usersId:"",
                },
                demoList: [],                      // table数组
                pageSearch: settlingCustomerAnalysis,       // 分页查询api接口
                info: {},
                isHideEmpty: false,
                channelList: [],
                channelList2: [],
                staffList: [],
                storeList: [],
                cooperationList: [],
                isTwoRows: false,
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

            //获取员工列表
            this.$postRequest("/post/api/members/membersListByChain").then(res => {
                if(res.status == 0){
                    this.staffList = res.data
                }
            })

            if((window.innerWidth - 286 - 170 * 7)< 0){
                this.isTwoRows = true
            }

        },
        methods: {
            //导出Excel
            deriveExcel(exportType) {
                this.$postRequest("/post/api/getUserInfo").then(res => {
                    let params = this.$base.copySearchConditions(this.condition);
                    let url = ''
                    if(window.location.hostname == this.$base.getChainHost()){
                        url = `https://${location.hostname}/post/export/settlingCustomer/settlingCustomerAnalysisExcel?downloadUserId=${res.data.users_id}`;
                    }else{
                        url = `http://${location.hostname}:${location.port}/post/export/settlingCustomer/settlingCustomerAnalysisExcel?downloadUserId=${res.data.users_id}`;
                    }
                    if (params.usersId) {
                        url += `&usersId=${params.usersId}`
                    }
                    if (params.storeId) {
                        url += `&storeId=${params.storeId}`
                    }
                    url += `&startTime=${params.startTime}&endTime=${params.endTime}`;
                    window.location.href = url;
                });
            },

            switchExpansion(row) {
                if(row.list){
                    if(row.list.length)
                        this.$refs.myTable.toggleRowExpansion(row)
                }
            },

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
                this.info = data.totalData
            },

        },
        watch: {
            dateTime(c, o){
                this.condition.startTime = c[0]
                this.condition.endTime = c[1]
            },

        }

    }

</script>

<style scoped lang="scss">

</style>
