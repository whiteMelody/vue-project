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
                    
                    <el-form-item>
                        <el-select v-model="condition.technicianId" :placeholder="`选择${$store.getters.roleName.technician}`" readonly clearable>
                            <el-option :key="''" :value="''" :label="`全部${$store.getters.roleName.technician}`"></el-option>
                            <el-option v-for="item in $store.getters.cosmetologistMap" :key="item.key" :label="item.value"
                                    :value="item.key"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-button type="primary" icon="el-icon-search" @click="loadData" class="h32px"></el-button>
                    <el-button type="danger" class="h32px" @click="deriveExcel">导出Excel</el-button>
                </el-form>

                <div class="pa20 bg-blue5 text-center bd-blue4 bd-a1 f16px">

                    <div class="wb20 fl h40px lh40px bd-gray bd-r1 mat15">
                        划扣业绩合计
                    </div>
                    <div class="wb20 fl">
                        <p class="fc-gray3 h20px lh20px">划扣总金额（元）</p>
                        <div class="clear2"></div>
                        <p class="fc-blue6 f20px h40px lh40px">{{info.amount | _filterNumFormat }}</p>
                    </div>
                    <div class="wb20 fl">
                        <p class="fc-gray3 h20px lh20px">划扣券额（元）</p>
                        <div class="clear2"></div>
                        <p class="fc-blue6 f20px h40px lh40px">{{info.give | _filterNumFormat }}</p>
                    </div>
                    <div class="wb20 fl">
                        <p class="fc-gray3 h20px lh20px">实际划扣金额（元）</p>
                        <div class="clear2"></div>
                        <p class="fc-red f20px h40px lh40px">{{info.actual | _filterNumFormat }}</p>
                    </div>
                    <!-- <div class="wb15 fl">
                        <p class="fc-gray3 h20px lh20px">退款总额（元）</p>
                        <div class="clear2"></div>
                        <p class="fc-blue6 f20px h40px lh40px">{{info.refund_price | _filterNumFormat }}</p>
                    </div> -->

                    <div class="clear0"></div>

                </div>

                <div class="clear2"></div>

                <div class="pal20 lh38px h40px pointer">
                    <template v-if="showType == 0">
                        <span class="fl fc-blue6 f16px bd-blue6 bd-b2">划扣业绩</span>
                        <span class="fl f16px mal20 mar20 fc-gray1"> | </span>
                        <span class="fl fc-gray2 f16px pab2" @click="changeShowType(1)">不计入划扣业绩</span>
                    </template>
                    <template v-else>
                        <span class="fl fc-gray2 f16px pab2" @click="changeShowType(0)">划扣业绩</span>
                        <span class="fl f16px mal20 mar20 fc-gray1"> | </span>
                        <span class="fl fc-blue6 f16px bd-blue6 bd-b2">不计入划扣业绩</span>
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
                                <el-link :underline="false" @click="$router.push({name:'ClientDel',query:{id:scope.row.customer.id,types:4}})">{{ scope.row.customer.name }}</el-link>
                            </template>
                        </el-table-column>

                        <el-table-column prop="customer" align="center" label="电话">
                            <template slot-scope="scope">
                                {{ scope.row.customer.mobile }}
                            </template>
                        </el-table-column>

                        <el-table-column prop="adviser" align="center" :label="$store.getters.roleName.adviser">
                            <template slot-scope="scope">
                                {{ scope.row.adviser.name }}
                            </template>
                        </el-table-column>

                        <el-table-column prop="technician" align="center" :label="$store.getters.roleName.technician">
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

    import { getConsumeAchievement } from "@/shop/assets/api/manage/statistics"
    import dateSlot from '@/shop/components/date/dateSlot'

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
                },      
                // dateTime: [],
                // condition: {},                             // 查询条件
                demoList: [],                      // table数组
                pageSearch: getConsumeAchievement,       // 分页查询api接口
                info: {},
                showType: 0,
            }
        },
        mounted() {
            
        },
        methods: {
            //导出Excel
            deriveExcel() {
                let params = this.$base.copySearchConditions(this.condition);

                let url = ''
                if(window.location.hostname == this.$base.getStoreHost()){
                    url = `https://${location.hostname}/post/export/members/getConsumeAchievement`;
                }else{
                    url = `http://${location.hostname}:${location.port}/post/export/members/getConsumeAchievement`;
                }

                url += `?downloadUserId=${this.$store.getters.currentUser.users_id}`;
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
                if(this.$base.isNull(this.form.c1))
                    this.condition.channelId = ''
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
            form: {
                deep: true,
                handler: function() {
                    this.condition.channelId = this.form.c2 || this.form.c1;
                }
            },
            demoTable(c, o){
                console.log(c)
            },

        }

    }

</script>

<style scoped lang="scss">

</style>
