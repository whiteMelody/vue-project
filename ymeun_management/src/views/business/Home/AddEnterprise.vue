<template>
  <div class="wb100">

      <div class="wb100 bg-white1">
          <div class="w110px h50px lh50px fl text-center pointer bd-t2 bd-gray4 fc-gray4 bg-white1">
              新增企业
          </div>
          <div class="clear0"></div>
      </div>

      <div class="pa20">
          <div class="wb100">
              <el-form :inline="true" ref="form" :model="form" :rules="rules" label-width="140px">
                  <div class="wb100">
                      <el-form-item label="企业名称" prop="name">
                          <el-input type="text" v-model.trim="form.name" placeholder="请输入企业名称" clearable></el-input>
                      </el-form-item>
                  </div>
                  <div class="wb100">
                      <el-form-item label="企业简称" prop="abbreviation">
                          <el-input type="text" v-model.trim="form.abbreviation" placeholder="请输入企业简称" clearable></el-input>
                      </el-form-item>
                  </div>

                  <div class="wb100">
                      <el-form-item label="企业邮箱" prop="email">
                          <el-input type="text" v-model.trim="form.email" placeholder="请输入企业邮箱" clearable></el-input>
                      </el-form-item>
                  </div>

                  <div class="wb100">
                      <el-form-item label="企业电话" prop="phone">
                          <el-input type="text" v-model.trim="form.phone" placeholder="请输入企业电话" clearable></el-input>
                      </el-form-item>
                  </div>

                  <div class="wb100">
                      <el-form-item label="选择类别" prop="edition">
                          <el-radio v-model="form.edition" :label="1">连锁版</el-radio>
                          <el-radio v-model="form.edition" :label="2">单店版</el-radio>
                      </el-form-item>
                  </div>

                  <div class="wb100">
                      <el-form-item label="企业简介" prop="description">
                          <el-input type="textarea" v-model="form.description" placeholder="请输入企业简介" class="w400px"></el-input>
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

    import { enterpriseAdd } from "@/assets/api/home/home"

export default {
  name: "AddEnterprise",
  components: {
  },
  data() {
    return {
        disabled: false,
        form: {},
        rules: {
            name: [{required: true, message: '请输入企业名称', trigger: 'change'}],
            abbreviation: [{required: true, message: '请输入企业简称', trigger: 'change'}],
            phone: [{required: true, message: '请输入企业电话', trigger: 'change'}],
            email: [{required: true, message: '请输入邮箱', trigger: 'change'}],
            edition: [{required: true, message: '请选择企业类型', trigger: 'change'}],
            // description: [{required: true, message: '请输入企业简介', trigger: 'change'}],
        },
    }
  },
  created() {},
  methods: {

      submit(){
          this.disabled = true
          this.$refs.form.validate((valid) => {
              if (valid) {
                  enterpriseAdd(this.form).then(res=>{
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
