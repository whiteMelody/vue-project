<template>
  <div class="AddMarketing" :style="'min-height: '+minHeight+'px;'">

    <header>新增客户</header>
    <div class="clear-f2 mab14"></div>

      <div class="wb50 center">
        <el-form ref="form" :model="form" :rules="rules" class="add-form" label-width="120px">
            <div class="row">
                <div class="col">
                    <el-form-item label="客户姓名" prop="name">
                        <el-input type="text" v-model.trim="form.name" placeholder="请输入客户姓名" clearable></el-input>
                    </el-form-item>
                </div>
                <div class="col">
                    <el-form-item label="客户性别" prop="sex">
                        <template v-for="[key, val] in _dictGender">
                            <el-radio v-model="form.sex" :label="key">{{val}}</el-radio>
                        </template>
                    </el-form-item>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <el-form-item label="客户电话" prop="mobile">
                        <el-input type="text" v-model.trim="form.mobile" placeholder="请输入客户电话号码" clearable maxlength="11"></el-input>
                    </el-form-item>
                </div>
                <div class="col">
                    <el-form-item label="开发人员" prop="development">
                        <el-select v-model="form.development" placeholder="请选择开发人员" readonly="" clearable class="wb100" :disabled="developmentDisabled">
                            <el-option v-for="item in staffList" :key="item.users_id" :label="item.name"
                                       :value="item.users_id"></el-option>
                        </el-select>
                    </el-form-item>
                    <em class="stext">开发人员选择后不可再次修改</em>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <div class="select_box">
                        <el-form-item  prop="channel_pid" label="来源渠道"  class="wb60 fl">
                            <el-select v-model="form.channel_pid" placeholder="请选择渠道" readonly clearable @change="bigChannelChange" >
                            <el-option v-for="item in bigChannelList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item prop="channel_id" v-if="form.channel_pid" label-width="0" class="wb38 fr">
                            <el-select v-model="form.channel_id" placeholder="选择下级项目类别" readonly clearable>
                                <el-option v-for="item in smallChannelList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <em class="annotation">注：客户来源渠道一经选择，不可再次修改，请确认该客户的渠道选择正确</em>
                </div>
            </div>
          

            <!-- <el-row :gutter="140">
                <el-col :span="12">
                    <el-form-item label="客户电话" prop="tel">
                        <el-input type="text" v-model.trim="form.tel" placeholder="请输入客户电话号码" clearable maxlength="11"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="项目"  class="wb60 fl">
                        <el-select v-model="form.projectOne" placeholder="请选择项目" readonly="" clearable @change="bigProjectChange">
                            <el-option v-for="[key, val] in bigProjectList" :key="key" :label="val" :value="key"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item  prop="projectTow" v-if="form.projectOne" label-width="0" class="wb38 fr">
                        <el-select v-model="form.projectTow" placeholder="选择下级项目类别" readonly clearable>
                            <el-option v-for="[key, val] in smallProjectList" :key="key" :label="val" :value="key"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>

            
            <el-row :gutter="140" class="row_box">
                <el-col :span="12">
                    <el-form-item label="顾问" prop="counselor">
                        <el-select v-model="form.counselor" placeholder="请选择顾问" readonly="" clearable class="wb100" :disabled="roleChoosable">
                            <el-option v-for="[key, val] in doctorList" :key="key" :label="val" :value="key"></el-option>
                        </el-select>
                    </el-form-item>
                    <em class="stext">若不选择系统会自动轮排给下一个顾问</em>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="开发人员" prop="developer">
                        <el-select v-model="form.developer" placeholder="请选择开发人员" readonly="" clearable class="wb100">
                            <el-option v-for="[key, val] in staffList" :key="key" :label="val" :value="key"></el-option>
                        </el-select>
                    </el-form-item>
                    <em class="stext">若不选择该客户将没有开发人员</em>
                </el-col>
            </el-row>

            
            <el-row :gutter="140">
                <el-col :span="12">
                    <el-form-item  prop="channelOne" label="来源渠道"  class="wb60 fl">
                        <el-select v-model="form.channelOne" placeholder="请选择渠道" readonly clearable @change="bigChannelChange">
                           <el-option v-for="[key, val] in bigChannelList" :key="key" :label="val" :value="key"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="channelTow" v-if="form.channelOne" label-width="0" class="wb38 fr">
                        <el-select v-model="form.channelTow" placeholder="选择下级项目类别" readonly clearable>
                            <el-option v-for="[key, val] in smallChannelList" :key="key" :label="val" :value="key"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                
            </el-row> -->

            <el-row>
                <el-col :span="24">
                    <el-form-item label="客户备注" prop="complaint">
                        <el-input type="textarea" v-model.trim="form.complaint" placeholder="请输入客户备注" clearable rows="6" class="lh40px"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <div class="clear4"></div>

        
            <div class="btn">
                <el-button @click="$router.go(-1)">取消</el-button>
                <template v-if="disabled">
                    <el-button type="primary" disabled>保存中...</el-button>
                </template>
                <template v-else>
                    <el-button type="primary" @click="handleSubmit">确定新增</el-button>
                </template>
            </div>
        </el-form>
      </div>
  </div>
</template>
<script>

import { PUBLIC_PHONE } from "@/chain/utils/Reg";
import { addUser } from '@/chain/assets/api/marketing/marketing'

export default {
  name: "AddMarketing",
  data() {
    return {
        roleChoosable:false,
        disabled:false,
        // form:{
        //     name:'',
        //     sex:'0',
        //     tel:'',
        //     projectOne: '',
        //     projectTow: '',
        //     counselor:'',
        //     developer:"",
        //     channelOne:"",
        //     channelTow:"",
        //     remark:""
        // },
        form:{
            name:'',
            sex:'0',
            development:'',
            complaint:"",
            mobile:"",
            channel_pid:'',
            channel_id:''
        },
        bigProjectList:[],
        smallProjectList:[],
        bigChannelList:[],
        smallChannelList:[],
        doctorList:[],
        staffList:[],
        rules:{
            mobile: [{ required: true, validator: PUBLIC_PHONE,  message: '请输入正确的电话号码', trigger: 'blur' },],
            name: [{ required: true, message: '请输入客户姓名', trigger: 'change' }],
            sex: [{ required: true, message: '请选择性别', trigger: 'change' }],
            development: [{ required: true, message: '请选择开发人员', trigger: 'change' }],
            channel_pid: [{ required: true, message: '请选择渠道', trigger: 'change' }],
            channel_id: [{ required: true, message: ' ', trigger: 'change' }],
            channelOne: [{ required: true, message: '请选择渠道', trigger: 'change' }],
            channelTow: [{ required: true, message: '请选择完整渠道', trigger: 'change' }],
            projectTow: [{ required: true, message: '请选择完整项目', trigger: 'change' }],
            counselor: [{ required: false, message: `请选择${this.$store.getters.roleName.adviser}`, trigger: 'change' }],
            remark: [{ required: false, message: '请输入备注', trigger: 'blur' }],
        },
        minHeight:0,
        developmentDisabled:false
    };
  },
  components: {},
  methods: {

    // 提交表单
    handleSubmit() {

        this.$refs.form.validate((valid) => {
            if (valid) {
                this.addUserFn()
            } 
        })
    },

    addUserFn(){
        let postData = this.form;
        this.disabled = true;
        addUser(postData).then(res => {
            if(res.status == 0){
                this.$message({
                    showClose: true,
                    message: '新增成功',
                    type: 'success',
                    onClose:()=>{
                        this.$router.go(-1)
                    }
                });
            }else{
                this.$message({
                    showClose: true,
                    message: res.msg,
                    type: 'error',
                });
                this.disabled = false;
            }
        }).catch(error=>{
            console.log("addUser no");
            this.disabled = false;
        })
    },

    //医生助理列表
    // doctorFn(){
    //   const that = this;
    //   that.$postRequest("/post/api/store/getStoreMembers",{
    //     role_id:3,
    //   }).then(res => {
    //     that.doctorList =res.data 
    //   })
    // },

    //开发人员
    membersListFn(){
      const that = this;
      that.$postRequest("/post/api/members/membersListByChain",{}).then(res => {
        that.staffList =res.data 
      })
    },

    //意向项目-大类
    // bigProjectFn(){
    //   const that = this;
    //   that.$postRequest("/post/api/store/getStoreItem",{
    //     getItem:1,
    //   }).then(res => {
    //     that.bigProjectList = res.data
    //   })
    // },
    //渠道-大类
    bigChannelFn(){
      const that = this;
      that.$postRequest("/post/api/store/getStoreChannel",{
        chain:1,        
        getChannel:1,
      }).then(res => {
        that.bigChannelList = res.data
      })
    },

    //项目小类切换
    // bigProjectChange(){
    //   const that = this;
    //   this.from.projectOne = ''
    //   that.$postRequest("/post/api/store/getStoreItem",{
    //     getItem:2,
    //     p_id:that.form.projectTow
    //   }).then(res => {
    //     that.smallProjectList = res.data
    //   })
    // },

    //渠道小类切换
    bigChannelChange(){
      const that = this;
      that.form.channel_id = ''
      that.$postRequest("/post/api/store/getStoreChannel",{
        getChannel:2,
        chain:1,        
        p_id:that.form.channel_pid
      }).then(res => {
        that.smallChannelList = res.data
      })
    },

    

  },

  // 创建前状态
  beforeCreate() {},

  // 创建完毕状态
  created() {},

  // 挂载前状态
  beforeMount() {},

  // 挂载结束状态
  mounted() {
    this.minHeight = window.innerHeight - 144;
    // this.doctorFn()
    // this.bigProjectFn()
    this.bigChannelFn()
    if(this.$store.getters.currentUser.is_admin == 0){
        this.form.development = this.$store.getters.currentUser.users_id
        this.developmentDisabled = true;
    }
    this.membersListFn()

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
.AddMarketing{
    margin: 20px;
    padding: 0 20px 20px;
    background: #fff;
    header {
        width: 100%;
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
    }
    .center{
        margin: .7rem auto 0;
        width: 80%;
        .el-row{
            margin-bottom: .1rem;
            .stext{
                padding-left: 120px;
                font-style: normal;
                font-size:12px;
                font-weight:500;
                color: #999;
                position: relative;
                top:0px;
            }
        }
        .row{
            display: flex;
            .col{
                width: 50%;
                .stext{
                    padding-left: 120px;
                    font-style: normal;
                    font-size:12px;
                    font-weight:500;
                    color: #999;
                    position: relative;
                    top:0px;
                }
                .select_box{
                    width: 100%;
                    overflow: hidden;
                }
                .annotation{
                    display: block;
                    position: relative;
                    top:0px;
                    left: 120px;
                    font-size:12px;
                    font-weight:500;
                    color: #999;
                    margin-bottom: 20px;
                    font-style: normal;
                }
                
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
.AddMarketing textarea{
    resize: none !important;
}
.AddMarketing .el-form-item__content .el-select,.MarketingEdit .el-form-item__content .el-select input{
    width: 100% !important;
}
</style>



    
