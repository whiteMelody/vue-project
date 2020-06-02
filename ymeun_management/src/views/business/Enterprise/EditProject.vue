<template>
  <el-dialog :title="isEdit?'修改二级类目':'添加下级类目'" :visible.sync="dialogForm" width="650px">
    <div class="pal20 par20">
      <el-form ref="myForm" :model="form" :rules="rules" label-width="100px">

          <div class="clear0"></div>

          <template v-if="!isEdit">
              <template>
                  <div class="w80px h30px lh30px text-center f16px fl  pointer" @click="form.style = 0" :class="form.style == 0 ? 'bg-green2 fc-white pa1' : 'fc-gray3 bd-gray bd-a1'">
                      普通类
                  </div>
                  <div class="w80px h30px lh30px text-center f16px fl  pointer" @click="form.style = 1" :class="form.style == 1 ? 'bg-green2 fc-white pa1' : 'fc-gray3 bd-gray bd-a1'">
                      套餐类
                  </div>
              </template>
          </template>
          
          <template v-else>

              <template>
                  <div class="w80px h30px lh30px text-center f16px fl " :class="form.style == 0 ? 'bg-green2 fc-white pa1' : 'fc-gray3 bd-gray bd-a1'">
                      普通类
                  </div>
                  <div class="w80px h30px lh30px text-center f16px fl " :class="form.style == 1 ? 'bg-green2 fc-white pa1' : 'fc-gray3 bd-gray bd-a1'">
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

            <div class="wb50 fl">
                <el-form-item label="品项" prop="fashion">
                    <el-radio v-model.trim="form.fashion.value" :label="1" :disabled="isEdit">项目</el-radio>
                    <el-radio v-model.trim="form.fashion.value" :label="2" :disabled="isEdit" @change="radioChange">产品</el-radio>
                </el-form-item>
            </div>
            <div class="wb50 fl">
                <el-form-item label="名称" prop="name">
                    <el-input type="text" v-model.trim="form.name" placeholder="请输入名称" clearable></el-input>
                </el-form-item>
            </div>
            <div class="wb50 fl">
                <el-form-item label="价格" prop="price">
                    <el-input type="text" v-model.trim="form.price" placeholder="请输入价格" clearable :disabled="form.style == 1"></el-input>
                </el-form-item>
            </div>
            <div class="wb50 fl">
                <el-form-item label="疗程次数" prop="treatment_num">
                    <el-input type="text" v-model.trim="form.treatment_num" placeholder="请输入疗程次数" clearable  :disabled="form.style == 1"></el-input>
                </el-form-item>
            </div>

            <template v-if="form.style == 1">

                <template v-for="(item, index) in comboList">

                    <div class="pat10">
                        <div class="wb50 fl">
                            <el-form-item :label="'套餐'+index + 1+'信息'" prop="name">
                                <i class="iconfont iconshanchuguanbicha2 fc-red fl" @click="delCombo(index)"></i>
                            </el-form-item>
                        </div>

                        <div class="wb50 fl">
                            <el-form-item label="名称" prop="name">
                                <el-input v-model="item.name"></el-input>
                            </el-form-item>
                        </div>
                        <div class="wb50 fl">
                            <el-form-item label="价格" prop="price">
                                <el-input type="text" v-model="item.price" placeholder="请输入价格" clearable></el-input>
                            </el-form-item>
                        </div>
                        <div class="wb50 fl">
                            <el-form-item label="疗程次数" prop="treatment_num">
                                <el-input type="text" v-model="item.treatment_num" placeholder="请输入疗程次数" clearable></el-input>
                            </el-form-item>
                        </div>

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
          <div class="wb100">
              <div class="wb100 h40px lh40px">
                  <span class="fl">请选择需要添加的门店</span>
                  <span class="fr">
                      全选 <el-checkbox v-model="selectAll" @change="selectAllStore"></el-checkbox>
                  </span>
              </div>

              <template v-for="(item, index) in storeList">
                  <p class="ma5 pal20 par20 h40px lh40px bd-a1 radius1 text-center text-over-hidden1 fl" :class="item.isSelected ? 'bd-green2' : 'bd-gray'" @click="changeSelected(item, index)">
                      {{item.name}}
                  </p>
              </template>
          </div>

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

import { itemsList , itemsAdd , itemsChangeStatus, getListItems } from "@/assets/api/home/home"

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
          is_store: 2,
        form: {
            radio: 0,
            style: 0,   // 0 普通 | 1 套餐
            fashion: { value: 1},
        },
        dialogForm: false,                //弹窗控制器
        rules: {
			p_id: [{required: true, message: '请选择一级类目', trigger: 'change'}],
			name: [{required: true, message: '请输入品项名称', trigger: 'change'}],
			price: [{required: true, message: '请输入价格', trigger: 'change'}],
			treatment_num: [{required: true, message: '请输入疗程次数', trigger: 'blur'}],
			description: [{required: true, message: '请输入品项描述', trigger: 'change'}],
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

        radioChange(){
            if(this.form.style == 0){
                this.form.treatment_num = 0
            }else{
                for(let i=0; i< this.comboList.length; i++){
                    this.comboList[i].treatment_num = 0
                }
                this.form.treatment_num = 0
            }
        },

        addCombo(){

            this.comboList.push({
                id: 0,
                name: '',
                price: 0,
                treatment_num: 0,
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
          if(this.form.fashion.value == '1' || this.form.fashion.value == 1) {
              if (this.$base.isNull(this.form.treatment_num)) {
                  this.$message({
                      message: '请输入疗程次数',
                      type: 'error'
                  });
                  return
                  if (REG_NUMBER.test(this.form.treatment_num)) {
                      this.$message({
                          message: '疗程次数需大于0',
                          type: 'error'
                      });
                      return
                  }
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

                  if(this.form.fashion.value == '1' || this.form.fashion.value == 1) {
                      if (this.$base.isNull(this.comboList[i].treatment_num)) {
                          this.$message({
                              message: '请输入套餐疗程次数',
                              type: 'error'
                          });
                          return
                          if (REG_NUMBER.test(this.comboList[i].treatment_num)) {
                              this.$message({
                                  message: '套餐疗程次数需大于0',
                                  type: 'error'
                              });
                              return
                          }
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
              fashion: this.form.fashion.value,
              item: JSON.stringify(this.comboList),
          }

          // item:{[name:"","price":,"treatment_num"：1]}

          // storeId

          // style 0普通，1套餐

      itemsAdd(param).then(res=>{
          if(res.status == 0){
            this.$message({
              message: '添加品项成功',
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
              fashion: this.form.fashion.value,
              item: JSON.stringify(this.comboList),
          }
           itemsAdd(param).then(res=>{
              if(res.status == 0){
                  this.$message({
                      message: '修改品项成功',
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

        //   //获取门店列表
        //   this.$postRequest("/post/api/store/getStore").then(res => {
        //       if(res.status == 0){
        //           let _tmp = res.data
        //           for(let i=0; i<_tmp.length; i++){
    
        //                 _tmp[i].isSelected = false
        //                 let _t = this.form.allowed_store_ids.find(item >= item.id == _tmp[i].id)
        //                 if(_t){
        //                     _tmp[i].isSelected = true
        //                 }
        //           }
        //           this.storeList = _tmp
        //       }
        //   })


      },

      watch: {
      dialogForm(bool) {
        if (!bool) {
          this.$refs.myForm.resetFields()
          this.isEdit = false
        }else{
            //获取门店列表
            this.$postRequest("/post/api/store/getStore").then(res => {
                if(res.status == 0){
                    let _tmp = res.data;
                    let num = 0;
                    for(let i=0; i<_tmp.length; i++){
                        let _flag = false
                        _tmp[i].isSelected = false
                        if(!this.$base.isNull(this.form.allowed_store_ids)){
                            let ids = this.form.allowed_store_ids.split(',')
                            for(let j=0; j<ids.length; j++){
                                if(ids[j] == _tmp[i].id){
                                    _flag = true
                                    break
                                }
                            }
                            if(_flag){
                                _tmp[i].isSelected = true
                                num++;
                            }
                        }
                    }
                    if(res.data.length == num){
                        this.selectAll = true
                    }
                    else{
                        this.selectAll = false
                    }
                    console.log(num);
                    this.storeList = _tmp
                }
            })

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
