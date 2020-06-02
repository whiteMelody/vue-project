<template>
  <div class="wb100">

      <div class="wb100 bg-white1">
          <div class="w110px h50px lh50px fl text-center pointer bd-t2 bd-gray4 fc-gray4 bg-white1">
              新增账号
          </div>
          <div class="clear0"></div>
      </div>

      <div class="pa20">
          <div class="wb100">
              <el-form :inline="true" ref="form" :model="form" :rules="rules" label-width="100px">
                  <div class="wb33 fl">
                      <el-form-item label="企业名称">
                          <el-input type="text" v-model.trim="form.ename" disabled placeholder="请输入企业名称" clearable></el-input>
                      </el-form-item>
                  </div>
                  <div class="wb33 fl">
                      <el-form-item label="门店名称">
                          <el-input type="text" v-model.trim="form.sname" disabled placeholder="请输入门店名称" clearable></el-input>
                      </el-form-item>
                  </div>
                  <div class="wb33 fl">
                      <el-form-item label="账号" prop="username">
                          <el-input type="text" v-model.trim="form.username" disabled  placeholder="请输入账号" clearable></el-input>
                      </el-form-item>
                  </div>
                  <div class="wb33 fl">
                      <el-form-item label="姓名" prop="name">
                          <el-input type="text" v-model.trim="form.name" placeholder="请输入姓名" clearable></el-input>
                      </el-form-item>
                  </div>
                  <div class="wb33 fl">
                      <el-form-item label="密码" prop="password">
                          <el-input type="password" v-model.trim="form.password" placeholder="请输入密码" clearable></el-input>
                      </el-form-item>
                  </div>
                  <div class="wb33 fl">
                      <el-form-item label="确认密码" prop="password_confirmation">
                          <el-input type="password" v-model.trim="form.password_confirmation" placeholder="请确认密码" clearable></el-input>
                      </el-form-item>
                  </div>

                  <div class="wb33 fl">
                      <el-form-item label="岗位" prop="roleId">
                          <el-select v-model="form.roleId" placeholder="请选择" readonly="" clearable class="wb100">
                              <el-option v-for="[key, val] in _dictRoleTow" :key="key" :label="val"
                                         :value="key"></el-option>
                          </el-select>
                      </el-form-item>
                  </div>
                  <div class="wb33 fl">
                      <el-form-item label="账号属性" prop="attribute">
                          <el-select v-model="form.attribute" placeholder="请选择" readonly="" clearable class="wb100">
                              <el-option label="团队账号" value="1"></el-option>
                              <el-option label="非团队账号" value="2"></el-option>
                          </el-select>
                      </el-form-item>
                  </div>

                  <div class="clear3"></div>

                  <div class="wb100 text-right">
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

import { memberAdd, getUserName } from "@/assets/api/home/home"

export default {
  name: "AddAccount",
  components: {
  },
  data() {
    return {
        form: {},
        disabled: false,
        rules: {
            // username: [{required: true, message: '请输入用户名', trigger: 'change'}],
            name: [{required: true, message: '请输入姓名', trigger: 'change'}],
            password: [{required: true, message: '请输入密码', trigger: 'change'}],
            password_confirmation: [{required: true, message: '请确认密码', trigger: 'change'}],
            roleId: [{required: true, message: '请选择岗位', trigger: 'change'}],
            attribute: [{required: true, message: '请选择账号属性', trigger: 'change'}],
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
                  form.s_id = form.sid
                  form.e_id = form.eid

                  memberAdd(form).then(res2=>{
                      if(res2.status == 0){
                          this.$message({
                              message: '新增账号成功',
                              type: 'success',
                              onClose:()=>{
                                  this.disabled = false
                              }
                          })
                          this.$parent.loadData()
                      }else{
                          this.$message({
                              message: res2.msg,
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

      getForm(form){
        this.form = form
        this.form= Object.assign({}, this.form, form)
      }

  },
  mounted() {
  },

    watch:{
      form(c, o){

      }
    }
};
</script>

<style scoped lang="scss">
</style>
