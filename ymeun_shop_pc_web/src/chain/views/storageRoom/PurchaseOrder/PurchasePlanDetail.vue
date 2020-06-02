<!--form-->
<template>

    <div class="pal24 par24 pat20 pab20">
        <div class="bg-white pal20 par20">
            <p class="fc-gray4 f14px h40px lh40px">采购计划详情</p>

            <div class="clear-f2"></div>

            <div class="clear2"></div>

            <div class="wb100 f14px">
                <span class="fl">单据日期：</span>
                <span class="fl bd-gray bd-b1">{{data.purchase.happen_date}}</span>
                <span class="fl mal20">制单人：</span>
                <span class="fl bd-gray bd-b1 mar10">{{data.purchase.usersName}}</span>
            </div>

            <div class="clear2"></div>

        </div>

        <div class="clear0"></div>

        <div class="bg-white pal20 par20">

            <el-table slot="list" :data="data.list" border class="myTable">

                <el-table-column align="left" label="序号" width="50px">
                    <template slot-scope="scope">
                        {{scope.$index+ 1}}
                    </template>
                </el-table-column>

                <el-table-column align="left" label="商品编码">
                    <template slot-scope="scope">
                        <!-- 商品编码 -->
                        {{scope.row.good.code}}
                    </template>
                </el-table-column>

                <el-table-column align="left" label="商品名称">
                    <template slot-scope="scope">
                        <!-- 商品名称 -->
                        {{scope.row.good.fullname}}
                    </template>
                </el-table-column>

                <el-table-column align="left" label="商品简称">
                    <template slot-scope="scope">
                        <!-- 商品简称 -->
                        {{scope.row.good.title}}
                    </template>
                </el-table-column>

                <el-table-column align="left" label="商品单位">
                    <template slot-scope="scope">
                        {{scope.row.good.unit.title}}
                    </template>
                </el-table-column>

                <el-table-column align="left" label="供应商" >
                    <template slot-scope="scope">
                        <!-- 供应商 -->
                        {{scope.row.good.business.fullname}}
                    </template>
                </el-table-column>

                <el-table-column align="left" label="要货门店" width="200px">
                    <template slot-scope="scope">
                        <template v-for="(item,index) in scope.row.stores">
                            <p class="h40px lh40px" style="width:220px; margin-left: -10px;" :class="index < scope.row.stores.length-1 ? 'bd-gray bd-b1' : '' ">{{item.store.name}}</p>
                        </template>
                    </template>
                </el-table-column>

                <el-table-column align="left" label="要货数量" width="120px">
                    <template slot-scope="scope">
                        <template v-for="(item,index) in scope.row.stores">
                            <p class="h40px lh40px" style="width:140px; margin-left: -10px;" :class="index < scope.row.stores.length-1 ? 'bd-gray bd-b1' : '' ">
                                {{item.quantity | _filterNumFormat }}
                            </p>
                        </template>
                    </template>
                </el-table-column>

                <el-table-column align="left" label="备注">
                    <template slot-scope="scope">
                        {{scope.row.remarks}}
                    </template>
                </el-table-column>

            </el-table>

            <!--      合计      -->
            <div class="pal20 par20 h34px lh34px bd-gray bd-b1 bd-l1 bd-r1 f14px">
                <span class="fl">合计</span>
                <span class="fr fc-gray3">请货总数量：{{sumQuantity}}</span>
            </div>

            <div class="clear h70px"></div>

            <template v-if="data.purchase.status == 2">
                <template v-if="disabled">
                    <el-button type="primary" class="fr minW100" disabled>提交中...</el-button>
                </template>
                <template v-else>
                    <el-button type="primary" class="fr minW100" @click="submit">生成采购订单</el-button>
                </template>
                <el-button class="fr mal20 mar20 minW100" @click="back">取消</el-button>
            </template>

            <div class="clear2"></div>

        </div>
    </div>

</template>

<script>

    import { purchaseGetInfo, purchaseAdd, saveByPurchaseId  } from '@/chain/assets/api/purchase/purchase'

    export default {
        name: 'PurchasePlan',
        components: {  },
        data() {
            return {
                sumQuantity: 0,
                purchase_id: '',
                data: {
                    list: [],
                    purchase: {},
                },
                disabled: false,
            }
        },
        mounted() {
            this.demoList = []
            this.happen_date = this.$base.timestampToDateString(new Date().getTime() / 1000, 'date2')

            this.purchase_id = this.$route.query.purchase_id

            purchaseGetInfo({
                purchase_id: this.purchase_id,
            }).then(res=>{
                if(res.status == 0){
                    this.data = res.data
                    this.sumQuantity = res.data.purchase.quantity
                }
            })

        },
        methods: {

            submit(){
                this.disabled = true
                saveByPurchaseId({
                    purchaseId: this.purchase_id
                }).then(res=>{
                    this.disabled = false
                    if(res.status == 0){
                        this.$message({
                            showClose: true,
                            message: '采购计划制单成功',
                            type: "success",
                            duration: "1000",
                            onClose: () => {
                                this.$router.go(-1);
                            }
                        });
                    }else{
                        this.disabled = false
                    }
                })

            },

            back(){
                this.$router.go(-1)
            },

        },

    }
</script>

