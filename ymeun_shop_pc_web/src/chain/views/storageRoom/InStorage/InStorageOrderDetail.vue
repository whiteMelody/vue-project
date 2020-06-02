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
                        <span class="fl bd-gray bd-b1">{{dataInfo.created_at}}</span>
                        <span class="fl mal50">制单人：</span>
                        <span class="fl bd-gray bd-b1">{{dataInfo.member.name}}</span>
                    </p>
                </div>

                <div class="clear2"></div>

                <div class="pa20 bg-white4">
                    <div class="w150px fl h40px lh40px text-center bd-gray bd-r1 fc-gray4 mar50">
                        入库合计
                    </div>
                    <div class="w150px fl h40px lh15px mar50">
                        <p class="fc-gray2">入库总数量</p>
                        <p class="Fb fc-gray4 f20px mat10">{{dataInfo.quantity | _filterNumFormat }}</p>
                    </div>
                    <div class="w150px fl h40px lh15px mar50">
                        <p class="fc-gray2">入库总单价（元）</p>
                        <p class="Fb fc-gray4 f20px mat10">{{dataInfo.price | _filterNumFormat }}</p>
                    </div>
                    <div class="clear0"></div>
                </div>

            </div>

            <div class="clear3"></div>

        </div>

        <div class="pal20 par20 bg-white">

            <el-table slot="list" :data="dataInfo.good" border>

                <el-table-column align="left" label="序号" width="50px">
                    <template slot-scope="scope">
                        {{scope.$index+ 1}}
                    </template>
                </el-table-column>

                <el-table-column align="left" label="商品编码">
                    <template slot-scope="scope">
                        {{scope.row.good.code}}
                    </template>
                </el-table-column>

                <el-table-column align="left" label="商品名称">
                    <template slot-scope="scope">
                        {{scope.row.good.fullname}}
                    </template>
                </el-table-column>

                <el-table-column align="left" label="商品简称">
                    <template slot-scope="scope">
                        {{scope.row.good.title}}
                    </template>
                </el-table-column>

                <el-table-column align="left" label="商品规格">
                    <template slot-scope="scope">
                        {{scope.row.good.specifications.title}}
                    </template>
                </el-table-column>

                <el-table-column align="left" label="商品单位">
                    <template slot-scope="scope">
                        {{scope.row.good.unit.title}}
                    </template>
                </el-table-column>

                <el-table-column align="left" label="入库数量">
                    <template slot-scope="scope">
                        {{scope.row.quantity | _filterNumFormat }}
                    </template>
                </el-table-column>

                <el-table-column align="left" label="入库单价">
                    <template slot-scope="scope">
                        {{scope.row.price | _filterNumFormat }}
                    </template>
                </el-table-column>

                <el-table-column align="left" label="供应商">
                    <template slot-scope="scope">
                        {{scope.row.good.business.title}}
                    </template>
                </el-table-column>

                <el-table-column align="left" label="生产日期" width="150px">
                    <template slot-scope="scope">
                        {{scope.row.produce_date}}
                    </template>
                </el-table-column>

                <el-table-column align="left" label="到期日期" width="150px">
                    <template slot-scope="scope">
                        {{scope.row.expire_date}}
                    </template>
                </el-table-column>

                <el-table-column align="left" label="税率">
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
                    <el-button type="primary" class="fr minW100" disabled>提交中...</el-button>
                    <el-button class="fr mal20 mar20 minW100" disabled>提交中...</el-button>
                </template>
                <template v-else>
                    <el-button type="primary" class="fr minW100" @click="affirm">确认收货</el-button>
                    <el-button class="fr mal20 mar20 minW100" @click="cancel">拒绝收货</el-button>
                </template>
            </template>
            <template v-else-if="type == 3">
                <template v-if="disabled">
                    <el-button type="primary" class="fr minW100" disabled>提交中...</el-button>
                </template>
                <template v-else>
                    <el-button type="primary" class="fr minW100" @click="affirm">确认收货</el-button>
                </template>
            </template>
            <template v-else-if="type == 4">
                <template v-if="disabled">
                    <el-button type="primary" class="fr minW100" disabled>提交中...</el-button>
                    <el-button class="fr mal20 mar20 minW100" disabled>提交中...</el-button>
                </template>
                <template v-else>
                    <el-button type="primary" class="fr minW100" @click="affirm">确认收货</el-button>
                    <el-button class="fr mal20 mar20 minW100" @click="cancel">拒绝收货</el-button>
                </template>
            </template>

            <div class="clear4"></div>

        </div>
    </div>

</template>


<script>

    import { getInfo, delivery, allocationTaskChange } from '@/chain/assets/api/inStorage/inStorage'

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

            let _arr = []
            for(let i=0; i<this.dataInfo.good.length; i++){
                let _tmp = this.dataInfo.good[i]
                _arr.push({
                    good_id: _tmp.good_id,
                    quantity: _tmp.quantity,
                    price: _tmp.price,
                })
            }
            this.disabled = true

            allocationTaskChange({
                allocationId: this.warehouseId,
                goodData: JSON.stringify(_arr),
                isComplete: 1,
                task_id: this.taskId,
            }).then(res=>{
                if(res.status == 0){
                    this.$message({
                        message: '调拨退货入库成功',
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

