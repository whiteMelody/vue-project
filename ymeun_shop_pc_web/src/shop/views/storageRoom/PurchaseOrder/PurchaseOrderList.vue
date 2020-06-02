<!--form-->
<template>

    <div class="pal24 par24 pat20 pab20">
        <div class="bg-white pal20 par20">
            <p class="fc-gray4 f16px h40px lh40px">采购订单列表</p>

            <div class="clear0 bd-b1 bd-gray"></div>

            <div class="clear4"></div>

            <el-form :inline="true" :model="condition">

                <el-form-item>
                    <el-input v-model="condition.code" placeholder="请输入单据编号"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-date-picker
                            :clearable="false"
                            v-model="condition.happen_date"
                            type="date"
                            placeholder="请选择单据日期"
                            value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>

                <el-form-item>
                    <el-select v-model="condition.usersId" placeholder="选择制单人" readonly="" clearable>
                        <el-option :key="''" :value="''" label="全部制单人"></el-option>
                        <el-option v-for="item in $store.getters.staffListMap2" :key="item.key" :label="item.value"
                                   :value="item.key"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item>
                    <el-select v-model="condition.status" placeholder="全部采购状态">
                        <el-option v-for="[key, val] in _dictPurchaseOrderStatus" :key="key" :label="val"
                                   :value="key"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" icon="el-icon-search" class="h32px" @click="loadData"></el-button>
                </el-form-item>

                <el-form-item v-if="$store.getters.currentUser.compose.id == 1">
                    <el-button type="primary" class="h32px" @click="$router.push({ path: 'StorePleaseGoodsList' })">门店请货列表</el-button>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" class="h32px" @click="$router.push({ path: 'PurchaseOrder' })">采购制单</el-button>
                </el-form-item>

            </el-form>

            <div class="clear4"></div>

            <base-list :condition="condition" ref="myList"
                       :datas.sync="demoList" :pageSearch="pageSearch" :isPaging="true">

                <el-table slot="list" :data="demoList" border>

                    <el-table-column align="center" label="单据编号">
                        <template slot-scope="scope">
                            {{scope.row.code}}
                        </template>
                    </el-table-column>

                    <el-table-column align="center" label="单据日期">
                        <template slot-scope="scope">
                            {{scope.row.happen_date}}
                        </template>
                    </el-table-column>

                    <el-table-column align="center" label="供应商">
                        <template slot-scope="scope">
                            {{scope.row.business.fullname}}
                        </template>
                    </el-table-column>

                    <el-table-column align="center" label="采购数量合计">
                        <template slot-scope="scope">
                            {{scope.row.quantity | _filterNumFormat }}
                        </template>
                    </el-table-column>

                    <el-table-column align="center" label="采购状态" width="100px">
                        <template slot-scope="scope">

                            <template v-if="scope.row.status.value == 3">
                                <p class="w80px h23px lh23px fc-white text-center bg-gray">
                                    {{scope.row.status.label}}
                                </p>
                            </template>
                            <template v-else-if="scope.row.status.value == 2">
                                <p class="w80px h23px lh23px fc-white text-center bg-blue12">
                                    {{scope.row.status.label}}
                                </p>
                            </template>
                            <template v-else-if="scope.row.status.value == 1">
                                <p class="w80px h23px lh23px fc-white text-center bg-orange2">
                                    {{scope.row.status.label}}
                                </p>
                            </template>
                            <template v-else-if="scope.row.status.value == 0">
                                <p class="w80px h23px lh23px fc-white text-center bg-green6">
                                    {{scope.row.status.label}}
                                </p>
                            </template>

                        </template>
                    </el-table-column>

                    <el-table-column align="center" label="制单人">
                        <template slot-scope="scope">
                            {{scope.row.member.name}}
                        </template>
                    </el-table-column>

                    <el-table-column align="center" label="操作" width="120px">
                        <template slot-scope="scope">
                            <span class="fc-blue6 pointer" @click="$router.push({ path: 'PurchaseOrder', query:{ orderId: scope.row.id } })">查看详情</span>
                        </template>
                    </el-table-column>

                    <el-table-column align="center" label="审核订单" width="120px">
                        <template slot-scope="scope">
                            <template v-if="scope.row.status.value == 1">
                                <template v-if="$store.getters.currentUser.role_id == 2">
                                    <span class="fc-blue6 pointer" @click="$router.push({ path: 'PurchaseOrderCheck', query:{ orderId: scope.row.id } })">审核订单</span>
                                </template>
                                <template v-else>
                                    <span class="fc-white3 pointer">待审核</span>
                                </template>
                            </template>
                            <template v-else>
                                <span class="fc-white3 pointer">已审核</span>
                            </template>
                        </template>
                    </el-table-column>

                </el-table>
            </base-list>

            <div class="clear4"></div>

        </div>

    </div>

</template>

<script>

    import { getList } from '@/shop/assets/api/purchase/purchase'

    export default {
        name: 'PurchaseOrderList',
        components: {  },
        data() {
            return {
                condition: {},
                demoList: [],
                pageSearch: getList,
            }
        },
        mounted() {

        },
        methods: {
            loadData(){
                this.$refs.myList.loadData()
            },
        },

        watch: {

        }

    }
</script>

