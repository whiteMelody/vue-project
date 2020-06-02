<!--form-->
<template>

    <div class="pal24 par24 pat20 pab20">
        <div class="bg-white pal20 par20">
            <p class="fc-gray4 f14px h40px lh40px">门店请货表</p>

            <div class="clear-f2"></div>

            <div class="clear2"></div>

            <div class="wb100">

                <el-form :inline="true" :model="condition">

                    <el-form-item>
                        <el-input v-model="condition.code" placeholder="请输入单据编号"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-date-picker
                                v-model="condition.happenDate"
                                :clearable="false"
                                type="date"
                                placeholder="请选择单据日期"
                                value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </el-form-item>

                    <el-form-item>
                        <el-select v-model="condition.status" placeholder="全部采购状态">
                            <el-option v-for="[key, val] in _dictPurchaseOrderStatus" :key="key" :label="val"
                                       :value="key"></el-option>
                        </el-select>
                    </el-form-item>

                    <!--连锁端可选择门店-->
                    <el-form-item>
                        <el-select v-model="condition.demandStoreId" placeholder="选择请货门店" readonly="" clearable>
                            <el-option :key="''" :value="''" label="全部请货门店"></el-option>
                            <el-option v-for="item in $store.getters.shopListMap" :key="item.key" :label="item.value"
                                       :value="item.key"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" icon="el-icon-search" class="h32px" @click="loadData"></el-button>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" class="h32px" @click="$router.push({ path: 'PurchasePlanList'})">采购计划表</el-button>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" class="h32px" @click="creatPlan">生成采购计划</el-button>
                    </el-form-item>

                </el-form>

                <div class="clear0"></div>

                <base-list :condition="condition" ref="myList"
                           :datas.sync="demoList" :pageSearch="pageSearch" :isPaging="true">

                    <el-table slot="list" :data="demoList" border
                              @selection-change="handleSelectionChange">
                        <el-table-column
                                type="selection"
                                :selectable='selectable'
                                width="55">
                        </el-table-column>

                        <el-table-column align="left" label="单据编号">
                            <template slot-scope="scope">
                                {{ scope.row.code }}
                            </template>
                        </el-table-column>

                        <el-table-column align="left" label="单据日期">
                            <template slot-scope="scope">
                                {{ scope.row.happen_date}}
                            </template>
                        </el-table-column>

                        <el-table-column align="left" label="请货门店">
                            <template slot-scope="scope">
                                {{ scope.row.store.name }}
                            </template>
                        </el-table-column>

                        <el-table-column align="left" label="请货数量合计">
                            <template slot-scope="scope">
                                {{ scope.row.goodQuantity.quantity | _filterNumFormat }}
                            </template>
                        </el-table-column>

                        <el-table-column align="left" label="采购计划" width="100px">
                            <template slot-scope="scope">
                                <template v-if="scope.row.status.value == 1">
                                    <p class="w80px h23px lh23px fc-white text-center bg-orange2">
                                        {{scope.row.status.name}}
                                    </p>
                                </template>
                                <template v-else-if="scope.row.status.value == 2">
                                    <p class="w80px h23px lh23px fc-white text-center bg-blue12">
                                        {{scope.row.status.name}}
                                    </p>
                                </template>
                                <template v-else-if="scope.row.status.value == 3">
                                    <p class="w80px h23px lh23px fc-white text-center bg-green6">
                                        {{scope.row.status.name}}
                                    </p>
                                </template>
                            </template>
                        </el-table-column>

                        <el-table-column align="left" label="操作" width="120px">
                            <template slot-scope="scope">
                                <span class="fc-green2 pointer" @click="$router.push({ path: 'StorePleaseGoodsDetail', query:{ shortage_id: scope.row.id } })">查看详情</span>
                            </template>
                        </el-table-column>

                    </el-table>
                </base-list>

                <div class="clear2"></div>

            </div>

        </div>
    </div>

</template>

<script>

    import { getShortageList } from '@/chain/assets/api/pleaseGoods/pleaseGoods'

    import { purchaseAdd, purchaseGetInfo } from '@/chain/assets/api/purchase/purchase'

  export default {
      name: 'StorePleaseGoodsList',
      components: {  },
    data() {
      return {
          condition: {},
          demoList: [],
          pageSearch: getShortageList,
          multipleSelection: [],
      }
    },
    mounted() {

    },
    methods: {

        selectable(row, index){
            if(row.status.value == 1)
            return true
        },

        loadData(){
            this.$refs.myList.loadData()
        },

        handleSelectionChange(val) {
            this.multipleSelection = val
        },

        //生成采购计划
        creatPlan(){

            if(!this.multipleSelection.length){
                this.$message({
                    message: '请选择请货数据',
                    type: "error",
                });
                return
            }

            let _arr = []
            let _sumQuantity = 0

            for(let i=0; i<this.multipleSelection.length; i++){
                _arr.push(this.multipleSelection[i].id)
                _sumQuantity += this.multipleSelection[i].goodQuantity.quantity
            }
            // return

            purchaseAdd({
                e_id: this.$store.getters.currentUser.e_id,
                users_id: this.$store.getters.currentUser.users_id,
                shortage_ids: JSON.stringify(_arr),
                quantity: _sumQuantity,
            }).then(res=>{

                if(res.status == 0){
                    this.$router.push({
                        path: 'PurchasePlan',
                        query: {purchase_id: res.data}
                    })
                }else{
                    this.$message({
                        message: res.msg,
                        type: 'error'
                    })
                }

            })

        },

    },

    watch: {

    }

  }
</script>

