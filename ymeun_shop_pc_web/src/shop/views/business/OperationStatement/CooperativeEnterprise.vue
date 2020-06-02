<template>
    <div class="wb100">
        <p class="lh50px h50px">
            <span class="fl f16px fc-gray4">合作企业</span>
<!--            <span class="fl mal20 f14px fc-gray3">数据每十分钟更新一次</span>-->
        </p>

        <div class="clear0"></div>

        <div class="wb100">

            <div class="wb100">

                <el-form :inline="true" :model="condition" class="search-form" slot="search" label-width="80px">
                    <el-form-item label="">
                        <date-slot :dateTime.sync="dateTime"></date-slot>
                    </el-form-item>

                    <el-form-item label>
                        <el-select v-model="condition.business_id" placeholder="选择合作企业" readonly clearable>
                            <el-option :key="''" label="全部合作企业" :value="''"></el-option>
                            <el-option v-for="item in cooperationList" :key="item.id" :label="item.name"
                                       :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <!-- 
                    <template v-if="isHideEmpty">
                        <el-button @click="hideEmpty(false)">显示空数据</el-button>
                    </template>
                    <template v-else>
                        <el-button @click="hideEmpty(true)">隐藏空数据</el-button>
                    </template> 
                    -->

                    <el-button type="primary" icon="el-icon-search" @click="loadData" class="h32px"></el-button>
                    <el-button type="danger" class="h32px" @click="deriveExcel">导出Excel</el-button>

                </el-form>

                <div class="pa20 bg-blue5 text-center bd-blue4 bd-a1 f16px">

                    <div class="wb20 fl h40px lh40px bd-gray bd-r1 mat15">
                        合作企业
                    </div>

                    <div class="wb20 fl">
                        <p class="fc-gray3 h20px lh20px">总业绩（元）</p>
                        <div class="clear2"></div>
                        <p class="fc-blue6 f20px h40px lh40px text-over-hidden1">{{info.payment | _filterNumFormat }}</p>
                    </div>
                    <div class="wb20 fl">
                        <p class="fc-gray3 h20px lh20px">本企业业绩（元）</p>
                        <div class="clear2"></div>
                        <p class="fc-blue6 f20px h40px lh40px text-over-hidden1">{{info.storePayment | _filterNumFormat }}</p>
                    </div>

                    <div class="wb20 fl">
                        <p class="fc-gray3 h20px lh20px">合作企业业绩（元）</p>
                        <div class="clear2"></div>
                        <p class="fc-blue6 f20px h40px lh40px text-over-hidden1">{{info.businessPayment | _filterNumFormat }}</p>
                    </div>

                    <div class="clear0"></div>

                </div>

                <div class="clear4"></div>

                <base-list ref="demoTable" :condition="condition"
                           :datas.sync="demoList" :pageSearch="pageSearch" :isPaging="true" v-on:listLoaded="getLoaded">

                    <el-table slot="list" :data="demoList" stripe border
                              row-key="id"
                              :tree-props="{children: 'orders', hasChildren: 'hasChildren'}"
                              ref="myTable"
                              @row-click="switchExpansion">

                        <el-table-column label="合作企业名称">
                            <template slot-scope="scope">
                                <template v-if="scope.row.orders">  {{scope.row.name}} </template>


                            </template>
                        </el-table-column>

                        <el-table-column label="开单时间">
                            <template slot-scope="scope">
                                <template v-if="!scope.row.orders">  {{scope.row.time}} </template>
                            </template>
                        </el-table-column>

                        <el-table-column label="开单人及百分比">
                            <template slot-scope="scope">
                                <template v-if="!scope.row.orders">
                                    <div v-for="(item, index) in scope.row.memberData" :key="index">
                                        <b v-if="index > 0">、</b>
                                        <span>{{item.memberName+'('+item.ratio+'%)'}}</span>
                                    </div>
                                </template>
                            </template>
                        </el-table-column>

                        <el-table-column label="开单类型">
                            <template slot-scope="scope">
                                <!-- <template v-if="scope.row.orders">{{scope.row.enterpriseRatio}} </template> -->
                                <template v-if="!scope.row.orders">
                                    <span v-for="(item , index) in scope.row.type" :key="index">{{item.name}}
                                        <a v-if="index != (scope.row.type.length-1)">、</a>
                                    </span>
                                    
                                </template>
                            </template>
                        </el-table-column>

                        <!-- <el-table-column label="开单人所属门店">
                            <template slot-scope="scope">
                                <template v-if="!scope.row.orders">{{scope.row.storeName}} </template>
                            </template>
                        </el-table-column> -->

                        <el-table-column label="客户名称">
                            <template slot-scope="scope">
                                <template v-if="!scope.row.orders">
                                    <el-link :underline="false" @click="$router.push({name:'ClientDel',query:{id:scope.row.customer_id,types:0}})">{{ scope.row.customerName }}</el-link>
                                </template>
                            </template>
                        </el-table-column>

                        <el-table-column label="合作业绩">
                            <template slot-scope="scope">
                                <template>{{scope.row.price | _moneyFormat}} </template>
                            </template>
                        </el-table-column>

                        <el-table-column label="门店占比(%)">
                            <template slot-scope="scope">
                                <!-- <template v-if="scope.row.orders">{{scope.row.enterpriseRatio}} </template> -->
                                <template>{{scope.row.enterpriseRatio}} </template>
                            </template>
                        </el-table-column>

                        <el-table-column label="门店提成金额">
                            <template slot-scope="scope">
                                <template>{{scope.row.enterprisePrice | _moneyFormat}} </template>
                            </template>
                        </el-table-column>

                        <el-table-column label="合作企业占比(%)">
                            <template slot-scope="scope">
                                <!-- <template v-if="scope.row.orders">{{scope.row.ratio}} </template> -->
                                <template>{{scope.row.ratio}} </template>
                            </template>
                        </el-table-column>

                        <el-table-column label="合作企业提成金额">
                            <template slot-scope="scope">
                                <template>{{scope.row.businessPrice | _moneyFormat}} </template>
                            </template>
                        </el-table-column>

                        <el-table-column label="门店提成金额占比(%)">
                            <template slot-scope="scope">
                                <template>{{scope.row.proportion}} </template>
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

    import { businessOrdersList, businessList, ordersList } from "@/shop/assets/api/cooperation/cooperation"

    import dateSlot from '@/shop/components/date/dateSlot'

    export default {
        name: "CooperativeEnterprise",
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
                    endTime: this.$base.getDateScope(0).endTime,
                    s_id: '',
                    business_id:"",
                },
                demoList: [],                      // table数组
                pageSearch: businessOrdersList,       // 分页查询api接口
                info: {},
                isHideEmpty: false,
                channelList: [],
                channelList2: [],
                staffList: [],
                storeList:[],
                cooperationList:[],
            }
        },
        mounted() {

            businessList({start:1,perpage:9999}).then(res => {
                if(res.status == 0){
                    this.cooperationList = res.data.list
                }
            }).catch(error=>{
                console.log("businessList no");
            })

        },
        methods: {
            //导出Excel
            deriveExcel() {
                let params = this.$base.copySearchConditions(this.condition);
                let url = ''
                if(window.location.hostname == this.$base.getStoreHost()){
                    url = `https://${location.hostname}/post/export/partner/businessOrdersListExcel`;
                }else{
                    url = `http://${location.hostname}:${location.port}/post/export/partner/businessOrdersListExcel`;
                }
                url += `?downloadUserId=${this.$store.getters.currentUser.users_id}`;
                if (params.business_id) {
                    url += `&business_id=${params.business_id}`
                }
                url += `&startTime=${params.startTime}&endTime=${params.endTime}`;
                window.location.href = url;
            },

            switchExpansion(row) {
                if(row.orders){
                    if(row.orders.length)
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
                this.info = data.count
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
