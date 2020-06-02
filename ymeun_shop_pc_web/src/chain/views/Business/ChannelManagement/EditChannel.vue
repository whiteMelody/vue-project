<template>
  <el-dialog :title="isEdit?'修改下级类目':'添加下级类目'" :visible.sync="dialogForm" width="380px">
    <div class="dialog_xian"></div>
    <div>
      <el-form ref="myForm" :model="form" :rules="rules" label-width="80px">
          <el-form-item label="一级类名" prop="name">
              <el-select v-model="form.p_id" placeholder="一级类名" class="wb100" readonly clearable disabled>
                  <el-option v-for="item in projectList" :key="item.id" :label="item.name"
                             :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="名称" prop="name">
              <el-input type="text" v-model.trim="form.name" class="wb100" placeholder="请输入名称" clearable></el-input>
            </el-form-item>
          <div class="clear0"></div>

          <div class="wb100">
              <div class="clear0 bd-gray bd-b1"></div>
              <div class="wb100 h40px lh40px">
                  <span class="fl">请选择需要添加的门店</span>
                  <span class="fr">
                      全选 <el-checkbox v-model="selectAll" @change="selectAllStore"></el-checkbox>
                  </span>
              </div>

              <template v-for="(item, index) in storeList">
                  <p class="ma5 pal20 par20 h32px lh32px  bd-a1 radius1 text-center text-over-hidden1 fl pointer" :class="item.isSelected ? 'bd-green2 bg-green7 fc-green2' : 'bd-gray'" @click="changeSelected(item, index)">
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

      <div class="clear4"></div>
    </div>
  </el-dialog>
</template>


<script>

    import { channelList, channelAdd, getListChannel  } from "@/chain/assets/api/channelManagement/channelManagement"

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
        },
        dialogForm: false,                //弹窗控制器
        rules: {
          p_id: [{required: true, message: '请选择一级类目', trigger: 'change'}],
          name: [{required: true, message: '请输入渠道名称', trigger: 'change'}],
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

          //新增下级

          if(this.is_store == 1){
              //企业
          }else{
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
                  return
              }
          }

          let param = {
              channelParentId: this.form.p_id,
              name: this.form.name,
              storeId: this.isStore ? JSON.stringify(_arr) : this.storeId,
              is_store: this.isStore ? this.is_store : 2,
          }

      channelAdd(param).then(res=>{
          if(res.status == 0){
            this.$message({
              message: '添加渠道成功',
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

          if(this.is_store == 1){
              //企业
          }else{
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
                  return
              }
          }

          let param = {
              channelParentId: this.form.p_id,
              name: this.form.name,
              command: this.form.command,
              is_store: this.isStore ? this.is_store : 2,
              channelId: this.form.id,
              storeId: this.isStore ? JSON.stringify(_arr) : this.storeId,
          }
           channelAdd(param).then(res=>{
              if(res.status == 0){
                  this.$message({
                      message: '修改渠道成功',
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
            this.$postRequest("/post/api/store/getStore").then(res => {
                if(res.status == 0){
                    let _tmp = res.data
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
                            }
                        }
                    }
                    this.storeList = _tmp
                }
            })

            if(!this.isStore){
                getListChannel({ channelParentId: 0, storeId: this.storeId, is_store_settings:1 }).then(res => {
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
                getListChannel({ channelParentId: 0 }).then(res => {
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
