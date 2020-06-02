<template>
  <el-dialog :title="isEdit?'编辑员工':'新增员工'" :visible.sync="dialogForm" :width="isEdit?'60%':'40%'">

    <div v-if="isEdit" class="pal20 par20">
      <el-form ref="form" :model="form" :rules="rules" class="add-form" label-width="100px" autocomplete="off" >
        <el-row>
          <el-col :span="12">
            <el-form-item label="登录名" prop="username">
              <el-input type="text" disabled v-model.trim="form.username" placeholder="请输入登录名" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="姓名" prop="name">
              <el-input type="text" v-model.trim="form.name" placeholder="请输入姓名" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="电话" prop="mobile">
                <el-input type="text" v-model.trim="form.mobile" placeholder="请输入电话" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="性别" >
                <template v-for="[key, val] in _dictGender">
                  <el-radio v-model.trim="sexValue" :label="key">{{val}}</el-radio>
                </template>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="入职时间" prop="entry_time">
                <el-date-picker
                        v-model="form.entry_time"
                        :clearable="false"
                        type="date"
                        placeholder="选择日期"
                        class="wb100">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="微信" prop="weixin">
                <el-input type="text" name="qq" autocomplete="off"  v-model.trim="form.weixin" placeholder="请输入微信" clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="QQ" prop="qq">
                <el-input type="text" name="weixin" autocomplete="off"  v-model.trim="form.qq" placeholder="请输入QQ" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="生日" prop="birthday">
                <!-- <el-select v-model="form.birthdayText" placeholder="请选择" readonly="" clearable class="wb48 fl">
                  <el-option v-for="[key, val] in _dictStyle" :key="key" :label="val"
                             :value="key"></el-option>
                </el-select> -->
                <el-date-picker
                        :clearable="false"
                        v-model="form.birthday"
                        type="date"
                        placeholder="选择日期"
                        class="wb100 fr">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="学历" prop="education">
                <el-select v-model="form.education" placeholder="请选择" readonly="" clearable class="wb100">
                  <el-option v-for="[key, val] in _dictEducation" :key="key" :label="val"
                             :value="key"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="团队管理" prop="attribute">
                <el-select v-model="form.attribute" placeholder="请选择" readonly="" clearable class="wb100">
                  <el-option label="非团队账号" :value="0"></el-option>
                  <el-option label="团队账号" :value="1"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24">
              <el-form-item label="简介" prop="description">
                <el-input type="textarea" v-model.trim="form.description" placeholder="请输入员工简介" class="wb100"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
      </el-form>

      <div class="clear4"></div>

      <div slot="footer" class="dialog-footer fr">
        <el-button @click="closePop">取 消</el-button>
        <template v-if="disabled">
          <el-button type="primary" disabled>提交中...</el-button>
        </template>
        <template v-else>
          <el-button type="primary" @click="handleSubmit">保 存</el-button>
        </template>
      </div>

      <div class="clear0"></div>
    </div>


    <div class="addData" v-else>
      <el-form ref="form" :model="form" :rules="rules" class="add-form" label-width="140px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="账号" prop="accountNumber">
              <el-input type="text" v-model.trim="form.accountNumber" placeholder="请输入账号" class="wb80" clearable :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="姓名" prop="name">
              <el-input type="text" v-model.trim="form.name" placeholder="请输入姓名" class="wb80" clearable AUTOCOMPLETE="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="密码" prop="passWord">
              <el-input type="password" v-model.trim="form.passWord" placeholder="请设置密码" class="wb80" clearable AUTOCOMPLETE="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="确认密码" prop="affirmPassWord">
              <el-input type='password' v-model.trim="form.affirmPassWord" placeholder="请确认密码" class="wb80" clearable AUTOCOMPLETE="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
              <el-form-item label="岗位" prop="renPost">
                <el-select v-model="form.renPost" placeholder="请选择" readonly="" clearable class="wb80">
                  <el-option v-for="[key, val] in _dictRoleTow" :key="key" :label="val"
                             :value="key"></el-option>
                </el-select>
              </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
              <el-form-item label="团队管理" prop="attribute">
                <el-select v-model="form.attribute" placeholder="请选择" readonly="" clearable class="wb80">
                  <el-option  label="非团队账号" :value="'2'"></el-option>
                  <el-option label="团队账号" :value="'1'"></el-option>
                </el-select>
              </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="form.renPost == 3">
          <el-col :span="24">
            <el-form-item label="设置折扣" prop="discount">
              <el-input type="number" v-model.trim="form.discount" placeholder="请填写" class="wb40 number">
                <template slot="append">折</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="form.renPost == 3">
          <el-col :span="24">
            <p class="mal140 f16px fc-red1">*折扣可输入1.1~9.9折，并可保留小数点后一位，例如: 7.5 折</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="btns wb87 mat30">
              <template v-if="disabled">
                <el-button class="mal10 fr" type="primary" disabled>提交中...</el-button>
              </template>
              <template v-else>
                <el-button class="mal10 fr" type="primary" @click="handleSubmit">保 存</el-button>
              </template>
              <el-button class="fr" @click="closePop">取 消</el-button>

            </div>
          </el-col>
        </el-row>
        
      </el-form>  
    </div>
  </el-dialog>
</template>


<script>

import { membersPostAdd , getInfoByMemberId , membersPostEdit , getUserName} from "@/shop/assets/api/manage/teamManagement"

export default {
  name: "EditStaff",
  components: {},
  data() {
    return {
      sexValue:'',
      form: this.clearForm(),
      dialogForm: false,                //弹窗控制器
      rules: {
        accountNumber: [{required: true, message: '请输入账号', trigger: 'blur'}],
        name: [{required: true, message: '请输入姓名', trigger: 'blur'}],
        mobile: [{required: true, message: '请输入电话', trigger: 'blur'}],
        passWord: [{required: true, message: '请设置密码', trigger: 'blur'}],
        affirmPassWord: [{required: true, message: '请确认密码', trigger: 'blur'}],
        renPost: [{required: true, message: '请选择岗位', trigger: 'change'}],
        birthday: [{required: true, message: '请选择生日', trigger: 'change'}],
        entry_time: [{required: true, message: '请选择入职时间', trigger: 'change'}],
        attribute: [{required: true, message: '请选择团队管理', trigger: 'change'}],
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
      this.$refs.form.validate((valid) => {
        if (valid) {
          if(this.isEdit){
            this.handleToEdit()
          }else{

            if(this.form.passWord == this.form.affirmPassWord){
              this.handleToAdd()
            }else{
              this.$message({
                message: '请确认密码是否一致',
                type: 'error'
              });
            }
          }
        }
      })
    },
    // 新增
    handleToAdd() {
      if(this.form.discount == undefined || this.form.discount > 1 && this.form.discount < 10 )
      {
        let postData = {
          username : this.form.accountNumber,
          password : this.form.passWord,
          password_confirmation : this.form.affirmPassWord,
          roleId : this.form.renPost,
          discount: this.form.discount,
          name: this.form.name,
        }

        this.disabled = true

        membersPostAdd(postData).then(res => {
          if(res.status == 0){
                this.$message({
                    showClose: true,
                    message: '新增员工成功',
                    type: 'success',
                    onClose:()=>{
                      this.closePop()
                      this.$parent.loadData()
                      this.disabled = false
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
          this.$message({
            showClose: true,
            message: error,
            type: 'error',
          });
          this.disabled = false
        })
      }
      else
      {
        this.$message({
          showClose: true,
          message: "请填写正确的折扣权限",
          type: 'error',
        });
        this.disabled = false
      }
    },
    // 编辑
    handleToEdit() {


      let postData = {
        usersId : this.form.users_id,
        name : this.form.name,
        mobile : this.form.mobile,
        sex	: this.sexValue,
        weixin : this.form.weixin,
        qq : this.form.qq,
        entryTime :this.form.entry_time != '' ? this.$base.dateTimeToDate(this.form.entry_time,"date2"): "",
        education : this.form.education,
        description : this.form.description,
        birthday : this.form.birthday != '' ? this.$base.dateTimeToDate(this.form.birthday,"date2"): "",
      }

      this.disabled = true

      membersPostEdit(postData).then(res => {
        if(res.status == 0){
              this.$message({
                  showClose: true,
                  message: '修改资料成功',
                  type: 'success',
                  onClose:()=>{
                    this.closePop()
                    this.$parent.loadData()
                    this.disabled = false
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
        console.log("membersPostEdit no");
        this.disabled = false
      })
    },

    // 员工详情
    getInfoByMemberId(id){
      let postData = {
        usersId:id
      }
      getInfoByMemberId(postData).then(res => {
        if(res.status == 0){
          this.form = res.data
          this.sexValue = res.data.sex.value + ''
          this.form.sex.value = res.data.sex.value + ''
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
    },

    // 新增账号
    getUserNameFn(id){

      getUserName({}).then(res => {
        if(res.status == 0){
          this.form.accountNumber = res.data
          this.form= Object.assign({}, this.form, this.form)
        }
      }).catch(error=>{
        console.log("getUserName no");
      })
    },

    // 清除表单数据
    clearForm() {
      return {
        name:"",
        passWord:'',
        accountNumber:""
      }
    },

    openPop(){
      let id = this.form.id;
      if(id){this.getInfoByMemberId(id)}
      
      this.dialogForm = true;
    },
    closePop(){
      this.dialogForm = false;
      this.isEdit = false
      this.form = this.clearForm()
      this.$refs.form.resetFields()
    },


  },
  watch: {
    // dialogForm(bool) {
      
    //   if (!bool) {
    //     this.$refs.form.resetFields()
    //     this.isEdit = false
    //     this.form = this.clearForm()
    //   }else{
    //     this.getInfoByMemberId(this.form.id)
    //   }
    // },
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
<style>
.addData .number input{
  padding-right: 0;
}
</style>

