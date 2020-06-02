<!--form-->
<template>

    <div class="pal24 par24 pat20 pab20">
        <div class="bg-white pal20 par20">
            <p class="fc-gray4 f14px h40px lh40px">单条入库</p>

            <div class="clear-f2"></div>

            <div class="clear2"></div>

            <div class="wb100 f14px">
                <p class="h30px lh30px fc-gray3">
                    <span class="fl">单据日期：</span>
                    <span class="fl bd-gray bd-b1">{{happen_date}} </span>
                    <span class="fl mal50">制单人：</span>
                    <span class="fl bd-gray bd-b1">{{$store.getters.currentUser.name}}</span>
                </p>
            </div>

            <div class="clear2"></div>

            <el-table slot="list" :data="demoList" border>

                <el-table-column align="left" label="序号" width="50px">
                    <template slot-scope="scope">
                        {{scope.$index+ 1}}
                    </template>
                </el-table-column>

                <el-table-column align="left" label="商品编码">
                    <template slot-scope="scope">
                        {{scope.row.code}}
                    </template>
                </el-table-column>

                <el-table-column align="left" label="商品名称">
                    <template slot-scope="scope">
                        {{scope.row.fullname}}
                    </template>
                </el-table-column>

                <el-table-column align="left" label="商品简称">
                    <template slot-scope="scope">
                        {{scope.row.title}}
                    </template>
                </el-table-column>

                <el-table-column align="left" label="商品规格">
                    <template slot-scope="scope">
                        {{scope.row.specifications.title}}
                    </template>
                </el-table-column>

                <el-table-column align="left" label="商品单位">
                    <template slot-scope="scope">
                        {{scope.row.unit.title}}
                    </template>
                </el-table-column>

                <el-table-column align="left" label="入库数量">
                    <template slot-scope="scope">
                        <el-input-number v-model="scope.row.quantity" class="wb100" :min="0" :controls="false" :precision="2" placeholder="请输入入库数量"></el-input-number>
                    </template>
                </el-table-column>

                <el-table-column align="left" label="入库单价">
                    <template slot-scope="scope">
                        <el-input-number v-model="scope.row.price" class="wb100" :min="0" :controls="false" :precision="2" placeholder="请输入入库单价"></el-input-number>
                    </template>
                </el-table-column>

                <el-table-column align="left" label="供应商">
                    <template slot-scope="scope">
                        {{scope.row.business.title}}
                    </template>
                </el-table-column>

                <el-table-column align="left" label="生产日期">
                    <template slot-scope="scope">
                        <el-date-picker
                                class="wb100"
                                v-model="scope.row.produce_date"
                                :clearable="false"
                                type="date"
                                placeholder="请选择生产日期"
                                value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </template>
                </el-table-column>

                <el-table-column align="left" label="到期日期">
                    <template slot-scope="scope">
                        <el-date-picker
                                class="wb100"
                                v-model="scope.row.expire_date"
                                :clearable="false"
                                type="date"
                                placeholder="请选择到期日期"
                                value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </template>
                </el-table-column>

                <el-table-column align="left" label="税率">
                    <template slot-scope="scope">
                        {{scope.row.tax}}%
                    </template>
                </el-table-column>

            </el-table>

            <!--      合计      -->
            <div class="pal20 par20 h34px lh34px bd-gray bd-b1 bd-l1 bd-r1 f14px">
                <span class="fl">合计</span>
                <span class="fr fc-gray3">
                    入库单价（元）：{{sumPrice}}
                </span>
                <span class="fr fc-gray3 mal30 mar30">
                    入库数量：{{sumQuantity}}
                </span>
            </div>

            <div class="clear h70px"></div>

            <template v-if="disabled">
                <el-button type="primary" class="fr minW100" disabled>提交中...</el-button>
            </template>
            <template v-else>
                <el-button type="primary" class="fr minW100" @click="submit">确认入库</el-button>
            </template>

            <el-button class="fr mal20 mar20 minW100" @click="back">取消</el-button>

            <div class="clear4"></div>

        </div>
    </div>

</template>


<script>

    import {save} from '@/chain/assets/api/inStorage/inStorage'

  export default {
      name: 'InStorageOne',
      components: {  },
    data() {
      return {
          demoList: [],
          form: {},
          happen_date: '',
          sumQuantity: 0,
          sumPrice: 0,
          disabled: false,
      }
    },
    mounted() {

        this.demoList = []
        let row  = this.$route.query.row

        this.demoList.push(JSON.parse(row))

        this.happen_date = this.$base.timestampToDateString(new Date().getTime() / 1000, 'date2')

    },
    methods: {
        back(){
            this.$router.go(-1)
        },
        submit(){

            let _arr = []

            for(let i=0; i<this.demoList.length; i++){


                if(this.$base.isNull(this.demoList[i].id)){
                    this.$message({
                        showClose: true,
                        message: '第'+(i+1)+'条数据，需要重新选择商品',
                        type: "error"
                    });
                    return
                }
                if(this.$base.isNull(this.demoList[i].quantity)){
                    this.$message({
                        showClose: true,
                        message: '第'+(i+1)+'条数据，入库数量必填',
                        type: "error"
                    });
                    return
                }
                if(this.$base.isNull(this.demoList[i].price)){
                    this.$message({
                        showClose: true,
                        message: '第'+(i+1)+'条数据，入库单价必填',
                        type: "error"
                    });
                    return
                }
                if(this.$base.isNull(this.demoList[i].business_id)){
                    this.$message({
                        showClose: true,
                        message: '第'+(i+1)+'条数据，供应商必填',
                        type: "error"
                    });
                    return
                }
                if(this.$base.isNull(this.demoList[i].produce_date)){
                    this.$message({
                        showClose: true,
                        message: '第'+(i+1)+'条数据，生产日期必填',
                        type: "error"
                    });
                    return
                }
                if(this.$base.isNull(this.demoList[i].expire_date)){
                    this.$message({
                        showClose: true,
                        message: '第'+(i+1)+'条数据，过期日期必填',
                        type: "error"
                    });
                    return
                }

                if(this.$base.dateTimeToDate(this.demoList[i].produce_date,'time')>= this.$base.dateTimeToDate(this.demoList[i].expire_date, 'time')){
                    this.$message({
                        showClose: true,
                        message: '第'+(i+1)+'条数据，过期日期时间需大于生产日期',
                        type: "error"
                    });
                    return
                }

                //验证商品重复
                let _t = this.demoList.filter(item => item.id == this.demoList[i].id)

                if(_t.length >1){
                    this.$message({
                        showClose: true,
                        message: '第'+(i+1)+'条数据，'+_t[0].code+'，商品重复，请重新选择',
                        type: "error"
                    });
                    return
                }

                //非空验证
                _arr.push({
                    id: 0,
                    // id: this.demoList[i].id,
                    good_id: this.demoList[i].id,
                    quantity: this.demoList[i].quantity,
                    price: this.demoList[i].price,
                    business_id: this.demoList[i].business_id,
                    produce_date: this.demoList[i].produce_date,
                    expire_date: this.demoList[i].expire_date,
                })
            }

            this.disabled = true

            save({
                warehouseId: 0,
                happen_date: this.happen_date,
                users_id: this.$store.getters.currentUser.users_id,
                good: JSON.stringify(_arr),
                good_id: this.demoList[0].id,
                status: '1',
                style: 1,
            }).then(res=>{
                if(res.status == 0){
                    this.$message({
                        showClose: true,
                        message: '入库成功',
                        type: "success",
                        duration: "1000",
                        onClose: () => {
                            this.$router.go(-1);
                        }
                    });
                }else{
                    this.disabled = false
                    this.$message({
                        showClose: true,
                        message: res.msg,
                        type: "error"
                    });
                }
            })
        },
        calculateTotal(){
            //计算总价
            let _sumQuantity = 0
            let _sumPrice = 0
            for(let i=0; i<this.demoList.length; i++){
                _sumQuantity += this.demoList[i].quantity ? Number.parseFloat(this.demoList[i].quantity) : 0
                _sumPrice += this.demoList[i].price ? Number.parseFloat(this.demoList[i].price) : 0
            }

            this.sumQuantity = isNaN(_sumQuantity) ? 0 : this.$base.twoDecimal(_sumQuantity)
            this.sumPrice = isNaN(_sumPrice) ? 0 : this.$base.twoDecimal(_sumPrice)
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

