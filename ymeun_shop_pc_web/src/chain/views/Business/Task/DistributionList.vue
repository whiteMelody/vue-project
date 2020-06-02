<template>

    <div class="pal24 par24 pat20 pab20">
        <div class="bg-white pal20 par20">
            <p class="fc-gray4 f14px h40px lh40px">历史分配记录</p>

            <div class="clear-f2"></div>

            <div class="clear2"></div>

            <div class="wb100">
                    <el-form :inline="true" :model="condition" class="search-form" slot="search" label-width="80px">

                        <el-form-item>
                            <el-input v-model="condition.keyword" placeholder="请输入顾客姓名"></el-input>
<!--                            <auto-search-client @changed="myChanged" ref="autoClient"></auto-search-client>-->
                        </el-form-item>

                        <el-form-item label>
                            <date-slot :dateTime.sync="dateTime"></date-slot>
                        </el-form-item>

                        <el-button type="primary" @click="loadData" class="h32px">搜索</el-button>

                    </el-form>


                    <base-list ref="demoTable" :condition="condition"
                                              :datas.sync="demoList" :pageSearch="pageSearch" :isPaging="true">

                    <el-table slot="list" :data="demoList" border>

                        <el-table-column align="left" label="序号" width="50px">
                            <template slot-scope="scope">{{ scope.$index + 1 }}</template>
                        </el-table-column>

                        <el-table-column align="left" label="分配日期">
                            <template slot-scope="scope">
                                {{ $base.dateTimeToDate(scope.row.created_at, 'date')}}
                            </template>
                        </el-table-column>

                        <el-table-column align="left" label="状态">
                            <template slot-scope="scope">
                                <template v-if="scope.row.status == 0">
                                    <p class="w80px h23px lh23px fc-white text-center bg-orange2">
                                        未完成
                                    </p>
                                </template>
                                <template v-else-if="scope.row.status == 1">
                                    <p class="w80px h23px lh23px fc-white text-center bg-green6">
                                        已完成
                                    </p>
                                </template>
                            </template>
                        </el-table-column>

                        <el-table-column align="left" label="姓名">
                            <template slot-scope="scope">
                                {{scope.row.customer.name}}
                            </template>
                        </el-table-column>

                        <el-table-column align="left" label="电话">
                            <template slot-scope="scope">
                                {{scope.row.customer.mobile}}
                            </template>
                        </el-table-column>

                        <el-table-column align="left" :label="$store.getters.roleName.adviser">
                            <template slot-scope="scope">
                                {{scope.row.customer.adviser.name}}
                            </template>
                        </el-table-column>

                        <el-table-column align="left" label="接收人">
                            <template slot-scope="scope">
                                {{scope.row.users.name}}
                            </template>
                        </el-table-column>

                        <el-table-column align="left" label="回访完成时间">
                            <template slot-scope="scope">
                                {{ $base.dateTimeToDate(scope.row.review_time, 'date')}}
                            </template>
                        </el-table-column>

                        <el-table-column align="left" label="回访结果">
                            <template slot-scope="scope">
                                <template v-if="scope.row.is_door == 1">
                                    愿意上门
                                </template>
                                <template v-else-if="scope.row.is_door == 2">
                                    不愿意上门
                                </template>
                            </template>
                        </el-table-column>
                    </el-table>
                </base-list>

                <div class="clear0"></div>

            </div>
        </div>

    </div>
</template>

<script>

    import { reviewList } from "@/chain/assets/api/task/revisitList"

    import autoSearchClient from "@/chain/components/autocomplete/autoSearchClient"

    import dateSlot from '@/chain/components/date/dateSlot'

    export default {
        name: "DistributionList",
        components: {
            autoSearchClient, dateSlot
        },
        data() {
            return {
                form: {
                    style: 0,
                },
                dialogRevisit: true,
                dateTime: [],
                condition: {
                    isHistory: 1,
                },// 查询条件
                demoList: [],                      // table数组
                pageSearch: reviewList,       // 分页查询api接口
                disabled: false,
            }
        },
        mounted() {

        },
        methods: {

            myChanged(data){
                this.condition.keyword = data.kw
            },

            loadData(){
                this.$refs.demoTable.loadData()
            },

        },
        watch: {
            dateTime(newData,oldData){
                this.condition.startTime = this.$base.dateTimeToDate(newData[0],"startTime")
                this.condition.endTime = this.$base.dateTimeToDate(newData[1],"endTime")
            },

        }

    }
</script>
<style lang="scss" scoped>
</style>
