<template>
  <div class="AmendClient" :style="'min-height: '+minHeight+'px;'">

        <h3> <span>修改</span><i>{{userName}}</i><span>个人资料</span></h3>


      <div class="wb60 center">
        <el-form ref="form" :model="form" :rules="rules" class="add-form" label-width="120px">

            <el-row :gutter="140">
                <el-col :span="12">
                    <el-form-item label="登录名" prop="account">
                        <el-input type="text" v-model.trim="form.account" clearable :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="姓名" prop="name">
                        <el-input type="text" v-model.trim="form.name" placeholder="请输入客户姓名" clearable></el-input>
                    </el-form-item>
                </el-col>
            </el-row>


            <el-row :gutter="140">
                <el-col :span="12">
                    <el-form-item label="电话" prop="tel">
                        <el-input type="text" v-model.trim="form.tel" placeholder="请输入客户姓名" clearable></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="性别" prop="sexRadio">
                        <template v-for="[key, val] in _dictGender">
                            <el-radio v-model.trim="form.sexRadio" :label="key">{{val}}</el-radio>
                        </template>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row :gutter="140">
                <el-col :span="12">
                    <el-form-item label="入职时间" prop="datetimer">
                        <el-date-picker
                            v-model="form.datetimer"
                            :clearable="false"
                            type="date"
                            class="wb100"
                            format="yyyy-MM-dd"
                            placeholder="请选择入职时间">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="微信" prop="weixin">
                        <el-input type="text" v-model.trim="form.weixin" placeholder="请输入微信..." clearable></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row :gutter="140">
                <el-col :span="12">
                    <el-form-item label="QQ" prop="qq">
                        <el-input type="text" v-model.trim="form.qq" placeholder="请输入QQ" clearable></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="生日" class="wb60 fl">
                        <el-select
                            @change="form.birthdayTow = ''"
                            v-model="form.birthdayOne"
                            placeholder="请选择新历/旧历"
                            readonly
                            clearable
                        >
                            <el-option v-for="[key, val] in _dictStyle" :key="key" :label="val" :value="key"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="birthdayTow" v-if="form.birthdayOne" class="birthday wb38 fr">
                        <el-date-picker
                                v-model="form.birthdayTow"
                                :clearable="false"
                                align="right"
                                type="date"
                                placeholder="请选择年月日"
                                 class="wb100"
                        ></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            
            <el-row :gutter="140">
                <el-col :span="12">
                    <el-form-item label="学历" prop="educationBackground">
                        <el-select v-model="form.educationBackground" readonly="" clearable class="wb100 fl">
                            <el-option v-for="[key, val] in _dictEducation" :key="key" :label="val"
                                    :value="key"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            
            <el-row>
                <el-col :span="24">
                    <el-form-item label="简介" prop="remark">
                        <el-input type="textarea" v-model.trim="form.remark" placeholder="请输入员工简介" clearable rows="8" class="lh40px"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <div class="clear4"></div>
        
            <div class="btn">
                <template v-if="disabled">
                    <el-button type="primary" disabled>提交中...</el-button>
                </template>
                <template v-else>
                    <el-button type="primary" @click="handleSubmit">保存资料</el-button>
                </template>
            </div>
        </el-form>
      </div>
  </div>
</template>
<script>

import { PUBLIC_PHONE } from "@/shop/utils/Reg";
import { changeUser , getUserInfo } from "@/shop/assets/api/client/client";
export default {
  name: "AmendClient",
  data() {
    return {
        customerId:this.$route.query.id,
        userName:'',
        form:{
            account:"",
            name:'',
            tel:'',
            sexRadio:'',
            datetimer:'',
            weixin:'',
            qq:'',
            birthdayOne:"",
            birthdayTow:"",
            educationBackground:"",
            remark:''
        },
        rules:{
            tel: [{ required: false, validator: PUBLIC_PHONE,  message: '请输入正确的电话号码', trigger: 'blur' },],
            birthdayTow: [{ required: true, message: '请选择年月日', trigger: 'change' }],
        },
        minHeight:0,
        disabled: false,
    };
  },
  components: {},
  methods: {
        // 提交表单
      handleSubmit() {
        this.$refs.form.validate((valid) => {
            if (valid) {

           
            } 
        })

      },
      //新增提交
    addUserFn(){
        let postData = {
            sex :  this.form.sexRadio,
            name :  this.form.name,
            mobile :  this.form.tel,
            consultationId :  this.form.counselor,
            channelPid :  this.form.channelOne,
            channelId :  this.form.channelTow,
            itemPid :  this.form.projectOne,
            itemId :  this.form.projectTow,
            complaint :  this.form.remark,
            development :  this.form.developer,
        }
        addUser(postData).then(res => {
            if(res.status == 0){
                this.$message({
                    showClose: true,
                    message: '新增成功',
                    type: 'success',
                    onClose:()=>{
                        this.$router.push({  
                            path: 'ClientList',   
                        })
                    }
                });
            }else{
                this.$message({
                    showClose: true,
                    message: res.msg,
                    type: 'error',
                });
            }
        }).catch((e)=>{
            this.$message({
                showClose: true,
                message: res.msg,
                type: 'error',
            });
        })
    },
      //获取详情信息
      getUserInfoFn(){
        let postData = {
            customerId:this.customerId
        }
        getUserInfo(postData).then(res => {

            if(res.status == 0) {

                this.userName = res.data.name
                this.form = {
                    account: "",
                    name: res.data.name,
                    tel: res.data.mobile,
                    sexRadio: res.data.sex.value + "",
                    datetimer: res.data.created_at,
                    weixin: res.data.weixin,
                    qq: res.data.qq,
                    birthdayOne: res.data.calendar,
                    birthdayTow: res.data.birthday,
                    educationBackground: res.data.weixin,
                    remark: res.data.weixin
                }
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
  },

  // 创建前状态
  beforeCreate() {},

  // 创建完毕状态
  created() {},

  // 挂载前状态
  beforeMount() {},

  // 挂载结束状态
  mounted() {
    this.getUserInfoFn()
    this.minHeight = window.innerHeight - 144;
  },

  // 更新前状态
  beforeUpdate() {},

  // 更新完成状态
  updated() {},

  // 销毁前状态
  beforeDestroy() {},

  // 销毁完成状态
  destroyed() {}
};
</script>
<style lang="scss" scoped>
.AmendClient{
    margin: 20px;
    padding: 0 20px 20px;
    background: #fff;
    h3{
        color: #333;
        border-bottom: 1px solid #E5E5E5;
        display: flex;
        height: 50px;
        font-weight: normal;
        align-items: center;
        span{
            font-size: 16px;
        }
        i{
            color: #FF5722;
            font-size: 16px;
            font-style: normal;
            padding: 0 2px;
        }
    }
    .center{
        margin: .7rem auto 0;
        width: 80%;
        .el-row{
            margin-bottom: .1rem;
            .stext{
                padding-left: 120px;
                font-style: normal;
                font-size: 12px;
                color: #FD8137;
                position: relative;
                top:-20px;
            }
        }
        .row_box{
            margin-bottom: .1rem;
        }
    }
    .btn{
        display: flex;
        justify-content: flex-end;
    }
}
</style>
<style>
.AmendClient textarea{
    resize: none !important;
}
.AmendClient .birthday .el-form-item__content{
    margin-left: 0 !important;
}
</style>



    
