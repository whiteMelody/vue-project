<template>
  <div class="wb100">

      <div class="pa20">
          <div class="wb100">
              <el-form :inline="true" ref="form" :model="form" :rules="rules" label-width="140px">
                  <div class="wb100">
                      <el-form-item label="门店名称" prop="name">
                          <el-input type="text" v-model.trim="form.name" placeholder="请输入门店名称" clearable></el-input>
                      </el-form-item>
                  </div>
                  <div class="wb100">
                      <el-form-item label="门店电话" prop="phone">
                          <el-input type="text" v-model.trim="form.phone" placeholder="请输入门店电话" clearable></el-input>
                      </el-form-item>
                  </div>
                  <div class="wb100">
                      <el-form-item label="门店地址" prop="address">
                          <el-input type="text" v-model.trim="form.address" placeholder="请输入门店地址" clearable></el-input>
                      </el-form-item>
                  </div>
                  <div class="wb100">
                      <el-form-item label="门店面积" prop="measure">
                          <el-input type="text" v-model.trim="form.measure" placeholder="请输入门店面积平方" clearable></el-input>
                      </el-form-item>
                  </div>
                  <div class="wb100">
                      <el-form-item label="账号数量" prop="users_scale">
                          <el-input type="text" v-model.trim="form.users_scale" placeholder="请输入账号数量" clearable></el-input>
                      </el-form-item>
                  </div>

                  <div class="wb100">
                      <el-form-item label="门店简介" prop="description">
                          <el-input type="textarea" v-model="form.description" placeholder="请输入门店简介" class="w400px"></el-input>
                      </el-form-item>
                  </div>

                  <div class="wb100">
                      <el-form-item label=" " prop=" ">
                          <template v-if="disabled">
                              <el-button type="primary" disabled>提交中...</el-button>
                          </template>
                          <template v-else>
                              <el-button type="primary" @click="submit">确定新增</el-button>
                          </template>
                          <el-button @click="cal">取消</el-button>
                      </el-form-item>
                  </div>


              </el-form>

          </div>
      </div>

  </div>
</template>

<script>

    import { storeAdd } from "@/assets/api/home/home"

export default {
  name: "AddStore",
    props: ['id'],
  components: {
  },
  data() {
    return {
        disabled: false,
        form: {
            users_scale:10
        },
        rules: {
            name: [{required: true, message: '请输入门店名称', trigger: 'change'}],
            phone: [{required: true, message: '请输入门店电话', trigger: 'change'}],
            address: [{required: true, message: '请输入门店地址', trigger: 'change'}],
            measure: [{required: true, message: '请输入门店面积平方', trigger: 'change'}],
            users_scale: [{required: true, message: '请输入账号数量', trigger: 'change'}],
            // description: [{required: true, message: '请输入门店简介', trigger: 'change'}],
        },
    }
  },
  created() {},
  methods: {

      submit(){
          this.disabled = true
          this.$refs.form.validate((valid) => {
              if (valid) {

                  let form = this.form
                  form.e_id = this.id

                  storeAdd(form).then(res=>{
                      if(res.status == 0){
                          this.$message({
                              message: '新增成功',
                              type: 'success',
                              onClose:()=>{
                                  this.disabled = false
                              }
                          })
                          this.$parent.loadData()
                      }else{
                          this.$message({
                              message: res.msg,
                              type: 'error',
                              onClose:()=>{
                                  this.disabled = false
                              }
                          })
                      }
                  })
              } else {
                  this.$message({
                      message: '请检查表单',
                      type: 'error',
                      onClose:()=>{
                          this.disabled = false
                      }
                  })
              }
          })
      },
      cal(){
          this.$parent.openTabControl()
      },

  },
  mounted() {
  },
};
</script>

<style scoped lang="scss">
</style>
