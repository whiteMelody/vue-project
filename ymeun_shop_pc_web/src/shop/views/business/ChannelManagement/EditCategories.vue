<template>
  <el-dialog :title="isEdit?'修改下级类目':'添加下级类目'" :visible.sync="dialogForm" width="50%">
    <div class="pal20 par20">
      <el-form ref="myForm" :model="form" :rules="rules" label-width="100px">

          <el-form-item label="一级渠道" prop="name">
            <el-select v-model="form.p_id" placeholder="一级渠道" readonly clearable v-if="!isEdit" disabled="">
              <el-option v-for="item in $store.getters.channelListMap" :key="item.key" :label="item.value"
                         :value="item.key"></el-option>
            </el-select>
            <el-select v-model="form.p_id" placeholder="一级类名" readonly clearable v-else>
              <el-option v-for="item in $store.getters.channelListMap" :key="item.key" :label="item.value"
                         :value="item.key"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="名称" prop="name">
            <el-input type="text" v-model.trim="form.name" placeholder="请输入名称" clearable></el-input>
          </el-form-item>

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

  import {addChannel} from  "@/shop/assets/api/manage/manage"

  export default {
    name: "EditStaff",
    components: {},
    data() {
      return {
        form: {
        },
        dialogForm: false,                //弹窗控制器
        rules: {
          p_id: [{required: true, message: '请选择一级类目', trigger: 'change'}],
          name: [{required: true, message: '请输入项目名称', trigger: 'change'}],
        },
        isEdit: false,                  // 是否编辑表单
        disabled: false,
      }
    },
    methods: {
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

        addChannel({
          channelParentId: this.form.p_id,
             name: this.form.name,
         }).then(res=>{
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

        addChannel({
              channelParentId: this.form.p_id,
               name: this.form.name,
            channelId: this.form.id,
           }).then(res=>{
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
    watch: {
      dialogForm(bool) {
        if (!bool) {
          this.$refs.myForm.resetFields()
          this.isEdit = false
        }else{

        }
      },
    },
    computed: {
      isSupplyYield() {
        return this.form.isSupplyYield
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>

