<!--form-->
<template>

    <div class="pal24 par24 pat20 pab20">
        <div class="bg-white pal20 par20">
            <p class="fc-gray4 f14px h40px lh40px">出库记录</p>

            <div class="clear-f2"></div>

            <div class="clear2"></div>

            <el-form :inline="true" :model="condition">

                <el-form-item>
                    <el-input v-model="condition.code" placeholder="请输入出库单据编号"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-date-picker
                            v-model="condition.happen_date"
                            :clearable="false"
                            type="date"
                            placeholder="请选择出库日期"
                            value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>

                <el-form-item>
                    <el-select v-model="condition.type" placeholder="全部出库类别">
                        <el-option key label="全部出库类别" value></el-option>
                        <el-option v-for="[key, val] in _dictOutType" :key="key" :label="val"
                                   :value="key"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item>
                    <auto-search-client @changed="myChanged"></auto-search-client>
                </el-form-item>

                <el-form-item>
                    <auto-search-client @changed="myChanged2"></auto-search-client>
                </el-form-item>

                <el-form-item>
                    <el-select v-model="condition.usersId" placeholder="选择制单人" readonly="" clearable>
                        <el-option :key="''" :value="''" label="全部制单人"></el-option>
                        <el-option v-for="item in $store.getters.exploitMap" :key="item.key" :label="item.value"
                                   :value="item.key"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" icon="el-icon-search" class="h32px" @click="loadData"></el-button>
                </el-form-item>

<!--                <el-form-item>-->
<!--                    <el-button type="danger" class="h32px" @click="$router.push({ path: 'OutStorageOrderList'})">新增出库单据</el-button>-->
<!--                </el-form-item>-->

            </el-form>

            <div class="clear0"></div>

            <base-list :condition="condition" ref="myList"
                       :datas.sync="demoList" :pageSearch="pageSearch" :isPaging="true">

                <el-table slot="list" :data="demoList" border>

                    <el-table-column align="left" label="单据编号">
                        <template slot-scope="scope">
                            {{scope.row.code}}
                        </template>
                    </el-table-column>

                    <el-table-column align="left" label="单据日期">
                        <template slot-scope="scope">
                            {{scope.row.happen_date}}
                        </template>
                    </el-table-column>

                    <el-table-column align="left" label="出库类别">
                        <template slot-scope="scope">
                            {{scope.row.type.name}}
                        </template>
                    </el-table-column>

                    <el-table-column align="left" label="出库合计">
                        <template slot-scope="scope">
                            {{scope.row.quantity | _filterNumFormat }}
                        </template>
                    </el-table-column>

                    <el-table-column align="left" label="领用人">
                        <template slot-scope="scope">
                            {{scope.row.receiveName}}
                        </template>
                    </el-table-column>

                    <el-table-column align="left" label="客户姓名">
                        <template slot-scope="scope">
                            {{scope.row.customerName}}
                        </template>
                    </el-table-column>

                    <el-table-column align="left" label="客户电话">
                        <template slot-scope="scope">
                            {{scope.row.customerMobile}}
                        </template>
                    </el-table-column>

                    <el-table-column align="left" label="制单人">
                        <template slot-scope="scope">
                            {{scope.row.userName}}
                        </template>
                    </el-table-column>

                    <el-table-column align="left" label="订单状态" width="100px">
                        <template slot-scope="scope">
                            <template v-if="scope.row.status.id == 0">
                                <p class="w80px h23px lh23px fc-white text-center bg-red4 ">
                                    {{scope.row.status.name}}
                                </p>
                            </template>
                            <template v-else-if="scope.row.status.id == 1">
                                <p class="w80px h23px lh23px fc-white text-center bg-orange2">
                                    {{scope.row.status.name}}
                                </p>
                            </template>
                            <template v-else-if="scope.row.status.id == 2">
                                <p class="w80px h23px lh23px fc-white text-center bg-green6 ">
                                    {{scope.row.status.name}}
                                </p>
                            </template>
                            <template v-else-if="scope.row.status.id == 3">
                                <p class="w80px h23px lh23px fc-white text-center bg-gray">
                                    {{scope.row.status.name}}
                                </p>
                            </template>
                        </template>
                    </el-table-column>

                    <el-table-column align="left" label="操作" width="120px">
                        <template slot-scope="scope">
                            <span class="fc-green2 pointer" @click="$router.push({ path: 'outStorageOrderDetail', query:{ id: scope.row.id } })">查看详情</span>
                        </template>
                    </el-table-column>

                    <el-table-column align="left" label="审核订单" width="120px">
                        <template slot-scope="scope">
                            <template v-if="scope.row.status.id == 1">
                                <template v-if="$store.getters.currentUser.role_id == 2">
                                    <span class="fc-green2 pointer" @click="$router.push({ path: 'OutStorageOrderCheck', query:{ id: scope.row.id } })">审核订单</span>
                                </template>
                                <template v-else>
                                    <span class="fc-white3 pointer">已审核</span>
                                </template>
                            </template>
                            <template v-else>
                                <span class="fc-white3 pointer">已审核</span>
                            </template>
                        </template>
                    </el-table-column>

                </el-table>
            </base-list>

            <div class="clear2"></div>

        </div>

    </div>

</template>

<script>

    import { outboundList } from '@/chain/assets/api/outStorage/outStorage'

    import autoSearchClient from "@/chain/components/autocomplete/autoSearchClient"

    export default {
        name: 'OutStorageRecordList',
        components: { autoSearchClient },
        data() {
            return {
                condition: {
                    good_id: this.$route.query.good_id
                },
                demoList: [],
                pageSearch: outboundList,
            }
        },
        mounted() {

        },
        methods: {

            myChanged(data){
                this.condition.name = data.kw
            },

            myChanged2(data){
                this.condition.mobile = data.kw
            },

            loadData(){
                this.$refs.myList.loadData()
            }
        },

        watch: {

        }

    }
</script>

