<template>
    <div class="pa24 bg-white mat24">
        <p class="lh30px h30px">
            <span class="fl f16px fc-gray4">合作企业开单列表</span>
        </p>

        <div class="clear2"></div>

        <div class="wb100">

            <div class="wb100">

                <el-form :inline="true" :model="condition" class="search-form" slot="search" label-width="80px">
                    <el-form-item label="">
                        <date-slot :dateTime.sync="dateTime"></date-slot>
                    </el-form-item>

                    <el-form-item>
                        <el-select v-model="condition.business_id" placeholder="请选择企业" readonly="" clearable>
                            <el-option key value label="全部合作企业"></el-option>
                            <el-option v-for="item in enterpriseList" :key="item.id" :label="item.name" :value="item.id"> </el-option>
                        </el-select>
                    </el-form-item>

                    <!-- <template v-if="isHideEmpty">
                        <el-button @click="hideEmpty(false)">显示空数据</el-button>
                    </template>
                    <template v-else>
                        <el-button @click="hideEmpty(true)">隐藏空数据</el-button>
                    </template> -->

                    <el-button type="primary" icon="el-icon-search" @click="loadData" class="h32px"></el-button>
                    <el-button type="danger" class="h32px" @click="deriveExcel">导出Excel</el-button>

                </el-form>

                <div class="clear2"></div>

                <base-list ref="demoTable" :condition="condition"
                           :datas.sync="demoList" :pageSearch="pageSearch" :isPaging="true" v-on:listLoaded="getLoaded">

                    <el-table slot="list" :data="demoList" stripe border>

                        <el-table-column align="center" label="合作企业名称">
                            <template slot-scope="scope">
                                {{scope.row.businessName.name}}
                            </template>
                        </el-table-column>

                        <el-table-column align="center" label="开单时间">
                            <template slot-scope="scope">
                                {{scope.row.time}}
                            </template>
                        </el-table-column>

                        <el-table-column align="center" label="开单人及百分比">
                            <template slot-scope="scope">
                                <template v-for="(item,key) in scope.row.memberData">
                                    <span class="fl">
                                        {{item.memberName}}({{item.ratio+'%'}})
                                        <template v-if="scope.row.memberData.length-1 > key">,</template>
                                    </span>
                                </template>
                            </template>
                        </el-table-column>

                        <el-table-column align="center" label="开单类型">
                            <template slot-scope="scope">
                                <span v-for="(item, index) in scope.row.type" :key="index">
                                    {{item.name}}
                                    <br>
                                </span>
                            </template>
                        </el-table-column>

                        <el-table-column align="center" label="客户姓名">
                            <template slot-scope="scope">
                                {{ scope.row.customerName }}
                            </template>
                        </el-table-column>

                        <el-table-column align="center" label="合作业绩">
                            <template slot-scope="scope">
                                {{scope.row.price | _moneyFormat}}
                            </template>
                        </el-table-column>

                        <el-table-column align="center" label="门店占比(%)">
                            <template slot-scope="scope">
                                {{scope.row.enterpriseRatio}}
                            </template>
                        </el-table-column>

                        <el-table-column align="center" label="门店提成金额">
                            <template slot-scope="scope">
                                {{scope.row.enterprisePrice | _moneyFormat}}
                            </template>
                        </el-table-column>

                        <el-table-column align="center" label="合作企业占比(%)">
                            <template slot-scope="scope">
                                {{scope.row.ratio}}
                            </template>
                        </el-table-column>

                        <el-table-column align="center" label="合作企业提成金额">
                            <template slot-scope="scope">
                                {{scope.row.businessPrice | _moneyFormat}}
                            </template>
                        </el-table-column>

                        <el-table-column align="center" label="门店提成金额占比(%)">
                            <template slot-scope="scope">
                                {{scope.row.proportion}}
                            </template>
                        </el-table-column>

                        <el-table-column align="center" label="操作">
                            <template slot-scope="scope">
                                <span class='buttonStyle_class' @click="$router.push({name:'Printing',query:{id:scope.row.id,type:6}})">打印</span>
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

    import dateSlot from '@/shop/components/date/dateSlot'

    import { ordersList, businessList } from "@/shop/assets/api/cooperation/cooperation"

    export default {
        name: "EnterpriseOrderList",
        components: {
            dateSlot
        },
        data() {
            return {

                dateTime: [ this.$base.getDateScope(0).startTime,  this.$base.getDateScope(0).endTime],
                condition: {
                    startTime: this.$base.getDateScope(0).startTime,
                    endTime: this.$base.getDateScope(0).endTime,
                    channelPid: '',
                    channelId: '',
                    business_id: '',
                },
                // dateTime: [],
                // condition: {},                              // 查询条件
                demoList: [],                      // table数组
                pageSearch: ordersList,       // 分页查询api接口
                info: {},
                isHideEmpty: false,
                channelList: [],
                channelList2: [],
                staffList: [],
                storeList:[],
                enterpriseList: [],
            }
        },
        mounted() {
            businessList({
                start:1,perpage:9999
            }).then(res=>{
                if(res.status == 0){
                    this.enterpriseList = res.data.list
                }
            })
        },
        methods: {
            //导出Excel
            deriveExcel() {
                let params = this.$base.copySearchConditions(this.condition);
                let url = '';
                if(window.location.hostname == this.$base.getStoreHost()){
                    url = `https://${location.hostname}/post/export/partner/ordersListExcel`;
                }else{
                    url = `http://${location.hostname}:${location.port}/post/export/partner/ordersListExcel`;
                }
                url += `?downloadUserId=${this.$store.getters.currentUser.users_id}`;
                if (params.business_id) {
                    url += `&business_id=${params.business_id}`
                }
                url += `&startTime=${params.startTime}&endTime=${params.endTime}`;
                window.location.href = url;
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
