<!--form-->
<template>

    <div class="pal24 par24 pat20 pab20">

        <div class="bg-white pal20 par20">
            <p class="fc-gray4 f16px h40px lh40px">{{title}}</p>

            <div class="clear0 bd-b1 bd-gray"></div>

            <div class="clear4"></div>

            <div class="wb100 f16px">

                <div class="w300px fl">
                    <p class="h30px lh30px fc-gray3">单据日期：{{dataInfo.created_at}}</p>
                    <div class="clear2"></div>
                    <p class="h30px lh30px fc-gray3">
                        制单人：{{dataInfo.member.name}}
                    </p>
                </div>

                <div class="w200px fl text-center h70px bd-gray bd-l1 lh30px">
                    <p class="fc-gray3">入库总数量</p>
                    <div class="clear2"></div>
                    <p class="f28px fc-gray4">{{dataInfo.quantity | _filterNumFormat }}</p>
                </div>

                <div class="w200px fl text-center h70px lh30px">
                    <p class="fc-gray3">入库总单价（元）</p>
                    <div class="clear2"></div>
                    <p class="f28px fc-gray4">{{dataInfo.price | _filterNumFormat }}</p>
                </div>

            </div>

            <div class="clear4 "></div>

        </div>

        <div class="clear4"></div>

        <div class="pal20 par20 pat24 pab24 bg-white">

            <el-table slot="list" :data="dataInfo.good" border>

                <el-table-column align="center" label="序号" width="50px">
                    <template slot-scope="scope">
                        {{scope.$index+ 1}}
                    </template>
                </el-table-column>

                <el-table-column align="center" label="商品编码">
                    <template slot-scope="scope">
                        {{scope.row.good.code}}
                    </template>
                </el-table-column>

                <el-table-column align="center" label="商品名称">
                    <template slot-scope="scope">
                        {{scope.row.good.fullname}}
                    </template>
                </el-table-column>

                <el-table-column align="center" label="商品简称">
                    <template slot-scope="scope">
                        {{scope.row.good.title}}
                    </template>
                </el-table-column>

                <el-table-column align="center" label="商品规格">
                    <template slot-scope="scope">
                        {{scope.row.good.specifications.title}}
                    </template>
                </el-table-column>

                <el-table-column align="center" label="商品单位">
                    <template slot-scope="scope">
                        {{scope.row.good.unit.title}}
                    </template>
                </el-table-column>

                <el-table-column align="center" label="入库数量">
                    <template slot-scope="scope">
                        {{scope.row.quantity | _filterNumFormat }}
                    </template>
                </el-table-column>

                <el-table-column align="center" label="入库单价">
                    <template slot-scope="scope">
                        {{scope.row.price | _filterNumFormat }}
                    </template>
                </el-table-column>

                <el-table-column align="center" label="供应商">
                    <template slot-scope="scope">
                        {{scope.row.good.business.title}}
                    </template>
                </el-table-column>

                <el-table-column align="center" label="生产日期" width="150px">
                    <template slot-scope="scope">
                        {{scope.row.produce_date}}
                    </template>
                </el-table-column>

                <el-table-column align="center" label="到期日期" width="150px">
                    <template slot-scope="scope">
                        {{scope.row.expire_date}}
                    </template>
                </el-table-column>

                <el-table-column align="center" label="税率">
                    <template slot-scope="scope">
                        {{scope.row.good.tax}}%
                    </template>
                </el-table-column>

            </el-table>

            <div class="clear h70px"></div>

            <template v-if="type == 1">
<!--                <el-button class="fr mal50 mar50 w100px" @click="back">返回</el-button>-->
            </template>
            <template v-else-if="type == 2">
                <template v-if="disabled">
                    <el-button type="primary" class="fr w100px" disabled>提交中...</el-button>
                    <el-button class="fr mal50 mar50 w100px" disabled>提交中...</el-button>
                </template>
                <template v-else>
                    <el-button type="primary" class="fr w100px" @click="affirm">确认收货</el-button>
                    <el-button class="fr mal50 mar50 w100px" @click="cancel">拒绝收货</el-button>
                </template>
            </template>
            <template v-else-if="type == 3">
                <template v-if="disabled">
                    <el-button type="primary" class="fr w100px" disabled>提交中...</el-button>
                </template>
                <template v-else>
                    <el-button type="primary" class="fr w100px" @click="affirm">确认收货</el-button>
                </template>
            </template>
            <template v-else-if="type == 4">
                <template v-if="disabled">
                    <el-button type="primary" class="fr w100px" disabled>提交中...</el-button>
                    <el-button class="fr mal50 mar50 w100px" disabled>提交中...</el-button>
                </template>
                <template v-else>
                    <el-button type="primary" class="fr w100px" @click="affirm">确认收货</el-button>
                    <el-button class="fr mal50 mar50 w100px" @click="cancel">拒绝收货</el-button>
                </template>
            </template>

            <div class="clear4"></div>

        </div>
    </div>

</template>


<script>

    import { getInfo, delivery, allocationTaskChange, getAllocationDetails } from '@/shop/assets/api/inStorage/inStorage'

  export default {
      name: 'InStorageOrderDetail',
      components: { },
    data() {
      return {
          warehouseId: 0,
          type: 1,          // 1 收货入库详情页  |  2 调拨入库制单   | 3 调拨退货入库  | 4 请货入库
          title: '',
          happen_date: '',
          dataInfo: {
              member: {}
          },
          taskId: 0,
          disabled: false,
      }
    },
    mounted() {

          let warehouseId = this.$route.query.id

        let type = this.$route.query.type

        this.warehouseId = warehouseId
        this.taskId = this.$route.query.taskId

        if(this.$base.isNull(type)){
            type = 1
        }

        this.type = type

        if(type == 1){
            this.title = '收货入库详情页'
        }else if(type == 2){
            this.title = '调拨入库制单'
        }else if(type == 3){
            this.title = '调拨退货入库'
        }else if(type == 4){
            this.title = '请货入库'
        }

        getInfo({
            warehouseId: warehouseId,
        }).then(res=>{
            if(res.status == 0){
                this.dataInfo = res.data
            }
        })

    },
    methods: {

        affirm(){

            this.disabled = true

            delivery({
                warehouseId: this.warehouseId,
                status: 1,
                task_id: this.taskId,
            }).then(res=>{
                if(res.status == 0){
                    this.$message({
                        message: '确认收货成功',
                        type: 'success',
                        onClose: () => {
                            this.$router.go(-1)
                        }
                    });
                }else{
                    this.disabled = false
                    this.$message({
                        showClose: true,
                        message: res.msg,
                        type: 'error',
                    });
                }
            })
        },

        cancel(){

            this.disabled = true

            delivery({
                warehouseId: this.warehouseId,
                status: 2,
                task_id: this.taskId,
            }).then(res=>{
                if(res.status == 0){
                    this.$message({
                        message: '取消收货成功',
                        type: 'success',
                        onClose: () => {
                            this.$router.go(-1)
                        }
                    });
                }else{
                    this.disabled = false
                    this.$message({
                        showClose: true,
                        message: res.msg,
                        type: 'error',
                    });
                }
            })
        },

        submit(){

            this.disabled = true

            let _arr = []
            for(let i=0; i<this.dataInfo.good.length; i++){
                let _tmp = this.dataInfo.good[i]
                _arr.push({
                    good_id: _tmp.good_id,
                    quantity: _tmp.quantity,
                    price: _tmp.price,
                })
            }

            allocationTaskChange({
                allocationId: this.warehouseId,
                goodData: JSON.stringify(_arr),
                isComplete: 1,
                task_id: this.taskId,
            }).then(res=>{
                this.disabled = false
                if(res.status == 0){
                    this.$message({
                        message: '调拨退货入库成功',
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
            })
        },

        loadData(){

        },

        back(){
              this.$router.go(-1)
        }
    },

    watch: {

    }

  }
</script>

