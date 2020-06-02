<template>
  <el-dialog :title="isEdit?'修改二级类目':'添加下级类目'" :visible.sync="dialogForm" width="50%">
    <div class="pal20 par20">
      <el-form ref="myForm" :model="form" :rules="rules" label-width="100px">

          <div class="clear0"></div>

          <template v-if="!isEdit">

              <template>
                  <div class="w80px h40px lh40px text-center f16px fl  pointer" @click="form.style = 0" :class="form.style == 0 ? 'bg-green2 fc-white pa1' : 'fc-gray3 bd-gray bd-a1'">
                      普通类
                  </div>
                  <div class="w80px h40px lh40px text-center f16px fl  pointer" @click="form.style = 1" :class="form.style == 1 ? 'bg-green2 fc-white pa1' : 'fc-gray3 bd-gray bd-a1'">
                      套餐类
                  </div>
              </template>

              <!-- <template v-else>
                  <div class="w80px h40px lh40px text-center f16px fl fc-gray3  bd-gray bd-a1 pointer" @click="form.style = 0">
                      普通类
                  </div>
                  <div class="w80px h40px lh40px text-center f16px fl bg-green2 fc-white pa1 pointer">
                      套餐类
                  </div>
              </template> -->

          </template>
          
          <template v-else>

              <template>
                  <div class="w80px h40px lh40px text-center f16px fl " :class="form.style == 0 ? 'bg-green2 fc-white pa1' : 'fc-gray3 bd-gray bd-a1'">
                      普通类
                  </div>
                  <div class="w80px h40px lh40px text-center f16px fl " :class="form.style == 1 ? 'bg-green2 fc-white pa1' : 'fc-gray3 bd-gray bd-a1'">
                      套餐类
                  </div>
              </template>

          </template>



            <div class="clear2"></div>

            <el-form-item label="一级类名" prop="name">
              <el-select v-model="form.p_id" placeholder="一级类名" readonly clearable disabled>
                  <el-option v-for="item in projectList" :key="item.id" :label="item.name"
                             :value="item.id"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="名称" prop="name">
              <el-input type="text" v-model.trim="form.name" placeholder="请输入名称" clearable></el-input>
            </el-form-item>

            <el-form-item label="价格" prop="price">
                <el-input type="text" v-model.trim="form.price" placeholder="请输入价格" clearable :disabled="form.style == 1"></el-input>
<!--              <el-input type="text" v-model.trim="form.price" :controls="false"  placeholder="请输入价格" :min="0" :precision="2" :disabled="form.style == 1"></el-input>-->
            </el-form-item>

            <el-form-item label="疗程次数" prop="treatment_num">
                <el-input type="text" v-model.trim="form.treatment_num" placeholder="请输入疗程次数" clearable :disabled="form.style == 1"></el-input>
<!--              <el-input-number v-model="form.treatment_num" :precision="0" :controls="false" :min="1" :max="999999" :disabled="form.style == 1"></el-input-number>-->
            </el-form-item>

            <template v-if="form.style == 1">

                <template v-for="(item, index) in comboList">

                    <div class="pat10 bg-white1">
                        <p class="mal50">套餐{{index + 1}}信息</p>
                        <div class="fl">
                            <el-form-item label="名称" prop="name">
                                <el-input v-model="item.name"></el-input>
                            </el-form-item>
                        </div>
                        <div class="fl">
                            <el-form-item label="价格" prop="price">
                                <el-input type="text" v-model="item.price" placeholder="请输入价格" clearable></el-input>
<!--                                <el-input-number v-model="item.price" :min="0" :controls="false" :precision="2"></el-input-number>-->
                            </el-form-item>
                        </div>
                        <div class="fl">
                            <el-form-item label="疗程次数" prop="treatment_num">
                                <el-input type="text" v-model="item.treatment_num" placeholder="请输入价格" clearable></el-input>
<!--                                <el-input-number v-model="item.treatment_num" :min="1" :controls="false" :precision="0"></el-input-number>-->
                            </el-form-item>
                        </div>

                        <i class="iconfont iconjinzhi fc-red fr mat5" @click="delCombo(index)"></i>

                        <div class="clear0"></div>

                    </div>

                </template>

                <div class="clear2"></div>

                <el-button type="primary" class="mal50" @click="addCombo">新增套餐信息</el-button>

                <div class="clear4"></div>

            </template>


          <div class="clear0"></div>

          <el-form-item label="描述" prop="description">
              <el-input type="textarea" v-model="form.description" placeholder="请输入描述" class="wb100"></el-input>
          </el-form-item>

          <div class="clear0 bd-gray bd-b1"></div>
          <div class="wb100 h50px lh50px">
              请选择需要添加的门店
          </div>

          <div class="wb100">
              全选 <el-checkbox v-model="selectAll" @change="selectAllStore"></el-checkbox>
          </div>

          <template v-for="(item, index) in storeList">
              <div class="wb50 fl">
                  <p class="ma10 pal5 par5 h40px lh40px bd-a1 radius1 text-center text-over-hidden1" :class="item.isSelected ? 'bd-green2' : 'bd-gray'" @click="changeSelected(item, index)">
                      {{item.name}}
                  </p>
              </div>
          </template>

      </el-form>

      <div class="clear4"></div>

      <div slot="footer" class="dialog-footer fr">
        <el-button @click="dialogForm = false">取 消</el-button>
          <template v-if="disabled">
              <el-button type="primary" disabled>提交中...</el-button>
          </template>
          <template v-else>
              <el-button type="primary" @click="handleSubmit">保 存</el-button>
          </template>
      </div>

      <div class="clear0"></div>
    </div>
  </el-dialog>
</template>


<script>

import { itemsList , itemsAdd , itemsChangeStatus, getListItems } from "../../assets/api/projectManagement/projectManagement"

  export default {
    name: "EditProject",
    components: {},
      props:{
          // 是否显示选择企业/门店
          isStore: {
              type: Boolean,
              default: () => true
          },
          storeId: {
              type: Number,
              default: () => -1
          },
      },
    data() {
      return {
        dateTime: [ ],
          is_store: 2,
        form: {
            radio: 0,
            style: 0,   // 0 普通 | 1 套餐
        },
        dialogForm: false,                //弹窗控制器
        rules: {
          p_id: [{required: true, message: '请选择一级类目', trigger: 'change'}],
          name: [{required: true, message: '请输入项目名称', trigger: 'change'}],
          price: [{required: true, message: '请输入价格', trigger: 'change'}],
            treatment_num: [{required: true, message: '请输入疗程次数', trigger: 'blur'}],
          description: [{required: true, message: '请输入项目描述', trigger: 'change'}],
          activityPrice: [{required: true, message: '请输入活动价格', trigger: 'change'}],
          startTime: [{required: true, message: '请输入活动时间', trigger: 'change'}],
        },
        isEdit: false,                  // 是否编辑表单
          disabled: false,

          selectAll: false,

          projectList: [],

          storeList: [],

          comboList:[],
      }
    },
    methods: {

        addCombo(){

            this.comboList.push({
                id: 0,
                name: '',
                price: '',
                treatment_num: '',
            })

        },

        delCombo(index){
            this.comboList.splice(index, 1)
        },

        selectAllStore(){

            for(let i=0; i<this.storeList.length; i++){
                this.storeList[i].isSelected = this.selectAll
            }

        },

        changeSelected(item, index){

            let storeList = this.storeList
            item.isSelected = !item.isSelected
            this.$set(storeList,index,item)
        },

      // 提交表单
      handleSubmit() {

        // 避免重复提交时 提示报错
        if (!this.dialogForm) {
          return
        }

        const REG_NUMBER = /^[0-9]*[1-9][0-9]*$/

        //进行表单验证
          if(this.$base.isNull(this.form.price)){
              this.$message({
                  message: '请输入价格',
                  type: 'error'
              });
              return
              if(REG_NUMBER.test(this.form.price)){
                  this.$message({
                      message: '价格需大于0',
                      type: 'error'
                  });
                  return
              }
          }
          if(this.$base.isNull(this.form.treatment_num)){
              this.$message({
                  message: '请输入疗程次数',
                  type: 'error'
              });
              return
              if(REG_NUMBER.test(this.form.treatment_num)){
                  this.$message({
                      message: '疗程次数需大于0',
                      type: 'error'
                  });
                  return
              }
          }

          //验证套餐
          if(this.form.style == 1){

              if(this.comboList.length == 0){
                  this.$message({
                      message: '请添加一个套餐',
                      type: 'error'
                  });
                  return
              }

              for(let i=0; i<this.comboList.length; i++){

                  if(this.$base.isNull(this.comboList[i].price)){
                      this.$message({
                          message: '请输入套餐价格',
                          type: 'error'
                      });
                      return
                      if(REG_NUMBER.test(this.comboList[i].price)){
                          this.$message({
                              message: '套餐价格需大于0',
                              type: 'error'
                          });
                          return
                      }
                  }
                  if(this.$base.isNull(this.comboList[i].treatment_num)){
                      this.$message({
                          message: '请输入套餐疗程次数',
                          type: 'error'
                      });
                      return
                      if(REG_NUMBER.test(this.comboList[i].treatment_num)){
                          this.$message({
                              message: '套餐疗程次数需大于0',
                              type: 'error'
                          });
                          return
                      }
                  }
              }

          }

        this.$refs.myForm.validate((valid) => {
          if (valid) {
            this.isEdit ? this.handleToEdit() : this.handleToAdd()
          } else {
            this.$message({
              message: '请检查表单',
              type: 'error'
            })
          }
        })

      },

      // 新增
      handleToAdd() {

          this.disabled = true

          let _arr = []
          //门店
          for(let i=0; i<this.storeList.length; i++){
              if(this.storeList[i].isSelected){
                  _arr.push({
                      id: this.storeList[i].id
                  })
              }
          }
          if(_arr.length == 0){
              this.$message({
                  message: '请选择门店',
                  type: 'error'
              });
              this.disabled = false
              return
          }

          let param = {
              itemsParentId: this.form.p_id,
              name: this.form.name,
              description: this.form.description,
              price: this.form.price,
              treatmentNum: this.form.treatment_num,
              discount: this.form.discount,
              // storeId: this.isStore ? JSON.stringify(_arr) : this.storeId,
              storeId: JSON.stringify(_arr),
              is_store: this.is_store,
              style: this.form.style,
              item: JSON.stringify(this.comboList),
          }

          // item:{[name:"","price":,"treatment_num"：1]}

          // storeId

          // style 0普通，1套餐

      itemsAdd(param).then(res=>{
          if(res.status == 0){
            this.$message({
              message: '添加项目成功',
              type: 'success'
            });
            this.dialogForm = false
            this.$parent.loadData()
              this.disabled = false
          }else{
              this.$message({
                  showClose: true,
                  message: res.msg,
                  type: 'error',
              });
              this.disabled = false
          }
        }).catch(error=>{
            this.$message({
                showClose: true,
                message: error,
                type: 'error',
            });
            this.disabled = false
        })
      },
      // 编辑
      handleToEdit() {

          this.disabled = true

          let _arr = []

          //门店
          for(let i=0; i<this.storeList.length; i++){
              if(this.storeList[i].isSelected){
                  _arr.push({
                      id: this.storeList[i].id
                  })
              }
          }
          if(_arr.length == 0){
              this.$message({
                  message: '请选择门店',
                  type: 'error'
              });
              this.disabled = false
              return
          }

          let param = {
              itemsParentId: this.form.p_id,
              name: this.form.name,
              description: this.form.description,
              price: this.form.price,
              treatmentNum: this.form.treatment_num,
              discount: this.form.discount,
              // storeId: this.isStore ? JSON.stringify(_arr) : this.storeId,
              itemsId: this.form.id,
              storeId: JSON.stringify(_arr),
              is_store: this.is_store ,
              style: this.form.style,
              item: JSON.stringify(this.comboList),
          }
           itemsAdd(param).then(res=>{
              if(res.status == 0){
                  this.$message({
                      message: '修改项目成功',
                      type: 'success'
                  });
                  this.dialogForm = false
                  this.$parent.loadData()
                  this.disabled = false
              }else{
                  this.$message({
                      showClose: true,
                      message: res.msg,
                      type: 'error',
                  });
                  this.disabled = false
              }
          }).catch(error=>{
              this.$message({
                  showClose: true,
                  message: error,
                  type: 'error',
              });
              this.disabled = false
          })

      },

    },

      mounted() {

          //获取门店列表
          this.$postRequest("/post/api/store/getStore").then(res => {
              if(res.status == 0){
                  let _tmp = res.data

                  for(let i=0; i<_tmp.length; i++){
                      _tmp[i].isSelected = false
                  }
                  this.storeList = _tmp

              }
          })


      },

      watch: {
      dialogForm(bool) {
        if (!bool) {
          this.$refs.myForm.resetFields()
          this.isEdit = false
        }else{
            //获取门店列表
            // 项目

            if(!this.isStore){
                // 项目
                getListItems({ itemsParentId: 0, storeId: this.storeId, is_store_settings:1 }).then(res => {
                    if(res.status == 0){

                        let _tmp = res.data.list

                        this.projectList = _tmp

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
            }else{
                getListItems({ itemsParentId: -1 }).then(res => {
                    if(res.status == 0){

                        this.projectList = res.data.list

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

            }

        }
      },
      dateTime(c,o){
        this.form.startTime = c[0]
        this.form.endTime = c[1]
      },
      comboList: {
          deep: true,
          handler: function() {

              const REG_NUMBER = /^[0-9]*[1-9][0-9]*$/

              if(this.comboList.length > 0){
                  let _sumPrice = 0
                  let _sumNum = 0

                  for(let i=0; i<this.comboList.length; i++){

                      if(!isNaN(this.comboList[i].price)){
                          _sumPrice+= Number.parseFloat(this.comboList[i].price)
                      }else{
                          _sumPrice+= 0
                      }
                      if(!isNaN(this.comboList[i].treatment_num)){
                          _sumNum+= Number.parseFloat(this.comboList[i].treatment_num)
                      }else{
                          _sumNum+= 0
                      }
                  }

                  this.form.price = _sumPrice
                  this.form.treatment_num = _sumNum
              }

          }
      }
    },
    computed: {
      isSupplyYield() {
        return this.form.isSupplyYield
      }
    },

  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
