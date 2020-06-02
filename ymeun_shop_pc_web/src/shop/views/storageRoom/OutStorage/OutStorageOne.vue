<!--form-->
<template>

    <div class="pal24 par24 pat20 pab20">
        <div class="bg-white pal20 par20">
            <p class="fc-gray4 f16px h40px lh40px">单条出库</p>

            <div class="clear0 bd-b1 bd-gray"></div>

            <div class="clear4"></div>

            <div class="wb100 f16px">
                <p class="h30px lh30px fc-gray2">制单基本信息</p>
                <p class="h30px lh30px fc-gray3">
                    <span class="fl">单据日期：{{happen_date}} </span>
                    <span class="fl mal50">制单人：{{$store.getters.currentUser.name}}</span>
                </p>
            </div>

            <div class="clear4"></div>

        </div>

        <div class="clear4"></div>

        <div class="bg-white pal20 par20">

            <div class="clear4"></div>

            <div class="wb100">

                <el-form ref="form" :inline="true" :rules="rules" :model="form">

                    <el-form-item label="出库类别" prop="type">
                        <el-select placeholder="请选择" v-model="form.type" @change="typeChange">
                            <el-option v-for="[key, val] in _dictOutType" :key="key" :label="val"
                                       :value="key"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="领用人" prop="receive_users_id">
                        <el-select placeholder="请选择" v-model="form.receive_users_id" :disabled="disabledInput">
                            <el-option v-for="item in $store.getters.staffList2" :key="item.users_id" :label="item.name"
                                       :value="item.users_id"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="客户" prop="customer_id">
                        <auto-search-client @changed="myChanged" ref="autoClient" :disabled="form.type == 2"></auto-search-client>
                    </el-form-item>

                    <el-form-item label="项目">
                        <el-select v-model="form.itemsParentId" placeholder="请选择项目" :disabled="form.type == 2" clearable @change="form.itemsId = ''">
                            <el-option v-for="item in $store.getters.projectList1Map" :key="item.key" :label="item.value"
                                       :value="item.key"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item  prop="sid" v-if="form.itemsParentId" label-width="0">
                        <el-select v-model="form.itemsId" placeholder="请选择下级项目" :disabled="form.type == 2" clearable>
                            <el-option v-for="item in $store.getters.projectList2Map(form.itemsParentId)" :key="item.key" :label="item.value"
                                       :value="item.key"></el-option>
                        </el-select>
                    </el-form-item>

                </el-form>

            </div>

            <div class="clear0"></div>

            <el-table slot="list" :data="demoList" border>

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

                <el-table-column align="center" label="商品规格">
                    <template slot-scope="scope">
                        {{scope.row.specifications.title}}
                    </template>
                </el-table-column>

                <el-table-column align="center" label="商品单位">
                    <template slot-scope="scope">
                        {{scope.row.unit.title}}
                    </template>
                </el-table-column>

                <el-table-column align="center" label="库存数量">
                    <template slot-scope="scope">
                        {{scope.row.stocks_num | _filterNumFormat }}
                    </template>
                </el-table-column>

                <el-table-column align="center" label="出库数量">
                    <template slot-scope="scope">
                        <el-input-number v-model="scope.row.quantity" class="wb100" :min="0" :controls="false" :precision="2" placeholder="请输入出库数量"></el-input-number>
                    </template>
                </el-table-column>

                <el-table-column align="center" label="备注">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.remarks" class="wb100" placeholder="请输入出库备注"></el-input>
                    </template>
                </el-table-column>

            </el-table>

            <!--      合计      -->
            <div class="pal20 par20 h60px lh60px bd-gray bd-b1 bd-l1 bd-r1 f16px">
                <span class="fl f18px">合计</span>
                <span class="fr fc-gray3">
                    出库数量：{{sumQuantity}}
                </span>
            </div>

            <div class="clear h70px"></div>

            <template v-if="disabled">
                <el-button type="primary" class="fr w100px" disabled>提交中...</el-button>
            </template>
            <template v-else>
                <el-button type="primary" class="fr w100px" @click="submit">确认</el-button>
            </template>

            <el-button class="fr mal50 mar50 w100px" @click="back">取消</el-button>

            <div class="clear4"></div>

        </div>
    </div>

</template>


<script>

    import {outboundAdd} from '@/shop/assets/api/outStorage/outStorage'

    import autoSearchClient from "@/shop/components/autocomplete/autoSearchClient"

  export default {
      name: 'OutStorageOne',
      components: { autoSearchClient },
    data() {
      return {
          form: {
              receive_users_id: '',
              itemsParentId: '',
              itemsId: '',
          },
          rules:{
              type: [{ required: true, message: '请选择出库类别', trigger: 'blur' }],
              receive_users_id: [{ required: true, message: '请选择领用人', trigger: 'blur' }],
              customer_id: [{ required: true, message: '请选择顾客', trigger: 'blur' }],
          },
          demoList: [],
          happen_date: '',
          sumQuantity: 0,
          disabled: false,
          disabledInput: false,
      }
    },
    mounted() {

        this.demoList = []
        let row  = this.$route.query.row

        this.demoList.push(JSON.parse(row))

        this.happen_date = this.$base.timestampToDateString(new Date().getTime() / 1000, 'date2')

        if(this.$store.getters.currentUser.role_id == 3 || this.$store.getters.currentUser.role_id == 4){
            //选中自己
            this.form.receive_users_id = this.$store.getters.currentUser.users_id
            this.disabledInput = true
        }else{
            //可选所有人
            this.disabledInput = false
        }

    },
    methods: {
        typeChange(){
            if(this.form.type == 2){
                this.form.itemsParentId = ''
                this.form.itemsId = ''
                this.form.customer_id = ''
                this.$refs.autoClient.setInitValue('')
            }
        },

        myChanged(data){
            if(data.list[0]){
                this.form.customer_id = data.list[0].id
            }
        },
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
                        message: '第'+(i+1)+'条数据，出库数量必填',
                        type: "error"
                    });
                    return
                }

                //验证出库数量
                if(this.demoList[i].quantity > this.demoList[i].stocks_num){
                    this.$message({
                        showClose: true,
                        message: '第'+(i+1)+'条数据，出库数量需小于库存数量',
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

                _arr.push({
                    id: this.demoList[i].id,
                    good_id: this.demoList[i].id,
                    quantity: this.demoList[i].quantity,
                    remarks: this.demoList[i].remarks
                })
            }

            this.disabled = true

            outboundAdd({
                type: this.form.type,
                receive_users_id: this.form.receive_users_id,
                customer_id: this.form.customer_id,
                itemsParentId: this.form.itemsParentId,
                itemsId: this.form.itemsId,
                good_data: JSON.stringify(_arr),
            }).then(res=>{
                if(res.status == 0){
                    this.$message({
                        showClose: true,
                        message: '出库成功',
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

