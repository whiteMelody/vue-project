<!--form-->
<template>

    <div class="pal24 par24 pat20 pab20">
        <div class="bg-white pal20 par20">
            <p class="fc-gray4 f16px h40px lh40px">请货管理</p>

            <div class="clear0 bd-b1 bd-gray"></div>

            <div class="clear4"></div>

            <el-form :inline="true" :model="condition">

                <el-form-item>
                    <el-input v-model="condition.code" placeholder="请输入单据编号"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-date-picker
                            :clearable="false"
                            v-model="condition.happenDate"
                            type="date"
                            placeholder="请选择单据日期"
                            value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>

                <el-form-item>
                    <el-select v-model="condition.usersId" placeholder="请选择制单人" readonly="" clearable>
                        <el-option :key="''" :value="''" label="全部制单人"></el-option>
                        <el-option v-for="item in $store.getters.staffListMap2" :key="item.key" :label="item.value"
                                   :value="item.key"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" icon="el-icon-search" class="h32px" @click="loadData"></el-button>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" class="h32px" @click="$router.push({ path: 'PleaseGoodsDetail'})">请货制单</el-button>
                </el-form-item>

            </el-form>

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

                    <el-table-column align="center" label="请货数量合计">
                        <template slot-scope="scope">
                            {{scope.row.goodQuantity.quantity | _filterNumFormat }}
                        </template>
                    </el-table-column>

                    <el-table-column align="center" label="制单人">
                        <template slot-scope="scope">
                            {{scope.row.member.name}}
                        </template>
                    </el-table-column>

                    <el-table-column align="center" label="操作" width="120px">
                        <template slot-scope="scope">
                            <span class="fc-blue6 pointer" @click="$router.push({ path: 'PleaseGoodsDetail', query:{ shortage_id: scope.row.id } })">查看详情</span>
                        </template>
                    </el-table-column>

                </el-table>
            </base-list>

            <div class="clear4"></div>

        </div>

    </div>

</template>

<script>

    import { getShortageList } from '@/shop/assets/api/shortage/shortage'

    export default {
        name: 'PleaseGoodsList',
        components: { },
        data() {
            return {
                condition: {},
                demoList: [],
                pageSearch: getShortageList,
            }
        },
        mounted() {

        },
        methods: {

            loadData(){
                this.$refs.myList.loadData()
            }
        },

        watch: {

        }

    }
</script>

