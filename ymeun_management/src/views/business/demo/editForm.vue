<template>
  <el-dialog :title="isEdit?'编辑demo':'新增demo'" :visible.sync="dialogForm" width="50%">
    <el-form :inline="true" ref="form" :model="form" :rules="rules" class="add-form" label-width="140px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="name" prop="name">
            <el-input type="text" v-model.trim="form.name" placeholder="请输入name" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="mobile" prop="mobile">
            <el-input type="text" v-model.trim="form.mobile" placeholder="请输入mobile" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="input" prop="input">
              <el-input type="text" v-model.trim="form.input" placeholder="请输入input" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="radio" prop="radio">
              <template v-for="[key, val] in _dictGender">
                <el-radio v-model.trim="form.radio" :label="key">{{val}}</el-radio>
              </template>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="password" prop="password">
              <el-input type="password" v-model.trim="form.password" placeholder="请输入password" clearable class="w188px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="select" prop="select">

              <div class="wb100">
                <el-select v-model="form.select" placeholder="请选择支付方撒" readonly="" clearable>
                  <el-option v-for="[key, val] in _dictPayType" :key="key" :label="val"
                             :value="key"></el-option>
                </el-select>
              </div>

            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item label="textarea" prop="textarea">
              <el-input type="textarea" v-model="form.textarea"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogForm = false">取 消</el-button>
      <el-button type="primary" @click="handleSubmit">保 存</el-button>
    </div>
  </el-dialog>
</template>


<script>
  // import searchOrg from '@/components/autocomplete/autoSearchOrg'
  import {
    PUBLIC_LIMIT,
    PUBLIC_NOT_CHINESE,
    PUBLIC_TEL,
    REG_ALL_NUMBER,
    REG_CHINESE,
    REG_LIMIT,
    REG_NUMBER,
    REG_TEXT
  } from "@/utils/Reg";
  import {
    creditCodeLength,
    creditCodeMinLength,
    maxLength,
    normalLength,
    sortLength,
    telLength
  } from "@/utils/rules";

  export default {
    name: "dialogForm",
    components: {},
    data() {
      return {
        form: this.clearForm(),
        dialogForm: false,                //弹窗控制器
        rules: {
          input: [{required: true, message: '请输入input', trigger: 'blur'}],
          radio: [{required: true, message: '请选择radio', trigger: 'change'}],
          password: [{required: true, message: '请选择password', trigger: 'change'}],
          select: [{required: true, message: '请选择select', trigger: 'change'}],
          textarea: [{required: true, validator: REG_TEXT, message: '只能输入中文,英文,数字', trigger: 'change'}],
        },
        isEdit: false,                  // 是否编辑表单
      }
    },
    methods: {
      // 提交表单
      handleSubmit() {

        // 避免重复提交时 提示报错
        if (!this.dialogForm) {
          return
        }

        this.$refs.form.validate((valid) => {
          if (valid) {
            this.isEdit ? this.handleToEdit() : this.handleToAdd()
          } else {
            this.$message({
              message: '请检查表单',
              type: 'error'
            })
          }
        })

        this.isEdit ? this.handleToEdit() : this.handleToAdd()

      },
      // 新增
      handleToAdd() {

      },
      // 编辑
      handleToEdit() {

      },

      // 清除表单数据
      clearForm() {
        return {

        }
      },
    },
    watch: {
      dialogForm(bool) {
        if (!bool) {
          this.$refs.form.resetFields()
          this.isEdit = false
          this.form = this.clearForm()
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
