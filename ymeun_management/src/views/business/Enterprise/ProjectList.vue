<template>
  <div class="ProjectList" :style="'min-height: '+boxMaxHeight+'px;'">
    <header>
        <div>
            <p>品项列表</p>
            <span>-{{titleText}}</span>
        </div>
        <el-button type="primary" @click="dialogForm = true;">添加大类</el-button>
    </header>
    <div class="box">
        <el-table :data="tableData" row-key="id" border lazy stripe
            :tree-props="{children: 'items', hasChildren: 'hasChildren'}"
            v-loading="loading">
            <el-table-column prop="name" align="center" label="大类名称">
                <template slot-scope="scope" v-if="scope.row.items">
                    {{scope.row.name}}
                </template>
            </el-table-column>
            <el-table-column prop="name" align="center" label="二级品项名称">
                <template slot-scope="scope" v-if="!scope.row.items">
                    {{scope.row.name}}
                </template>
            </el-table-column>
            <el-table-column prop="classify" align="center" label="品项类别">
                <template slot-scope="scope" v-if="scope.row.items">
                    {{scope.row.classify.title}}
                </template>
            </el-table-column>
            <el-table-column prop="fashion" align="center" label="品项属性">
                <template slot-scope="scope" v-if="!scope.row.items">
                    {{scope.row.fashion.label}}
                </template>
            </el-table-column>
            <el-table-column prop="price" align="center" label="价格（元）">
                <template slot-scope="scope" v-if="!scope.row.items">
                    {{scope.row.price | _filterNumFormat}}
                </template>
            </el-table-column>
            <el-table-column prop="treatment_num" align="center" label="疗程次数（次）">
                <template slot-scope="scope" v-if="!scope.row.items">
                    {{scope.row.treatment_num}}
                </template>
            </el-table-column>
            <el-table-column prop="description" align="center" label="备注">
                <template slot-scope="scope" v-if="!scope.row.items">
                    {{scope.row.description}}
                </template>
            </el-table-column>
            <el-table-column prop="address" align="center" label="操作">
                <template slot-scope="scope" v-if="scope.row.items">
                    <p class="operation_btn">
                        <span class="color1" @click="openDialogFormTow(scope.row)">添加二级</span>
                    </p>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
                @size-change="upPage"
                @current-change="nextPage"
                :current-page="1"
                :page-sizes="[5, 10, 15, 20, 100]"
                :page-size="15"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
                :hide-on-single-page="true">
            </el-pagination>
        </div>
    </div>

    <div class="dialog_box">
        <el-dialog title="添加大类" :visible.sync="dialogForm" :before-close="clearForm" width="366px">
        <div class="el_dialog_box">
            <el-form ref="myForm" :model="form" :rules="rules">
                <el-form-item label="大类名称" prop="name" label-width="80px">
                    <el-input type="text" v-model.trim="form.name" placeholder="请输入大类名称" clearable></el-input>
                </el-form-item>
                <div class="types">
                    <p>请选择项目所属类别<i>（必选）</i></p>
                    <div class="radios">
                        <el-form-item label v-if="projectLabel.length > 0">
                            <el-radio-group v-model="form.classify_id">
                                <el-radio v-for="(item , index) in projectLabel" :key="index" :label="item.id">{{item.title}}</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item>
                            <el-input type="text" v-model.trim="form.classify_name" placeholder="请输入新增类别" clearable></el-input>
                        </el-form-item>
                        <span class="annotation"> 注：如果已有类别不满足业务需求，可以在输入 框 自行输入点击 确定并新增。 </span>
                    </div>
                </div>
            </el-form>

     
            <div slot="footer" class="dialog-footer">
                <el-button @click="clearForm">取 消</el-button>
                <template v-if="disabled">
                    <el-button type="primary" disabled>提交中...</el-button>
                </template>
                <template v-else>
                    <el-button type="primary" @click="handleSubmit">确认</el-button>
                </template>
            </div>
        </div> 
        </el-dialog>
    </div>

    <div class="dialog_box">
        <el-dialog :title="dialogFormText" :visible.sync="dialogFormTow" :before-close="clearForm" width="716px">
            <div class="wb100">

                <el-form ref="myForm2" :model="form2" :rules="rules2" label-width="100px">

                    <template>
                        <div class="w80px h30px lh30px text-center f16px fl  pointer" @click="form2.style = 0" :class="form2.style == 0 ? 'bg-blue fc-white pa1' : 'fc-gray3 bd-gray bd-a1'">
                            普通类
                        </div>
                        <div class="w80px h30px lh30px text-center f16px fl  pointer" @click="form2.style = 1" :class="form2.style == 1 ? 'bg-blue fc-white pa1' : 'fc-gray3 bd-gray bd-a1'">
                            套餐类
                        </div>
                    </template>

                    <div class="clear2"></div>

                    <div class="wb50 fl">
                        <el-form-item label="品项" prop="fashion">
                            <el-radio v-model.trim="form2.fashion" :label="1">项目</el-radio>
                            <el-radio v-model.trim="form2.fashion" :label="2" @change="radioChange">产品</el-radio>
                        </el-form-item>
                    </div>
                    <div class="wb50 fl">
                        <el-form-item label="名称" prop="name">
                            <el-input type="text" v-model.trim="form2.name" placeholder="请输入名称" clearable></el-input>
                        </el-form-item>
                    </div>
                    <div class="wb50 fl">
                        <el-form-item label="价格" prop="price">
                            <template v-if="form2.style == 1">
                                <el-input type="text" v-model.trim="form2.price" placeholder="总价格为套餐价格之和" clearable disabled></el-input>
                            </template>
                            <template v-else>
                                <el-input type="text" v-model.trim="form2.price" placeholder="请输入价格" clearable></el-input>
                            </template>
                        </el-form-item>
                    </div>
                    <div class="wb50 fl">
                        <el-form-item label="疗程次数" prop="treatment_num">
                            <template v-if="form2.style == 1">
                                <el-input type="text" v-model.trim="form2.treatment_num" placeholder="总疗程次数为套餐疗程次数之和" clearable  disabled></el-input>
                            </template>
                            <template v-else>
                                <el-input type="text" v-model.trim="form2.treatment_num" placeholder="请输入疗程次数" clearable ></el-input>
                            </template>
                        </el-form-item>
                    </div>

                    <template v-if="form2.style == 1">

                        <template v-for="(item, index) in comboList">

                            <div class="pat10">
                                <div class="wb50 fl">
                                    <el-form-item :label="'套餐'+(index + 1)+'信息'" prop="name">
                                        <i class="iconfont el-icon-error fc-red fl mat8" @click="delCombo(index)"></i>
                                    </el-form-item>
                                </div>

                                <div class="wb50 fl">
                                    <el-form-item label="名称" prop="name">
                                        <el-input v-model="item.name" placeholder="请输入套餐名称"></el-input>
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
                        <el-input type="textarea" v-model="form2.description" placeholder="请输入描述" class="wb100"></el-input>
                    </el-form-item>

                    <div class="clear0 bd-gray bd-b1"></div>
                    <div class="wb100">
                        <div class="wb100 h40px lh40px">
                            <span class="fl">请选择需要添加的门店</span>
                            <span class="fr">全选 <el-checkbox v-model="selectAll" @change="selectAllStore"></el-checkbox></span>
                        </div>

                        <template v-for="(item, index) in storeList">
                            <p class="ma5 pal20 par20 h40px lh40px bd-a1 radius1 text-center text-over-hidden1 fl" :class="item.isSelected ? 'bd-blue bg-blue3' : 'bd-gray'" @click="changeSelected(item, index)">
                                {{item.name}}
                            </p>
                        </template>
                    </div>

                    <div class="clear2"></div>

                </el-form>

                <div slot="footer" class="dialog-footer">
                    <el-button @click="clearForm">取 消</el-button>
                    <template v-if="disabledTow">
                        <el-button type="primary" disabled>提交中...</el-button>
                    </template>
                    <template v-else>
                        <el-button type="primary" @click="handleSubmit2">确认</el-button>
                    </template>
                </div>
            </div>
        </el-dialog>
    </div>

  </div>
</template>

<script>

import { itemList, itemAdd, storeList, getList } from  "@/assets/api/home/home"
export default {
  name: "ProjectList",
  components: {

  },
  data() {
    return {
        condition:{
            start: 1,
            perpage: 15,
            itemsParmentId: 0,
            e_id:this.$route.query.e_id,
        },
        e_id:this.$route.query.e_id,
        titleText:this.$route.query.titleText,
        boxMaxHeight:"",
        total:0,
        tableData: [],
        loading:false,
        form: {},
        dialogForm: false,                //弹窗控制器
        disabled: false,
        projectLabel:[],
        formTow: {},
        dialogFormTow: false,                //弹窗控制器
        dialogFormText:"",
        disabledTow: false,
        rules: {
            gameid: [{required: true, message: '请选择游戏', trigger: 'change'}],
            name: [{required: true, message: '请输入name', trigger: 'blur'}],
        },
        rules2: {
            name: [{required: true, message: '请输入品项名称', trigger: 'blur'}],
            price: [{required: true, message: '请输入价格', trigger: 'blur'}],
            treatment_num: [{required: true, message: '请输入疗程次数', trigger: 'blur'}],
            description: [{required: true, message: '请输入品项描述', trigger: 'blur'}],
            activityPrice: [{required: true, message: '请输入活动价格', trigger: 'blur'}],
            startTime: [{required: true, message: '请输入活动时间', trigger: 'blur'}],
        },
        storeCheckbox:false,
        storeList:[],
        form2: {
            radio: 0,
            style: 0,   // 0 普通 | 1 套餐
            fashion: 1,
        },
        selectAll: false,
        projectList: [],
        comboList:[],
    }
  },
  created() {},
  methods: {

      radioChange(){
          if(this.form2.style == 0){
              this.form2.treatment_num = 0
          }else{
              for(let i=0; i< this.comboList.length; i++){
                  this.comboList[i].treatment_num = 0
              }
              this.form2.treatment_num = 0
          }
      },

      openDialogFormTow(row){
          this.form2 = {
              radio: 0,
              style: 0,   // 0 普通 | 1 套餐
              fashion: 1,
          }
          this.dialogFormTow = true;
          this.dialogFormText = row.name;
          this.form2.channelParentId = row.id;
          this.comboList = []
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

      // 提交表单2
      handleSubmit2() {

          const REG_NUMBER = /^[0-9]*[1-9][0-9]*$/

          //进行表单验证
          if(this.$base.isNull(this.form2.price)){
              this.$message({
                  message: '请输入价格',
                  type: 'error'
              });
              return
              if(REG_NUMBER.test(this.form2.price)){
                  this.$message({
                      message: '价格需大于0',
                      type: 'error'
                  });
                  return
              }
          }
          if(this.form2.fashion == '1' || this.form2.fashion == 1) {
              if (this.$base.isNull(this.form2.treatment_num)) {
                  this.$message({
                      message: '请输入疗程次数',
                      type: 'error'
                  });
                  return
                  if (REG_NUMBER.test(this.form2.treatment_num)) {
                      this.$message({
                          message: '疗程次数需大于0',
                          type: 'error'
                      });
                      return
                  }
              }
          }

          //验证套餐
          if(this.form2.style == 1){

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

                  if(this.form2.fashion == '1' || this.form2.fashion == 1) {
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

          this.$refs.myForm2.validate((valid) => {
              if (valid) {

                  //提交数据
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
                      itemParentId: this.form2.channelParentId,
                      name: this.form2.name,
                      description: this.form2.description,
                      price: this.form2.price,
                      treatmentNum: this.form2.treatment_num,
                      discount: this.form2.discount,
                      // storeId: this.isStore ? JSON.stringify(_arr) : this.storeId,
                      storeId: JSON.stringify(_arr),
                      is_store: this.is_store,
                      style: this.form2.style,
                      fashion: this.form2.fashion,
                      item: JSON.stringify(this.comboList),
                      e_id: this.e_id,
                  }

                  itemAdd(param).then(res=>{
                      this.dialogFormTow = false;
                      if(res.status == 0){
                          this.$message({
                              message: '添加品项成功',
                              type: 'success'
                          });
                          this.dialogForm = false
                          this.loadData()
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

              } else {
                  this.$message({
                      message: '请检查表单',
                      type: 'error'
                  })
              }
          })

      },
      
      // 提交表单
    handleSubmit() {
      this.$refs.myForm.validate((valid) => {
        if (valid) {
          this.dialogForm ? this.addProject() : this.addProjectTow();
        } else {
          this.$message({
            message: '请检查表单',
            type: 'error',
          })
        }
      })
    },

    addProject(){
        if(!this.form.name){
            this.$message({
                message: '请输入大类名称',
                type: 'error'
            });
            return
        }
        let classify_id = this.form.classify_name ? this.form.classify_name : this.form.classify_id
        if(classify_id == undefined){
            this.$message({
                message: '请选择品项所属类别',
                type: 'error'
            });
            return;
        }
      
        this.disabled = true
        itemAdd({name: this.form.name, itemParentId: 0, storeId: 0, e_id: this.e_id, classify_id: classify_id, }).then(res=>{
            if(res.status == 0){
                this.$message({
                    message: '项目新增成功',
                    type: 'success',
                    onClose:()=>{
                        this.disabled = false
                        this.dialogForm = false
                        this.clearForm()
                        this.loadData()
                    }
                });
            }else{
                this.$message({
                    showClose: true,
                    message: res.msg,
                    type: 'error',
                });
                this.disabled = false
            }
        }).catch(error=>{
            console.log("itemAdd no");
            this.disabled = false
        })
    },
    addProjectTow(){},

    shopListFn(type,item){
        switch (type) {
            case 0:
                this.storeList.map((item , index) => {
                    item.isSelected = this.storeCheckbox
                })
                break;
            case 1:
                item.isSelected = !item.isSelected
                break;
            default:
                break;
        }
        let _flag = true;
        this.storeList.map((item , index) => {
            if(item.isSelected == false) _flag = false
        })
        this.storeCheckbox = _flag

    },
    loadData(){
        this.loading = true;
        itemList(this.condition).then(res=>{
            if(res.status == 0){
                this.tableData = res.data.list
                this.total = res.data.total;
                this.loading = false;
            }
        })

        getList({e_id: this.e_id,}).then(res=>{
            if(res.status == 0){
                this.projectLabel = res.data.list
            }
        })
    },

    upPage(val) {
      this.condition.perpage = val;
      this.loadData();
    },
    nextPage(val) {
      this.condition.start = val;
      this.loadData();
    },
    // 清除表单数据
    clearForm() {
      this.dialogForm = false;
      this.dialogFormTow = false;
      this.form = {
          name:""
      }
    },
 
  },
  // 挂载结束状态
  mounted() {
    this.boxMaxHeight = window.innerHeight - 100;
    this.loadData()
      storeList({ e_id: this.e_id }).then(res=>{
          if(res.status == 0){
              if(res.data.list.length > 0){
                  res.data.list.map((item , index) => {
                      item.isSelected = false;
                  })
              }
              this.storeList = res.data.list
          }
      })
  },

    watch: {
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
                    this.form2.price = isNaN(_sumPrice) ? 0 : _sumPrice
                    this.form2.treatment_num = isNaN(_sumNum) ? 0 : _sumNum
                }

            }
        }
    },


};
</script>

<style scoped lang="scss">
.ProjectList{
    margin: 20px;
    background: #fff;
    padding: 0 20px;
    header{
        height: 50px;
        border-bottom: 1px solid #E5E5E5;
        display: flex;
        align-items: center;
        div{
            display: flex;
            justify-content: flex-start;
            align-items: center;
            flex: 1;
            color: #333;
            // span{
            //     color: #999;
            // }
        }
    }
    .box{
        padding-top: 20px;
       
    }
    .types{
        border-top: 1px solid #E5E5E5;
        padding-top: 14px;
        p{
            color: #666;
            i{
                font-style: normal;
                color: #EC414D;
            }
        }
        .el-radio-group{
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            .el-radio{
                width: 108px;
                margin: 0;
                padding-top: 10px;
                display: flex;
                justify-content: center;
                
            }
        }
        .annotation{
            display: block;
            font-size: 14px;
            color: #999;
            padding-bottom: 20px;
        }
    }
    .shop_list{
        border-top: 1px solid #E5E5E5;
        padding-top: 18px;
        .shop_header{
            display: flex;
            p{
                flex: 1;
            }
        }
        ul{
            padding-top: 15px;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            li{
                width: 156px;
                display: flex;
                justify-content: center;
                height: 40px;
                align-items: center;
                border:1px solid #E5E5E5;
                border-radius:5px;
                margin-bottom: 10px;
                cursor: pointer;
                p{
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space:nowrap;
                    width: 140px;
                    text-align: center;
                }
                &.active{
                    background:rgba(227,236,255,1);
                    border:1px solid rgba(98,122,173,1);
                    border-radius:5px;
                    color: #627AAD;
                }
            }
        }
    }
}


</style>
<style>
.ProjectList .el-radio .el-radio__label{
    width: 90px !important;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding-left: 5px;
}
.ProjectList .el-radio .el-radio__input{
    flex: 1;
}

</style>