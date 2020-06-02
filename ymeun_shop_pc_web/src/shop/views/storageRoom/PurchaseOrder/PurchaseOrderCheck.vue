<!--form-->
<template>

    <div class="pal24 par24 pat20 pab20">
        <div class="bg-white pal20 par20">
            <p class="fc-gray4 f16px h40px lh40px">采购订单审核</p>

            <div class="clear0 bd-b1 bd-gray"></div>

            <div class="clear4"></div>

            <div class="wb100 f16px">
                <p class="h30px lh30px fc-gray2">订单基本信息</p>
                <p class="h30px lh30px fc-gray3">
                    <span class="fl">单据日期：{{happen_date}} </span>
                    <span class="fl mal50">制单人：{{userName}} </span>
                </p>
            </div>

            <div class="clear4"></div>

        </div>

        <div class="clear4"></div>

        <div class="bg-white pal20 par20">

            <div class="clear4"></div>

            <el-table slot="list" :data="demoList" border class="myTable">

                <el-table-column align="center" label="序号" width="50px">
                    <template slot-scope="scope">
                        {{scope.$index+ 1}}
                    </template>
                </el-table-column>

                <el-table-column align="center" label="商品编码">
                    <template slot-scope="scope">
                       {{scope.row.code}}
                    </template>
                </el-table-column>

                <el-table-column align="center" label="商品名称">
                    <template slot-scope="scope">
                       {{scope.row.fullname}}
                    </template>
                </el-table-column>

                <el-table-column align="center" label="商品简称">
                    <template slot-scope="scope">
                        {{scope.row.title}}
                    </template>
                </el-table-column>

                <el-table-column align="center" label="商品单位">
                    <template slot-scope="scope">
                        {{scope.row.unit.title}}
                    </template>
                </el-table-column>

                <el-table-column align="center" label="采购数量">
                    <template slot-scope="scope">
                        {{scope.row.quantity | _filterNumFormat }}
                    </template>
                </el-table-column>

                <el-table-column align="center" label="备注">
                    <template slot-scope="scope">
                        {{scope.row.remarks}}
                    </template>
                </el-table-column>

            </el-table>

            <!--      合计      -->
            <div class="pal20 par20 h60px lh60px bd-gray bd-b1 bd-l1 bd-r1 f16px">
                <span class="fl f18px">合计</span>
                <span class="fr fc-gray3">
                    采购总数量：{{sumQuantity}}
                </span>
            </div>

            <div class="clear4"></div>

            <div class="wb100" v-if="examineList.length > 0">
                <p class="fc-gray4 f16px h40px lh40px">审核记录</p>
                <div class="clear0 bd-b1 bd-gray"></div>
                <div class="clear4"></div>

                <el-table slot="list" :data="examineList">
                    <el-table-column align="center" label="订单状态" width="100px">
                        <template slot-scope="scope">
                            <template v-if="scope.row.status.value == 3">
                                <p class="w80px h23px lh23px fc-white text-center bg-orange2">
                                    {{scope.row.status.label}}
                                </p>
                            </template>
                            <template v-else-if="scope.row.status.value == 0">
                                <p class="w80px h23px lh23px fc-white text-center bg-gray5">
                                    {{scope.row.status.label}}
                                </p>
                            </template>
                            <template v-else-if="scope.row.status.value == 1">
                                <p class="w80px h23px lh23px fc-white text-center bg-blue12">
                                    {{scope.row.status.label}}
                                </p>
                            </template>
                            <template v-else-if="scope.row.status.value == 2">
                                <p class="w80px h23px lh23px fc-white text-center bg-green6">
                                    {{scope.row.status.label}}
                                </p>
                            </template>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="审核时间">
                        <template slot-scope="scope">
                            {{scope.row.time}}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="审核人">
                        <template slot-scope="scope">
                            {{scope.row.members.name}}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="失败原因">
                        <template slot-scope="scope">
                            {{scope.row.content}}
                        </template>
                    </el-table-column>
                </el-table>

            </div>

            <div class="clear h70px"></div>

            <template v-if="$store.getters.currentUser.compose.id == 2 && $store.getters.currentUser.role_id == 2">
                <template v-if="status == 1">
                    <el-button type="primary" class="fr w100px" @click="submit">审核通过</el-button>
                    <el-button class="fr mal50 mar50 w100px" @click="cancel">审核不通过</el-button>
                </template>
            </template>

            <div class="clear4"></div>

        </div>
    </div>

</template>


<script>

    import { getInfo, save, saveByPurchaseId, examine } from '@/shop/assets/api/purchase/purchase'

    import { getListBySearch } from  "@/shop/assets/api/store/store"

    import { formatArrayToMap, formatArrayToStringMap } from "@/shop/utils/format"

    export default {
        name: 'PurchaseOrderCheck',
        components: { },
        data() {
            return {
                form: {
                    business_id: '',
                },
                demoList: [],
                happen_date: '',
                sumQuantity: 0,
                taskId: 0,

                code:{
                    cb: {},
                    restaurants: [],
                    timeout: 0,
                    list: [],
                },
                title:{
                    cb: {},
                    restaurants: [],
                    timeout: 0,
                    visible: false,
                    activeIndex: 0,
                    list: [],
                },
                fullname:{
                    cb: {},
                    restaurants: [],
                    timeout: 0,
                    visible: false,
                    activeIndex: 0,
                    list: [],
                },
                orderId: '',
                userName: '',
                userId: '',

                examineList: [],
                status: '',
            }
        },
        mounted() {
            this.demoList = []
            this.happen_date = this.$base.timestampToDateString(new Date().getTime() / 1000, 'date2')

            this.taskId = this.$route.query.taskId

            let orderId = this.$route.query.orderId

            this.orderId = orderId

            this.userId = this.$store.getters.currentUser.users_id

            if(this.$base.isNull(orderId)){
                //新增
                this.addCommodity()

                this.userName = this.$store.getters.currentUser.name
                this.userId = this.$store.getters.currentUser.users_id

            }else{
                //编辑
                getInfo({
                    orderId: orderId
                }).then(res=>{
                    if(res.status == 0){

                        let _tmp = res.data.good

                        this.status = res.data.order.status

                        this.form.business_id = res.data.order.business_id
                        this.happen_date = res.data.order.happen_date

                        if(res.data.examine.length){
                            this.userName = res.data.examine[0].members.name
                        }

                        let _arr = []

                        for(let i=0; i< _tmp.length; i++){
                            let _g =_tmp[i].good
                            _g.quantity = _tmp[i].quantity
                            _g.remarks = _tmp[i].remarks
                            _arr.push(_g)
                        }

                        this.demoList = _arr

                        this.sumQuantity = res.data.purchase.quantity

                        this.examineList = res.data.examine

                    }
                })
            }

        },
        methods: {
            submit(){
                this.$confirm('确定通过该订单?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    examine({
                        orderId: this.orderId,
                        examine: 1,
                        status: 1,
                        task_id: this.taskId,
                    }).then(res=>{
                        if(res.status == 0){
                            this.$message({
                                message: '审核通过',
                                type: 'success',
                                onClose: () => {
                                    this.$router.go(-1)
                                }
                            });
                        }else{
                            this.$message({
                                showClose: true,
                                message: res.msg,
                                type: 'error',
                            });
                        }
                    }).catch(error=>{
                        this.$message({
                            showClose: true,
                            message: error,
                            type: 'error',
                        });
                    })
                })
            },

            cancel(){
                this.$prompt('不通过原因', '确定不通过该订单?', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value }) => {
                    examine({
                        orderId: this.orderId,
                        examine: 0,
                        status: 0,
                        content: value,
                        task_id: this.taskId,
                    }).then(res=>{
                        if(res.status == 0){
                            this.$message({
                                message: '审核不通过',
                                type: 'info',
                                onClose: () => {
                                    this.$router.go(-1)
                                }
                            });
                        }else{
                            this.$message({
                                showClose: true,
                                message: res.msg,
                                type: 'error',
                            });
                        }
                    }).catch(error=>{
                        this.$message({
                            showClose: true,
                            message: error,
                            type: 'error',
                        });
                    })
                }).catch(() => {

                });

            },

            calculateTotal(){
                //计算总价
                let _sumQuantity = 0
                for(let i=0; i<this.demoList.length; i++){
                    _sumQuantity += this.demoList[i].quantity ? Number.parseFloat(this.demoList[i].quantity) : 0
                }
                this.sumQuantity = isNaN(_sumQuantity) ? 0 : this.$base.twoDecimal(_sumQuantity)
            },

        },

        watch:{
            demoList:{
                handler(newValue, oldValue){
                    this.calculateTotal()
                },
                deep:true
            }
        }

    }
</script>

