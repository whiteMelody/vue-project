<!--form-->
<template>

    <div class="pal24 par24 pat20 pab20">

        <div class="bg-white pal20 par20">
            <p class="fc-gray4 f16px h40px lh40px">{{title}}</p>

            <div class="clear0 bd-b1 bd-gray"></div>

            <div class="clear4"></div>

            <div class="wb100 f16px">

                <div class="w200px fl">
                    <p class="h30px lh30px fc-gray3">单据日期：{{dataInfo.time}}</p>
                    <div class="clear2"></div>
                    <p class="h30px lh30px fc-gray3">
                        客户姓名：{{dataInfo.customerName}}
                    </p>
                </div>

                <div class="w200px fl mal50 mar50">
                    <p class="h30px lh30px fc-gray3">单据编号：{{dataInfo.code}}</p>
                    <div class="clear2"></div>
                    <p class="h30px lh30px fc-gray3">
                        客户电话：{{dataInfo.customerMobile}}
                    </p>
                </div>

                <div class="w200px fl">
                    <p class="h30px lh30px fc-gray3">出库类别：{{dataInfo.type.name }}</p>
                    <div class="clear2"></div>
                    <p class="h30px lh30px fc-gray3">
                        制单人：{{dataInfo.usersName}}
                    </p>
                </div>

                <div class="w200px fl text-center h70px bd-gray bd-l1 lh30px">
                    <p class="fc-gray3">出库总数量</p>
                    <div class="clear2"></div>
                    <p class="f28px fc-gray4">{{dataInfo.quantity | _filterNumFormat }}</p>
                </div>

            </div>

            <div class="clear4 "></div>

        </div>

        <div class="clear4"></div>

        <div class="pal20 par20 pat24 pab24 bg-white">

            <el-table slot="list" :data="dataInfo.list" border v-if="loaded">

                <el-table-column align="center" label="序号" width="50px">
                    <template slot-scope="scope">
                        {{scope.$index+ 1}}
                    </template>
                </el-table-column>

                <el-table-column align="center" label="商品编码">
                    <template slot-scope="scope">
                        {{scope.row.goodData.code}}
                    </template>
                </el-table-column>

                <el-table-column align="center" label="商品名称">
                    <template slot-scope="scope">
                        {{scope.row.goodData.fullname}}
                    </template>
                </el-table-column>

                <el-table-column align="center" label="商品简称">
                    <template slot-scope="scope">
                        {{scope.row.goodData.title}}
                    </template>
                </el-table-column>

                <el-table-column align="center" label="商品规格">
                    <template slot-scope="scope">
                        {{scope.row.goodData.specifications.title}}
                    </template>
                </el-table-column>

                <el-table-column align="center" label="商品单位">
                    <template slot-scope="scope">
                        {{scope.row.goodData.unit.title}}
                    </template>
                </el-table-column>

                <el-table-column align="center" label="出库数量">
                    <template slot-scope="scope">
                        {{scope.row.quantity | _filterNumFormat }}
                    </template>
                </el-table-column>

                <el-table-column align="center" label="库存数量">
                    <template slot-scope="scope">
                        {{scope.row.stock | _filterNumFormat }}
                    </template>
                </el-table-column>

                <el-table-column align="center" label="供应商">
                    <template slot-scope="scope">
                        {{scope.row.goodData.business.title}}
                    </template>
                </el-table-column>

                <el-table-column align="center" label="备注">
                    <template slot-scope="scope">
                        {{scope.row.remarks}}
                    </template>
                </el-table-column>

            </el-table>

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

        </div>
    </div>

</template>


<script>

    import autoSearch from '@/shop/components/autocomplete/autoSearchCommodity'

    import { outboundGetInfo, outboundExamine } from '@/shop/assets/api/outStorage/outStorage'

    export default {
        name: 'OutStorageOrderCheck',
        components: { autoSearch },
        data() {
            return {
                type: 1,          // 1 出库订单审核  |  2 请货出库审核 |  3 退货出库审核
                title: '',
                happen_date: '',
                dataInfo: {
                    type: {},
                    list: [{
                        goodList: {}
                    }],
                },
                id: '',
                loaded: false,
                examineList: []
            }
        },
        mounted() {

            let id = this.$route.query.id

            this.id = id

            let type = this.$route.query.type

            if(this.$base.isNull(type)){
                type = 1
            }

            this.type = type

            if(type == 1){
                this.title = '出库订单详情'
            }else if(type == 2){
                this.title = '请货出库详情'
            }else if(type == 3){
                this.title = '退货出库详情'
            }

            outboundGetInfo({
                id: id,
            }).then(res=>{
                if(res.status == 0){
                    this.loaded = true
                    this.dataInfo = res.data
                    this.examineList = res.data.examine
                }
            })

        },
        methods: {
            submit(){
                this.$confirm('确定通过该订单?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    outboundExamine({
                        id: this.id,
                        examine: 1,
                        status: 1,
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
                    outboundExamine({
                        id: this.id,
                        examine: 2,
                        status: 2,
                        content: value,
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

            }
        },

        watch: {

        }

    }
</script>

