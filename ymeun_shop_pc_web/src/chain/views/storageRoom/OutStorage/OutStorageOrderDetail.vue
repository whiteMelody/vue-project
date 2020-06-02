<!--form-->
<template>

    <div class="pal24 par24 pat20 pab20">

        <div class="bg-white pal20 par20">
            <p class="fc-gray4 f14px h40px lh40px">{{title}}</p>

            <div class="clear-f2"></div>

            <div class="clear2"></div>

            <div class="wb100 f14px">

                <div class="wb100 f14px">
                    <p class="h30px lh30px fc-gray3">
                        <span class="fl">单据日期：</span>
                        <span class="fl bd-gray bd-b1">{{dataInfo.time}}</span>
                        <span class="fl mal50">客户姓名：</span>
                        <span class="fl bd-gray bd-b1">{{dataInfo.customerName}}</span>
                        <span class="fl mal50">单据编号：</span>
                        <span class="fl bd-gray bd-b1">{{dataInfo.code}}</span>
                        <span class="fl mal50">客户电话：</span>
                        <span class="fl bd-gray bd-b1">{{dataInfo.customerMobile}}</span>
                        <span class="fl mal50">出库类别：</span>
                        <span class="fl bd-gray bd-b1">{{dataInfo.type.name}}</span>
                        <span class="fl mal50">制单人：</span>
                        <span class="fl bd-gray bd-b1">{{dataInfo.usersName}}</span>
                    </p>
                </div>

                <div class="clear2"></div>

                <div class="pa20 bg-white4">
                    <div class="w150px fl h40px lh40px text-center bd-gray bd-r1 fc-gray4 mar50">
                        出库合计
                    </div>
                    <div class="w150px fl h40px lh15px mar50">
                        <p class="fc-gray2">出库总数量</p>
                        <p class="Fb fc-gray4 f20px mat10">{{dataInfo.quantity | _filterNumFormat }}</p>
                    </div>

                    <div class="clear0"></div>
                </div>

            </div>

            <div class="clear2"></div>

        </div>

        <div class="pal20 par20 bg-white">

            <el-table slot="list" :data="dataInfo.list" border v-if="loaded">

                <el-table-column align="left" label="序号" width="50px">
                    <template slot-scope="scope">
                        {{scope.$index+ 1}}
                    </template>
                </el-table-column>

                <el-table-column align="left" label="商品编码">
                    <template slot-scope="scope">
                        {{scope.row.goodData.code}}
                    </template>
                </el-table-column>

                <el-table-column align="left" label="商品名称">
                    <template slot-scope="scope">
                        {{scope.row.goodData.fullname}}
                    </template>
                </el-table-column>

                <el-table-column align="left" label="商品简称">
                    <template slot-scope="scope">
                        {{scope.row.goodData.title}}
                    </template>
                </el-table-column>

                <el-table-column align="left" label="商品规格">
                    <template slot-scope="scope">
                        {{scope.row.goodData.specifications.title}}
                    </template>
                </el-table-column>

                <el-table-column align="left" label="商品单位">
                    <template slot-scope="scope">
                        {{scope.row.goodData.unit.title}}
                    </template>
                </el-table-column>

                <el-table-column align="left" label="出库数量">
                    <template slot-scope="scope">
                        {{scope.row.quantity | _filterNumFormat }}
                    </template>
                </el-table-column>

                <el-table-column align="left" label="库存数量">
                    <template slot-scope="scope">
                        {{scope.row.stock | _filterNumFormat }}
                    </template>
                </el-table-column>

                <el-table-column align="left" label="供应商">
                    <template slot-scope="scope">
                        {{scope.row.goodData.business.title}}
                    </template>
                </el-table-column>

                <el-table-column align="left" label="备注">
                    <template slot-scope="scope">
                        {{scope.row.remarks}}
                    </template>
                </el-table-column>

            </el-table>

            <div class="clear0"></div>

            <div class="wb100" v-if="examineList.length > 0">
                <p class="fc-gray4 f14px h40px lh40px">审核记录</p>
                <div class="clear0 bd-b1 bd-gray"></div>
                <div class="clear4"></div>

                <el-table slot="list" :data="examineList">
                    <el-table-column align="left" label="订单状态" width="100px">
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
                    <el-table-column align="left" label="审核时间">
                        <template slot-scope="scope">
                            {{scope.row.time}}
                        </template>
                    </el-table-column>
                    <el-table-column align="left" label="审核人">
                        <template slot-scope="scope">
                            {{scope.row.members.name}}
                        </template>
                    </el-table-column>
                    <el-table-column align="left" label="失败原因">
                        <template slot-scope="scope">
                            {{scope.row.content}}
                        </template>
                    </el-table-column>
                </el-table>

            </div>

            <div class="clear2"></div>

        </div>
    </div>

</template>


<script>

    import autoSearch from '@/chain/components/autocomplete/autoSearchCommodity'

    import { outboundGetInfo, outboundExamine } from '@/chain/assets/api/outStorage/outStorage'

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
                // this.$message({
                //     showClose: true,
                //     message: '未知的出库订单类型',
                //     type: "error"
                // });
                // return
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

